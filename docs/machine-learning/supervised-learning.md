# 监督学习

监督学习是机器学习中最常见的范式，通过标注数据学习输入到输出的映射关系。

## 基本概念

### 定义

监督学习使用带有标签的训练数据，学习一个函数 f: X → Y，使得对于新的输入 x，能够预测正确的输出 y。

**核心要素**：
- 训练集：{(x₁, y₁), (x₂, y₂), ..., (xₙ, yₙ)}
- 特征：x ∈ X（输入空间）
- 标签：y ∈ Y（输出空间）
- 模型：f(x; θ)（参数化函数）

### 分类与回归

**分类问题**：输出是离散的类别
- 二分类：y ∈ {0, 1}
- 多分类：y ∈ {1, 2, ..., K}

**回归问题**：输出是连续的数值
- y ∈ ℝ（实数）

## 分类算法

### 逻辑回归

尽管名称中有"回归"，但逻辑回归是一种分类算法。

**模型**：
```
P(y=1|x) = σ(wᵀx + b)
σ(z) = 1 / (1 + e⁻ᶻ)
```

**实现**：
```python
import numpy as np
from sklearn.linear_model import LogisticRegression
from sklearn.datasets import make_classification
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score, classification_report

# 生成数据
X, y = make_classification(n_samples=1000, n_features=20, 
                          n_informative=15, n_redundant=5,
                          random_state=42)

# 划分数据集
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42
)

# 训练模型
model = LogisticRegression(max_iter=1000)
model.fit(X_train, y_train)

# 预测
y_pred = model.predict(X_test)

# 评估
print(f"准确率: {accuracy_score(y_test, y_pred):.3f}")
print("\n分类报告:")
print(classification_report(y_test, y_pred))
```

**从零实现**：
```python
class LogisticRegressionFromScratch:
    def __init__(self, learning_rate=0.01, n_iterations=1000):
        self.lr = learning_rate
        self.n_iterations = n_iterations
        self.weights = None
        self.bias = None
    
    def sigmoid(self, z):
        return 1 / (1 + np.exp(-z))
    
    def fit(self, X, y):
        n_samples, n_features = X.shape
        
        # 初始化参数
        self.weights = np.zeros(n_features)
        self.bias = 0
        
        # 梯度下降
        for _ in range(self.n_iterations):
            # 前向传播
            linear_model = np.dot(X, self.weights) + self.bias
            y_predicted = self.sigmoid(linear_model)
            
            # 计算梯度
            dw = (1 / n_samples) * np.dot(X.T, (y_predicted - y))
            db = (1 / n_samples) * np.sum(y_predicted - y)
            
            # 更新参数
            self.weights -= self.lr * dw
            self.bias -= self.lr * db
    
    def predict(self, X):
        linear_model = np.dot(X, self.weights) + self.bias
        y_predicted = self.sigmoid(linear_model)
        return (y_predicted > 0.5).astype(int)

# 使用
model = LogisticRegressionFromScratch()
model.fit(X_train, y_train)
predictions = model.predict(X_test)
print(f"准确率: {accuracy_score(y_test, predictions):.3f}")
```

### 支持向量机 (SVM)

SVM 寻找最优超平面，最大化不同类别之间的间隔。

**核心思想**：
- 线性可分：找到分隔超平面
- 线性不可分：使用核函数映射到高维空间

**实现**：
```python
from sklearn.svm import SVC
from sklearn.preprocessing import StandardScaler

# 数据标准化（SVM 对特征尺度敏感）
scaler = StandardScaler()
X_train_scaled = scaler.fit_transform(X_train)
X_test_scaled = scaler.transform(X_test)

# 线性核
svm_linear = SVC(kernel='linear')
svm_linear.fit(X_train_scaled, y_train)
print(f"线性核准确率: {svm_linear.score(X_test_scaled, y_test):.3f}")

# RBF 核
svm_rbf = SVC(kernel='rbf', gamma='scale')
svm_rbf.fit(X_train_scaled, y_train)
print(f"RBF 核准确率: {svm_rbf.score(X_test_scaled, y_test):.3f}")

# 多项式核
svm_poly = SVC(kernel='poly', degree=3)
svm_poly.fit(X_train_scaled, y_train)
print(f"多项式核准确率: {svm_poly.score(X_test_scaled, y_test):.3f}")
```

### 决策树

决策树通过一系列规则进行决策，易于理解和解释。

**实现**：
```python
from sklearn.tree import DecisionTreeClassifier, plot_tree
import matplotlib.pyplot as plt

# 训练决策树
dt = DecisionTreeClassifier(max_depth=5, min_samples_split=10, 
                            min_samples_leaf=5, random_state=42)
dt.fit(X_train, y_train)

# 评估
print(f"训练集准确率: {dt.score(X_train, y_train):.3f}")
print(f"测试集准确率: {dt.score(X_test, y_test):.3f}")

# 可视化决策树
plt.figure(figsize=(20, 10))
plot_tree(dt, filled=True, feature_names=[f'特征{i}' for i in range(X.shape[1])],
         class_names=['类别0', '类别1'], fontsize=10)
plt.show()

# 特征重要性
importances = dt.feature_importances_
indices = np.argsort(importances)[::-1]

print("\n特征重要性排名:")
for i in range(min(10, len(indices))):
    print(f"{i+1}. 特征 {indices[i]}: {importances[indices[i]]:.4f}")
```

### K近邻 (KNN)

KNN 是一种基于实例的学习方法，通过最近的 K 个邻居进行分类。

**实现**：
```python
from sklearn.neighbors import KNeighborsClassifier

# 尝试不同的 K 值
k_values = [1, 3, 5, 7, 9, 11]
for k in k_values:
    knn = KNeighborsClassifier(n_neighbors=k)
    knn.fit(X_train_scaled, y_train)
    train_score = knn.score(X_train_scaled, y_train)
    test_score = knn.score(X_test_scaled, y_test)
    print(f"K={k}: 训练集={train_score:.3f}, 测试集={test_score:.3f}")
```

### 朴素贝叶斯

基于贝叶斯定理和特征独立性假设的分类器。

**实现**：
```python
from sklearn.naive_bayes import GaussianNB, MultinomialNB

# 高斯朴素贝叶斯（适用于连续特征）
gnb = GaussianNB()
gnb.fit(X_train, y_train)
print(f"高斯朴素贝叶斯准确率: {gnb.score(X_test, y_test):.3f}")

# 文本分类示例
from sklearn.feature_extraction.text import CountVectorizer

texts = [
    "这是一个很好的产品",
    "质量太差了",
    "非常满意",
    "不推荐购买",
    "物超所值",
    "完全不值"
]
labels = [1, 0, 1, 0, 1, 0]  # 1=正面, 0=负面

vectorizer = CountVectorizer()
X_text = vectorizer.fit_transform(texts)

mnb = MultinomialNB()
mnb.fit(X_text, labels)

# 预测新文本
new_texts = ["这个产品很棒", "质量不好"]
X_new = vectorizer.transform(new_texts)
predictions = mnb.predict(X_new)
print(f"\n预测结果: {predictions}")
```

## 回归算法

### 线性回归

最基本的回归算法，假设输入和输出之间存在线性关系。

**模型**：
```
y = w₁x₁ + w₂x₂ + ... + wₙxₙ + b
```

**实现**：
```python
from sklearn.linear_model import LinearRegression
from sklearn.datasets import make_regression
from sklearn.metrics import mean_squared_error, r2_score

# 生成回归数据
X, y = make_regression(n_samples=1000, n_features=10, 
                       noise=10, random_state=42)

X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42
)

# 训练模型
lr = LinearRegression()
lr.fit(X_train, y_train)

# 预测
y_pred = lr.predict(X_test)

# 评估
mse = mean_squared_error(y_test, y_pred)
rmse = np.sqrt(mse)
r2 = r2_score(y_test, y_pred)

print(f"均方误差 (MSE): {mse:.2f}")
print(f"均方根误差 (RMSE): {rmse:.2f}")
print(f"R² 分数: {r2:.3f}")

# 可视化
plt.figure(figsize=(10, 6))
plt.scatter(y_test, y_pred, alpha=0.5)
plt.plot([y_test.min(), y_test.max()], 
         [y_test.min(), y_test.max()], 'r--', lw=2)
plt.xlabel('真实值')
plt.ylabel('预测值')
plt.title('线性回归预测结果')
plt.show()
```

### 岭回归 (Ridge)

添加 L2 正则化的线性回归，防止过拟合。

**损失函数**：
```
L = ||y - Xw||² + α||w||²
```

**实现**：
```python
from sklearn.linear_model import Ridge, RidgeCV

# 交叉验证选择最佳 alpha
alphas = [0.001, 0.01, 0.1, 1, 10, 100]
ridge_cv = RidgeCV(alphas=alphas, cv=5)
ridge_cv.fit(X_train, y_train)

print(f"最佳 alpha: {ridge_cv.alpha_}")
print(f"R² 分数: {ridge_cv.score(X_test, y_test):.3f}")
```

### Lasso 回归

添加 L1 正则化的线性回归，可以进行特征选择。

**实现**：
```python
from sklearn.linear_model import Lasso, LassoCV

# 交叉验证选择最佳 alpha
lasso_cv = LassoCV(alphas=alphas, cv=5, random_state=42)
lasso_cv.fit(X_train, y_train)

print(f"最佳 alpha: {lasso_cv.alpha_}")
print(f"R² 分数: {lasso_cv.score(X_test, y_test):.3f}")

# 查看非零系数（被选择的特征）
non_zero = np.sum(lasso_cv.coef_ != 0)
print(f"选择的特征数量: {non_zero}/{len(lasso_cv.coef_)}")
```

### 多项式回归

通过多项式特征扩展实现非线性回归。

**实现**：
```python
from sklearn.preprocessing import PolynomialFeatures
from sklearn.pipeline import Pipeline

# 创建管道
polynomial_regression = Pipeline([
    ('poly_features', PolynomialFeatures(degree=2)),
    ('linear_regression', LinearRegression())
])

# 训练
polynomial_regression.fit(X_train, y_train)

# 评估
print(f"R² 分数: {polynomial_regression.score(X_test, y_test):.3f}")
```

## 模型评估

### 分类指标

```python
from sklearn.metrics import (
    accuracy_score, precision_score, recall_score, 
    f1_score, confusion_matrix, roc_auc_score, roc_curve
)

# 预测概率
y_pred_proba = model.predict_proba(X_test)[:, 1]

# 计算各项指标
accuracy = accuracy_score(y_test, y_pred)
precision = precision_score(y_test, y_pred)
recall = recall_score(y_test, y_pred)
f1 = f1_score(y_test, y_pred)
auc = roc_auc_score(y_test, y_pred_proba)

print(f"准确率: {accuracy:.3f}")
print(f"精确率: {precision:.3f}")
print(f"召回率: {recall:.3f}")
print(f"F1 分数: {f1:.3f}")
print(f"AUC: {auc:.3f}")

# 混淆矩阵
cm = confusion_matrix(y_test, y_pred)
print("\n混淆矩阵:")
print(cm)

# ROC 曲线
fpr, tpr, thresholds = roc_curve(y_test, y_pred_proba)
plt.figure(figsize=(8, 6))
plt.plot(fpr, tpr, label=f'AUC = {auc:.3f}')
plt.plot([0, 1], [0, 1], 'k--')
plt.xlabel('假正例率')
plt.ylabel('真正例率')
plt.title('ROC 曲线')
plt.legend()
plt.show()
```

### 回归指标

```python
from sklearn.metrics import (
    mean_absolute_error, mean_squared_error, 
    r2_score, explained_variance_score
)

mae = mean_absolute_error(y_test, y_pred)
mse = mean_squared_error(y_test, y_pred)
rmse = np.sqrt(mse)
r2 = r2_score(y_test, y_pred)
ev = explained_variance_score(y_test, y_pred)

print(f"平均绝对误差 (MAE): {mae:.2f}")
print(f"均方误差 (MSE): {mse:.2f}")
print(f"均方根误差 (RMSE): {rmse:.2f}")
print(f"R² 分数: {r2:.3f}")
print(f"解释方差分数: {ev:.3f}")
```

## 交叉验证

```python
from sklearn.model_selection import cross_val_score, cross_validate

# K 折交叉验证
scores = cross_val_score(model, X, y, cv=5, scoring='accuracy')
print(f"交叉验证分数: {scores}")
print(f"平均分数: {scores.mean():.3f} (+/- {scores.std():.3f})")

# 多指标交叉验证
scoring = ['accuracy', 'precision', 'recall', 'f1']
scores = cross_validate(model, X, y, cv=5, scoring=scoring)

for metric in scoring:
    print(f"{metric}: {scores[f'test_{metric}'].mean():.3f}")
```

## 超参数调优

### 网格搜索

```python
from sklearn.model_selection import GridSearchCV

# 定义参数网格
param_grid = {
    'C': [0.1, 1, 10, 100],
    'kernel': ['linear', 'rbf'],
    'gamma': ['scale', 'auto', 0.001, 0.01]
}

# 网格搜索
grid_search = GridSearchCV(
    SVC(), param_grid, cv=5, 
    scoring='accuracy', n_jobs=-1, verbose=1
)

grid_search.fit(X_train_scaled, y_train)

print(f"最佳参数: {grid_search.best_params_}")
print(f"最佳分数: {grid_search.best_score_:.3f}")
print(f"测试集分数: {grid_search.score(X_test_scaled, y_test):.3f}")
```

### 随机搜索

```python
from sklearn.model_selection import RandomizedSearchCV
from scipy.stats import uniform, randint

# 定义参数分布
param_dist = {
    'C': uniform(0.1, 100),
    'kernel': ['linear', 'rbf'],
    'gamma': uniform(0.001, 0.1)
}

# 随机搜索
random_search = RandomizedSearchCV(
    SVC(), param_dist, n_iter=20, cv=5,
    scoring='accuracy', n_jobs=-1, random_state=42
)

random_search.fit(X_train_scaled, y_train)

print(f"最佳参数: {random_search.best_params_}")
print(f"最佳分数: {random_search.best_score_:.3f}")
```

## 实践建议

1. **数据预处理**：标准化、归一化对某些算法很重要
2. **特征工程**：好的特征比复杂的模型更重要
3. **模型选择**：从简单模型开始，逐步尝试复杂模型
4. **交叉验证**：避免过拟合，获得更可靠的性能估计
5. **集成方法**：结合多个模型通常能获得更好的性能

## 下一步

- [无监督学习](/machine-learning/unsupervised-learning) - 聚类和降维
- [强化学习](/machine-learning/reinforcement-learning) - 决策和控制
- [常用算法](/machine-learning/algorithms) - 算法详解
- [深度学习](/deep-learning/neural-networks) - 神经网络
