# 无监督学习

无监督学习从无标注数据中发现隐藏的模式和结构，是机器学习的重要分支。

## 基本概念

### 定义

无监督学习处理没有标签的数据集 {x₁, x₂, ..., xₙ}，目标是发现数据的内在结构。

**主要任务**：
- 聚类：将相似的数据点分组
- 降维：减少特征维度，保留重要信息
- 异常检测：识别不符合正常模式的数据
- 关联规则：发现变量之间的关系

## 聚类算法

### K-Means 聚类

K-Means 是最常用的聚类算法，将数据分为 K 个簇。

**算法步骤**：
1. 随机初始化 K 个聚类中心
2. 将每个点分配到最近的中心
3. 更新聚类中心为簇内点的均值
4. 重复步骤 2-3 直到收敛

**实现**：
```python
import numpy as np
import matplotlib.pyplot as plt
from sklearn.cluster import KMeans
from sklearn.datasets import make_blobs

# 生成数据
X, y_true = make_blobs(n_samples=300, centers=4, 
                       cluster_std=0.60, random_state=0)

# K-Means 聚类
kmeans = KMeans(n_clusters=4, random_state=0)
y_kmeans = kmeans.fit_predict(X)

# 可视化
plt.figure(figsize=(12, 4))

plt.subplot(1, 2, 1)
plt.scatter(X[:, 0], X[:, 1], c=y_true, cmap='viridis')
plt.title('真实标签')

plt.subplot(1, 2, 2)
plt.scatter(X[:, 0], X[:, 1], c=y_kmeans, cmap='viridis')
plt.scatter(kmeans.cluster_centers_[:, 0], 
           kmeans.cluster_centers_[:, 1],
           s=300, c='red', marker='X', edgecolors='black', linewidths=2)
plt.title('K-Means 聚类结果')
plt.show()

print(f"惯性（Inertia）: {kmeans.inertia_:.2f}")
```

**从零实现**：
```python
class KMeansFromScratch:
    def __init__(self, n_clusters=3, max_iters=100):
        self.n_clusters = n_clusters
        self.max_iters = max_iters
        self.centroids = None
    
    def fit(self, X):
        # 随机初始化聚类中心
        random_indices = np.random.choice(len(X), self.n_clusters, replace=False)
        self.centroids = X[random_indices]
        
        for _ in range(self.max_iters):
            # 分配点到最近的聚类中心
            labels = self._assign_clusters(X)
            
            # 更新聚类中心
            new_centroids = np.array([
                X[labels == k].mean(axis=0) 
                for k in range(self.n_clusters)
            ])
            
            # 检查收敛
            if np.allclose(self.centroids, new_centroids):
                break
            
            self.centroids = new_centroids
        
        return labels
    
    def _assign_clusters(self, X):
        distances = np.sqrt(((X - self.centroids[:, np.newaxis])**2).sum(axis=2))
        return np.argmin(distances, axis=0)
    
    def predict(self, X):
        return self._assign_clusters(X)

# 使用
kmeans_custom = KMeansFromScratch(n_clusters=4)
labels = kmeans_custom.fit(X)
```

**选择最佳 K 值**：
```python
from sklearn.metrics import silhouette_score

# 肘部法则
inertias = []
silhouette_scores = []
K_range = range(2, 11)

for k in K_range:
    kmeans = KMeans(n_clusters=k, random_state=0)
    kmeans.fit(X)
    inertias.append(kmeans.inertia_)
    silhouette_scores.append(silhouette_score(X, kmeans.labels_))

# 可视化
fig, (ax1, ax2) = plt.subplots(1, 2, figsize=(14, 5))

ax1.plot(K_range, inertias, 'bo-')
ax1.set_xlabel('K')
ax1.set_ylabel('惯性')
ax1.set_title('肘部法则')

ax2.plot(K_range, silhouette_scores, 'ro-')
ax2.set_xlabel('K')
ax2.set_ylabel('轮廓系数')
ax2.set_title('轮廓系数法')

plt.show()
```

### 层次聚类

层次聚类构建聚类的层次结构，不需要预先指定簇的数量。

**实现**：
```python
from sklearn.cluster import AgglomerativeClustering
from scipy.cluster.hierarchy import dendrogram, linkage

# 层次聚类
hierarchical = AgglomerativeClustering(n_clusters=4, linkage='ward')
y_hierarchical = hierarchical.fit_predict(X)

# 绘制树状图
plt.figure(figsize=(12, 6))
linkage_matrix = linkage(X, method='ward')
dendrogram(linkage_matrix)
plt.title('层次聚类树状图')
plt.xlabel('样本索引')
plt.ylabel('距离')
plt.show()

# 可视化聚类结果
plt.figure(figsize=(8, 6))
plt.scatter(X[:, 0], X[:, 1], c=y_hierarchical, cmap='viridis')
plt.title('层次聚类结果')
plt.show()
```

### DBSCAN

基于密度的聚类算法，可以发现任意形状的簇，并识别噪声点。

**参数**：
- eps：邻域半径
- min_samples：核心点的最小邻居数

**实现**：
```python
from sklearn.cluster import DBSCAN

# 生成包含噪声的数据
X, _ = make_blobs(n_samples=300, centers=4, cluster_std=0.60, random_state=0)
# 添加噪声点
noise = np.random.uniform(X.min(), X.max(), size=(50, 2))
X_with_noise = np.vstack([X, noise])

# DBSCAN 聚类
dbscan = DBSCAN(eps=0.5, min_samples=5)
y_dbscan = dbscan.fit_predict(X_with_noise)

# 可视化
plt.figure(figsize=(8, 6))
plt.scatter(X_with_noise[:, 0], X_with_noise[:, 1], 
           c=y_dbscan, cmap='viridis', marker='o')
plt.title(f'DBSCAN 聚类结果 (簇数: {len(set(y_dbscan)) - 1})')
plt.show()

print(f"识别的簇数: {len(set(y_dbscan)) - (1 if -1 in y_dbscan else 0)}")
print(f"噪声点数: {list(y_dbscan).count(-1)}")
```

### 高斯混合模型 (GMM)

GMM 假设数据由多个高斯分布混合而成，是一种软聚类方法。

**实现**：
```python
from sklearn.mixture import GaussianMixture

# GMM 聚类
gmm = GaussianMixture(n_components=4, random_state=0)
y_gmm = gmm.fit_predict(X)

# 获取概率
probs = gmm.predict_proba(X)

# 可视化
plt.figure(figsize=(12, 4))

plt.subplot(1, 2, 1)
plt.scatter(X[:, 0], X[:, 1], c=y_gmm, cmap='viridis')
plt.title('GMM 聚类结果')

plt.subplot(1, 2, 2)
plt.scatter(X[:, 0], X[:, 1], c=probs.max(axis=1), cmap='viridis')
plt.colorbar(label='最大概率')
plt.title('聚类概率')

plt.show()

print(f"BIC: {gmm.bic(X):.2f}")
print(f"AIC: {gmm.aic(X):.2f}")
```

## 降维算法

### 主成分分析 (PCA)

PCA 通过线性变换将数据投影到低维空间，保留最大方差。

**实现**：
```python
from sklearn.decomposition import PCA
from sklearn.datasets import load_digits

# 加载手写数字数据集
digits = load_digits()
X = digits.data
y = digits.target

print(f"原始维度: {X.shape}")

# PCA 降维
pca = PCA(n_components=2)
X_pca = pca.fit_transform(X)

print(f"降维后维度: {X_pca.shape}")
print(f"解释方差比: {pca.explained_variance_ratio_}")
print(f"累计解释方差: {pca.explained_variance_ratio_.sum():.3f}")

# 可视化
plt.figure(figsize=(10, 8))
scatter = plt.scatter(X_pca[:, 0], X_pca[:, 1], c=y, 
                     cmap='tab10', alpha=0.6)
plt.colorbar(scatter)
plt.xlabel('第一主成分')
plt.ylabel('第二主成分')
plt.title('PCA 降维可视化')
plt.show()
```

**选择主成分数量**：
```python
# 计算不同主成分数量的解释方差
pca_full = PCA()
pca_full.fit(X)

# 绘制解释方差
plt.figure(figsize=(12, 4))

plt.subplot(1, 2, 1)
plt.plot(range(1, len(pca_full.explained_variance_ratio_) + 1),
         pca_full.explained_variance_ratio_, 'bo-')
plt.xlabel('主成分')
plt.ylabel('解释方差比')
plt.title('各主成分的解释方差')

plt.subplot(1, 2, 2)
plt.plot(range(1, len(pca_full.explained_variance_ratio_) + 1),
         np.cumsum(pca_full.explained_variance_ratio_), 'ro-')
plt.axhline(y=0.95, color='k', linestyle='--', label='95% 方差')
plt.xlabel('主成分数量')
plt.ylabel('累计解释方差比')
plt.title('累计解释方差')
plt.legend()

plt.tight_layout()
plt.show()

# 找到解释 95% 方差所需的主成分数量
n_components_95 = np.argmax(np.cumsum(pca_full.explained_variance_ratio_) >= 0.95) + 1
print(f"解释 95% 方差需要 {n_components_95} 个主成分")
```

### t-SNE

t-SNE 是一种非线性降维方法，特别适合数据可视化。

**实现**：
```python
from sklearn.manifold import TSNE

# t-SNE 降维
tsne = TSNE(n_components=2, random_state=0, perplexity=30)
X_tsne = tsne.fit_transform(X)

# 可视化
plt.figure(figsize=(10, 8))
scatter = plt.scatter(X_tsne[:, 0], X_tsne[:, 1], c=y, 
                     cmap='tab10', alpha=0.6)
plt.colorbar(scatter)
plt.title('t-SNE 降维可视化')
plt.show()
```

### UMAP

UMAP 是一种更快的非线性降维方法，保留全局和局部结构。

**实现**：
```python
# 需要安装: pip install umap-learn
try:
    import umap
    
    # UMAP 降维
    reducer = umap.UMAP(n_components=2, random_state=0)
    X_umap = reducer.fit_transform(X)
    
    # 可视化
    plt.figure(figsize=(10, 8))
    scatter = plt.scatter(X_umap[:, 0], X_umap[:, 1], c=y, 
                         cmap='tab10', alpha=0.6)
    plt.colorbar(scatter)
    plt.title('UMAP 降维可视化')
    plt.show()
except ImportError:
    print("请安装 umap-learn: pip install umap-learn")
```

### 自编码器

使用神经网络进行非线性降维。

**实现**：
```python
import torch
import torch.nn as nn
import torch.optim as optim

class Autoencoder(nn.Module):
    def __init__(self, input_dim, encoding_dim):
        super(Autoencoder, self).__init__()
        
        # 编码器
        self.encoder = nn.Sequential(
            nn.Linear(input_dim, 128),
            nn.ReLU(),
            nn.Linear(128, 64),
            nn.ReLU(),
            nn.Linear(64, encoding_dim)
        )
        
        # 解码器
        self.decoder = nn.Sequential(
            nn.Linear(encoding_dim, 64),
            nn.ReLU(),
            nn.Linear(64, 128),
            nn.ReLU(),
            nn.Linear(128, input_dim)
        )
    
    def forward(self, x):
        encoded = self.encoder(x)
        decoded = self.decoder(encoded)
        return decoded
    
    def encode(self, x):
        return self.encoder(x)

# 训练自编码器
input_dim = X.shape[1]
encoding_dim = 2

model = Autoencoder(input_dim, encoding_dim)
criterion = nn.MSELoss()
optimizer = optim.Adam(model.parameters(), lr=0.001)

# 转换数据
X_tensor = torch.FloatTensor(X)

# 训练
epochs = 100
for epoch in range(epochs):
    optimizer.zero_grad()
    outputs = model(X_tensor)
    loss = criterion(outputs, X_tensor)
    loss.backward()
    optimizer.step()
    
    if (epoch + 1) % 20 == 0:
        print(f'Epoch [{epoch+1}/{epochs}], Loss: {loss.item():.4f}')

# 降维
with torch.no_grad():
    X_encoded = model.encode(X_tensor).numpy()

# 可视化
plt.figure(figsize=(10, 8))
scatter = plt.scatter(X_encoded[:, 0], X_encoded[:, 1], c=y, 
                     cmap='tab10', alpha=0.6)
plt.colorbar(scatter)
plt.title('自编码器降维可视化')
plt.show()
```

## 异常检测

### Isolation Forest

基于随机森林的异常检测算法。

**实现**：
```python
from sklearn.ensemble import IsolationForest

# 生成数据（包含异常点）
X_normal = np.random.randn(300, 2)
X_outliers = np.random.uniform(low=-4, high=4, size=(20, 2))
X_anomaly = np.vstack([X_normal, X_outliers])

# Isolation Forest
iso_forest = IsolationForest(contamination=0.1, random_state=0)
y_pred = iso_forest.fit_predict(X_anomaly)

# 可视化
plt.figure(figsize=(10, 6))
plt.scatter(X_anomaly[y_pred == 1, 0], X_anomaly[y_pred == 1, 1],
           c='blue', label='正常点', alpha=0.6)
plt.scatter(X_anomaly[y_pred == -1, 0], X_anomaly[y_pred == -1, 1],
           c='red', label='异常点', alpha=0.6)
plt.legend()
plt.title('Isolation Forest 异常检测')
plt.show()
```

### Local Outlier Factor (LOF)

基于局部密度的异常检测。

**实现**：
```python
from sklearn.neighbors import LocalOutlierFactor

# LOF 异常检测
lof = LocalOutlierFactor(n_neighbors=20, contamination=0.1)
y_pred_lof = lof.fit_predict(X_anomaly)

# 可视化
plt.figure(figsize=(10, 6))
plt.scatter(X_anomaly[y_pred_lof == 1, 0], X_anomaly[y_pred_lof == 1, 1],
           c='blue', label='正常点', alpha=0.6)
plt.scatter(X_anomaly[y_pred_lof == -1, 0], X_anomaly[y_pred_lof == -1, 1],
           c='red', label='异常点', alpha=0.6)
plt.legend()
plt.title('LOF 异常检测')
plt.show()
```

## 聚类评估

### 内部指标

不需要真实标签的评估指标。

```python
from sklearn.metrics import silhouette_score, calinski_harabasz_score, davies_bouldin_score

# 轮廓系数（越大越好，范围 [-1, 1]）
silhouette = silhouette_score(X, y_kmeans)

# Calinski-Harabasz 指数（越大越好）
calinski = calinski_harabasz_score(X, y_kmeans)

# Davies-Bouldin 指数（越小越好）
davies = davies_bouldin_score(X, y_kmeans)

print(f"轮廓系数: {silhouette:.3f}")
print(f"Calinski-Harabasz 指数: {calinski:.2f}")
print(f"Davies-Bouldin 指数: {davies:.3f}")
```

### 外部指标

需要真实标签的评估指标。

```python
from sklearn.metrics import adjusted_rand_score, normalized_mutual_info_score, fowlkes_mallows_score

# 调整兰德指数
ari = adjusted_rand_score(y_true, y_kmeans)

# 归一化互信息
nmi = normalized_mutual_info_score(y_true, y_kmeans)

# Fowlkes-Mallows 指数
fmi = fowlkes_mallows_score(y_true, y_kmeans)

print(f"调整兰德指数: {ari:.3f}")
print(f"归一化互信息: {nmi:.3f}")
print(f"Fowlkes-Mallows 指数: {fmi:.3f}")
```

## 实际应用案例

### 客户分群

```python
# 模拟客户数据
np.random.seed(42)
n_customers = 1000

customer_data = pd.DataFrame({
    '年龄': np.random.randint(18, 70, n_customers),
    '年收入': np.random.randint(20000, 150000, n_customers),
    '消费金额': np.random.randint(100, 10000, n_customers),
    '访问频率': np.random.randint(1, 50, n_customers)
})

# 标准化
from sklearn.preprocessing import StandardScaler
scaler = StandardScaler()
X_scaled = scaler.fit_transform(customer_data)

# K-Means 聚类
kmeans = KMeans(n_clusters=4, random_state=42)
customer_data['客户群'] = kmeans.fit_predict(X_scaled)

# 分析各客户群特征
print(customer_data.groupby('客户群').mean())

# 可视化（使用 PCA 降维）
pca = PCA(n_components=2)
X_pca = pca.fit_transform(X_scaled)

plt.figure(figsize=(10, 6))
scatter = plt.scatter(X_pca[:, 0], X_pca[:, 1], 
                     c=customer_data['客户群'], cmap='viridis')
plt.colorbar(scatter, label='客户群')
plt.title('客户分群可视化')
plt.xlabel('第一主成分')
plt.ylabel('第二主成分')
plt.show()
```

## 实践建议

1. **数据预处理**：标准化对聚类算法很重要
2. **选择算法**：根据数据特点选择合适的算法
3. **参数调优**：使用评估指标选择最佳参数
4. **结果解释**：分析聚类结果的业务含义
5. **可视化**：使用降维技术可视化高维数据

## 下一步

- [监督学习](/machine-learning/supervised-learning) - 分类和回归
- [强化学习](/machine-learning/reinforcement-learning) - 决策和控制
- [深度学习](/deep-learning/neural-networks) - 神经网络
