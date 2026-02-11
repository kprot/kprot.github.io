# 数学基础

学习 AI 需要一定的数学基础。本章介绍 AI 中最常用的数学知识，注重直观理解而非严格证明。

## 为什么需要数学？

AI 的核心是：
- 📊 **用数据表示问题**
- 🧮 **用数学模型解决问题**
- 📈 **用优化算法找到最优解**

::: tip 学习建议
不需要成为数学家！重点是理解概念和应用，而非复杂推导。
:::

## 线性代数

### 向量

向量是 AI 中最基本的数据结构，用来表示特征。

**例子**：描述一个人
```python
# 向量表示：[身高(cm), 体重(kg), 年龄]
person = [175, 70, 25]
```

**基本运算**：
```python
import numpy as np

# 向量加法
a = np.array([1, 2, 3])
b = np.array([4, 5, 6])
print(a + b)  # [5, 7, 9]

# 向量点积（相似度）
similarity = np.dot(a, b)
print(similarity)  # 32
```

### 矩阵

矩阵用来表示多个样本或变换。

**例子**：多个人的数据
```python
# 矩阵：每行是一个人
people = np.array([
    [175, 70, 25],  # 人1
    [168, 60, 30],  # 人2
    [180, 75, 28]   # 人3
])
```

**矩阵乘法**：神经网络的核心运算
```python
# 权重矩阵
W = np.array([
    [0.5, 0.3],
    [0.2, 0.8],
    [0.1, 0.4]
])

# 输入向量
x = np.array([1, 2, 3])

# 矩阵乘法：y = W^T * x
y = np.dot(W.T, x)
print(y)  # [1.2, 2.9]
```

### 为什么重要？

- 数据表示：图像、文本都转换为向量/矩阵
- 模型参数：神经网络的权重是矩阵
- 高效计算：GPU 擅长矩阵运算

## 概率论

### 概率基础

**概率**：事件发生的可能性，范围 [0, 1]

```python
# 抛硬币
import random

def coin_flip(n=1000):
    heads = sum(random.random() < 0.5 for _ in range(n))
    return heads / n

print(f"正面概率: {coin_flip()}")  # 约 0.5
```

### 条件概率

P(A|B)：在 B 发生的条件下，A 发生的概率

**例子**：垃圾邮件分类
- P(垃圾邮件|包含"中奖") = 0.9
- P(正常邮件|包含"中奖") = 0.1

### 贝叶斯定理

$$P(A|B) = \frac{P(B|A) \cdot P(A)}{P(B)}$$

**应用**：朴素贝叶斯分类器

```python
# 简化的垃圾邮件分类
def is_spam(email_text):
    # P(垃圾邮件)
    p_spam = 0.3
    
    # P(包含"中奖"|垃圾邮件)
    p_word_given_spam = 0.8
    
    # P(包含"中奖"|正常邮件)
    p_word_given_ham = 0.05
    
    if "中奖" in email_text:
        # 使用贝叶斯定理
        p_spam_given_word = (p_word_given_spam * p_spam) / \
                           (p_word_given_spam * p_spam + 
                            p_word_given_ham * (1 - p_spam))
        return p_spam_given_word > 0.5
    return False
```

### 概率分布

**正态分布（高斯分布）**：最常见的分布

```python
import matplotlib.pyplot as plt

# 生成正态分布数据
data = np.random.normal(loc=0, scale=1, size=1000)

# 绘制直方图
plt.hist(data, bins=30, density=True, alpha=0.7)
plt.title('正态分布')
plt.xlabel('值')
plt.ylabel('概率密度')
plt.show()
```

**为什么重要？**
- 数据分析：理解数据分布
- 模型假设：很多算法假设数据服从正态分布
- 不确定性：AI 模型输出概率而非确定答案

## 微积分

### 导数

导数表示函数的变化率，是优化算法的基础。

**直观理解**：
- 导数 > 0：函数递增
- 导数 < 0：函数递减
- 导数 = 0：可能是极值点

```python
# 数值计算导数
def derivative(f, x, h=1e-5):
    return (f(x + h) - f(x)) / h

# 例子：f(x) = x^2
f = lambda x: x**2
print(f"f'(2) = {derivative(f, 2)}")  # 约 4
```

### 梯度

多变量函数的导数，指向函数增长最快的方向。

**梯度下降**：AI 训练的核心算法

```python
# 简单的梯度下降
def gradient_descent(f, df, x0, learning_rate=0.1, iterations=100):
    x = x0
    for _ in range(iterations):
        # 沿着梯度的反方向更新
        x = x - learning_rate * df(x)
    return x

# 最小化 f(x) = (x - 3)^2
f = lambda x: (x - 3)**2
df = lambda x: 2 * (x - 3)

result = gradient_descent(f, df, x0=0)
print(f"最小值点: {result}")  # 约 3
```

### 链式法则

复合函数求导，反向传播算法的基础。

$$\frac{d}{dx}f(g(x)) = f'(g(x)) \cdot g'(x)$$

**应用**：神经网络训练

```python
# 简单的反向传播示例
def forward(x, w1, w2):
    """前向传播"""
    h = np.maximum(0, x * w1)  # ReLU 激活
    y = h * w2
    return y, h

def backward(x, y, target, w1, w2, h):
    """反向传播"""
    # 计算梯度
    dy = 2 * (y - target)
    dw2 = dy * h
    dh = dy * w2
    dw1 = dh * (h > 0) * x  # ReLU 导数
    return dw1, dw2

# 训练示例
x, target = 2.0, 5.0
w1, w2 = 0.5, 0.5
learning_rate = 0.01

for _ in range(100):
    y, h = forward(x, w1, w2)
    dw1, dw2 = backward(x, y, target, w1, w2, h)
    w1 -= learning_rate * dw1
    w2 -= learning_rate * dw2

print(f"训练后: w1={w1:.2f}, w2={w2:.2f}")
```

## 优化理论

### 损失函数

衡量模型预测与真实值的差距。

**常见损失函数**：

```python
# 均方误差（MSE）- 回归问题
def mse_loss(y_pred, y_true):
    return np.mean((y_pred - y_true)**2)

# 交叉熵损失 - 分类问题
def cross_entropy_loss(y_pred, y_true):
    return -np.sum(y_true * np.log(y_pred + 1e-10))

# 示例
y_true = np.array([1, 2, 3])
y_pred = np.array([1.1, 2.2, 2.8])
print(f"MSE: {mse_loss(y_pred, y_true)}")
```

### 优化算法

**梯度下降的变体**：

1. **批量梯度下降（BGD）**：使用全部数据
2. **随机梯度下降（SGD）**：每次使用一个样本
3. **小批量梯度下降（Mini-batch GD）**：折中方案

```python
# SGD 示例
def sgd_train(X, y, epochs=10, batch_size=32, lr=0.01):
    n_samples = len(X)
    w = np.random.randn(X.shape[1])
    
    for epoch in range(epochs):
        # 随机打乱数据
        indices = np.random.permutation(n_samples)
        
        for i in range(0, n_samples, batch_size):
            batch_idx = indices[i:i+batch_size]
            X_batch = X[batch_idx]
            y_batch = y[batch_idx]
            
            # 计算梯度并更新
            grad = compute_gradient(X_batch, y_batch, w)
            w -= lr * grad
    
    return w
```

**高级优化器**：
- Adam：自适应学习率
- RMSprop：适合 RNN
- AdaGrad：适合稀疏数据

## 信息论

### 熵

衡量信息的不确定性。

```python
def entropy(probabilities):
    """计算熵"""
    return -np.sum(probabilities * np.log2(probabilities + 1e-10))

# 例子：抛硬币
p_fair = np.array([0.5, 0.5])  # 公平硬币
p_biased = np.array([0.9, 0.1])  # 有偏硬币

print(f"公平硬币熵: {entropy(p_fair):.2f}")  # 1.0
print(f"有偏硬币熵: {entropy(p_biased):.2f}")  # 0.47
```

### 交叉熵

衡量两个概率分布的差异，常用作分类损失函数。

### KL 散度

衡量两个分布的相对熵，用于模型压缩和变分推断。

## 数学工具

### NumPy

```python
import numpy as np

# 创建数组
a = np.array([1, 2, 3])
b = np.zeros((3, 3))
c = np.random.randn(2, 2)

# 数学运算
print(np.mean(a))  # 平均值
print(np.std(a))   # 标准差
print(np.max(a))   # 最大值

# 线性代数
A = np.array([[1, 2], [3, 4]])
print(np.linalg.inv(A))  # 逆矩阵
print(np.linalg.det(A))  # 行列式
```

### SymPy（符号计算）

```python
from sympy import symbols, diff, integrate, simplify

# 定义符号
x = symbols('x')

# 求导
f = x**2 + 2*x + 1
df = diff(f, x)
print(f"导数: {df}")  # 2*x + 2

# 积分
integral = integrate(f, x)
print(f"积分: {integral}")
```

## 学习路径

### 必须掌握（⭐⭐⭐）

- 向量和矩阵运算
- 基本概率概念
- 导数和梯度
- 损失函数和优化

### 建议了解（⭐⭐）

- 概率分布
- 链式法则
- 信息论基础
- 线性代数进阶

### 可选深入（⭐）

- 泛函分析
- 凸优化
- 随机过程
- 数值分析

## 实践建议

::: tip 学习技巧
1. **边学边用**：通过代码理解数学概念
2. **可视化**：用图表帮助理解
3. **从应用出发**：先知道用途，再深入原理
4. **不求甚解**：理解核心思想即可，不必纠结细节
:::

## 推荐资源

### 在线课程
- 3Blue1Brown：线性代数和微积分可视化
- Khan Academy：基础数学
- MIT OpenCourseWare：高等数学

### 书籍
- 《深度学习的数学》：专为 AI 设计
- 《程序员的数学》：实用导向
- 《统计学习方法》：理论与实践结合

### 工具
- Desmos：函数可视化
- WolframAlpha：数学计算
- GeoGebra：几何和代数

## 练习题

1. **向量运算**：计算两个向量的余弦相似度
2. **概率计算**：用贝叶斯定理解决实际问题
3. **梯度下降**：实现一个简单的线性回归
4. **矩阵分解**：理解 PCA 的数学原理

## 下一步

- [机器学习简介](/machine-learning/introduction) - 应用数学知识
- [深度学习基础](/deep-learning/neural-networks) - 理解神经网络数学
- [实战项目](/projects/overview) - 在项目中巩固数学知识

::: warning 记住
数学是工具，不是目的。重点是用数学解决实际问题！
:::
