---
title: 神经网络基础 | 深度学习入门教程
description: 详细讲解神经网络的工作原理、前向传播、反向传播算法，包含完整的 Python 和 PyTorch 实现代码
keywords: 神经网络,深度学习,反向传播,前向传播,PyTorch,TensorFlow,激活函数
head:
  - - meta
    - name: keywords
      content: 神经网络教程,深度学习入门,反向传播算法,PyTorch教程,神经网络实现
  - - meta
    - property: og:title
      content: 神经网络基础 | 深度学习入门教程
---

# 神经网络基础

神经网络是深度学习的基石，受生物神经元启发而设计的计算模型。

## 从生物到人工

### 生物神经元

- **树突**：接收信号
- **细胞体**：处理信号
- **轴突**：传递信号
- **突触**：连接点

### 人工神经元

```python
import numpy as np

def neuron(inputs, weights, bias):
    """单个神经元的计算"""
    # 加权求和
    z = np.dot(inputs, weights) + bias
    # 激活函数（sigmoid）
    activation = 1 / (1 + np.exp(-z))
    return activation

# 示例
inputs = np.array([1.0, 2.0, 3.0])
weights = np.array([0.5, -0.3, 0.8])
bias = 0.1

output = neuron(inputs, weights, bias)
print(f"神经元输出: {output:.3f}")
```

## 神经网络结构

### 基本组成

```
输入层 → 隐藏层 → 输出层
  ↓        ↓        ↓
 x₁      h₁       y₁
 x₂  →   h₂   →   y₂
 x₃      h₃       
```

### 前向传播

```python
class SimpleNeuralNetwork:
    def __init__(self, input_size, hidden_size, output_size):
        # 初始化权重
        self.W1 = np.random.randn(input_size, hidden_size) * 0.01
        self.b1 = np.zeros((1, hidden_size))
        self.W2 = np.random.randn(hidden_size, output_size) * 0.01
        self.b2 = np.zeros((1, output_size))
    
    def sigmoid(self, z):
        return 1 / (1 + np.exp(-z))
    
    def forward(self, X):
        """前向传播"""
        # 隐藏层
        self.z1 = np.dot(X, self.W1) + self.b1
        self.a1 = self.sigmoid(self.z1)
        
        # 输出层
        self.z2 = np.dot(self.a1, self.W2) + self.b2
        self.a2 = self.sigmoid(self.z2)
        
        return self.a2

# 使用示例
nn = SimpleNeuralNetwork(input_size=3, hidden_size=4, output_size=2)
X = np.array([[1, 2, 3]])
output = nn.forward(X)
print(f"网络输出: {output}")
```

## 激活函数

激活函数引入非线性，使网络能够学习复杂模式。

### 常见激活函数

```python
import matplotlib.pyplot as plt

def plot_activation_functions():
    x = np.linspace(-5, 5, 100)
    
    # Sigmoid
    sigmoid = 1 / (1 + np.exp(-x))
    
    # Tanh
    tanh = np.tanh(x)
    
    # ReLU
    relu = np.maximum(0, x)
    
    # Leaky ReLU
    leaky_relu = np.where(x > 0, x, 0.01 * x)
    
    # 绘图
    plt.figure(figsize=(12, 8))
    
    plt.subplot(2, 2, 1)
    plt.plot(x, sigmoid)
    plt.title('Sigmoid')
    plt.grid(True)
    
    plt.subplot(2, 2, 2)
    plt.plot(x, tanh)
    plt.title('Tanh')
    plt.grid(True)
    
    plt.subplot(2, 2, 3)
    plt.plot(x, relu)
    plt.title('ReLU')
    plt.grid(True)
    
    plt.subplot(2, 2, 4)
    plt.plot(x, leaky_relu)
    plt.title('Leaky ReLU')
    plt.grid(True)
    
    plt.tight_layout()
    plt.show()

plot_activation_functions()
```

### 激活函数对比

| 函数 | 公式 | 优点 | 缺点 | 适用场景 |
|------|------|------|------|----------|
| Sigmoid | σ(x) = 1/(1+e⁻ˣ) | 输出0-1 | 梯度消失 | 二分类输出 |
| Tanh | tanh(x) | 输出-1到1 | 梯度消失 | RNN |
| ReLU | max(0,x) | 快速、简单 | 神经元死亡 | 隐藏层（最常用） |
| Leaky ReLU | max(0.01x,x) | 解决死亡问题 | 需调参 | 隐藏层 |
| Softmax | eˣⁱ/Σeˣʲ | 概率分布 | - | 多分类输出 |

## 损失函数

衡量预测与真实值的差距。

### 回归问题

```python
def mse_loss(y_pred, y_true):
    """均方误差"""
    return np.mean((y_pred - y_true) ** 2)

def mae_loss(y_pred, y_true):
    """平均绝对误差"""
    return np.mean(np.abs(y_pred - y_true))
```

### 分类问题

```python
def binary_cross_entropy(y_pred, y_true):
    """二分类交叉熵"""
    epsilon = 1e-10  # 避免log(0)
    return -np.mean(
        y_true * np.log(y_pred + epsilon) + 
        (1 - y_true) * np.log(1 - y_pred + epsilon)
    )

def categorical_cross_entropy(y_pred, y_true):
    """多分类交叉熵"""
    epsilon = 1e-10
    return -np.sum(y_true * np.log(y_pred + epsilon)) / len(y_true)
```

## 反向传播

通过链式法则计算梯度，更新权重。

### 数学原理

对于损失函数 L，我们需要计算：
- ∂L/∂W₂：输出层权重梯度
- ∂L/∂W₁：隐藏层权重梯度

### 实现

```python
class NeuralNetworkWithBackprop:
    def __init__(self, input_size, hidden_size, output_size):
        self.W1 = np.random.randn(input_size, hidden_size) * 0.01
        self.b1 = np.zeros((1, hidden_size))
        self.W2 = np.random.randn(hidden_size, output_size) * 0.01
        self.b2 = np.zeros((1, output_size))
    
    def sigmoid(self, z):
        return 1 / (1 + np.exp(-z))
    
    def sigmoid_derivative(self, z):
        s = self.sigmoid(z)
        return s * (1 - s)
    
    def forward(self, X):
        self.X = X
        self.z1 = np.dot(X, self.W1) + self.b1
        self.a1 = self.sigmoid(self.z1)
        self.z2 = np.dot(self.a1, self.W2) + self.b2
        self.a2 = self.sigmoid(self.z2)
        return self.a2
    
    def backward(self, y_true, learning_rate=0.01):
        m = y_true.shape[0]
        
        # 输出层梯度
        dz2 = self.a2 - y_true
        dW2 = np.dot(self.a1.T, dz2) / m
        db2 = np.sum(dz2, axis=0, keepdims=True) / m
        
        # 隐藏层梯度
        da1 = np.dot(dz2, self.W2.T)
        dz1 = da1 * self.sigmoid_derivative(self.z1)
        dW1 = np.dot(self.X.T, dz1) / m
        db1 = np.sum(dz1, axis=0, keepdims=True) / m
        
        # 更新权重
        self.W2 -= learning_rate * dW2
        self.b2 -= learning_rate * db2
        self.W1 -= learning_rate * dW1
        self.b1 -= learning_rate * db1
    
    def train(self, X, y, epochs=1000, learning_rate=0.1):
        losses = []
        for epoch in range(epochs):
            # 前向传播
            output = self.forward(X)
            
            # 计算损失
            loss = np.mean((output - y) ** 2)
            losses.append(loss)
            
            # 反向传播
            self.backward(y, learning_rate)
            
            if epoch % 100 == 0:
                print(f"Epoch {epoch}, Loss: {loss:.4f}")
        
        return losses

# 训练示例
X = np.array([[0, 0], [0, 1], [1, 0], [1, 1]])
y = np.array([[0], [1], [1], [0]])  # XOR 问题

nn = NeuralNetworkWithBackprop(input_size=2, hidden_size=4, output_size=1)
losses = nn.train(X, y, epochs=5000, learning_rate=0.5)

# 测试
predictions = nn.forward(X)
print("\n预测结果:")
for i in range(len(X)):
    print(f"输入: {X[i]}, 预测: {predictions[i][0]:.3f}, 真实: {y[i][0]}")
```

## 使用 PyTorch 实现

```python
import torch
import torch.nn as nn
import torch.optim as optim

class SimpleNN(nn.Module):
    def __init__(self, input_size, hidden_size, output_size):
        super(SimpleNN, self).__init__()
        self.fc1 = nn.Linear(input_size, hidden_size)
        self.relu = nn.ReLU()
        self.fc2 = nn.Linear(hidden_size, output_size)
        self.sigmoid = nn.Sigmoid()
    
    def forward(self, x):
        x = self.fc1(x)
        x = self.relu(x)
        x = self.fc2(x)
        x = self.sigmoid(x)
        return x

# 创建模型
model = SimpleNN(input_size=2, hidden_size=4, output_size=1)

# 定义损失函数和优化器
criterion = nn.MSELoss()
optimizer = optim.Adam(model.parameters(), lr=0.01)

# 准备数据
X = torch.FloatTensor([[0, 0], [0, 1], [1, 0], [1, 1]])
y = torch.FloatTensor([[0], [1], [1], [0]])

# 训练
for epoch in range(5000):
    # 前向传播
    outputs = model(X)
    loss = criterion(outputs, y)
    
    # 反向传播和优化
    optimizer.zero_grad()
    loss.backward()
    optimizer.step()
    
    if (epoch + 1) % 1000 == 0:
        print(f'Epoch [{epoch+1}/5000], Loss: {loss.item():.4f}')

# 测试
with torch.no_grad():
    predictions = model(X)
    print("\n预测结果:")
    for i in range(len(X)):
        print(f"输入: {X[i].numpy()}, 预测: {predictions[i].item():.3f}")
```

## 训练技巧

### 1. 权重初始化

```python
# Xavier 初始化
def xavier_init(size):
    in_dim = size[0]
    xavier_stddev = np.sqrt(2.0 / in_dim)
    return np.random.randn(*size) * xavier_stddev

# He 初始化（适合 ReLU）
def he_init(size):
    in_dim = size[0]
    he_stddev = np.sqrt(2.0 / in_dim)
    return np.random.randn(*size) * he_stddev
```

### 2. 批量归一化

```python
import torch.nn as nn

class NNWithBatchNorm(nn.Module):
    def __init__(self):
        super().__init__()
        self.fc1 = nn.Linear(10, 20)
        self.bn1 = nn.BatchNorm1d(20)
        self.fc2 = nn.Linear(20, 10)
    
    def forward(self, x):
        x = self.fc1(x)
        x = self.bn1(x)
        x = torch.relu(x)
        x = self.fc2(x)
        return x
```

### 3. Dropout

```python
class NNWithDropout(nn.Module):
    def __init__(self):
        super().__init__()
        self.fc1 = nn.Linear(10, 20)
        self.dropout = nn.Dropout(0.5)
        self.fc2 = nn.Linear(20, 10)
    
    def forward(self, x):
        x = torch.relu(self.fc1(x))
        x = self.dropout(x)
        x = self.fc2(x)
        return x
```

### 4. 学习率调度

```python
from torch.optim.lr_scheduler import StepLR, ReduceLROnPlateau

# 每 10 个 epoch 学习率减半
scheduler = StepLR(optimizer, step_size=10, gamma=0.5)

# 或根据验证损失自动调整
scheduler = ReduceLROnPlateau(optimizer, mode='min', patience=5)

# 训练循环中
for epoch in range(epochs):
    train(...)
    val_loss = validate(...)
    scheduler.step(val_loss)
```

## 常见问题

### 梯度消失

**问题**：深层网络中梯度变得极小，无法更新权重

**解决方案**：
- 使用 ReLU 激活函数
- 批量归一化
- 残差连接（ResNet）
- 更好的权重初始化

### 梯度爆炸

**问题**：梯度变得极大，导致权重更新不稳定

**解决方案**：
- 梯度裁剪
- 降低学习率
- 批量归一化

```python
# 梯度裁剪
torch.nn.utils.clip_grad_norm_(model.parameters(), max_norm=1.0)
```

### 过拟合

**解决方案**：
- Dropout
- L1/L2 正则化
- 数据增强
- Early Stopping

```python
# L2 正则化
optimizer = optim.Adam(model.parameters(), lr=0.01, weight_decay=0.01)
```

## 可视化

### 训练过程

```python
import matplotlib.pyplot as plt

def plot_training_history(losses, val_losses):
    plt.figure(figsize=(10, 5))
    plt.plot(losses, label='Training Loss')
    plt.plot(val_losses, label='Validation Loss')
    plt.xlabel('Epoch')
    plt.ylabel('Loss')
    plt.legend()
    plt.title('Training History')
    plt.show()
```

### 决策边界

```python
def plot_decision_boundary(model, X, y):
    # 创建网格
    x_min, x_max = X[:, 0].min() - 1, X[:, 0].max() + 1
    y_min, y_max = X[:, 1].min() - 1, X[:, 1].max() + 1
    xx, yy = np.meshgrid(np.arange(x_min, x_max, 0.01),
                         np.arange(y_min, y_max, 0.01))
    
    # 预测
    Z = model.predict(np.c_[xx.ravel(), yy.ravel()])
    Z = Z.reshape(xx.shape)
    
    # 绘图
    plt.contourf(xx, yy, Z, alpha=0.4)
    plt.scatter(X[:, 0], X[:, 1], c=y, alpha=0.8)
    plt.show()
```

## 实践项目

1. **手写数字识别（MNIST）**
2. **二分类问题（乳腺癌诊断）**
3. **多分类问题（鸢尾花分类）**
4. **回归问题（房价预测）**

## 下一步

- [卷积神经网络 (CNN)](/deep-learning/cnn) - 图像处理
- [循环神经网络 (RNN)](/deep-learning/rnn) - 序列数据
- [Transformer](/deep-learning/transformer) - 注意力机制
- [训练技巧](/deep-learning/training-tips) - 优化训练

::: tip 关键要点
- 神经网络通过前向传播计算输出
- 反向传播计算梯度并更新权重
- 激活函数引入非线性
- 合适的初始化和正则化很重要
:::
