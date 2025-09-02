# 本地 20 B 参数模型 + LangChain Agent 示例

> **目标**：在本地（CPU/GPU）运行 20 B 参数模型，并与 LangChain 的 Agent 框架无缝结合，支持自定义工具（如执行 Shell 命令、读取文件）以及快速搭建 CLI / FastAPI 接口。

> **技术栈**  
> - 模型：`gpt‑oss‑20b`（或其它 20 B 参数模型）  
> - 推理引擎：**llama.cpp**（支持 CPU/GPU、低内存占用）  
> - 框架：**LangChain 0.2+**（Agent、工具、内存）  
> - Web：FastAPI + Uvicorn

---

## 1️⃣ 环境准备

```bash
# ① 创建虚拟环境（可选）
python -m venv venv
source venv/bin/activate          # Windows: .\venv\Scripts\activate

# ② 安装依赖
pip install langchain fastapi uvicorn python-dotenv tqdm

# ③ 安装 llama.cpp
git clone https://github.com/ggerganov/llama.cpp.git
cd llama.cpp && make -j$(nproc)      # Linux/macOS

# ④ 把生成的可执行文件放到 PATH
sudo cp main /usr/local/bin/llama_cpp   # 或记下完整路径
```

> **模型文件**  
> 下载 20 B 参数模型（如 `gpt‑oss‑20b`）的量化版（建议使用 q8 或更低），放到 `./models/ggml‑q8.bin`。

```bash
mkdir -p models
# 示例：直接从 Hugging Face Hub 下载
wget https://huggingface.co/YourUser/gpt-oss-20b-ggml-q8.bin -O models/ggml-q8.bin
```

---

## 2️⃣ 定义 LLM（llama.cpp）

```python
# llm.py
from langchain.llms import LlamaCpp

llm = LlamaCpp(
    model_path="./models/ggml-q8.bin",
    n_ctx=2048,          # 上下文长度
    temperature=0.2,
    top_p=1.0,
    max_tokens=512,      # 每次生成的最大 token
    n_gpu_layers=-1,     # -1 = 所有层放 GPU；0 = 仅 CPU
)
```

> **说明**  
> - `n_gpu_layers=-1` 让所有可用层都在 GPU 上，显存占用更高。  
> - 若无 GPU，只需 `n_gpu_layers=0` 或者改为 `n_gpu_layers=-1` 并把模型放到 CPU。

---

## 3️⃣ 自定义工具（Tool）

```python
# tools.py
from langchain.tools import BaseTool
import subprocess, os

class ShellExecuteTool(BaseTool):
    name = "Shell Execute"
    description = (
        "Run arbitrary shell commands.\n"
        "Example: 'ls -la /tmp'\n"
        "Return the command output or error message."
    )

    def _run(self, command: str) -> str:
        try:
            result = subprocess.check_output(
                command,
                shell=True,
                stderr=subprocess.STDOUT,
                timeout=30
            )
            return result.decode("utf-8")
        except subprocess.CalledProcessError as e:
            return f"❌ Error: {e.output.decode('utf-8')}"
        except Exception as e:
            return f"❌ Unexpected error: {str(e)}"

class ReadFileTool(BaseTool):
    name = "Read File"
    description = (
        "Read the content of a local file.\n"
        "Input: full path to the file."
    )

    def _run(self, file_path: str) -> str:
        try:
            with open(file_path, "r", encoding="utf-8") as f:
                return f.read()
        except Exception as e:
            return f"❌ Error: {str(e)}"
```

> **安全建议**  
> - 对 `ShellExecuteTool` 做白名单或沙箱。  
> - 在 `ReadFileTool` 内部限定可访问路径，防止泄露敏感文件。

---

## 4️⃣ 初始化 Agent

```python
# agent.py
from langchain.agents import initialize_agent, AgentType
from llm import llm
from tools import ShellExecuteTool, ReadFileTool

tools = [ShellExecuteTool(), ReadFileTool()]

agent_executor = initialize_agent(
    tools=tools,
    llm=llm,
    agent=AgentType.ZERO_SHOT_REACT_DESCRIPTION,  # 或 "chat-zero-shot-react-description"
    verbose=True,
    max_iterations=5,   # 防止死循环
)
```

---

## 5️⃣ CLI 示例

```python
# cli.py
from agent import agent_executor

def ask(question: str) -> str:
    return agent_executor.run(question)

if __name__ == "__main__":
    import sys
    prompt = " ".join(sys.argv[1:]) if len(sys.argv) > 1 else input("请输入问题：")
    print("\n=== Agent 正在思考 ===\n")
    answer = ask(prompt)
    print("\n=== Agent 回答 ===\n", answer)
```

> **运行**  
> ```bash
> python cli.py "请列出当前目录下的所有文件"
> ```

---

## 6️⃣ FastAPI Web 接口（可选）

```python
# main.py
from fastapi import FastAPI, HTTPException
import uvicorn
from agent import agent_executor

app = FastAPI()

@app.post("/chat")
async def chat(prompt: str):
    try:
        answer = agent_executor.run(prompt)
        return {"answer": answer}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
```

> 访问 `http://localhost:8000/docs`，即可使用 Swagger UI 调试。

---

## 7️⃣ 常见问题 & 排错

| 问题 | 原因 | 解决方案 |
|------|------|----------|
| **`module not found: llama_cpp`** | 未把 `llama.cpp/main` 放到 PATH。 | 把可执行文件复制到 `/usr/local/bin/llama_cpp` 或在 `LLAMA_CPP_PATH` 环境变量里写完整路径。 |
| **模型加载慢 / 内存占用高** | 20 B 参数默认 float16，显存需求大。 | 使用 `q8_0` 或更低量化模型；或把 `n_gpu_layers=0` 用 CPU。 |
| **Agent 反复循环** | 没有终止条件或工具返回错误导致 Agent 再次尝试。 | 设置 `max_iterations`，或者在 prompt 中加“如果完成，则返回答案，否则执行下一步”。 |
| **命令输出过长导致卡顿** | `max_tokens` 太大。 | 降低 `max_tokens` 或在工具里限制输出长度。 |

---

## 8️⃣ 下一步：更强大功能

| 功能 | 如何实现 |
|------|----------|
| **多轮记忆** | `from langchain.memory import ConversationBufferMemory`，并在 `initialize_agent(..., memory=ConversationBufferMemory())` 里传入。 |
| **安全沙箱** | 在 `ShellExecuteTool._run` 前检查命令是否在白名单，或使用 Docker/Firejail。 |
| **多模型切换** | 把 `llm` 换成 `OpenAI()` 或者 `ChatOllama()`，只需改一个变量。 |
| **多模态** | 加入 `VisionTool`（OpenCV/PIL）或 `AudioTool`（Whisper）。 |

---

## 🎉 小结

- **几行代码**即可把 20 B 参数模型与 LangChain Agent 搭配使用。  
- 通过 `llama.cpp`，你可以在 **CPU 或 GPU** 上本地推理，无需任何 API。  
- 支持 **CLI / FastAPI**，可快速落地到生产环境或个人项目。

如果你在安装、模型加载或工具实现上遇到任何具体错误，随时贴出来，我可以帮你排查！ 🚀