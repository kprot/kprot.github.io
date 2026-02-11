# Ollama - 本地运行大语言模型

## 什么是 Ollama？

Ollama 是一个开源平台，让你能够在本地机器上轻松运行和管理大语言模型（LLM）。它将模型权重、配置和数据打包成单一的 Modelfile 包，提供简单易用的命令行工具、REST API 和多语言 SDK。

## 核心优势

### 💰 零 API 成本
完全本地运行，无需支付任何 API 调用费用，特别适合开发和测试阶段。

### 🔒 隐私保护
所有数据都在本地处理，不会发送到外部服务器，保护用户隐私和敏感信息。

### 🚀 快速迭代
没有 API 速率限制，可以无限次调用，加快开发迭代速度。

### 📡 离线能力
无需互联网连接即可工作，适合离线环境或网络不稳定的场景。

### 🎯 完全控制
可以自定义模型参数、提示词模板，完全掌控 AI 行为。

## 安装 Ollama

### macOS

```bash
# 使用 Homebrew 安装
brew install ollama

# 或下载安装包
# 访问 https://ollama.ai/download
```

### Linux

```bash
curl -fsSL https://ollama.ai/install.sh | sh
```

### Windows

下载并安装 Windows 版本：https://ollama.ai/download

### 验证安装

```bash
ollama --version
```

确保使用 Ollama >= 0.1.34 版本（包含重要安全更新）。

## 基础操作

### 1. 下载模型

```bash
# 下载 Llama 3.2 3B 模型（推荐入门）
ollama pull llama3.2:3b

# 下载其他流行模型
ollama pull llama3.2:1b      # 更小的模型，速度更快
ollama pull llama3.2:7b      # 更大的模型，效果更好
ollama pull mistral:7b       # Mistral 模型
ollama pull codellama:7b     # 专门用于代码的模型
ollama pull qwen2.5:7b       # 中文友好的模型
```

### 2. 查看已安装模型

```bash
ollama list
```

输出示例：
```
NAME                ID              SIZE      MODIFIED
llama3.2:3b        a80c4f17acd5    2.0 GB    2 days ago
mistral:7b         f974a74358d6    4.1 GB    1 week ago
```

### 3. 运行模型

```bash
# 启动交互式对话
ollama run llama3.2:3b

# 直接提问
ollama run llama3.2:3b "解释什么是机器学习"

# 指定服务器地址
ollama run llama3.2:3b --host http://localhost:11434
```

### 4. 删除模型

```bash
ollama rm llama3.2:3b
```

## 模型选择指南

### 按参数量选择

| 模型大小 | 参数量 | 内存需求 | 适用场景 |
|---------|--------|---------|---------|
| 超小型 | 1B | 2-4 GB | 简单对话、快速响应 |
| 小型 | 3B | 4-8 GB | 日常对话、基础任务 |
| 中型 | 7B | 8-16 GB | 复杂推理、代码生成 |
| 大型 | 13B+ | 16-32 GB | 专业任务、高质量输出 |
| 超大型 | 70B+ | 64+ GB | 最佳效果、需要高端硬件 |

### 推荐模型

#### 通用对话
- **llama3.2:3b** - 平衡性能和质量
- **mistral:7b** - 高质量输出
- **qwen2.5:7b** - 中文优化

#### 代码生成
- **codellama:7b** - 专门的代码模型
- **deepseek-coder:6.7b** - 优秀的编程助手

#### 中文场景
- **qwen2.5:7b** - 阿里通义千问
- **chatglm3:6b** - 清华 ChatGLM

## API 使用

### REST API

Ollama 默认在 `http://localhost:11434` 提供 REST API 服务。

#### 生成响应

```bash
curl http://localhost:11434/api/generate -d '{
  "model": "llama3.2:3b",
  "prompt": "为什么天空是蓝色的？",
  "stream": false
}'
```

#### 聊天接口

```bash
curl http://localhost:11434/api/chat -d '{
  "model": "llama3.2:3b",
  "messages": [
    {
      "role": "system",
      "content": "你是一个专业的 AI 助手"
    },
    {
      "role": "user",
      "content": "你好，请介绍一下自己"
    }
  ],
  "stream": false
}'
```

#### 流式响应

```bash
curl http://localhost:11434/api/chat -d '{
  "model": "llama3.2:3b",
  "messages": [
    {"role": "user", "content": "写一首关于春天的诗"}
  ],
  "stream": true
}'
```

### Python SDK

安装 Ollama Python 库：

```bash
pip install ollama
```

#### 基础使用

```python
import ollama

# 简单对话
response = ollama.chat(
    model='llama3.2:3b',
    messages=[
        {
            'role': 'user',
            'content': '什么是人工智能？'
        }
    ]
)

print(response['message']['content'])
```

#### 流式响应

```python
import ollama

stream = ollama.chat(
    model='llama3.2:3b',
    messages=[
        {
            'role': 'user',
            'content': '写一个 Python 快速排序算法'
        }
    ],
    stream=True
)

for chunk in stream:
    print(chunk['message']['content'], end='', flush=True)
```

#### 自定义参数

```python
import ollama

response = ollama.chat(
    model='llama3.2:3b',
    messages=[
        {
            'role': 'system',
            'content': '你是一个专业的英语老师'
        },
        {
            'role': 'user',
            'content': '解释一下现在完成时'
        }
    ],
    options={
        'temperature': 0.7,      # 控制随机性 (0-1)
        'top_p': 0.9,           # 核采样
        'top_k': 40,            # Top-K 采样
        'num_predict': 500,     # 最大生成 token 数
    }
)

print(response['message']['content'])
```

### JavaScript/TypeScript SDK

安装：

```bash
npm install ollama
```

使用示例：

```javascript
import ollama from 'ollama'

const response = await ollama.chat({
  model: 'llama3.2:3b',
  messages: [
    { 
      role: 'user', 
      content: '什么是 TypeScript？' 
    }
  ],
})

console.log(response.message.content)
```

## 高级配置

### Modelfile 自定义

创建自定义模型配置：

```dockerfile
# 创建 Modelfile
FROM llama3.2:3b

# 设置系统提示词
SYSTEM """
你是一个专业的儿童英语教师，擅长用简单易懂的方式教授英语。
你的回答应该：
1. 使用简单的词汇
2. 提供生动的例子
3. 鼓励和表扬学生
"""

# 设置参数
PARAMETER temperature 0.7
PARAMETER top_p 0.9
PARAMETER top_k 40

# 设置模板
TEMPLATE """{{ .System }}

User: {{ .Prompt }}
Assistant:"""
```

创建自定义模型：

```bash
ollama create my-english-teacher -f ./Modelfile
ollama run my-english-teacher
```

### 环境变量配置

```bash
# 设置服务器地址
export OLLAMA_HOST=0.0.0.0:11434

# 设置模型存储路径
export OLLAMA_MODELS=/path/to/models

# 设置并发数
export OLLAMA_NUM_PARALLEL=4

# 设置最大加载模型数
export OLLAMA_MAX_LOADED_MODELS=2
```

## 实战应用

### 1. 英语学习助手

```python
import ollama

class EnglishTutor:
    def __init__(self):
        self.model = 'llama3.2:3b'
        self.conversation_history = []
    
    def chat(self, user_message):
        """与学生对话"""
        self.conversation_history.append({
            'role': 'user',
            'content': user_message
        })
        
        response = ollama.chat(
            model=self.model,
            messages=[
                {
                    'role': 'system',
                    'content': '你是一个友好的英语老师，帮助学生学习英语。'
                },
                *self.conversation_history
            ]
        )
        
        assistant_message = response['message']['content']
        self.conversation_history.append({
            'role': 'assistant',
            'content': assistant_message
        })
        
        return assistant_message
    
    def generate_exercise(self, topic, difficulty='easy'):
        """生成练习题"""
        prompt = f"为{difficulty}级别的学生生成5道关于{topic}的英语练习题"
        
        response = ollama.chat(
            model=self.model,
            messages=[
                {
                    'role': 'system',
                    'content': '你是一个专业的英语教师，擅长设计练习题。'
                },
                {
                    'role': 'user',
                    'content': prompt
                }
            ]
        )
        
        return response['message']['content']
    
    def check_grammar(self, sentence):
        """检查语法"""
        prompt = f"请检查这个句子的语法错误并给出修改建议：\n{sentence}"
        
        response = ollama.chat(
            model=self.model,
            messages=[
                {
                    'role': 'system',
                    'content': '你是一个英语语法专家。'
                },
                {
                    'role': 'user',
                    'content': prompt
                }
            ]
        )
        
        return response['message']['content']

# 使用示例
tutor = EnglishTutor()

# 对话
print(tutor.chat("Hello! I want to learn English."))

# 生成练习
exercises = tutor.generate_exercise("现在进行时", "beginner")
print(exercises)

# 检查语法
feedback = tutor.check_grammar("I goes to school yesterday.")
print(feedback)
```

### 2. FastAPI 集成

```python
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import ollama

app = FastAPI()

class ChatRequest(BaseModel):
    message: str
    model: str = "llama3.2:3b"

class ChatResponse(BaseModel):
    response: str

@app.post("/chat", response_model=ChatResponse)
async def chat(request: ChatRequest):
    try:
        response = ollama.chat(
            model=request.model,
            messages=[
                {
                    'role': 'user',
                    'content': request.message
                }
            ]
        )
        
        return ChatResponse(
            response=response['message']['content']
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/models")
async def list_models():
    """列出可用模型"""
    try:
        models = ollama.list()
        return {
            "models": [
                {
                    "name": model['name'],
                    "size": model['size'],
                    "modified": model['modified_at']
                }
                for model in models['models']
            ]
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# 运行服务器
# uvicorn main:app --reload
```

### 3. 批量处理

```python
import ollama
import asyncio

async def process_question(question):
    """异步处理单个问题"""
    response = ollama.chat(
        model='llama3.2:3b',
        messages=[
            {'role': 'user', 'content': question}
        ]
    )
    return {
        'question': question,
        'answer': response['message']['content']
    }

async def batch_process(questions):
    """批量处理问题"""
    tasks = [process_question(q) for q in questions]
    results = await asyncio.gather(*tasks)
    return results

# 使用示例
questions = [
    "什么是机器学习？",
    "什么是深度学习？",
    "什么是神经网络？"
]

results = asyncio.run(batch_process(questions))
for result in results:
    print(f"Q: {result['question']}")
    print(f"A: {result['answer']}\n")
```

## 性能优化

### 1. 选择合适的模型

```python
# 根据任务选择模型
def choose_model(task_type):
    models = {
        'simple': 'llama3.2:1b',      # 简单任务
        'normal': 'llama3.2:3b',      # 常规任务
        'complex': 'llama3.2:7b',     # 复杂任务
        'code': 'codellama:7b',       # 代码相关
        'chinese': 'qwen2.5:7b'       # 中文任务
    }
    return models.get(task_type, 'llama3.2:3b')
```

### 2. 参数调优

```python
# 不同场景的参数配置
configs = {
    'creative': {
        'temperature': 0.9,
        'top_p': 0.95,
        'top_k': 50
    },
    'precise': {
        'temperature': 0.3,
        'top_p': 0.9,
        'top_k': 20
    },
    'balanced': {
        'temperature': 0.7,
        'top_p': 0.9,
        'top_k': 40
    }
}

response = ollama.chat(
    model='llama3.2:3b',
    messages=[...],
    options=configs['balanced']
)
```

### 3. 缓存策略

```python
from functools import lru_cache
import hashlib

@lru_cache(maxsize=100)
def cached_chat(prompt_hash, model):
    """缓存相同问题的回答"""
    # 实际调用 Ollama
    response = ollama.chat(
        model=model,
        messages=[{'role': 'user', 'content': prompt_hash}]
    )
    return response['message']['content']

def chat_with_cache(prompt, model='llama3.2:3b'):
    # 生成提示词的哈希
    prompt_hash = hashlib.md5(prompt.encode()).hexdigest()
    return cached_chat(prompt_hash, model)
```

## 故障排除

### 常见问题

#### 1. 模型下载失败

```bash
# 检查网络连接
ping ollama.ai

# 检查磁盘空间
df -h

# 使用代理下载
export HTTP_PROXY=http://proxy:port
export HTTPS_PROXY=http://proxy:port
ollama pull llama3.2:3b
```

#### 2. 运行缓慢

```bash
# 使用更小的模型
ollama run llama3.2:1b

# 检查系统资源
top
# 或
htop

# 关闭其他占用资源的程序
```

#### 3. API 连接失败

```bash
# 检查 Ollama 服务状态
ps aux | grep ollama

# 启动 Ollama 服务
ollama serve

# 检查端口占用
lsof -i :11434

# 测试 API
curl http://localhost:11434/api/tags
```

#### 4. 内存不足

```python
# 使用流式响应减少内存占用
stream = ollama.chat(
    model='llama3.2:3b',
    messages=[...],
    stream=True
)

for chunk in stream:
    # 逐块处理，不占用大量内存
    process_chunk(chunk)
```

## 最佳实践

### 1. 开发流程

1. **原型阶段** - 使用小模型（1B-3B）快速验证功能
2. **测试阶段** - 使用中型模型（7B）测试效果
3. **生产阶段** - 根据需求选择合适模型

### 2. 错误处理

```python
import ollama
from tenacity import retry, stop_after_attempt, wait_exponential

@retry(
    stop=stop_after_attempt(3),
    wait=wait_exponential(multiplier=1, min=4, max=10)
)
def robust_chat(model, messages):
    """带重试机制的聊天"""
    try:
        response = ollama.chat(
            model=model,
            messages=messages
        )
        return response['message']['content']
    except Exception as e:
        print(f"Error: {e}")
        raise
```

### 3. 监控和日志

```python
import logging
import time

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

def monitored_chat(model, messages):
    """带监控的聊天"""
    start_time = time.time()
    
    try:
        logger.info(f"Starting chat with model: {model}")
        response = ollama.chat(model=model, messages=messages)
        
        elapsed_time = time.time() - start_time
        logger.info(f"Chat completed in {elapsed_time:.2f}s")
        
        return response['message']['content']
    except Exception as e:
        logger.error(f"Chat failed: {e}")
        raise
```

## 与云端 API 对比

| 特性 | Ollama (本地) | OpenAI API (云端) |
|-----|--------------|------------------|
| 成本 | 免费（硬件成本） | 按使用付费 |
| 隐私 | 完全本地 | 数据上传到云端 |
| 速度 | 取决于硬件 | 通常较快 |
| 离线能力 | ✅ 支持 | ❌ 需要网络 |
| 模型质量 | 中等到优秀 | 优秀到卓越 |
| 维护成本 | 需要自己管理 | 无需维护 |
| 扩展性 | 受硬件限制 | 几乎无限 |

## 相关资源

- [官方网站](https://ollama.ai)
- [GitHub 仓库](https://github.com/ollama/ollama)
- [模型库](https://ollama.com/library)
- [Python SDK 文档](https://github.com/ollama/ollama-python)
- [JavaScript SDK 文档](https://github.com/ollama/ollama-js)
- [Discord 社区](https://discord.gg/ollama)

## 总结

Ollama 是一个强大而易用的本地 LLM 运行工具，特别适合：

- 🎓 学习和实验 AI 技术
- 💻 开发阶段的快速迭代
- 🔒 需要隐私保护的应用
- 💰 预算有限的个人项目
- 📡 离线环境的 AI 应用

通过 Ollama，你可以零成本地体验和使用大语言模型，为你的应用添加强大的 AI 能力。无论是聊天机器人、内容生成还是代码辅助，Ollama 都能提供可靠的本地解决方案。
