---
title: 图(C++干货版)
date: 2024-05-28 18:32:55
tags: [数据结构, 图]
author: 饺子
categories: [C++学习]
index_img: /images/空间探索的矢量插图。宇宙飞船在繁星点点的宇宙中独自航行。.jpg
---

本章除了1:图的定义之外，其他内容很少讲概念，主要通过例题来感悟。因为我~~懒~~认为通过例题是一种更直观，也更实用的方法。

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
    <script src="https://cdn.jsdelivr.net/npm/mermaid@10.6.1/dist/mermaid.min.js"></script>
    <script>
    	window.onload=mermaid.initialize({"theme": "forest"});
    </script>
</head>

## 1 图的定义

图(graph)是由顶点的有穷非空集合V(G)和顶点之间边的集合E(G)组成，通常表示为:G=(V, E),其中G表示图，V是图G中顶点的个数，E是图G中边的集合

## 2 图的基本概念和术语

### 2.1 有向图

若E是有向边的有限集合时，则图G为有向图。弧是顶点的有序对，记为<v,w>。其中v，w是顶点，v为弧头，w是弧尾，<v,w>称为从v到w的弧，也称v邻接到w，或w邻接自v。

<div class="mermaid">
        graph LR;
            1-->2;
            2-->1;
            2-->3;
</div>

图中有向图可表示为
    G<sub>1</sub>=(V<sub>1</sub>,E<sub>1</sub>);
    V<sub>1</sub>={1,2,3}
    E<sub>1</sub>={<1,2>,<2,1>,<2,3>}

### 2.2 无向图

若E是无向边(简称边)的有限集合时，则图G为无向图。边是顶点的无序对，记为(v,w)或(w,v)。其中v,w是顶点。可以说顶点v和顶点w互为邻接点。边(v,w)依附于顶点w和v，或者说边(v,w)和顶点v,w相关联

<div class="mermaid">
        graph LR;
            1 --- 2;
            1 --- 3;
            2 --- 3;
</div>

图中所示无向图可表示为
    G<sub>2</sub>=(V<sub>2</sub>,E<sub>2</sub>);
    V<sub>2</sub>={1, 2, 3};
    E<sub>2</sub>={(1,2),(1,3),(2,3)};

### 2.3 简单图

一个图G若满足：
    1. 不存在重复边
    2. 不存在顶点到自身的边
则其被称为简单图。

*数据结构仅讨论简单图*

### 2.4 多重图

若图G中某两个结点之间的边数多于一条，又运行顶点通过一条边与自己关联，则G为多重图。多重图的定义和简单图是相对的。

### 2.5 完全图(也称简单完全图)

完全图是一个简单图，其中每对不同的顶点都恰好由一条边相连。这意味着在完全图中，任意两个不同的顶点之间都有直接的相连，没有任何的顶点是孤立的。

完全图的性质：
    * 顶点的数量：用(V)表示
    * 边的数量：V*(V-1)/2
    * 度数：完全图中每个结点的度数都是(V-1)

## 3 图的存储结构

### 3.1 邻接矩阵

相关概念不赘述，因为~~懒~~觉得没必要，直接上例子：

假设我们有三个顶点A、B、C，顶点之间的关系：

<div class="mermaid">
    graph LR;
        A --> B;
        B --> C;
        C --> A;
</div>

为了用邻接矩阵表示这个图，首先定义一个二维数组，其中行和列的索引分别代表起点和终点。如果结点i有一条边指向j，则martix[i][j]被设置为1(无向图)或边的权重(如果是有权图)。如果没有直接连接，则设置为0。

```CPP
#include<iostream>
using namespace std;

const int V = 3;//顶点数
int adjMartix[V][V];

int main()
{
    adjMartix[0][1] = 1;
    adjMartix[1][2] = 1;
    adjMartix[2][0] = 1;

    cout << "邻接矩阵为：" <<endl;
    for(int i = 0; i < V; i++)
    {
        for(int j = 0; j < V; j++)
            cout << adjMartix[i][j] << " ";
        cout << endl;
    }

    return 0;
}
```
### 3.2 邻接表

邻接表是另一种常用的图的表示方法，适用于稀疏图，即边的数量远少于顶点的数量

假设我们有四个顶点:A,B,C,D。顶点之间的关系如下：
<div class="mermaid">
    graph LR;
        A --- B;
        A --- C;
        B --- D;
        C --- D;
</div>

为了使用邻接表表示这个图，我们可以使用一个数组。其中每个元素是一个列表，列表中包含与该顶点相连的其他顶点。

```CPP
#include<iostream>
#include<vector>

using namespace std;

const int V = 4;

int main()
{
    vector<vector<int>> adjList(V);//创建一个大小为V的向量

    adjList[0].push_back(1);//A与B相连
    adjList[1].push_back(0);//B与A相连
    adjlist[0].push_back(2);
    adjList[2].push_back(0);
    adjList[1].push_back(3);
    adjList[3].push_back(1);
    adjList[2].push_back(3);
    adjList[3].push_back(2);

    cout << "邻接表为：" << endl;
    for(int i = 0; i < V; i++)
    {
        cout << "顶点" << i << ": ";
        for(int j : adjList[i])
        {
            cout << j << " ";
        }
        cout << endl;
    }

    return 0;
}
```

### 3.3 十字链表

十字链表适用于表示有向图的数据结构，特别适用于稀疏图。在十字链表中，每个顶点和每条边都用一个结点表示，这种结构特别适用于访问任何顶点的入边和出边

基本结构：
    * 顶点结点：
        - 包含顶点的信息
        - 两个指针，一个指向该顶点的第一条出边，另一个指向该顶点的第一条入边
    * 边结点：
        - 包含边的信息
        - 有四个指针，两个用于在顶点的出边或入边中前后链表，另外两个用于链接同一个顶点的下一条出边或入边

*听不懂？没关系，看完例子再回过头来看*

假设有一个有向图，包含A,B,C,D

考虑以下有向图：

<div class="mermaid">
    graph LR;
        1 --> 2;
        1 --> 3;
        3 --> 4;
        2 --> 4;
</div>

使用十字链表构建有向图：

```CPP
#include<iostream>
#include<vector>
#include<map>

using namespace std;

struct ArcNode
{
    int tail, head;//边的尾和头
    ArcNode *tailLink, *headLink;//指向下一个相同尾、头的边
    ArcNode(int t, int h): tail(t), head(h), tailLink(nullptr), headLink(nullptr){}
};

struct VertexNode
{
    int vertex;//顶点信息
    ArcNode *firstIn, *firstOut;//指向该顶点的第一个入边和出边
    VertexNode(int v): vertex(v), firstIn(nullptr), firstOut(nullptr){}
};

vector<VertexNode*> vertices;

// 添加顶点
VertexNode* addVertex(int id) {
    VertexNode* vertex = new VertexNode(id);
    vertices.push_back(vertex);
    return vertex;
}

// 查找顶点
VertexNode* findVertex(int id) {
    for (auto v : vertices) {
        if (v->id == id) return v;
    }
    return nullptr;
}

// 添加边
void addEdge(int tail, int head) {
    VertexNode* tailVertex = findVertex(tail);
    VertexNode* headVertex = findVertex(head);
    if (!tailVertex) tailVertex = addVertex(tail);
    if (!headVertex) headVertex = addVertex(head);

    ArcNode* arc = new ArcNode(tail, head);
    arc->tailNext = tailVertex->firstOut;
    tailVertex->firstOut = arc;
    arc->headNext = headVertex->firstIn;
    headVertex->firstIn = arc;
}

// 显示图的信息
void display() {
    for (auto v : vertices) {
        std::cout << "Vertex " << v->id << ":\n";
        std::cout << "  Outgoing: ";
        for (ArcNode* arc = v->firstOut; arc; arc = arc->tailNext)
            std::cout << arc->head << " ";
        std::cout << "\n  Incoming: ";
        for (ArcNode* arc = v->firstIn; arc; arc = arc->headNext)
            std::cout << arc->tail << " ";
        std::cout << "\n";
    }
}

// 清理内存
void cleanup() {
    for (auto v : vertices) {
        while (v->firstOut) {
            ArcNode* tmp = v->firstOut;
            v->firstOut = tmp->tailNext;
            delete tmp;
        }
        while (v->firstIn) {
            ArcNode* tmp = v->firstIn;
            v->firstIn = tmp->headNext;
            delete tmp;
        }
        delete v;
    }
    vertices.clear();
}

int main() {
    addEdge(1, 2);
    addEdge(1, 3);
    addEdge(2, 3);
    addEdge(3, 4);

    display();

    cleanup();
    return 0;
}
```

*代码解释：*
* 我们定义了结构体`ArcNode`和`VertexNode`来表示图中的边和顶点
* 使用全局的`vertices`向量来存储图中的所有顶点

例题

### 题目描述

假设你是一家航空公司的数据分析师，你需要管理和分析航班与机场之间的关系。使用十字链表来存储航班信息。每个机场都可以有多个航班起飞和降落。设计一个系统，能够快速回答关于航班起降的查询。

#### 输入格式

* 首先输入一个整数n，表示机场的数量
* 接着输入一个整数m，表示航班的数量
* 然后输入m行航班信息，每行包括起始机场和目的地机场编号

#### 功能要求

* 给定一个机场编号，查询从该机场起飞的所有航班的目的地机场。
* 给定一个机场编号，查询降落到该机场的所有航班的起始机场。
* 查询每个机场的出发航班数和到达航班数。

#### 示例输入

```cpp
4  // 机场数量
5  // 航班数量
1 2
1 3
2 3
3 4
4 1
```

#### 示例输出

```cpp
From airport 1:
  Departures to: 2, 3
  Arrivals from: 4
Departure count: 2, Arrival count: 1

From airport 2:
  Departures to: 3
  Arrivals from: 1
Departure count: 1, Arrival count: 1

From airport 3:
  Departures to: 4
  Arrivals from: 1, 2
Departure count: 1, Arrival count: 2

From airport 4:
  Departures to: 1
  Arrivals from: 3
Departure count: 1, Arrival count: 1
```

#### 代码示例

```cpp
#include<iostream>
#include<vector>
#include<map>

using namespace std;

struct ArcNode
{
    int tail, head;
    ArcNode *tailnext, *headnext;
    ArcNode(int t, int h) : tail(t), head(h), tailNext(nullptr), headNext(nullptr){}
};

struct VertexNode
{
    int id;
    ArcNode *firstOut, *firstIn;
    VertexNode(int v) : id(v), firstOut(nullptr), firstIn(nullptr){}
};

map<int, VertexNode*> airports;

void addFlight(int tail, int head)
{
    if(airports.find(tail) == airports.end())
    {
        airports[tail] = new VertexNode(tail);
    }

    if(airports.find(head) == airports.end())
    {
        airports[head] = new VertexNode(head);
    }

    ArcNode* newArc = new ArcNode(tail, head);
    newArc->tailNext = airports[tail]->firstOut;
    airports[tail]->firstOut = newArc;
    newArc->headNext = airports[head]->firstIn;
    airports[head]->firstIn = newArc;
}

void display()
{
    for(auto &v : airports)
    {
        cout << "From airport" << v.first << ":\n Departures to: ";
        for(ArcNode* arc = v.second->firstOut; arc != nullptr; arc = arc->tailNext)
            cout << arc->head << " ";
        cout << endl << "  Arrivals from: ";
        for(ArcNode* arc = v.second->firstIn; arc != nullptr; arc = arc->headNext)
            cout << arc->tail << " ";
        int  outCount = 0, inCount = 0;
        for(ArcNode* arc = v.second->firstOut; arc; arc = arc->tailNext) outCount++;
        for(ArcNode* arc = v.second->firstIn; arc; arc = arc->headNext) inCount++;
        cout << "\nDeparture count:" << outCount << ", Arrival count: " << inCount << endl;
    }
}

int main()
{
    int n, m, u, v;
    cin >> n >> m;
    for(int i = 0; i < m; i++)
    {
        cin >> u >> v;
        addFlight(u, v);
    }

    display();
    return 0;
}
```

