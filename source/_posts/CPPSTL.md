---
title: C++ STL
date: 2024-05-23 21:35:45
tags: [C++, STL]
author: 饺子
categories: [C++学习]
index_img: /images/水晶星球.jpg
---

## 知识框架

<img src="/images/C++STL.png">

## 1.vector

### 1.1 介绍

`vector`为可变长数组(我比较喜欢叫他动态数组),可以随时添加数值和删除元素

### 1.2 初始化

`vector`分为一维初始化和二维初始化

#### 一维初始化

```cpp
vector<int> t1; //一维数组
vector<int> t2(n); //定义一个长度为n的数组
vector<int> t3(n, 1); //定义一个长度为n的数组，t3[0]~t3[n - 1]均初始化为1
vector<int> t4{1, 2, 3, 4, 5}; //数组中有五个元素，数组长度就为5
vector<int> t5 = t4; //拷贝初始化
```

#### 二维初始化

```cpp
vector<vector<int>> t2;//二维数组
vector<int> v[5];//定义可变长二维数组
//注意：行不可变（只有5行）, 而列可变,可以在指定行添加元素
//第一维固定长度为5，第二维长度可以改变
//注意：[]是二维数组，()是一维数组！ ！ ！
//（有个大聪明因为这个debug了半个小时）
```

### 1.3 方法函数

话不多说，直接上

```cpp
vector<int> c;
```

| 代码                | 含义                                            |时间复杂度|
|---------------------|-------------------------------------------------|---------|
|c.front()            |返回第一个数据                                    |O(1)     |
|c.back()             |返回最后一个数据                                  |O(1)     |
|c.pop_back()         |删除最后一个数据                                  |O(1)     |
|c.push_back(element) |在尾部加一个数据                                  |O(1)     |
|c.emplace_back(ele)  |类似c.push_back(),但有时更快                      |O(1)     |
|c.size()             |返回数据个数                                      |O(1)     |
|c.clear()            |清除元素个数                                      |O(N)     |
|c.resize(n, v)       |改变数组大小为n并赋值为v，如果没有则默认赋值0       |         |
|c.insert(it, x)      |向迭代器it插入元素x                               |O(N)     |
|c.erase(first,last)  |删除`[first, last)`所有元素                       |O(N)     |
|c.begin()            |返回首元素迭代器(可以通俗的理解为地址)              |O(1)     |
|c.end()              |返回最后一个元素后一个位置的迭代器                  |O(1)     |
|c.empty()            |判断是否为空，空为真                               |O(1)     |
|c.at(idx)            |返回c[idx]的值（但还是建议用[]）                   |         |
|c.reserve(sz)        |改变`capacity`的大小                              |         |
|c.assign(n, val)     |讲`n`个`val`值拷贝到`c`数组中                      |         |
|c.assign(beg, end)   |讲另一个容器的`[x.begin(), x.end()]`里的内容拷贝到c |        |

### 1.4 访问

总共三种方法：`下标法`、`迭代器法`、`auto`

#### 1.4.1 下标访问

和普通数组的区别是没有区别

#### 1.4.2 迭代器访问

```cpp
vector<int> vi{1, 2, 3, 4, 5};
//迭代器访问
vector<int>::iterator it;   
// 相当于声明了一个迭代器类型的变量it
// 通俗来说就是声明了一个指针变量
```

* 方法一

```cpp
vector<int>::iterator it = vi.begin(); 
for(int i = 0; i < 5; i++)
	cout << *(it + i) << " ";
cout << "\n";
```

* 方法二

```cpp
vector<int>::iterator it; for(it = vi.begin(); it != vi.end();it ++) cout << *it << " "; 
//vi.end()指向尾元素地址的下一个地址 
// 或者 
auto it = vi.begin();
while(it != vi.end())
{
    cout << *it << endl;
    it++;
}

```

#### 1.4.3 智能指针

只能遍历完整个数组，如果要遍历指定内容，参考方法一、二

```cpp
// 1. 输入 
vector<int> a(n); 
for (auto &x: a) 
{
     cin >> x; // 可以进行输入，注意加引用 
} 

// 2. 输出 
vector<int> v; 
v.push_back(12); 
v.push_back(241); 
for(auto val : v) 
{
     cout << val << " "; // 12 241 
}
```

## 2 stack

### 2.1 介绍

栈为数据结构的一种，实现先进后出(FILO)的容器

### 2.2 初始化

```CPP
#include<stack>

stack<int> s1;
stack<string> s2;
stack<node> s3;//node为结构体类型
```

### 2.3 方法函数

|代码  |含义|
|------|----|
|s.push(ele)|元素`ele`入栈，增加元素|
|s.pop()|移除栈顶元素|
|s.top()|取得栈顶元素（但不删除）|
|s.empty()|检查栈内是否为空|
|s.size()|返回栈内元素的个数|

### 2.4 栈遍历

栈只能对栈顶元素进行操作，如果想要操作，只能将栈中元素一个个取出来存在数组中

```CPP
stack<int> st;

for (int i = 0; i < 10; i++) st.push(i);

while(!st.empty())
{
     int tp = st.top();
     st.pop();
}
```

### 2.5 数组模拟栈进行遍历

优点：比`STL`的`stack`速度更快，遍历元素更方便

```CPP
int s[100];
int tt = -1;//tt代表栈顶指针，初始栈内无元素，tt为-1

//入栈
for (int i = 0; i <= 5; i++)
{
     s[++tt] = i;
}

//出栈
int top_element = s[tt--];

//入栈示意图
//0 1 2 3 4 5
//          tt
//出栈后示意图
//0 1 2 3 4
//        tt
```

## 3 queue

### 3.1 介绍

队列是一种先进先出的数据结构(FIFO)

### 3.2 初始化

```CPP
#include<queue>//别忘了头文件

queue<int> 1;
```

### 3.3 方法函数

|代码|含义|
|----|----|
|q.front()|返回队首元素O(1)|
|q.back()|返回队尾元素O(1)|
|q.push(element)|尾部添加一个元素`element` 入队|
|q.pop()|删除第一个元素，出队O(1)|
|q.size()|返回队列中元素个数，返回值类型`unsigned int`|
|q.empty()|判断是否为空|

### 3.4 数组模拟

使用`q[]`数组模拟队列

`hh`表示队首元素的下标，初始为0

`tt`表示队尾元素的下标，初始为-1，表示刚开始时队列为空

```CPP
#include<iostream>
using namespace std;

const int N = 1e5 + 10;

int q[N];

int main()
{
     int hh = 0, tt = -1;
     //入队
     q[++tt] = 1;
     q[++tt] = 2;
     //出队
     while(hh <= tt)
     {
          int t = q[hh++];
          printf("%d ", t);
     }

     return 0;
}
```

## 4 deque

### 4.1 介绍

首尾都可插入和删除的队列为双端队列  
```CPP
//添加头文件
#include <deque>
//初始化定义
deque<int> dq;
```

### 4.2 方法函数

> 注意双端队列的常数比较大

|代码|含义|时间复杂度|
|----|----|--------|
|push_back(x) / push_front(x)|把`x`插入队尾后/队首|$O(1)$|
|back() / front()|返回队尾/队首元素|$O(1)$|
|pop_back() / pop_front()|删除队尾/队首元素|$O(1)|
|erase(iterator it)|删除双端队列中的某一个元素||
|erase(iterator first, iterator last)|删除双端队列中[first, last)中的元素||
|empty()|判断deque是否为空|$O(1)$|
|size()|返回deque的元素数量|$O(1)$|
|clear()|清空deque||

### 4.3 注意点

> deque可以进行排序
```CPP
//从小到大
sort(q.begin(), q.end());
//从大到小排列
sort(q.begin(), q.end(), greater<int>());
```

## 5 priority_queue

### 5.1 介绍
优先队列是在正常队列的基础上加了优先级，保证每次的队首元素都是优先级最大的。  
可以实现每次从优先队列中取出的元素都是队列中优先级最大的一个。  
它的底层是通过堆来实现的。 

### 5.2 函数方法

|代码|含义|时间复杂度|
|----|---|---------|
|q.top()|访问队首元素|$O(1)$|
|q.push()|入队|$O(logN)$|
|q.pop()|堆顶(队首)元素出队|$O(logN)$|
|q.size()|队列元素个数|$O(1)$|
|q.empty()|是否为空|$O(1)$|
|注意没有clear()!|不提供此方法||

### 5.3 设置优先级

### 5.3.1 基本数据类型的优先级

```CPP
priority_queue<int> pq;//默认大根堆，即每次取出的元素是队列中的最大值
priortiy_queue<int, vector<int>, greater<int>> q;//小根堆，每次取出的元素是队列中的最小值
```

### 5.3.2 结构体优先级

```CPP
struct Point {
    int x, int y;
};

struct cmp {
	bool operator() (const Point& a, const Point& b)  {
        return a.x < b.x;
    }
};

priority_queue(Point, vector<point>, cmp) q;
```



## 6 map

### 6.1 介绍

映射类似于函数的对应关系，每一个`x`对应一个`y`，而`map`是每个键对应一个值

### 6.2 初始化

```CPP
#include<map>

map<string, string> mp1;
map<string, int> mp2;
map<int, node> mp3;//node为结构体
```

### 6.3 函数方法

|代码|含义|
|--------|-----|
|`mp.find(key)`|返回键围殴key的映射迭代器|
|`mp.erase(it)`|删除迭代器对应的键和值|
|`mp.erase(key)`|根据映射的键删除键和值|
|`mp.insert(first,last)`|删除左闭右开区间迭代器对应的键和值|
|`mp.insert()`|插入元素，插入时要构造键值对|
|`mp.size()`|返回映射的对数|
|`mp.clear()`|清空map中所有元素|
|`mp.empty()`|如果map为空，返回true，否则返回false|
|`mp.mp.begin()`|返回指向map第一个元素的迭代器（地址）|
|`mp.end()`|返回指向map尾部的迭代器（最后一个元素的下一个地址）|
|`mp.rbegin()`|返回指向map最后一个元素的迭代器（地址）|
|`mp.rend()`|返回指向map第一个元素前面(上一个）的逆向迭代器（地址）|
|`mp.count(key)`|查看元素是否存在，因为map中键是唯一的，所以存在返回1，不存在返回0|
|`mp.lower_bound()`|返回一个迭代器，指向键值>= key的第一个元素|
|`mp.upper_bound()`|返回一个迭代器，指向键值> key的第一个元素|

## 7 set

### 7.1 介绍

`set`容器中的元素不会重复，当插入集合中已有的元素时不会插入进去，而且`set`容器里的元素自动从小到大排序

即：不重复，且有序

### 7.2 初始化

```CPP
#include<set>

set<int> s;
```

### 7.3 函数方法

|代码|含义|
|-----|-----|
|`s.begin()`|返回set容器的第一个元素的地址|
|`s.end()`|返回set容器的最后一个元素的下一个地址|
|`s.rbegin()`|返回逆序迭代器，指向容器元素最后一个位置|
|`s.rend()`|返回逆序迭代器，指向容器第一个元素前面的位置|
|`s.clear()`|删除set容器中的所有的元素，返回unsigned int类型|
|`s.empty()`|判断set容器是否为空|
|`s.insert()`|插入一个元素|
|`s.size()`|返回当前set容器中的元素个数|
|`erase(iterator)`|删除定位器iterator指向的值|
|`erase(first, second)`|删除定位器first和second之间的值|
|`erase(key_value)`|删除键值为key_value的值|
|查找||
|`s.find(element)`|查找set中的某一元素，有则返回该元素对应的迭代器，无则返回结束迭代器|
|`s.count(element)`|查找set中的元素出现的个数，由于set中元素唯一，此函数相当于查询element是否出现|
|`s.lower_bound(k)`|返回大于等于k的第一个元素的迭代器|
|`s.upper_bound(k)`|返回大于k的第一个元素的迭代器|

### 7.4 访问

* 迭代器访问

```CPP
for(set<int>::iterator it = s.begin(); it != s.end(); it++)
     cout << *it << " ";
```

* 智能指针

```CPP
for(auto i : s)
     cout << i << endl;
```

## 8 pair

### 8.1 介绍

pair只含有两个元素，可以看作是只有两个元素的结论体  
应用：  
* 代替二元结构体
* 作为map键值对进行插入  
```CPP
map<string,int>mp;
mp.insert(pair<string,int>("xingmaqi",1));
// mp.insert(make_pair("xingmaqi", 1));
// mp.insert({"xingmaqi", 1});
```

### 8.2 访问
```CPP
map<string,int>mp;
mp.insert(pair<string,int>("xingmaqi",1));
// mp.insert(make_pair("xingmaqi", 1));
// mp.insert({"xingmaqi", 1});
```

## 9 string

### 9.1 介绍

`string`是一个字符串类，和`char`型字符串类似

可以把`string`理解为一个字符串类型，像int一样定义

### 9.2 初始化

```cpp
#include<string>

string str1;//空字符串

string str2("123456");

string str3("12345", 0, 3);//结果为"123"
//从0索引开始，长度为3

string str4("12345", 3);//结果为"123"

string str5(5, '2');//结果为"22222"

string str6(str2, 2);//结果为"345"；
//截取第二个索引及其之后的元素
```

### 9.3 简单使用及其特性

#### 9.3.1 访问单个字符

```cpp
#include<iostream>
#include<string>

using namespace std;

int main()
{
     string str="12345";

     cout << str[2] << endl;

     return 0;
}
```

结果为3。

从这个案例中就可以很直观的感受到string可以作为数组使用

#### 9.3.2 string特性

* 支持比较运算符
     - `string`字符串支持常见的比较运算符:`>, >=, <, <=, ==, !=`。
     - 本质上是按字符顺序依次比较ASCII码
     - 常用ASCII码：`A：65`；`a：97`；`1： 49`
     - 故而，在比较时，数字<大写字母<小写字母
* 支持`+`运算符，代表拼接

```cpp
#include<iostream>
#include<string>

using namespace std;

int main()
{
     string str1 = "123";
     string str2 = "456";
     string str3 = str1 + str2;
     cout << str3 << endl;//输出结果为123456
     return 0;
}
```

#### 9.3.3 string读入

读入字符串，遇空格，回车结束

```cpp
string s;
cin >> s;
```

读入一行字符串(包括空格)，遇回车结束

```cpp
string s;
getline(cin, s);
```

*注意：`getline(cin, s)`会获取前一个输入的换行符，需要在前面添加读取换行符的语句，如`getchar()`或`cin.get()`*

错误示例(源自某大聪明调试了一小时的bug)

```cpp
int n;
string s;

cin >> n;
cin >> s;
```

正确示例

```cpp
int n;
string s;

cin >> n;
getchar();
getline(cin, s);
```

*当时偶然看见一个大佬的解释，恍然大悟：*  
*`cin`输入完后，回车，`cin`遇到回车键结束，但回车还在输入流中，`cin`不会清除，导致`getline`读取回车，结束。所以后面的字符串并没有被正确输入*

### 9.4 函数方法

```
string s = 123;
```

*注意：*
*it为迭代器*

* 插入
  
|代码|含义|
|:---|:----|
|`s.push_back('element')`      | 在末尾插入|
|`s.insert(pos,'element')`    |在pos位置插入element|
|eg:s.insert(s.begin() + 2, 6)|在第二个位置插入6，结果是1263|
|`s.append("str")`|在s字符串末尾添加str字符串|

* 删除
  
|代码|含义|
|:-- |:-- |
|`erase(iterator p)`|删除字符串中p所指字符|
|`erase(iterator first, iterator last)`| 删除字符串中迭代器区间`[first,last)`上的所有值|
|`erase(pos, len)`|删除字符串中索引从pos开始的len个字符|
|`clear()`|清空字符串|

* 字符替换

|代码|含义|
|:--|:-- |
|`s.replace(pos, n, str)` |把当前字符串从索引pos开始的n个字符替换成str |
|`s.replace(pos, n, n1, c)`|把当前字符串从pos开始n个字符替换为n1个字符c|
|`s.replace(it1, it2, str)`|把当前字符串`[it1, it2)`区间替换为str|

* 大小写转换

单个字符的转换：

|代码                     |含义|
|:-----------------------|:-- |
|`tolower(s[i])`         |转换为小写|
|`toupper(s[i])`         |转换为大写|

多个字符的转换：

|代码|含义|
|:-- |:-- |
|`transform(s.begin(), s.end(), s.begin(), ::tolower)`|转换小写。前两个参数指定容器转换起止范围，第三个参数是结果存放容器的开始位置|
|`transform(s.begin(), s.end(), s.begin(), ::toupper)`|转换大写|

* 获取字符串长度

|代码|含义|
|:-- |:-- |
|`s.size()`和`s.length()`|返回string字符串个数。两者一个意思|
|`s.max_size()`|返回string对象最多包含的字符数|
|`s.capcity()`|重新分配内存之前，string对象能包含的最大字符数|

* 分割
  
|代码|含义|
|:--|:--|
|s.substr(pos, n)|截取从pos索引开始的n个字符|

* 查找

|代码|含义|
|:-- |:-- |
|s.find(str, pos)|默认从索引0开始。从索引pos开始查找子串str,返回找到位置的索引。找不到返回-1|
|s.find(c, pos)|从pos索引开始查找字符c|
|s.rfind(str, pos)|从当前字符串pos索引开始，反向查找子串s|
|s.rfind(c, pos)|从当前字符串pos索引开始，反向查找字符c|

* 排序

```cpp
sort(s.begin(), s.end());//按照ASCII码排序
```

## STL 函数

### sort

```CPP
int a[N];
//对 a 数组的[1, n]位置从小到大排序：
sort(a + 1, a + 1 + n)//因为 a + 1 是起始位置，a + 1 + n 是第 n + 1 个元素的指针，表示排序到第 n 个元素。
//对a数组的[0, n-1]位置从大到小排序
sort(a, a + n, greater<int>());
//对a数组的[0, n-1]位置从小到大排序
sort(a, a + n, less<int>());

vector<int> b(n + 1); 
sort(b.begin() + 1, b.end());//升序
sort(b.begin() + 1, b.end(), greater<int>());//降序
```

### unique

```CPP
unique(beg, end)
```

时间复杂度：$O(N)$

> 消除重复元素，返回消除完重复元素的下一个位置的地址<br>
> 如：`a[] = {1, 3, 2, 3, 6}`
> `unique`之后`a`数组为`{1, 2, 3, 6, 3}`前面为无重复元素的数组，后面则是重复元素移到后面，返回a[4]位置的地址（不重复元素的尾后地址）

消除重复元素一般需要原序列是有序序列



