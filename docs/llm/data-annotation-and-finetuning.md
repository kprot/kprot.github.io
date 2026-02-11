# 数据标注与模型微调完全指南

在 AI 开发中，拥有高质量的训练数据和掌握模型微调技术是构建专业应用的关键。本文将系统介绍数据标注工具和各种微调技术，帮助你将通用大语言模型定制为专属领域的 AI 助手。

## 什么是数据标注？

**数据标注（Data Annotation）**是为原始数据添加标签或注释的过程，使机器学习模型能够从中学习。对于大语言模型来说，数据标注通常包括：

- **文本分类标注**：为文本片段标记类别（如情感、主题）
- **命名实体识别**：标记文本中的人名、地名、机构名等
- **问答对标注**：创建问题-答案配对
- **指令-响应对**：标记用户指令和期望的模型响应
- **偏好标注**：标记哪个回答更好（用于 RLHF）

## 什么是模型微调？

**微调（Fine-tuning）**是在预训练模型基础上，使用特定领域数据继续训练，调整模型参数以适应新任务的过程。

### 为什么需要微调？

通用大语言模型虽然强大，但在特定领域可能表现不佳：

- ❌ 缺乏专业领域知识
- ❌ 不了解企业内部术语和流程
- ❌ 无法遵循特定的输出格式
- ❌ 可能产生不符合业务需求的回答

通过微调，你可以：

- ✅ 让模型掌握专业领域知识
- ✅ 学习特定的对话风格和语气
- ✅ 遵循业务规则和输出格式
- ✅ 提高特定任务的准确性

## 微调技术术语体系

### 术语层次关系

```
迁移学习 (Transfer Learning)
├── 微调 (Fine-tuning)
│   ├── 监督微调 (Supervised Fine-tuning, SFT)
│   ├── 指令微调 (Instruction Tuning)
│   └── 参数高效微调 (PEFT)
│       ├── LoRA (Low-Rank Adaptation)
│       ├── Adapter
│       └── Prefix Tuning
├── 领域适应 (Domain Adaptation)
└── 继续预训练 (Continued Pre-training)
```

### 核心术语详解

#### 1. Fine-tuning（微调）- 最常用术语

在预训练模型基础上，用特定领域数据继续训练，调整模型参数以适应新任务。

- **英文**：Fine-tuning
- **中文**：微调、精调
- **数据量**：通常 100-10,000 条
- **适用场景**：大多数定制化需求


#### 2. Transfer Learning（迁移学习）- 更广泛的概念

将一个任务学到的知识应用到另一个任务。Fine-tuning 是迁移学习的一种实现方式。

- **英文**：Transfer Learning
- **中文**：迁移学习
- **范围**：包含多种技术方法
- **核心思想**：复用已有知识

#### 3. Domain Adaptation（领域适应）- 强调领域转换

将模型从一个领域迁移到另一个领域。

- **英文**：Domain Adaptation
- **中文**：领域适应、领域迁移
- **示例**：从通用英语到儿童英语教学
- **特点**：强调跨领域知识迁移

#### 4. Continued Pre-training（继续预训练）- 更深层的训练

在预训练模型基础上，用大量领域数据继续预训练。

- **英文**：Continued Pre-training / Further Pre-training
- **中文**：继续预训练、二次预训练
- **数据量**：通常百万级以上
- **特点**：比 Fine-tuning 更深入

#### 5. Instruction Tuning（指令微调）- 特定类型的微调

用指令-响应对训练模型，让模型学会遵循人类指令。

- **英文**：Instruction Tuning
- **中文**：指令微调
- **数据格式**：指令 + 期望输出
- **代表模型**：InstructGPT、Alpaca

#### 6. Supervised Fine-tuning (SFT)（监督微调）

使用标注好的数据进行微调，有明确的输入-输出对。

- **英文**：Supervised Fine-tuning
- **中文**：监督微调
- **数据要求**：需要人工标注
- **应用广泛**：最常见的微调方式

#### 7. Parameter-Efficient Fine-tuning (PEFT)（参数高效微调）

只训练少量参数，冻结大部分参数，大幅降低训练成本。

- **英文**：Parameter-Efficient Fine-tuning
- **中文**：参数高效微调
- **优势**：低成本、快速、易部署
- **包含方法**：LoRA、Adapter、Prefix Tuning

#### 8. Low-Rank Adaptation (LoRA) - 具体的微调技术

PEFT 的一种实现方式，只训练低秩矩阵，大幅减少训练参数。

- **英文**：Low-Rank Adaptation
- **中文**：低秩适应
- **参数量**：通常只需训练 0.1%-1% 的参数
- **最流行**：当前最受欢迎的微调方法

### 如何选择微调方法？

| 场景 | 推荐方法 | 数据量 | 成本 |
|-----|---------|--------|------|
| 少量数据，快速定制 | LoRA Fine-tuning | 100-1000条 | 低 |
| 中等数据，专业应用 | Supervised Fine-tuning | 1000-10000条 | 中 |
| 大量数据，深度定制 | Continued Pre-training | 百万级 | 高 |
| 指令遵循能力 | Instruction Tuning | 1000-10000条 | 中 |
| 领域知识迁移 | Domain Adaptation | 万级以上 | 中高 |


## 主流开源数据标注工具

### 1. CVAT (Computer Vision Annotation Tool) ⭐ 最推荐

**开发者**：Intel（现在由 CVAT.ai 维护）

**核心特点**：
- ✅ 完全开源，MIT 许可证
- ✅ 支持图像和视频标注
- ✅ 支持边界框、多边形、关键点等多种标注类型
- ✅ 内置插值功能，自动在关键帧之间生成标注
- ✅ 支持 AI 辅助标注（集成深度学习模型）
- ✅ Web 界面，支持团队协作
- ✅ 活跃的社区和持续更新

**适用场景**：
- 计算机视觉项目
- 视频标注任务
- 需要团队协作的项目

**资源链接**：
- GitHub: https://github.com/cvat-ai/cvat
- 在线版本: https://cvat.ai
- 文档: https://opencv.github.io/cvat/

**快速开始**：

```bash
# 使用 Docker 部署
git clone https://github.com/cvat-ai/cvat
cd cvat
docker-compose up -d

# 访问 http://localhost:8080
```

### 2. Label Studio

**核心特点**：
- ✅ 开源且功能强大
- ✅ 支持图像、文本、音频、视频等多种数据类型
- ✅ 灵活的标注配置
- ✅ 支持机器学习辅助标注
- ✅ 可以集成到现有工作流
- ✅ 支持导出多种格式

**适用场景**：
- 多模态数据标注
- NLP 项目（文本分类、NER、问答）
- 需要自定义标注界面

**资源链接**：
- 官网: https://labelstud.io/
- GitHub: https://github.com/heartexlabs/label-studio
- 文档: https://labelstud.io/guide/

**快速开始**：

```bash
# 使用 pip 安装
pip install label-studio

# 启动服务
label-studio start

# 访问 http://localhost:8080
```

**配置示例（文本分类）**：

```xml
<View>
  <Text name="text" value="$text"/>
  <Choices name="sentiment" toName="text" choice="single">
    <Choice value="Positive"/>
    <Choice value="Negative"/>
    <Choice value="Neutral"/>
  </Choices>
</View>
```

### 3. LabelMe

**开发者**：MIT

**核心特点**：
- ✅ 最早的开源标注工具之一
- ✅ 专注于图像标注
- ✅ 简单易用
- ✅ MIT 许可证
- ✅ 轻量级

**适用场景**：
- 简单的图像标注任务
- 学术研究
- 快速原型开发

**资源链接**：
- GitHub: https://github.com/wkentaro/labelme
- 文档: https://github.com/wkentaro/labelme/wiki

### 4. VoTT (Visual Object Tagging Tool)

**开发者**：Microsoft

**核心特点**：
- ✅ 桌面应用（Electron）
- ✅ 支持图像和视频标注
- ✅ MIT 许可证
- ✅ 跨平台（Windows, Linux, macOS）
- ✅ 离线工作

**适用场景**：
- 需要离线标注
- 桌面应用偏好
- 目标检测项目

**资源链接**：
- GitHub: https://github.com/microsoft/VoTT


## 商业化标注平台（提供免费版本）

### 5. Roboflow

**核心特点**：
- 🎯 提供 AI 辅助标注功能
- 🎯 自动数据增强
- 🎯 模型训练和部署
- 🎯 免费版有一定限制（1000张图片/月）

**适用场景**：
- 计算机视觉项目
- 需要端到端解决方案
- 快速原型到生产

**资源链接**：
- 官网: https://roboflow.com/annotate
- 文档: https://docs.roboflow.com/

### 6. SuperAnnotate

**核心特点**：
- 🎯 支持视频自动追踪（Autotrack）
- 🎯 AI 辅助标注
- 🎯 质量控制工具
- 🎯 提供免费试用

**适用场景**：
- 大规模标注项目
- 视频标注
- 企业级应用

**资源链接**：
- 官网: https://www.superannotate.com/

### 7. Labellerr

**核心特点**：
- 🎯 智能反馈循环
- 🎯 预标注功能
- 🎯 支持多种数据类型

**资源链接**：
- 官网: https://www.labellerr.com/

## AWS 标注服务

### 8. Amazon SageMaker Ground Truth

**核心特点**：
- ☁️ AWS 官方标注服务
- ☁️ 支持人工标注和机器学习辅助标注
- ☁️ 可以使用 Amazon Mechanical Turk 或私有团队
- ☁️ 与 AWS 生态系统深度集成
- ☁️ 自动标注功能

**适用场景**：
- 已使用 AWS 的项目
- 需要大规模标注
- 需要众包标注

**资源链接**：
- 官网: https://aws.amazon.com/sagemaker/groundtruth/
- 教程: https://aws.amazon.com/tutorials/machine-learning-tutorial-label-training-data/

**快速开始**：

```python
import boto3

sagemaker = boto3.client('sagemaker')

# 创建标注任务
response = sagemaker.create_labeling_job(
    LabelingJobName='my-labeling-job',
    LabelAttributeName='category',
    InputConfig={
        'DataSource': {
            'S3DataSource': {
                'ManifestS3Uri': 's3://my-bucket/manifest.json'
            }
        }
    },
    OutputConfig={
        'S3OutputPath': 's3://my-bucket/output/'
    },
    RoleArn='arn:aws:iam::123456789012:role/SageMakerRole',
    HumanTaskConfig={
        'WorkteamArn': 'arn:aws:sagemaker:region:123456789012:workteam/private-crowd/team-name',
        'UiConfig': {
            'UiTemplateS3Uri': 's3://my-bucket/template.html'
        },
        'PreHumanTaskLambdaArn': 'arn:aws:lambda:region:123456789012:function:pre-task',
        'TaskTitle': 'Image Classification',
        'TaskDescription': 'Classify images into categories',
        'NumberOfHumanWorkersPerDataObject': 1,
        'TaskTimeLimitInSeconds': 300,
        'AnnotationConsolidationConfig': {
            'AnnotationConsolidationLambdaArn': 'arn:aws:lambda:region:123456789012:function:consolidate'
        }
    }
)
```

## 标注工具对比表

| 工具 | 类型 | 许可证 | 数据类型 | AI辅助 | 团队协作 | 部署方式 | 推荐度 |
|-----|------|--------|---------|--------|---------|---------|--------|
| CVAT | 开源 | MIT | 图像、视频 | ✅ | ✅ | Web/Docker | ⭐⭐⭐⭐⭐ |
| Label Studio | 开源 | Apache 2.0 | 多模态 | ✅ | ✅ | Web/Docker | ⭐⭐⭐⭐⭐ |
| LabelMe | 开源 | MIT | 图像 | ❌ | ❌ | 桌面 | ⭐⭐⭐ |
| VoTT | 开源 | MIT | 图像、视频 | ❌ | ❌ | 桌面 | ⭐⭐⭐ |
| Roboflow | 商业 | 免费版 | 图像 | ✅ | ✅ | 云端 | ⭐⭐⭐⭐ |
| SuperAnnotate | 商业 | 试用版 | 多模态 | ✅ | ✅ | 云端 | ⭐⭐⭐⭐ |
| SageMaker GT | 商业 | AWS | 多模态 | ✅ | ✅ | 云端 | ⭐⭐⭐⭐ |


## 实战：使用 Label Studio 标注文本数据

### 场景：儿童英语学习对话标注

假设你正在开发儿童英语学习应用，需要标注对话数据用于微调模型。

#### 步骤 1：安装和启动

```bash
pip install label-studio
label-studio start
```

#### 步骤 2：创建项目

访问 http://localhost:8080，创建新项目，选择"Text Classification"模板。

#### 步骤 3：配置标注界面

```xml
<View>
  <Header value="儿童英语对话标注"/>
  
  <!-- 显示对话内容 -->
  <Text name="dialogue" value="$text"/>
  
  <!-- 难度级别 -->
  <Choices name="difficulty" toName="dialogue" choice="single" showInline="true">
    <Choice value="初级"/>
    <Choice value="中级"/>
    <Choice value="高级"/>
  </Choices>
  
  <!-- 主题分类 -->
  <Choices name="topic" toName="dialogue" choice="single">
    <Choice value="日常问候"/>
    <Choice value="颜色学习"/>
    <Choice value="数字学习"/>
    <Choice value="动物认知"/>
    <Choice value="家庭成员"/>
  </Choices>
  
  <!-- 质量评分 -->
  <Rating name="quality" toName="dialogue" maxRating="5" icon="star"/>
  
  <!-- 备注 -->
  <TextArea name="notes" toName="dialogue" placeholder="添加备注..."/>
</View>
```

#### 步骤 4：导入数据

创建 `data.json`：

```json
[
  {
    "text": "Teacher: What color is the apple?\nStudent: It's red!\nTeacher: Very good!"
  },
  {
    "text": "Teacher: How many cats do you see?\nStudent: I see three cats.\nTeacher: Excellent!"
  }
]
```

#### 步骤 5：开始标注

在 Label Studio 界面中导入数据，开始标注。

#### 步骤 6：导出标注数据

```python
import json
from label_studio_sdk import Client

# 连接到 Label Studio
ls = Client(url='http://localhost:8080', api_key='your-api-key')

# 获取项目
project = ls.get_project(id=1)

# 导出标注
annotations = project.export_tasks()

# 保存为 JSON
with open('annotated_data.json', 'w', encoding='utf-8') as f:
    json.dump(annotations, f, ensure_ascii=False, indent=2)
```

## 模型微调实战

### 方法一：使用 Ollama 进行本地微调

Ollama 支持通过 Modelfile 创建自定义模型。

#### 创建 Modelfile

```dockerfile
# 基于 Llama 3.2 3B
FROM llama3.2:3b

# 设置系统提示词
SYSTEM """
你是一个专业的儿童英语教学助手。你的任务是：
1. 使用简单、易懂的语言
2. 多使用鼓励性的词汇
3. 适当使用表情符号
4. 根据孩子的年龄调整难度
"""

# 设置参数
PARAMETER temperature 0.7
PARAMETER top_p 0.9
PARAMETER top_k 40

# 添加示例对话
MESSAGE user 教我学习颜色
MESSAGE assistant 太好了！让我们一起学习颜色吧！🎨 红色是 Red，就像苹果🍎一样。你能告诉我你最喜欢什么颜色吗？

MESSAGE user 我喜欢蓝色
MESSAGE assistant 哇！蓝色 Blue 是很漂亮的颜色！💙 天空和大海都是蓝色的。你能找找看周围有什么是蓝色的吗？
```

#### 创建自定义模型

```bash
# 创建模型
ollama create kids-english-tutor -f Modelfile

# 测试模型
ollama run kids-english-tutor "教我学习数字"
```

### 方法二：使用 LoRA 微调（推荐）

LoRA 是当前最流行的参数高效微调方法。

#### 准备训练数据

创建 `training_data.jsonl`：

```jsonl
{"instruction": "教我学习颜色", "input": "", "output": "太好了！让我们一起学习颜色吧！🎨 红色是 Red，就像苹果🍎一样。"}
{"instruction": "这个用英语怎么说", "input": "苹果", "output": "苹果的英语是 Apple！🍎 A-P-P-L-E，apple！"}
{"instruction": "教我数数", "input": "", "output": "好的！让我们一起数数吧！1️⃣ One, 2️⃣ Two, 3️⃣ Three！"}
```

#### 使用 Unsloth 进行 LoRA 微调

```python
from unsloth import FastLanguageModel
import torch

# 加载模型
model, tokenizer = FastLanguageModel.from_pretrained(
    model_name="unsloth/llama-3-8b-bnb-4bit",
    max_seq_length=2048,
    dtype=None,
    load_in_4bit=True,
)

# 配置 LoRA
model = FastLanguageModel.get_peft_model(
    model,
    r=16,  # LoRA rank
    target_modules=["q_proj", "k_proj", "v_proj", "o_proj",
                    "gate_proj", "up_proj", "down_proj"],
    lora_alpha=16,
    lora_dropout=0,
    bias="none",
    use_gradient_checkpointing=True,
    random_state=3407,
)

# 准备数据
from datasets import load_dataset

dataset = load_dataset("json", data_files="training_data.jsonl", split="train")

# 训练
from trl import SFTTrainer
from transformers import TrainingArguments

trainer = SFTTrainer(
    model=model,
    tokenizer=tokenizer,
    train_dataset=dataset,
    dataset_text_field="text",
    max_seq_length=2048,
    args=TrainingArguments(
        per_device_train_batch_size=2,
        gradient_accumulation_steps=4,
        warmup_steps=10,
        max_steps=100,
        learning_rate=2e-4,
        fp16=not torch.cuda.is_bf16_supported(),
        bf16=torch.cuda.is_bf16_supported(),
        logging_steps=1,
        output_dir="outputs",
    ),
)

trainer.train()

# 保存模型
model.save_pretrained("kids-english-tutor-lora")
tokenizer.save_pretrained("kids-english-tutor-lora")
```


### 方法三：使用 Hugging Face 进行微调

```python
from transformers import AutoModelForCausalLM, AutoTokenizer, TrainingArguments, Trainer
from datasets import load_dataset
import torch

# 加载模型和分词器
model_name = "meta-llama/Llama-2-7b-hf"
model = AutoModelForCausalLM.from_pretrained(
    model_name,
    torch_dtype=torch.float16,
    device_map="auto"
)
tokenizer = AutoTokenizer.from_pretrained(model_name)

# 准备数据集
dataset = load_dataset("json", data_files="training_data.jsonl")

def tokenize_function(examples):
    return tokenizer(
        examples["text"],
        padding="max_length",
        truncation=True,
        max_length=512
    )

tokenized_dataset = dataset.map(tokenize_function, batched=True)

# 配置训练参数
training_args = TrainingArguments(
    output_dir="./results",
    num_train_epochs=3,
    per_device_train_batch_size=4,
    per_device_eval_batch_size=4,
    warmup_steps=500,
    weight_decay=0.01,
    logging_dir="./logs",
    logging_steps=10,
    save_steps=1000,
    evaluation_strategy="steps",
    eval_steps=500,
)

# 创建训练器
trainer = Trainer(
    model=model,
    args=training_args,
    train_dataset=tokenized_dataset["train"],
    eval_dataset=tokenized_dataset["test"],
)

# 开始训练
trainer.train()

# 保存模型
model.save_pretrained("./kids-english-tutor")
tokenizer.save_pretrained("./kids-english-tutor")
```

## 微调最佳实践

### 1. 数据质量优先

- ✅ 少量高质量数据 > 大量低质量数据
- ✅ 确保数据多样性
- ✅ 定期审查和清理数据
- ✅ 使用多人标注提高一致性

### 2. 选择合适的基础模型

| 需求 | 推荐模型 | 原因 |
|-----|---------|------|
| 中文为主 | Qwen 2.5 | 中文能力强 |
| 英文为主 | Llama 3.2 | 英文能力强 |
| 代码生成 | CodeLlama | 专门优化 |
| 对话应用 | Mistral | 平衡性好 |
| 资源受限 | Llama 3.2 3B | 小而强 |

### 3. 超参数调优

```python
# 推荐的起始超参数
hyperparameters = {
    "learning_rate": 2e-5,  # 学习率
    "batch_size": 4,        # 批次大小
    "epochs": 3,            # 训练轮数
    "warmup_steps": 100,    # 预热步数
    "weight_decay": 0.01,   # 权重衰减
    "lora_r": 16,          # LoRA rank
    "lora_alpha": 32,      # LoRA alpha
}
```

### 4. 监控训练过程

```python
import wandb

# 初始化 Weights & Biases
wandb.init(project="kids-english-tutor", config=hyperparameters)

# 在训练循环中记录指标
wandb.log({
    "loss": loss,
    "learning_rate": lr,
    "epoch": epoch
})
```

### 5. 评估模型性能

```python
from sklearn.metrics import accuracy_score, f1_score

def evaluate_model(model, test_dataset):
    predictions = []
    labels = []
    
    for example in test_dataset:
        pred = model.generate(example["input"])
        predictions.append(pred)
        labels.append(example["output"])
    
    # 计算指标
    accuracy = accuracy_score(labels, predictions)
    f1 = f1_score(labels, predictions, average='weighted')
    
    return {
        "accuracy": accuracy,
        "f1_score": f1
    }
```

## 常见问题与解决方案

### Q1: 训练数据需要多少？

**答案**：取决于任务复杂度和微调方法

- **LoRA 微调**：100-1000 条高质量数据
- **全量微调**：10,000+ 条数据
- **指令微调**：1000-5000 条指令-响应对

**建议**：从小数据集开始，逐步增加，观察性能提升。

### Q2: 如何避免过拟合？

**解决方案**：

```python
# 1. 使用验证集
train_test_split(dataset, test_size=0.2)

# 2. 早停（Early Stopping）
from transformers import EarlyStoppingCallback

trainer = Trainer(
    callbacks=[EarlyStoppingCallback(early_stopping_patience=3)]
)

# 3. 数据增强
from nlpaug.augmenter.word import SynonymAug

aug = SynonymAug(aug_src='wordnet')
augmented_text = aug.augment(text)

# 4. Dropout
model.config.hidden_dropout_prob = 0.1
model.config.attention_probs_dropout_prob = 0.1
```

### Q3: 训练太慢怎么办？

**解决方案**：

1. **使用量化**：
```python
from transformers import BitsAndBytesConfig

bnb_config = BitsAndBytesConfig(
    load_in_4bit=True,
    bnb_4bit_quant_type="nf4",
    bnb_4bit_compute_dtype=torch.float16
)

model = AutoModelForCausalLM.from_pretrained(
    model_name,
    quantization_config=bnb_config
)
```

2. **使用梯度累积**：
```python
training_args = TrainingArguments(
    per_device_train_batch_size=1,
    gradient_accumulation_steps=16  # 等效于 batch_size=16
)
```

3. **使用混合精度训练**：
```python
training_args = TrainingArguments(
    fp16=True  # 或 bf16=True
)
```

### Q4: 如何部署微调后的模型？

**方案 1：转换为 Ollama 模型**

```bash
# 1. 导出为 GGUF 格式
python convert-hf-to-gguf.py ./kids-english-tutor

# 2. 创建 Modelfile
echo "FROM ./kids-english-tutor.gguf" > Modelfile

# 3. 创建 Ollama 模型
ollama create kids-english-tutor -f Modelfile

# 4. 运行
ollama run kids-english-tutor
```

**方案 2：使用 FastAPI 部署**

```python
from fastapi import FastAPI
from transformers import pipeline

app = FastAPI()

# 加载模型
generator = pipeline("text-generation", model="./kids-english-tutor")

@app.post("/generate")
async def generate(prompt: str):
    result = generator(prompt, max_length=100)
    return {"response": result[0]["generated_text"]}
```

**方案 3：使用 Hugging Face Inference API**

```python
from huggingface_hub import InferenceClient

client = InferenceClient(model="your-username/kids-english-tutor")

response = client.text_generation(
    "教我学习颜色",
    max_new_tokens=100
)
```


## 成本估算

### 本地微调成本

| 模型大小 | 方法 | 硬件需求 | 时间 | 电力成本 |
|---------|------|---------|------|---------|
| 3B | LoRA | 16GB RAM + GPU | 1-2小时 | ~$0.5 |
| 7B | LoRA | 24GB VRAM | 2-4小时 | ~$1 |
| 13B | LoRA | 40GB VRAM | 4-8小时 | ~$2 |
| 7B | 全量 | 80GB VRAM | 12-24小时 | ~$5 |

### 云端微调成本

| 平台 | 实例类型 | 价格/小时 | 适合模型 |
|-----|---------|----------|---------|
| AWS | p3.2xlarge | $3.06 | 7B LoRA |
| AWS | p3.8xlarge | $12.24 | 13B LoRA |
| Google Cloud | n1-highmem-8 + T4 | $0.95 | 3B LoRA |
| Google Cloud | a2-highgpu-1g | $3.67 | 7B 全量 |

### 标注成本

| 方式 | 成本/条 | 质量 | 速度 |
|-----|---------|------|------|
| 自己标注 | $0 | 高 | 慢 |
| 团队标注 | $0.1-0.5 | 高 | 中 |
| 众包平台 | $0.05-0.2 | 中 | 快 |
| AI 辅助标注 | $0.01-0.05 | 中高 | 很快 |

## 实战案例：儿童英语学习助手

### 项目目标

创建一个专门针对 3-8 岁儿童的英语学习 AI 助手。

### 步骤 1：数据收集与标注

**数据来源**：
- 儿童英语教材对话
- 真实课堂录音转录
- 教师编写的示例对话

**标注内容**：
- 难度级别（初级/中级/高级）
- 主题分类（颜色/数字/动物等）
- 语气标注（鼓励/纠正/提问）
- 质量评分

**使用工具**：Label Studio

**数据量**：500 条高质量对话

### 步骤 2：数据预处理

```python
import json
import pandas as pd

# 读取标注数据
with open('annotated_data.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

# 转换为训练格式
training_data = []

for item in data:
    dialogue = item['data']['text']
    difficulty = item['annotations'][0]['result'][0]['value']['choices'][0]
    topic = item['annotations'][0]['result'][1]['value']['choices'][0]
    
    # 构建指令格式
    instruction = f"作为儿童英语教师，针对{difficulty}水平的学生，教授{topic}主题"
    
    training_data.append({
        "instruction": instruction,
        "input": "",
        "output": dialogue
    })

# 保存为 JSONL
with open('training_data.jsonl', 'w', encoding='utf-8') as f:
    for item in training_data:
        f.write(json.dumps(item, ensure_ascii=False) + '\n')
```

### 步骤 3：选择基础模型

选择 **Qwen 2.5 7B**，因为：
- ✅ 中英文能力都很强
- ✅ 7B 大小适中，可以本地运行
- ✅ 支持 LoRA 微调
- ✅ 社区活跃，资源丰富

### 步骤 4：LoRA 微调

```python
from unsloth import FastLanguageModel
from trl import SFTTrainer
from transformers import TrainingArguments
from datasets import load_dataset

# 加载模型
model, tokenizer = FastLanguageModel.from_pretrained(
    model_name="unsloth/qwen2.5-7b-bnb-4bit",
    max_seq_length=2048,
    dtype=None,
    load_in_4bit=True,
)

# 配置 LoRA
model = FastLanguageModel.get_peft_model(
    model,
    r=16,
    target_modules=["q_proj", "k_proj", "v_proj", "o_proj"],
    lora_alpha=16,
    lora_dropout=0,
    bias="none",
)

# 加载数据
dataset = load_dataset("json", data_files="training_data.jsonl", split="train")

# 训练
trainer = SFTTrainer(
    model=model,
    tokenizer=tokenizer,
    train_dataset=dataset,
    max_seq_length=2048,
    args=TrainingArguments(
        per_device_train_batch_size=2,
        gradient_accumulation_steps=4,
        warmup_steps=10,
        max_steps=200,
        learning_rate=2e-4,
        logging_steps=10,
        output_dir="outputs",
        save_steps=50,
    ),
)

trainer.train()

# 保存
model.save_pretrained("kids-english-tutor")
```

### 步骤 5：评估与优化

```python
# 测试模型
test_prompts = [
    "教我学习颜色",
    "这个用英语怎么说：苹果",
    "我想学习数字1到10"
]

for prompt in test_prompts:
    inputs = tokenizer(prompt, return_tensors="pt")
    outputs = model.generate(**inputs, max_length=200)
    response = tokenizer.decode(outputs[0], skip_special_tokens=True)
    
    print(f"Prompt: {prompt}")
    print(f"Response: {response}")
    print("-" * 50)
```

### 步骤 6：部署

```python
# 转换为 Ollama 格式并部署
# 1. 导出模型
model.save_pretrained_merged("kids-english-tutor-merged", tokenizer)

# 2. 转换为 GGUF
# python convert-hf-to-gguf.py kids-english-tutor-merged

# 3. 创建 Ollama 模型
# ollama create kids-english-tutor -f Modelfile

# 4. 在小程序中调用
import requests

def chat_with_tutor(message):
    response = requests.post(
        "http://localhost:11434/api/generate",
        json={
            "model": "kids-english-tutor",
            "prompt": message,
            "stream": False
        }
    )
    return response.json()["response"]
```

## 进阶技巧

### 1. 多任务学习

同时训练多个相关任务，提高模型泛化能力。

```python
# 混合不同类型的训练数据
training_data = [
    # 对话生成
    {"task": "dialogue", "input": "教我颜色", "output": "..."},
    # 翻译
    {"task": "translation", "input": "apple", "output": "苹果"},
    # 问答
    {"task": "qa", "input": "What color is the sky?", "output": "Blue"},
]
```

### 2. 课程学习（Curriculum Learning）

从简单到复杂逐步训练。

```python
# 按难度排序训练数据
sorted_data = sorted(training_data, key=lambda x: x['difficulty'])

# 分阶段训练
for stage in ['easy', 'medium', 'hard']:
    stage_data = [d for d in sorted_data if d['difficulty'] == stage]
    trainer.train(stage_data)
```

### 3. 主动学习（Active Learning）

让模型选择最有价值的数据进行标注。

```python
from sklearn.metrics import entropy

def select_uncertain_samples(model, unlabeled_data, n=100):
    """选择模型最不确定的样本"""
    uncertainties = []
    
    for sample in unlabeled_data:
        probs = model.predict_proba(sample)
        uncertainty = entropy(probs)
        uncertainties.append((sample, uncertainty))
    
    # 返回不确定性最高的 n 个样本
    uncertainties.sort(key=lambda x: x[1], reverse=True)
    return [s[0] for s in uncertainties[:n]]
```

### 4. 知识蒸馏（Knowledge Distillation）

用大模型的输出训练小模型。

```python
# 使用 GPT-4 生成训练数据
import openai

def generate_training_data(prompts):
    training_data = []
    
    for prompt in prompts:
        response = openai.ChatCompletion.create(
            model="gpt-4",
            messages=[
                {"role": "system", "content": "你是儿童英语教师"},
                {"role": "user", "content": prompt}
            ]
        )
        
        training_data.append({
            "input": prompt,
            "output": response.choices[0].message.content
        })
    
    return training_data

# 用生成的数据微调小模型
```

## 总结

数据标注和模型微调是 AI 应用开发的核心环节。通过本文，你应该掌握了：

- ✅ 主流数据标注工具的选择和使用
- ✅ 微调技术的术语体系和选择方法
- ✅ LoRA、全量微调等具体实现
- ✅ 从数据标注到模型部署的完整流程
- ✅ 成本估算和最佳实践

记住：**高质量的数据 + 合适的微调方法 = 优秀的定制化模型**

## 延伸阅读

- [LLM 简介](/llm/introduction)
- [理解模型参数量](/llm/model-parameters)
- [Ollama 实战教程](/ollama/)
- [提示工程](/llm/prompt-engineering)
- [RAG 技术](/llm/rag)

## 参考资源

- [Label Studio 官方文档](https://labelstud.io/guide/)
- [Hugging Face PEFT 库](https://github.com/huggingface/peft)
- [Unsloth 快速微调](https://github.com/unslothai/unsloth)
- [LoRA 论文](https://arxiv.org/abs/2106.09685)
- [Instruction Tuning 论文](https://arxiv.org/abs/2109.01652)
