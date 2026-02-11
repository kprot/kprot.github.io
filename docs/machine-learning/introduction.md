---
title: 机器学习简介 | 从入门到实践
description: 全面讲解机器学习的基本原理、工作流程、常用算法和代码实现，包含监督学习、无监督学习和强化学习
keywords: 机器学习,Machine Learning,监督学习,无监督学习,强化学习,Python机器学习
head:
  - - meta
    - name: keywords
      content: 机器学习教程,机器学习入门,Python机器学习,sklearn,监督学习,无监督学习
  - - meta
    - property: og:title
      content: 机器学习简介 | 从入门到实践
---

# 机器学习简介

机器学习（Machine Learning，ML）是人工智能的核心分支，让计算机能够从数据中学习，而无需明确编程。

## 什么是机器学习？

### 传统编程 vs 机器学习

```
传统编程：
规则 + 数据 → 程序 → 答案

机器学习：
数据 + 答案 → 学习算法 → 规则（模型）
```

**例子**：垃圾邮件过滤

- **传统方法**：手写规则（包含"中奖"→垃圾邮件）
- **机器学习**：从大量标注邮件中学习特征

## 机器学习的类型

### 1. 监督学习（Supervised Learning）

有标注数据，学习输入到输出的映射。

**分类问题**：
```python
# 示例：判断邮件是否为垃圾邮件
from sklearn.naive_bayes import MultinomialNB
from sklearn.feature_extraction.text import CountVectorizer

# 训练数据
emails = [
    "恭喜中奖一百万",
    "明天开会讨论项目",
    "免费领取礼品",
    "周报已发送"
]
labels = [1, 0, 1, 0]  # 1=垃圾邮件, 0=正常邮件

# 特征提取
vectorizer = CountVectorizer()
X = vectorizer.fit_transform(emails)

# 训练模型
model = MultinomialNB()
model.fit(X, labels)

# 预测
test_email = ["恭喜获得免费礼品"]
X_test = vectorizer.transform(test_email)
prediction = model.predict(X_test)
print(f"预测结果: {'垃圾邮件' if prediction[0] == 1 else '正常邮件'}")
```

**回归问题**：
```python
# 示例：预测房价
from sklearn.linear_model import LinearRegression
import numpy as np

# 训练数据：[面积(平方米), 房间数]
X = np.array([
    [50, 1],
    [80, 2],
    [100, 3],
    [120, 3]
])
y = np.array([200, 350, 450, 500])  # 房价(万元)

# 训练模型
model = LinearRegression()
model.fit(X, y)

# 预测
new_house = np.array([[90, 2]])
price = model.predict(new_house)
print(f"预测房价: {price[0]:.1f}万元")
```

### 2. 无监督学习（Unsupervised Learning）

无标注数据，发现数据中的模式。

**聚类**：
```python
# 示例：客户分群
from sklearn.cluster import KMeans
import numpy as np

# 客户数据：[年龄, 消费金额]
customers = np.array([
    [25, 1000],
    [30, 1200],
    [45, 5000],
    [50, 5500],
    [28, 1100],
    [48, 5200]
])

# K-means 聚类
kmeans = KMeans(n_clusters=2, random_state=42)
clusters = kmeans.fit_predict(customers)

print("客户分群结果:")
for i, cluster in enumerate(clusters):
    print(f"客户{i+1}: 群组{cluster}")
```

**降维**：
```python
# 示例：PCA 降维
from sklearn.decomposition import PCA
import numpy as np

# 高维数据
X = np.random.randn(100, 10)  # 100个样本，10个特征

# 降到2维
pca = PCA(n_components=2)
X_reduced = pca.fit_transform(X)

print(f"原始维度: {X.shape}")
print(f"降维后: {X_reduced.shape}")
print(f"保留的方差比例: {pca.explained_variance_ratio_.sum():.2%}")
```

### 3. 强化学习（Reinforcement Learning）

通过与环境交互，学习最优策略。

**概念**：
- Agent（智能体）：学习者
- Environment（环境）：交互对象
- Action（动作）：可执行的操作
- Reward（奖励）：反馈信号
- State（状态）：当前情况

```python
# 简化的 Q-learning 示例
import numpy as np

class SimpleQLearning:
    def __init__(self, n_states, n_actions):
        self.q_table = np.zeros((n_states, n_actions))
        self.learning_rate = 0.1
        self.discount_factor = 0.9
        self.epsilon = 0.1  # 探索率
    
    def choose_action(self, state):
        if np.random.random() < self.epsilon:
            return np.random.randint(len(self.q_table[state]))
        return np.argmax(self.q_table[state])
    
    def update(self, state, action, reward, next_state):
        current_q = self.q_table[state, action]
        max_next_q = np.max(self.q_table[next_state])
        new_q = current_q + self.learning_rate * (
            reward + self.discount_factor * max_next_q - current_q
        )
        self.q_table[state, action] = new_q

# 使用示例
agent = SimpleQLearning(n_states=5, n_actions=2)
```

## 机器学习工作流程

### 1. 问题定义

- 明确目标：分类、回归、聚类？
- 评估指标：准确率、召回率、RMSE？
- 约束条件：时间、资源、精度要求

### 2. 数据收集

```python
# 数据来源示例
import pandas as pd

# 从 CSV 读取
df = pd.read_csv('data.csv')

# 从数据库读取
# import sqlite3
# conn = sqlite3.connect('database.db')
# df = pd.read_sql_query("SELECT * FROM table", conn)

# 从 API 获取
# import requests
# response = requests.get('https://api.example.com/data')
# df = pd.DataFrame(response.json())
```

### 3. 数据预处理

```python
import pandas as pd
import numpy as np
from sklearn.preprocessing import StandardScaler
from sklearn.model_selection import train_test_split

# 加载数据
df = pd.read_csv('data.csv')

# 处理缺失值
df = df.fillna(df.mean())  # 用均值填充
# df = df.dropna()  # 或删除缺失行

# 处理异常值
Q1 = df['feature'].quantile(0.25)
Q3 = df['feature'].quantile(0.75)
IQR = Q3 - Q1
df = df[(df['feature'] >= Q1 - 1.5*IQR) & (df['feature'] <= Q3 + 1.5*IQR)]

# 特征缩放
scaler = StandardScaler()
df[['feature1', 'feature2']] = scaler.fit_transform(df[['feature1', 'feature2']])

# 划分训练集和测试集
X = df.drop('target', axis=1)
y = df['target']
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42
)
```

### 4. 特征工程

```python
# 特征选择
from sklearn.feature_selection import SelectKBest, f_classif

selector = SelectKBest(f_classif, k=10)
X_selected = selector.fit_transform(X, y)

# 特征创建
df['age_group'] = pd.cut(df['age'], bins=[0, 18, 35, 60, 100])
df['price_per_sqm'] = df['price'] / df['area']

# 类别编码
df_encoded = pd.get_dummies(df, columns=['category'])
```

### 5. 模型选择与训练

```python
from sklearn.ensemble import RandomForestClassifier
from sklearn.svm import SVC
from sklearn.linear_model import LogisticRegression

# 尝试多个模型
models = {
    'Random Forest': RandomForestClassifier(),
    'SVM': SVC(),
    'Logistic Regression': LogisticRegression()
}

for name, model in models.items():
    model.fit(X_train, y_train)
    score = model.score(X_test, y_test)
    print(f"{name}: {score:.3f}")
```

### 6. 模型评估

```python
from sklearn.metrics import classification_report, confusion_matrix
import matplotlib.pyplot as plt
import seaborn as sns

# 预测
y_pred = model.predict(X_test)

# 分类报告
print(classification_report(y_test, y_pred))

# 混淆矩阵
cm = confusion_matrix(y_test, y_pred)
sns.heatmap(cm, annot=True, fmt='d')
plt.title('混淆矩阵')
plt.ylabel('真实标签')
plt.xlabel('预测标签')
plt.show()
```

### 7. 模型优化

```python
from sklearn.model_selection import GridSearchCV

# 超参数搜索
param_grid = {
    'n_estimators': [50, 100, 200],
    'max_depth': [5, 10, 15],
    'min_samples_split': [2, 5, 10]
}

grid_search = GridSearchCV(
    RandomForestClassifier(),
    param_grid,
    cv=5,
    scoring='accuracy'
)

grid_search.fit(X_train, y_train)
print(f"最佳参数: {grid_search.best_params_}")
print(f"最佳得分: {grid_search.best_score_:.3f}")
```

### 8. 模型部署

```python
import joblib

# 保存模型
joblib.dump(model, 'model.pkl')

# 加载模型
loaded_model = joblib.load('model.pkl')

# 预测新数据
new_data = [[value1, value2, value3]]
prediction = loaded_model.predict(new_data)
```

## 常见算法对比

| 算法 | 类型 | 优点 | 缺点 | 适用场景 |
|------|------|------|------|----------|
| 线性回归 | 回归 | 简单、可解释 | 只能拟合线性关系 | 简单预测 |
| 逻辑回归 | 分类 | 快速、可解释 | 线性决策边界 | 二分类 |
| 决策树 | 分类/回归 | 可解释、非线性 | 容易过拟合 | 规则提取 |
| 随机森林 | 分类/回归 | 准确、鲁棒 | 黑盒、慢 | 通用任务 |
| SVM | 分类/回归 | 高维有效 | 大数据慢 | 小样本 |
| K-means | 聚类 | 简单、快速 | 需指定K | 客户分群 |
| KNN | 分类/回归 | 简单、无训练 | 预测慢 | 小数据集 |

## 关键概念

### 过拟合与欠拟合

```python
import numpy as np
import matplotlib.pyplot as plt
from sklearn.preprocessing import PolynomialFeatures
from sklearn.linear_model import LinearRegression

# 生成数据
np.random.seed(42)
X = np.linspace(0, 10, 50).reshape(-1, 1)
y = 2 * X.ravel() + np.random.randn(50) * 2

# 不同复杂度的模型
degrees = [1, 3, 15]
plt.figure(figsize=(15, 4))

for i, degree in enumerate(degrees):
    plt.subplot(1, 3, i+1)
    
    # 训练模型
    poly = PolynomialFeatures(degree=degree)
    X_poly = poly.fit_transform(X)
    model = LinearRegression()
    model.fit(X_poly, y)
    
    # 绘图
    X_plot = np.linspace(0, 10, 100).reshape(-1, 1)
    X_plot_poly = poly.transform(X_plot)
    y_plot = model.predict(X_plot_poly)
    
    plt.scatter(X, y, alpha=0.5)
    plt.plot(X_plot, y_plot, 'r-')
    plt.title(f'Degree {degree}')
    
plt.tight_layout()
plt.show()
```

### 偏差-方差权衡

- **高偏差（欠拟合）**：模型太简单，训练误差大
- **高方差（过拟合）**：模型太复杂，测试误差大
- **目标**：找到平衡点

### 交叉验证

```python
from sklearn.model_selection import cross_val_score

# 5折交叉验证
scores = cross_val_score(model, X, y, cv=5, scoring='accuracy')
print(f"交叉验证得分: {scores}")
print(f"平均得分: {scores.mean():.3f} (+/- {scores.std():.3f})")
```

## 实用技巧

::: tip 最佳实践
1. **从简单开始**：先用简单模型建立基线
2. **数据质量优先**：好数据比好算法更重要
3. **特征工程**：往往比调参更有效
4. **交叉验证**：避免过拟合
5. **可视化**：理解数据和结果
6. **版本控制**：记录实验和模型
:::

## 常见陷阱

::: warning 注意事项
- ❌ 数据泄露：测试集信息泄露到训练集
- ❌ 类别不平衡：少数类被忽略
- ❌ 过度调参：在测试集上调参
- ❌ 忽略业务：只关注指标不关注实际价值
:::

## 工具和库

### Python 生态

```python
# 数据处理
import pandas as pd
import numpy as np

# 机器学习
from sklearn import *  # scikit-learn

# 深度学习
import tensorflow as tf
import torch

# 可视化
import matplotlib.pyplot as plt
import seaborn as sns

# 模型解释
import shap
import lime
```

### 推荐资源

- **Scikit-learn**：经典机器学习
- **XGBoost/LightGBM**：梯度提升
- **Keras/PyTorch**：深度学习
- **MLflow**：实验管理
- **Weights & Biases**：训练监控

## 下一步学习

- [监督学习](/machine-learning/supervised-learning) - 深入分类和回归
- [无监督学习](/machine-learning/unsupervised-learning) - 聚类和降维
- [强化学习](/machine-learning/reinforcement-learning) - 决策和控制
- [常用算法](/machine-learning/algorithms) - 算法详解

## 练习项目

1. **鸢尾花分类**：经典入门项目
2. **房价预测**：回归问题
3. **信用卡欺诈检测**：不平衡数据
4. **客户流失预测**：业务应用

开始你的机器学习之旅吧！
