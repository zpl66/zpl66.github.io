---
title: 常用模板
date: 2024-06-11 21:12:13
tags: [数据结构, 算法]
author: 饺子
index_img: /images/太空插画中的矢量宇航员团队.jpg
---

## 1. 基础算法

![基础算法知识框架](/images/基础算法知识框架.jpg)

### 1.1 快速排序

```cpp
void quick_sort(int q[], int l, int r)
{
    if(l >= r) return;

    int i = l - 1, j = r + 1, x = q[l + r >> 1];
    while(i < j)
    {
        do i ++; while(q[i] < x);
        do j --; while(q[j] > x);
        if (i < j) swap(q[i], q[j]);
    }
    quick_sort(q, l, j), quick_sort(q, j + 1, r);
}
```

### 1.2 归并排序

```cpp
void merge_sort(int q[], int l, int r)
{
    if (l >= r) return;

    int mid = l + r >> 1;
    merge_sort(q, l, mid);
    merge_sort(q, mid + 1, r);

    int k = 0, i = l, j = mid + 1;
    while (i <= mid && j <= r)
        if (q[i] <= q[j]) tmp[k++] = q[i++];
        else tmp[k++] = q[j++];

    while (i <= mid) tmp[k++] = q[i++];
    while (j <= r) tmp[k++] = q[j++];

    for(i = l, j = 0; i <= r; i++, j++) q[i] = tmp[j];
}
```

**小贴士** <br>

> 快速排序和归并排序时间复杂度都是$O(nlogn)$<br>
> 二者的选择：<br>
> 1. 快速排序：大规模数据<br>
> 2. 归并排序：对于稳定性要求高，比如涉及多关键字排序（成绩排序）或者涉及数据记录的题目；链表排序<br>
> 在大多数算法比赛中不需要考虑稳定性，而快速排序大部分情况下平均表现优异

### 1.3 整数二分

```cpp
bool check(int x) {/*...*/}

//当区间[l, r]被划分为[l, mid]和[mid + 1, r]时使用
int bsearch_1(int l, int r)
{
    while (l < r)
    {
        int mid = l + r >> 1;
        if (check(mid)) r = mid;
        else l = mid + 1;
    }

    return l;
}

//当区间[l, r]被划分为[l, mid - 1]和[mid, r]时使用
int bsearch_2(int l, int r)
{
    while (l < r) 
    {
        int mid = l + r + 1 >> 1;
        if (check(mid)) l = mid;
        else r = mid  - 1;
    }
    return l;
}
```

**小贴士**<br>

> 1. `bsearch_1`特点：区间划分为`[l, mid]`和`[mid + 1, r]`<br>
> 当`check(mid)`为真时，将右边界收缩到`mid`，即`r = mid`<br>
> 当`check(mid)`为假时，将左边界移到`mid + 1`即`l = mid + 1`<br>
> 这种方式确保了最终收敛时，l 和 r 会指向满足条件的最左边的位置<br>
> 使用场景：适用于需要找到满足`check`条件的第一个位置，如有序数组中寻找第一个大于等于某个值的位置<br>
> 2. `bsearch_2`特点：区间划分为`[l, mid - 1]`和`[mid, r]`<br>
> 当`check(mid)`为真时，将左边界收缩到`mid`，即`l = mid`<br>
> 当`check(mid)`为假时，将右边界移到`mid - 1`即`r = mid - 1`<br>
> 这种方式确保了最终收敛时，l 和 r 会指向满足条件的最右边的位置<br>
> 使用场景：适用于需要找到满足`check`条件的最后一个位置，如有序数组中寻找最后一个小于等于某个值的位置

### 1.4 浮点数二分算法

```cpp
bool check(double x) {/*...*/}

double bsearch_3(double l, double r)
{
    const double eps = 1e-6;
    while (r - l > eps)
    {
        double mid = (l + r) / 2;
        if (check(mid)) r = mid;
        else l = mid;
    }
    return l;
}
```

### 1.5 高精度加法

```cpp
vector<int> add(vector<int> &A, vector<int> &B)
{
    vector<int> C;
    int t = 0;
    
    for (int i = 0; i < A.size() || i < B.size(); i++)
    {
        if (i < A.size()) t += A[i];
        if (i < B.size()) t += B[i];
        C.push_back(t % 10);
        t /= 10;
    }
    
    if (t) C.push_back(1);
    return C;
}
```

> 1. 将两个数字的每一位存入数组，低位在前，高位在后。
> 2. 从最低位开始相加，若和大于等于 10，处理进位。
> 3. 将每位的和存入结果数组。
> 4. 最后输出结果数组。

### 1.6 高精度减法

```CPP
vector<int> sub(vector<int> &A, vector<int> &B)
{
    vector<int> C;
    for(int i = 0, t = 0; i < A.size(); i++)
    {
        t = A[i] - t;
        if (i < B.size()) t -= B[i];
        C.push_back((t + 10) % 10);
        if (t < 0) t = 1;
        else t = 0;
    }

    while (C.size() > 1 && C.back() == 0) C.pop_back();
    return C; 
}
```

> 1. 将两个数字的每一位存入数组，低位在前，高位在后。
> 2. 从最低位开始逐位相减，若差小于 0，处理借位。
> 3. 将每位的差存入结果数组
> 4. 去掉结果数组前导零
> 5. 最后输出结果数组

### 1.7 高精度乘低精度

```CPP
// C = A * b, A >= 0, b >= 0
vector<int> mul(vector<int> &A,int b)
{
    vector<int> C;
    int t = 0;
    for (int i = 0; i < A.size || t; i++)
    {
        if (i < A.size()) t += A[i] * b;
        C.push_back(t % 10);
        t /= 10;
    }

    while (C.size > 1 && C.back() == 0) C.pop_back();

    return C;
}
```

### 1.8 高精度除以低精度
```CPP
// A / b = C ... r, A >= 0, b > 0
vector<int> div(vector<int> &A, int b, int &r)
{
    vector<int> C;
    r = 0;
    for (int i = A.size() - 1; i >= 0; i--)
    {
        r = r * 10 + A[i];
        C.push_back(r / b);
        r %= b;
    }
    reverse(C.begin(), C.end());
    while (C.size() > 1 && C.back == 0) C.pop_back();
    return C;
}
```

### 1.9 一维前缀和

```TXT
S[i] = a[1] + a[2] + ... + a[i]
a[l] + ... + a[r] = S[r] - S[l - 1]
```

### 1.10 二维前缀和

```TXT
S[i, j] = 第i行j列格子左上部分所有元素的和
以(x1, y1)为左上角，(x2, y2)为右下角的子矩阵的和为：
S[x2, y2] - S[x1 - 1, y2] - S[x2, y1 - 1] + S[x1 - 1, y1 - 1]
```

### 1.11 一维差分

```TXT
给区间[l, r]中的每个数加上c：B[l] += c, B[r + 1] -= c
```

**小贴士**

> 差分原理：
> 1. 假设我们有一个原数组 $a$，差分数组 $b$ 定义如下：  
> $b[i] = a[i] - a[i - 1]$ （其中 $a[0]$ 为 0）
> 2. 假设原数组 $a = [2, 3, 5, 8]$，我们希望对区间 [2, 4] 的每个元素增加 3  
> 原数组 $a = [2, 3, 5, 8]$  
> $b[1] = a[1] - a[0] = 2$  
> $b[2] = a[2] - a[1] = 1$  
> $b[3] = a[3] - a[2] = 2$  
> $b[4] = a[4] - a[3] = 3$
> 3. 更新差分数组：  
> $b[2] += 3$  
> $b[5] -= 3$（假设 $b[5]$ 初始为 0）  
> 更新后 $b = [2, 4, 2, 3, -3]$
> 4. 通过前缀和恢复原数组：  
> $a[1] = b[1] + a[0] = 2$  
> $a[2] = b[2] + a[1] = 6$  
> $a[3] = b[3] + a[2] = 9$  
> $a[4] = b[4] + a[3] = 11$


### 1.12 二维差分

```TXT
给以(x1, y1)为左上角，(x2, y2)为右下角的子矩阵中的所有元素加上c：
S[x1, y1] += c, S[x2 + 1, y1] -= c, S[x1, y2 + 1] -= c, S[x2 + 1, y2 + 1] += c
```

**小贴士**

> 差分矩阵原理：  
> 1. 假设我们有一个二维矩阵$a$,差分矩阵$b$的定义如下：  
> $b[i][j] = a[i][j] - a[i - 1][j] - a[i][j - 1] + a[i - 1][j - 1]$  
> 2. 更新差分矩阵：<br>
> 假设我们要对子矩形区域$[x1][y1]$到$x[2][y2]$进行加c操作<br>
> $b[x1][y1] += c$<br>
> $b[x2 + 1][y1] -= c$<br>
> $b[x1][y2 + 1] -= c$<br>
> $b[x2 + 1][y2 + 1] += c$<br>
> 3. 通过前缀和恢复原矩阵：<br>
> $a[i][j] = b[i][j] + a[i - 1][j] + a[i][j - 1] - a[i - 1][j - 1]$<br>
> 具体例子：<br>
> 1. 假设一个二维数组 a = {<br>
> {1, 2, 3},<br>
> {4, 5, 6},<br>
> {7, 8, 9} };<br>
> 差分矩阵为 b = {<br>
> {1, 1, 1},<br>
> {3, 0, 0},<br>
> {3, 0, 0}<br>
> };<br>
> 2. 对子矩阵区域[1, 1]到[2, 2]进行更新<br>
> $b[1][1] += 10$<br>
> $b[3][1] -= 10$<br>
> $b[1][3] -= 10$<br>
> $b[3][3] += 10$<br>
> 3. 恢复原矩阵<br>
> $a[i][j] = b[i][j] + a[i - 1][j] + a[i][j - 1] -a [i - 1][j - 1]$

### 1.13 位运算

```TXT
求整数n的第k位二进制数字: n >> k & 1(从右边开始计数)
返回n的最后一位1：lowbit(n) = n & -n
```

**理解`n & -n`**<br>

> 假设$n$是整数12，其二进制表示如下：<br>
> 1. 正数二进制为`1100`<br>
> 2. $-n$的二进制表示通过取反并加1，故取反得到`0011`,加1 得到`0100`<br>
> 3. 故有$n \& -n = 0100$
> 4. 则n中最低位的1所对应的值为4

**什么是最低位的 1 所对应的值？**

> 具体来说，它是二进制表示中从右到左第一个 1 的*权重*(二进制数字每一位的权重是2的幂次，例如，最低位（最右边）的权重是$2^0 = 1$,第二位的权重是$2^1 = 2$,第三位的权重是$2^2 = 4$)。
> 示例：整数12，二进制为`1100`,最低为的1是从右到左的第三位，对应的值，即这个最低位的1的权重是$2^2 = 4$

### 1.14 双指针算法

```CPP
for (int i = 0, j = 0; i < n; i ++ )
{
    while (j < i && check(i, j)) j ++ ;

    // 具体问题的逻辑
}
/*常见问题分类：
    (1) 对于一个序列，用两个指针维护一段区间
    (2) 对于两个序列，维护某种次序，比如归并排序中合并两个有序序列的操作*/
```

### 1.15 离散化

**离散化**是将连续数据转换为离散数据的过程

1. 使用场景：
  * 连续数据的范围非常大，而离散化可以将数据映射到较小的范围
2. 基本步骤
   1. 收集数据：首先收集所有需要离散化的数值，通常存储在一个数组或列表中
   2. 排序和去重：将收集到的数据进行排序，并去除重复值，得到一个有序且唯一的数值列表
   3. 建立映射：建立原始数值到离散值的映射关系，通常使用哈希表或字典来实现
   4. 应用映射：将原始数据根据建立的映射关系转换为离散值

```CPP
vector<int> alls; // 存储所有待离散化的值
sort(alls.begin(), alls.end()); // 将所有值排序
alls.erase(unique(alls.begin(), alls.end()), alls.end());   // 去掉重复元素

// 二分求出x对应的离散化的值
int find(int x) // 找到第一个大于等于x的位置
{
    int l = 0, r = alls.size() - 1;
    while (l < r)
    {
        int mid = l + r >> 1;
        if (alls[mid] >= x) r = mid;
        else l = mid + 1;
    }
    return r + 1; // 映射到1, 2, ...n
}
```

### 1.16 区间合并

```CPP

typedef pair<int, int> PII;
// 将所有存在交集的区间合并
void merge(vector<PII> &segs)
{
    vector<PII> res;

    sort(segs.begin(), segs.end());

    int st = -2e9, ed = -2e9;
    for (auto seg : segs)
        if (ed < seg.first)
        {
            if (st != -2e9) res.push_back({st, ed});
            st = seg.first, ed = seg.second;
        }
        else ed = max(ed, seg.second);

    if (st != -2e9) res.push_back({st, ed});

    segs = res;
}
```

## 2. 数据结构

![数据结构知识框架](/images/数据结构知识框架.jpg)

### 2.1 单链表

```CPP
// head存储链表头，e[]存储节点的值，ne[]存储节点的next指针，idx表示当前用到了哪个节点
int head, e[N], ne[N], idx;

// 初始化
void init()
{
    head = -1;
    idx = 0;
}

// 在链表头插入一个数a
void insert(int a)
{
    e[idx] = a, ne[idx] = head, head = idx ++ ;
}

// 将头结点删除，需要保证头结点存在
void remove()
{
    head = ne[head];
}
```

### 2.2 双链表

```CPP
// e[]表示节点的值，l[]表示节点的左指针，r[]表示节点的右指针，idx表示当前用到了哪个节点
int e[N], l[N], r[N], idx;

// 初始化
void init()
{
    //0是左端点，1是右端点
    r[0] = 1, l[1] = 0;
    idx = 2;
}

// 在节点a的右边插入一个数x
void insert(int a, int x)
{
    e[idx] = x;
    l[idx] = a, r[idx] = r[a];
    l[r[a]] = idx, r[a] = idx ++ ;
}

// 删除节点a
void remove(int a)
{
    l[r[a]] = l[a];
    r[l[a]] = r[a];
}
```

### 2.3 栈

```CPP
// tt表示栈顶
int stk[N], tt = 0;

// 向栈顶插入一个数
stk[ ++ tt] = x;

// 从栈顶弹出一个数
tt -- ;

// 栈顶的值
stk[tt];

// 判断栈是否为空，如果 tt > 0，则表示不为空
if (tt > 0)
{

}
```

### 2.4 队列

#### 2.4.1 普通队列

```CPP
// hh 表示队头，tt表示队尾
int q[N], hh = 0, tt = -1;

// 向队尾插入一个数
q[ ++ tt] = x;

// 从队头弹出一个数
hh ++ ;

// 队头的值
q[hh];

// 判断队列是否为空，如果 hh <= tt，则表示不为空
if (hh <= tt)
{

}
```

#### 2.4.2 循环队列

```CPP
// hh 表示队头，tt表示队尾的后一个位置
int q[N], hh = 0, tt = 0;

// 向队尾插入一个数
q[tt ++ ] = x;
if (tt == N) tt = 0;

// 从队头弹出一个数
hh ++ ;
if (hh == N) hh = 0;

// 队头的值
q[hh];

// 判断队列是否为空，如果hh != tt，则表示不为空
if (hh != tt)
{

}
```

### 2.5 单调栈

```CPP
//常见模型：找出每个数左边离它最近的比它大/小的数
int tt = 0;
for (int i = 1; i <= n; i ++ )
{
    while (tt && check(stk[tt], i)) tt -- ;
    stk[ ++ tt] = i;
}
```

### 2.6 单调队列

```CPP
//常见模型：找出滑动窗口中的最大值/最小值
int hh = 0, tt = -1;
for (int i = 0; i < n; i ++ )
{
    while (hh <= tt && check_out(q[hh])) hh ++ ;  // 判断队头是否滑出窗口
    while (hh <= tt && check(q[tt], i)) tt -- ;
    q[ ++ tt] = i;
}
```

### 2.7 KMP

```CPP
// s[]是长文本，p[]是模式串，n是s的长度，m是p的长度
求模式串的Next数组：
for (int i = 2, j = 0; i <= m; i ++ )
{
    while (j && p[i] != p[j + 1]) j = ne[j];
    if (p[i] == p[j + 1]) j ++ ;
    ne[i] = j;
}

// 匹配
for (int i = 1, j = 0; i <= n; i ++ )
{
    while (j && s[i] != p[j + 1]) j = ne[j];
    if (s[i] == p[j + 1]) j ++ ;
    if (j == m)
    {
        j = ne[j];
        // 匹配成功后的逻辑
    }
}
```

### 2.8 Trie树

```CPP
int son[N][26], cnt[N], idx;
// 0号点既是根节点，又是空节点
// son[][]存储树中每个节点的子节点
// cnt[]存储以每个节点结尾的单词数量

// 插入一个字符串
void insert(char *str)
{
    int p = 0;
    for (int i = 0; str[i]; i ++ )
    {
        int u = str[i] - 'a';
        if (!son[p][u]) son[p][u] = ++ idx;
        p = son[p][u];
    }
    cnt[p] ++ ;
}

// 查询字符串出现的次数
int query(char *str)
{
    int p = 0;
    for (int i = 0; str[i]; i ++ )
    {
        int u = str[i] - 'a';
        if (!son[p][u]) return 0;
        p = son[p][u];
    }
    return cnt[p];
}
```

**小贴士**  

> 异或对(XOR pair)  
> **异或：**指的是使用异或运算（XOR operation），即 ^ 操作符。  
> **对：**指的是成对的两个数。通常，我们关注的是一对数（a, b），并研究它们在应用异或运算后的一些特性。  
> **性质：**  
> 1. a ^ a = 0  
> 2. a ^ 0 = a  
> 3. 异或运算满足交换律和结合律，即 a ^ b = b ^ a 和 (a ^ b) ^ c = a ^ (b ^ c)  

### 2.9 并查集

#### 2.9.1 朴素并查集

```CPP
int p[N]; //存储每个点的祖宗节点

// 返回x的祖宗节点
int find(int x)
{
    if (p[x] != x) p[x] = find(p[x]);
    return p[x];
}

// 初始化，假定节点编号是1~n
for (int i = 1; i <= n; i ++ ) p[i] = i;

// 合并a和b所在的两个集合：
p[find(a)] = find(b);
```

#### 2.9.2 维护size的并查集

```CPP
int p[N], size[N];
//p[]存储每个点的祖宗节点, size[]只有祖宗节点的有意义，表示祖宗节点所在集合中的点的数量

// 返回x的祖宗节点
int find(int x)
{
    if (p[x] != x) p[x] = find(p[x]);
    return p[x];
}

// 初始化，假定节点编号是1~n
for (int i = 1; i <= n; i ++ )
{
    p[i] = i;
    size[i] = 1;
}

// 合并a和b所在的两个集合：
size[find(b)] += size[find(a)];
p[find(a)] = find(b);
```

#### 2.9.3 维护到祖宗节点的并查集

```CPP
int p[N], d[N];
//p[]存储每个点的祖宗节点, d[x]存储x到p[x]的距离

// 返回x的祖宗节点
int find(int x)
{
    if (p[x] != x)
    {
        int u = find(p[x]);
        d[x] += d[p[x]];
        p[x] = u;
    }
    return p[x];
}

// 初始化，假定节点编号是1~n
for (int i = 1; i <= n; i ++ )
{
    p[i] = i;
    d[i] = 0;
}

// 合并a和b所在的两个集合：
p[find(a)] = find(b);
d[find(a)] = distance; // 根据具体问题，初始化find(a)的偏移量
```

### 2.10 堆

```CPP
// h[N]存储堆中的值, h[1]是堆顶，x的左儿子是2x, 右儿子是2x + 1
// ph[k]存储第k个插入的点在堆中的位置
// hp[k]存储堆中下标是k的点是第几个插入的
int h[N], ph[N], hp[N], size;

// 交换两个点，及其映射关系
void heap_swap(int a, int b)
{
    swap(ph[hp[a]],ph[hp[b]]);
    swap(hp[a], hp[b]);
    swap(h[a], h[b]);
}

void down(int u)
{
    int t = u;
    if (u * 2 <= size && h[u * 2] < h[t]) t = u * 2;
    if (u * 2 + 1 <= size && h[u * 2 + 1] < h[t]) t = u * 2 + 1;
    if (u != t)
    {
        heap_swap(u, t);
        down(t);
    }
}

void up(int u)
{
    while (u / 2 && h[u] < h[u / 2])
    {
        heap_swap(u, u / 2);
        u >>= 1;
    }
}

// O(n)建堆
for (int i = n / 2; i; i -- ) down(i);
```

* **堆的特性**：  

  * 堆中某个节点的值总是不大于或不小于其父节点的值；  

  * 堆总是一棵完全二叉树。  

* **大根堆**：  

  * 父节点 ≥ 子节点  
  * `priotity_queue<int> MaxHeap`  
  * 每次取出的元素是队列中的最大值  

* **小根堆**：

  * 父节点 ≤ 子节点
  * `priority_queue<int, vector<int>, greater<int>> MinHeap`
  * 每次取出的元素是队列中的最小值

### 2.11 一般哈希

#### 2.11.1 拉链法

```CPP
int h[N], e[N], ne[N], idx;

// 向哈希表中插入一个数
void insert(int x)
{
    int k = (x % N + N) % N;
    e[idx] = x;
    ne[idx] = h[k];
    h[k] = idx ++ ;
}

// 在哈希表中查询某个数是否存在
bool find(int x)
{
    int k = (x % N + N) % N;
    for (int i = h[k]; i != -1; i = ne[i])
        if (e[i] == x)
            return true;

    return false;
}
```

#### 2.11.2 开放寻址法

```CPP
int h[N];

// 如果x在哈希表中，返回x的下标；如果x不在哈希表中，返回x应该插入的位置
int find(int x)
{
    int t = (x % N + N) % N;
    while (h[t] != null && h[t] != x)
    {
        t ++ ;
        if (t == N) t = 0;
    }
    return t;
}
```

### 2.12 字符串哈希

```CPP
//核心思想：将字符串看成P进制数，P的经验值是131或13331，取这两个值的冲突概率低
//小技巧：取模的数用2^64，这样直接用unsigned long long存储，溢出的结果就是取模的结果

typedef unsigned long long ULL;
ULL h[N], p[N]; // h[k]存储字符串前k个字母的哈希值, p[k]存储 P^k mod 2^64

// 初始化
p[0] = 1;
for (int i = 1; i <= n; i ++ )
{
    h[i] = h[i - 1] * P + str[i];
    p[i] = p[i - 1] * P;
}

// 计算子串 str[l ~ r] 的哈希值
ULL get(int l, int r)
{
    return h[r] - h[l - 1] * p[r - l + 1];
}
```

## 3. 搜索与图论

![搜索与图论知识框架](/images/搜索与图论知识框架.jpg)

### 3.1 树与图的存储

* 树是一种特殊的图，与图的存储方式相同
* 对于无向图中的边ab，存储两条有向边a->b,b->a
* 因此我们可以只考虑有向图的存储

#### 3.1.1 邻接矩阵

`g[a][b]` 存储边a->b

#### 3.1.2 邻接表

```CPP
//对于每个点k，开一个单链表，存储k所有可以走到的点。h[k]存储这个单链表的头结点
int h[N], e[N], ne[N], idx;
//h[N]存储每个节点的链表的头结点索引
//e[N]存储每条边的终点
//ne[N]存储每条边在链表中的下一条边的索引
//idx是全局变量，表示当前边的索引

//添加一条边a->b
void add(int a, int b)
{
    e[idx] = b;
    ne[idx] = h[a];
    h[a] = idx++;
}

//初始化
idx = 0;
memset(h, -1, sizeof h);
```

不严谨的说(但是方便理解)：   

* 对于邻接表的实现，添加新边并不会影响已经存在的边的终点关系。每次添加一条边，只是将新边插入到链表的头部，而不会改变其他边的终点  
* 如果在邻接表中我们有a -(边1)> b -(边2)> c，那么h[a]存储的是边1的索引，e[h[a]]存储的是b，ne[h[a]]存储的是边2  

### 3.2 树与图的遍历

时间复杂度$O(n + m)$, n表示点数， m表示边数

#### 3.2.1 深度优先遍历

```CPP
int dfs(int u)
{
    st[u] = true;//st[u]表示点u已经被遍历过

    for (int i = h[u]; i != -1; i = ne[i])
    {
        int j = e[i];
        if(!st[j]) dfs(j);
    }
}
```

#### 3.2.2 宽度优先遍历

```CPP
queue<int> q;
st[1] = true;
q.push(1);

while (q.size())
{
    int t = q.front();
    q.pop();

    for (int i = h[t]; i != -1; i = ne[i])
    {
        int j = e[i];
        if (!st[j])
        {
            st[j] = true;
            q.push(j);
        }
    }
}
```

### 3.3 拓扑排序

时间复杂度$O(n + m)$, n表示点数， m表示边数

```CPP
bool topsort()
{
    int hh = 0, tt = -1;

    //d[i] 存储点i的入度
    for (int i = 1; i <= n; i++)
    {
        if (!d[i])
            q[++tt] = i;
    }

    while (hh <= tt)
    {
        int t = q[hh++];

        for (int i = h[t]; i != -1; i = ne[i])
        {
            int j = e[i];
            if(--d[j] ==0)
                q[++tt] = j;
        }
    }

    //如果所有点都入队了，说明存在拓扑排序，否则不存在拓扑排序
    return tt = n - 1;
}
```

**小贴士**  
> 1. 使用队列进行拓扑排序  
> 2. 将所有入度为0的节点入队  
> 3. 使用队列逐个处理节点，更新邻接节点的入度  
> 4. 每次从队列中取出节点并将其添加到`topo`中  
> 5. 最终检查是否所有节点都被访问过，即`topo.size() == n`

### 3.4 朴素dijkstra算法

时间复杂度$O(n<sup>2</sup> + m)$, n表示点数， m表示边数

```CPP
int g[N][N];  // 存储每条边
int dist[N];  // 存储1号点到每个点的最短距离
bool st[N];   // 存储每个点的最短路是否已经确定

// 求1号点到n号点的最短路，如果不存在则返回-1
int dijkstra()
{
    memset(dist, 0x3f, sizeof dist);
    dist[1] = 0;

    for (int i = 0; i < n - 1; i ++ )
    {
        int t = -1;     // 在还未确定最短路的点中，寻找距离最小的点
        for (int j = 1; j <= n; j ++ )
            if (!st[j] && (t == -1 || dist[t] > dist[j]))
                t = j;

        // 用t更新其他点的距离
        for (int j = 1; j <= n; j ++ )
            dist[j] = min(dist[j], dist[t] + g[t][j]);

        st[t] = true;
    }

    if (dist[n] == 0x3f3f3f3f) return -1;
    return dist[n];
}
```

### 3.5 堆优化版dijkstra

时间复杂度$O(mlogm)$, n表示点数，m表示边数

```CPP
typedef pair<int, int> PII;

int n;      // 点的数量
int h[N], w[N], e[N], ne[N], idx;       // 邻接表存储所有边
int dist[N];        // 存储所有点到1号点的距离
bool st[N];     // 存储每个点的最短距离是否已确定

// 求1号点到n号点的最短距离，如果不存在，则返回-1
int dijkstra()
{
    memset(dist, 0x3f, sizeof dist);
    dist[1] = 0;
    priority_queue<PII, vector<PII>, greater<PII>> heap;
    heap.push({0, 1});      // first存储距离，second存储节点编号

    while (heap.size())
    {
        auto t = heap.top();
        heap.pop();

        int ver = t.second, distance = t.first;

        if (st[ver]) continue;
        st[ver] = true;

        for (int i = h[ver]; i != -1; i = ne[i])
        {
            int j = e[i];
            if (dist[j] > distance + w[i])
            {
                dist[j] = distance + w[i];
                heap.push({dist[j], j});
            }
        }
    }

    if (dist[n] == 0x3f3f3f3f) return -1;
    return dist[n];
}
```

* **朴素dijkstrasuanfa算法(基于邻接矩阵)**：

  * 在经典的Dijkstra算法中，我们需要  

  1. 选择当前距离中最小的点 (时间复杂度为$O(n)$)  
  2. 使用这个点更新其他节点的距离 (时间复杂度为$O(n)$)  
  3. 对于每个节点我们都需要执行上诉两步，故时间复杂度为$O(n^2)$

* **堆优化版dijksra算法**

  * 

### 3.6 Bellman-Ford算法

时间复杂度$O(mn)$, n表示点数，m表示边数

```CPP
int n, m;       // n表示点数，m表示边数
int dist[N];        // dist[x]存储1到x的最短路距离

struct Edge     // 边，a表示出点，b表示入点，w表示边的权重
{
    int a, b, w;
}edges[M];

// 求1到n的最短路距离，如果无法从1走到n，则返回-1。
int bellman_ford()
{
    memset(dist, 0x3f, sizeof dist);
    dist[1] = 0;

    // 如果第n次迭代仍然会松弛三角不等式，就说明存在一条长度是n+1的最短路径，由抽屉原理，路径中至少存在两个相同的点，说明图中存在负权回路。
    for (int i = 0; i < n; i ++ )
    {
        for (int j = 0; j < m; j ++ )
        {
            int a = edges[j].a, b = edges[j].b, w = edges[j].w;
            if (dist[b] > dist[a] + w)
                dist[b] = dist[a] + w;
        }
    }

    if (dist[n] > 0x3f3f3f3f / 2) return -1;
    return dist[n];
}
```

### 3.7 spfa算法

时间复杂度 平均情况下$O(m)$,最坏情况下$O(nm)$, n表示点数，m表示边数

```CPP
int n;      // 总点数
int h[N], w[N], e[N], ne[N], idx;       // 邻接表存储所有边
int dist[N];        // 存储每个点到1号点的最短距离
bool st[N];     // 存储每个点是否在队列中

// 求1号点到n号点的最短路距离，如果从1号点无法走到n号点则返回-1
int spfa()
{
    memset(dist, 0x3f, sizeof dist);
    dist[1] = 0;

    queue<int> q;
    q.push(1);
    st[1] = true;

    while (q.size())
    {
        auto t = q.front();
        q.pop();

        st[t] = false;

        for (int i = h[t]; i != -1; i = ne[i])
        {
            int j = e[i];
            if (dist[j] > dist[t] + w[i])
            {
                dist[j] = dist[t] + w[i];
                if (!st[j])     // 如果队列中已存在j，则不需要将j重复插入
                {
                    q.push(j);
                    st[j] = true;
                }
            }
        }
    }

    if (dist[n] == 0x3f3f3f3f) return -1;
    return dist[n];
}
```

### 3.8 spfa判断图中是否存在负环

时间复杂度是$O(nm)$， n表示点数，m表示边数

```CPP
int n;      // 总点数
int h[N], w[N], e[N], ne[N], idx;       // 邻接表存储所有边
int dist[N], cnt[N];        // dist[x]存储1号点到x的最短距离，cnt[x]存储1到x的最短路中经过的点数
bool st[N];     // 存储每个点是否在队列中

// 如果存在负环，则返回true，否则返回false。
bool spfa()
{
    // 不需要初始化dist数组
    // 原理：如果某条最短路径上有n个点（除了自己），那么加上自己之后一共有n+1个点，由抽屉原理一定有两个点相同，所以存在环。

    queue<int> q;
    for (int i = 1; i <= n; i ++ )
    {
        q.push(i);
        st[i] = true;
    }

    while (q.size())
    {
        auto t = q.front();
        q.pop();

        st[t] = false;

        for (int i = h[t]; i != -1; i = ne[i])
        {
            int j = e[i];
            if (dist[j] > dist[t] + w[i])
            {
                dist[j] = dist[t] + w[i];
                cnt[j] = cnt[t] + 1;
                if (cnt[j] >= n) return true;       // 如果从1号点到x的最短路中包含至少n个点（不包括自己），则说明存在环
                if (!st[j])
                {
                    q.push(j);
                    st[j] = true;
                }
            }
        }
    }

    return false;
}
```

### 3.9 Floyd算法

时间复杂度是$O(n<sup>3</sup>)$, n表示点数

```CPP
//初始化
for (int i = 1; i <= n; i++)
    for (int j = 1; j <= n; j++)
        if (i == j) d[i][j] = 0;
        else d[i][j] = INF;

//算法结束后，d[a][b]表示a到b的距离

void floyd()
{
    for (int k = 1; k <= n; k++)
        for (int i = 1; i <= n; i++)
            for(int j = 1; j <= n; j++)
                d[i][j] = min(d[i][j], d[i][k] + d[k][j]);
}
```

### 3.10 朴素版prim算法

时间复杂度是$O(n<sup>2</sup>+m)$, n表示点数， m表示边数

```CPP
int n;      // n表示点数
int g[N][N];        // 邻接矩阵，存储所有边
int dist[N];        // 存储其他点到当前最小生成树的距离
bool st[N];     // 存储每个点是否已经在生成树中


// 如果图不连通，则返回INF(值是0x3f3f3f3f), 否则返回最小生成树的树边权重之和
int prim()
{
    memset(dist, 0x3f, sizeof dist);

    int res = 0;
    for (int i = 0; i < n; i ++ )
    {
        int t = -1;
        for (int j = 1; j <= n; j ++ )
            if (!st[j] && (t == -1 || dist[t] > dist[j]))
                t = j;

        if (i && dist[t] == INF) return INF;

        if (i) res += dist[t];
        st[t] = true;

        for (int j = 1; j <= n; j ++ ) dist[j] = min(dist[j], g[t][j]);
    }

    return res;
}
```

### 3.11 Kriskal算法

时间复杂度$O(mlogm)$, n表示点数， m表示边数

```CPP
int n, m;       // n是点数，m是边数
int p[N];       // 并查集的父节点数组

struct Edge     // 存储边
{
    int a, b, w;

    bool operator< (const Edge &W)const
    {
        return w < W.w;
    }
}edges[M];

int find(int x)     // 并查集核心操作
{
    if (p[x] != x) p[x] = find(p[x]);
    return p[x];
}

int kruskal()
{
    sort(edges, edges + m);

    for (int i = 1; i <= n; i ++ ) p[i] = i;    // 初始化并查集

    int res = 0, cnt = 0;
    for (int i = 0; i < m; i ++ )
    {
        int a = edges[i].a, b = edges[i].b, w = edges[i].w;

        a = find(a), b = find(b);
        if (a != b)     // 如果两个连通块不连通，则将这两个连通块合并
        {
            p[a] = b;
            res += w;
            cnt ++ ;
        }
    }

    if (cnt < n - 1) return INF;
    return res;
}
```

### 3.12 染色法判别二分图

时间复杂度是$O(n + m)$, n表示点数，m表示边数

```CPP
int n;      // n表示点数
int h[N], e[M], ne[M], idx;     // 邻接表存储图
int color[N];       // 表示每个点的颜色，-1表示未染色，0表示白色，1表示黑色

// 参数：u表示当前节点，c表示当前点的颜色
bool dfs(int u, int c)
{
    color[u] = c;
    for (int i = h[u]; i != -1; i = ne[i])
    {
        int j = e[i];
        if (color[j] == -1)
        {
            if (!dfs(j, !c)) return false;
        }
        else if (color[j] == c) return false;
    }

    return true;
}

bool check()
{
    memset(color, -1, sizeof color);
    bool flag = true;
    for (int i = 1; i <= n; i ++ )
        if (color[i] == -1)
            if (!dfs(i, 0))
            {
                flag = false;
                break;
            }
    return flag;
}
```

### 3.13 匈牙利算法

时间复杂度是$O(nm)$, n表示点数，m表示边数

```CPP
int n1, n2;     // n1表示第一个集合中的点数，n2表示第二个集合中的点数
int h[N], e[M], ne[M], idx;     // 邻接表存储所有边，匈牙利算法中只会用到从第一个集合指向第二个集合的边，所以这里只用存一个方向的边
int match[N];       // 存储第二个集合中的每个点当前匹配的第一个集合中的点是哪个
bool st[N];     // 表示第二个集合中的每个点是否已经被遍历过

bool find(int x)
{
    for (int i = h[x]; i != -1; i = ne[i])
    {
        int j = e[i];
        if (!st[j])
        {
            st[j] = true;
            if (match[j] == 0 || find(match[j]))
            {
                match[j] = x;
                return true;
            }
        }
    }

    return false;
}

// 求最大匹配数，依次枚举第一个集合中的每个点能否匹配第二个集合中的点
int res = 0;
for (int i = 1; i <= n1; i ++ )
{
    memset(st, false, sizeof st);
    if (find(i)) res ++ ;
}
```

## 4. 数学知识

![数学知识知识框架](/images/数学知识知识框架.jpg)

### 4.1 试除法判定质数

```CPP
bool is_prime(int x)
{
    if (x < 2) return false;
    for(int i = 2; i <= x / i; i++)
        if (x % i == 0)
            return false;
    return false;
}
```

### 4.2 试除法分解质因数

```CPP
void divide(int x)
{
    for (int i = 2; i <= x / i; i ++ )
        if (x % i == 0)
        {
            int s = 0;
            while (x % i == 0) x /= i, s ++ ;
            cout << i << ' ' << s << endl;
        }
    if (x > 1) cout << x << ' ' << 1 << endl;
    cout << endl;
}
```

### 4.3 朴素筛法求素数

```CPP
int primes[N], cnt;     // primes[]存储所有素数
bool st[N];         // st[x]存储x是否被筛掉

void get_primes(int n)
{
    for (int i = 2; i <= n; i ++ )
    {
        if (st[i]) continue;
        primes[cnt ++ ] = i;
        for (int j = i + i; j <= n; j += i)
            st[j] = true;
    }
}
```

### 4.4 线性筛法求素数

```CPP
int primes[N], cnt;     // primes[]存储所有素数
bool st[N];         // st[x]存储x是否被筛掉

void get_primes(int n)
{
    for (int i = 2; i <= n; i ++ )
    {
        if (!st[i]) primes[cnt ++ ] = i;
        for (int j = 0; primes[j] <= n / i; j ++ )
        {
            st[primes[j] * i] = true;
            if (i % primes[j] == 0) break;
        }
    }
}
```

### 4.5 试除法求所有约数

```CPP
vector<int> get_divisors(int x)
{
    vector<int> res;
    for (int i = 1; i <= x / i; i ++ )
        if (x % i == 0)
        {
            res.push_back(i);
            if (i != x / i) res.push_back(x / i);
        }
    sort(res.begin(), res.end());
    return res;
}
```

### 4.6 约数个数和约数之和

```TXT
如果 N = p1^c1 * p2^c2 * ... *pk^ck
约数个数： (c1 + 1) * (c2 + 1) * ... * (ck + 1)
约数之和： (p1^0 + p1^1 + ... + p1^c1) * ... * (pk^0 + pk^1 + ... + pk^ck)
```

### 4.7 欧几里得算法

```CPP
int gcd(int a, int b)
{
    return b ? gcd(b, a % b) : a;
}
```

### 4.8 求欧拉函数

```CPP
int phi(int x)
{
    int res = x;
    for (int i = 2; i <= x / i; i ++ )
        if (x % i == 0)
        {
            res = res / i * (i - 1);
            while (x % i == 0) x /= i;
        }
    if (x > 1) res = res / x * (x - 1);

    return res;
}
```

### 4.9 筛法求欧拉函数

```CPP
int primes[N], cnt;     // primes[]存储所有素数
int euler[N];           // 存储每个数的欧拉函数
bool st[N];         // st[x]存储x是否被筛掉


void get_eulers(int n)
{
    euler[1] = 1;
    for (int i = 2; i <= n; i ++ )
    {
        if (!st[i])
        {
            primes[cnt ++ ] = i;
            euler[i] = i - 1;
        }
        for (int j = 0; primes[j] <= n / i; j ++ )
        {
            int t = primes[j] * i;
            st[t] = true;
            if (i % primes[j] == 0)
            {
                euler[t] = euler[i] * primes[j];
                break;
            }
            euler[t] = euler[i] * (primes[j] - 1);
        }
    }
}
```

### 4.10 快速幂

求m<sup>k</sup> mod p,时间复杂度O(logk)

```CPP
int qmi(int m, int k, int p)
{
    int res = 1 % p, t = m;
    while (k)
    {
        if (k&1) res = res * t % p;
        t = t * t % p;
        k >>= 1;
    }
    return res;
}
```

### 4.11 扩展欧几里得算法

```CPP
// 求x, y，使得ax + by = gcd(a, b)
int exgcd(int a, int b, int &x, int &y)
{
    if (!b)
    {
        x = 1; y = 0;
        return a;
    }
    int d = exgcd(b, a % b, y, x);
    y -= (a/b) * x;
    return d;
}
```

### 4.12 高斯消元

```CPP
// a[N][N]是增广矩阵
int gauss()
{
    int c, r;
    for (c = 0, r = 0; c < n; c ++ )
    {
        int t = r;
        for (int i = r; i < n; i ++ )   // 找到绝对值最大的行
            if (fabs(a[i][c]) > fabs(a[t][c]))
                t = i;

        if (fabs(a[t][c]) < eps) continue;

        for (int i = c; i <= n; i ++ ) swap(a[t][i], a[r][i]);      // 将绝对值最大的行换到最顶端
        for (int i = n; i >= c; i -- ) a[r][i] /= a[r][c];      // 将当前行的首位变成1
        for (int i = r + 1; i < n; i ++ )       // 用当前行将下面所有的列消成0
            if (fabs(a[i][c]) > eps)
                for (int j = n; j >= c; j -- )
                    a[i][j] -= a[r][j] * a[i][c];

        r ++ ;
    }

    if (r < n)
    {
        for (int i = r; i < n; i ++ )
            if (fabs(a[i][n]) > eps)
                return 2; // 无解
        return 1; // 有无穷多组解
    }

    for (int i = n - 1; i >= 0; i -- )
        for (int j = i + 1; j < n; j ++ )
            a[i][n] -= a[i][j] * a[j][n];

    return 0; // 有唯一解
}
```

### 4.13 递推法求组合数

```CPP
// c[a][b] 表示从a个苹果中选b个的方案数
for (int i = 0; i < N; i ++ )
    for (int j = 0; j <= i; j ++ )
        if (!j) c[i][j] = 1;
        else c[i][j] = (c[i - 1][j] + c[i - 1][j - 1]) % mod;
```

### 4.14 通过预处理逆元的方式求组合数

* 首先预处理出所有阶乘取模的余数fact[N]，以及所有阶乘取模的逆元infact[N]
* 如果取模的数是质数，可以用费马小定理求逆元

```CPP
int qmi(int a, int k, int p)    // 快速幂模板
{
    int res = 1;
    while (k)
    {
        if (k & 1) res = (LL)res * a % p;
        a = (LL)a * a % p;
        k >>= 1;
    }
    return res;
}

// 预处理阶乘的余数和阶乘逆元的余数
fact[0] = infact[0] = 1;
for (int i = 1; i < N; i ++ )
{
    fact[i] = (LL)fact[i - 1] * i % mod;
    infact[i] = (LL)infact[i - 1] * qmi(i, mod - 2, mod) % mod;
}
```

### 4.15 Lucas定理

若p是质数，则对于任意整数 1 <= m <= n，有：
    C(n, m) = C(n % p, m % p) * C(n / p, m / p) (mod p)

```CPP
int qmi(int a, int k, int p)  // 快速幂模板
{
    int res = 1 % p;
    while (k)
    {
        if (k & 1) res = (LL)res * a % p;
        a = (LL)a * a % p;
        k >>= 1;
    }
    return res;
}

int C(int a, int b, int p)  // 通过定理求组合数C(a, b)
{
    if (a < b) return 0;

    LL x = 1, y = 1;  // x是分子，y是分母
    for (int i = a, j = 1; j <= b; i --, j ++ )
    {
        x = (LL)x * i % p;
        y = (LL) y * j % p;
    }

    return x * (LL)qmi(y, p - 2, p) % p;
}

int lucas(LL a, LL b, int p)
{
    if (a < p && b < p) return C(a, b, p);
    return (LL)C(a % p, b % p, p) * lucas(a / p, b / p, p) % p;
}
```

### 4.16 分解质因数求组合数

当我们需要求出组合数的真实值，而非对某个数的余数时，分解质因数的方式比较好用：
    1. 筛法求出范围内的所有质数
    2. 通过 C(a, b) = a! / b! / (a - b)! 这个公式求出每个质因子的次数。 n! 中p的次数是 n / p + n / p^2 + n / p^3 + ...
    3. 用高精度乘法将所有质因子相乘

```CPP
int primes[N], cnt;     // 存储所有质数
int sum[N];     // 存储每个质数的次数
bool st[N];     // 存储每个数是否已被筛掉


void get_primes(int n)      // 线性筛法求素数
{
    for (int i = 2; i <= n; i ++ )
    {
        if (!st[i]) primes[cnt ++ ] = i;
        for (int j = 0; primes[j] <= n / i; j ++ )
        {
            st[primes[j] * i] = true;
            if (i % primes[j] == 0) break;
        }
    }
}


int get(int n, int p)       // 求n！中的次数
{
    int res = 0;
    while (n)
    {
        res += n / p;
        n /= p;
    }
    return res;
}


vector<int> mul(vector<int> a, int b)       // 高精度乘低精度模板
{
    vector<int> c;
    int t = 0;
    for (int i = 0; i < a.size(); i ++ )
    {
        t += a[i] * b;
        c.push_back(t % 10);
        t /= 10;
    }

    while (t)
    {
        c.push_back(t % 10);
        t /= 10;
    }

    return c;
}

get_primes(a);  // 预处理范围内的所有质数

for (int i = 0; i < cnt; i ++ )     // 求每个质因数的次数
{
    int p = primes[i];
    sum[i] = get(a, p) - get(b, p) - get(a - b, p);
}

vector<int> res;
res.push_back(1);

for (int i = 0; i < cnt; i ++ )     // 用高精度乘法将所有质因子相乘
    for (int j = 0; j < sum[i]; j ++ )
        res = mul(res, primes[i]);
```

## 5. 动态规划

### 5.1 动态规划的三大步骤

* **第一步骤**：定义**数组元素的含义**。假设用一维数组dp[]，就是规定这个数组元素的含义
* **第二步骤**：找出**数组元素之间的关系式**。动态规划有点类似于我们高中学的归纳法，当我们要计算dp[n] 时，可以利用dp[n - 1]， dp[n - 2]...d[[1]]，来推出dp[n]，也就是可以利用**历史数据**来推出新的元素值

* **第三步骤**：找出**初始值**。虽然我们知道了数组元素之间的关系式，例如dp[n] = dp[n - 1] + dp[n - 2],但是，我们要知道初始值，例如这样一直推下去的话，会得到dp[3] = dp[2] + dp[1]。而dp[2]和dp[1]是不能再分解的了，所以我们必须要能够直接获得dp[2]和dp[1]的值，而这，就是所谓的初始值  

有了**初始值**，并且有了**数组元素之间的关系式**，我们就可以得到dp[n]的值了，而dp[n]的含义是由你来定义的，你想求什么，就定义什么，这样，这题的值也就解出来了

### 5.2 案例一、简单的一维DP

> 问题描述：一只青蛙一次可以跳上1级台阶，也可以跳上2级，求该青蛙跳上一个n级台阶总共有多少种跳法

* **第一步骤**：我们的问题是青蛙跳上n级台阶总共有多少种跳法，我们不妨设：跳上i级台阶总共有dp[i]种跳法
* **第二步骤**：对于这道题，由于情况可以是跳一级，也可以是跳2级，所以我们得出dp[i] = dp[i - 1] + dp[i - 2]
* **第三步骤**：显然，由第二步推出的关系式我们知道我们最多需要得到dp[0],dp[1],dp[2]的值，而dp[0] = 0, dp[1] = 1(青蛙一次跳一级台阶)， dp[2] = 2(青蛙经过2次一次跳一级台阶或经过1次一次跳两级台阶)  

所以我们得到代码  

```CPP
int f(int n) {
    dp[1] = 1, dp[2] = 2;
    for (int i = 3; i <= n; i++) dp[i] = dp[i - 1] + dp[i - 2];
    return dp[n];
}
```

### 5.3 案例二、二维数组的DP

> 问题描述：一个机器人位于一个 m * n 网格的左上角(起始点在下图中标记为"Start")。机器人每次只能向下或者向右移动一步。机器人试图达到网格的右下角(在下图中标记为"Finish")。问总共由多少条不同的路径？

![图示](/images/leetcode62.jpg)

* **第一步骤**：由于我们的目的是求从左上角到右下角一共有多少种路径，那我们就定义`dp[i][j]`的含义为：当机器人从左上角移动到(i, j)这个位置时，总共由多少种路径
* **第二步骤**：由于机器人每次只能向下或者向右移动一步，所以我们可以得到`dp[i][j]` = `dp[i - 1][j]` + `dp[i][j - 1]`
* **第三步骤**：由第二步骤得到的关系式我们知道我们需要的初始值是第0行和第0列，而很显然`dp[0][j]`和`dp[i][0]`的值都为1

> 注意，这个网格相当于一个二维数组，数组是从下标为0开始算的，所以右下角的位置是(m - 1, n - 1)

所以我们得到代码  

```CPP
int f(int m, int n) {
    for (int i = 0; i <= m - 1; i++) dp[i][0] = 1;
    for (int j = 0; j <= n - 1; j++) dp[0][j] = 1;
    
    for (int i = 1; i <= m - 1; i++) 
        for (int j = 1; j <= n - 1; j++)
            dp[i][j] = dp[i - 1][j] + dp[i][j - 1];
    
    return dp[m - 1][n - 1];
}
```

### 5.4 案例三、二维数组的DP

> 问题描述：给定一个包含非负整数的 m * n 网格，请找出一条从左上角到右下角的路径，使得路径上的数字总和最小。  
>
> 说明：每次只能向下或向右移动一步

* **第一步骤**：
  * 用数组`a[M][N]`存储每个网格的数字。
  * 由题意可设`dp[i][j]`为从(0, 0)到(i, j)路径上的数字总和最小。
* **第二步骤**：由于每次只能向下或向右移动一步，故我们可得关系式：`dp[i][j]` = min(`dp[i][j - 1]` + `dp[i - 1][j]`) + `a[i][j]`
* **第三步骤**：很显然初始值还是第0行和第0列，由此我们可得初始值`dp[i][0]` = `dp[i - 1][0]` + `a[i][0]`,`dp[0][j]` = `dp[0][j - 1]` + `a[0][j]`

所以我们得到代码  

```CPP
int f(int m, int n) {
    dp[0][0] = a[0][0];
    for (int i = 1; i < m; i++) dp[i][0] = dp[i - 1][0] + a[i][0];
    for (int j = 1; j < n; j++) dp[0][j] = dp[0][j - 1] + a[0][j];
    
    for (int i = 1; i < m; i++) 
        for (int j = 1; j < n; j++)
            dp[i][j] = min(dp[i - 1][j], dp[i][j - 1]) + a[i][j];
    
    return dp[m - 1][n - 1];
}
```

### 5.5 案例四、编辑距离

> 问题描述：给定两个单词word1和word2，计算出将word1转换成word2所使用的最少操作数  
>
> 你可以对一个单词进行如下三种操作：  
>
> 插入一个字符，删除一个字符，替换一个字符

```
示例：  
输入：word1 = "horse",word2 = "ros"  
输出：3  
解释：  
horse -> rorse(将'h'替换成'r')  
rorse -> rose(删除'r')  
rose -> ros(删除'e')
```

* **第一步骤**：
  * 我们不妨将第一个单词存入word1[N]数组中，将第二个单词存入word2[NJ]数组中
  * 当第一个单词长度为i，第二个单词长度为j时，将单词1转换成单词2所需的最少操作数是`dp[i][j]`
* **第二步骤**：
  * 当word1[i] = word2[j]时，显然有`dp[i][j]` = `dp[i - 1][j - 1]`,即不用对他进行任何操作
  * 当word1[i] ≠ word2[j]时，有三种操作分别如下：
    * 插入：如果对word1插入一个字符，则有`dp[i][j]` = `dp[i - 1][j]` + 1
    * 删除：如果对word1删除一个字符，则有`dp[i][j]` = `dp[i][j - 1]` + 1;
    * 替换：如果将word1一个字符替换成另一个字符，则有`dp[i][j]` = `dp[i - 1][j - 1]` + 1;
    * 因此得到关系式：`dp[i][j]` = min(`dp[i - 1][j]`, `dp[i][j - 1]`, `dp[i - 1][j - 1]`) + 1
* **第三步骤**：由第二步骤得到的关系式可以看出我们需要的初始值是i = 0或是j = 0的情况。显然，i, j不同时等于0时，`dp[i][0]` = `dp[ i - 1][0]` + 1， `dp[0][j]` = `dp[0][j - 1]` + 1(进行删除操作)  

所以我们得到代码   

```CPP
int f(int n1, int n2) {
    dp[0][0] = 0;
    for (int i = 1; i <= n1; i++) dp[i][0] = dp[i - 1][0] + 1;//对word1进行删除操作
    for (int j = 1; j <= n2; j++) dp[0][j] = dp[0][j - 1] + 1;//对word2进行插入操作
    
    for (int i = 1; i <= n1; i++)  
        for (int j = 1; j <= n2; j++)
        {
        	if (word1[i] == word2[j]) dp[i][j] = dp[i - 1][j - 1];    
            else dp[i][j] = min(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1]) + 1;
		}
    
    return dp[n1][n2];
}
```

## 6. 贪心

### 6.1 基本思想

贪心算法是一种在求解问题时，每一步都选择当前最优解，以期望最终得到全局最优解的算法思想。贪心算法的基本思想可以总结为“每一步都做出一个局部最优的选择，最终就能得到全局最优解”。  

贪心算法通常包含以下关键步骤：  
1. **找到可选的子问题**：首先，将原问题拆分成一系列可选的子问题或决策
2. **找到局部最优解**：对每个子问题，找到一个局部最优解。这个局部最优解应该是一个贪心选择，即在当前状态下选择最优的方式
3. **合并子问题的解**：将各个子问题的局部最优解合并起来，得到原问题的解
4. **检查解的有效性**：最后，检查得到的解是否满足问题的约束和要求。如果满足，就认为得到了问题的解


## 7. 小tips

### 7.1 命名规范

#### 7.1.1 变量

* 小驼峰命名法
* 示例：`totalCount`, `userName`

#### 7.1.2 常量

* 使用全大写字母，单词之间使用下划线分割
* 示例：`MAX_SIZE`, `PI_VALUE`

#### 7.1.3 函数和方法

* 小驼峰命名法
* 函数名应描述函数的动作或返回的结果
* 示例：`calculateTotal`, `getUserName`

#### 7.1.4 类和结构体

* 大驼峰命名法
* 示例：`UserAccount`, `DataManager`

### 7.2 时间复杂度

![时间复杂度](/images/时间复杂度.jpg)

1. **$O(1)$和$O(logn)$**: 适用于非常大的输入规模（例如，$n \leq 10^{18}$），时间复杂度几乎可以忽略不计。  
2. **$O(n)$**: 通常可以处理 $n$ 高达 $10^7$ 到 $10^8$ 的情况。  
3. **$O(n log n)$**: 通常可以处理 $n$ 高达 $10^5$ 到 $10^6$ 的情况。  
4. **$O(n^2)$**: 通常可以处理 $n$ 高达 $10^3$ 到 $10^4$ 的情况。  
5. **$O(n^3)$**: 通常可以处理 $n$ 高达 $10^2$ 到 $10^3$ 的情况。
6. **$O(2^n)$**: 通常只适用于 $n \leq 20$ 左右。
7. **$O(n!)$**: 通常只适用于 $n \leq 10$ 左右。

### 7.3 代码风格

#### 7.3.1 缩进

* 使用一致的缩进风格(常用 4 个空格或 1 个 Tab)  
* 确保所有代码块都正确缩进
  
#### 7.3.2 括号


* 代码块的左括号 `{` 通常放在行尾，右括号 `}` 单独占一行
* 示例：  
```CPP
if (condition) {
    // code block
} else {
    // code block
}
```

#### 7.3.3 空行

* 使用空行分割逻辑上相关的代码块，增强代码可读性
* 示例:  
```CPP
int main() {
    initialize();
    
    while (running) {
        processInput();
        update();
        render();
    }
    
    cleanup();
    return 0;
}
```

#### 7.3.4 空格

* 在关键字和括号之间加空格  
* 在操作符两边加空格  
* 示例：  
```CPP
for (int i = 0; i < n; ++i) {
    if (a[i] > b[i]) {
        result = a[i] + b[i];
    }
}
```

### 7.4 &的两种使用方法

`&：`一个是取地址用，另一个是引用

```CPP
int a;

int *p = &a;//这就是取地址符，指针p指向对象a，p里面存着a的地址

int b;

int &c = b;//这是引用，定义一个引用就是说c是b的一个别名。c就是代表b。注意的是声明引用要初始化
```

### 7.5 整数无穷大

```CPP
const int inf = 0x3f3f3f3f;
```

0x3f3f3f3f的十进制是1061109567，是10^9级别的，而一般场合下的数据都是小于10^9的，所以它可以作为无穷大使用而不致出现数据大于无穷大的情形。 

### 7.6 C++全局变量默认值

在C++中，全局变量的初始化有特定的规则：  

- 对于整数类型（如 `int`、`long`、`char` 等），默认值是 `0`。  
- 对于浮点类型（如 `float`、`double`），默认值是 `0.0`。  
- 对于指针类型，默认值是 `nullptr`（或 `0`）。  
- 对于布尔类型（`bool`），默认值是 `false`。  

