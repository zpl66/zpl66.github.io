---
title: jQuery入门
date: 2024-05-25 13:45:05
tags: [jQuery, web前端]
author: 饺子
categories: [web前端]
index_img: /images/卫星科技.jpg
---

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
    <script src="https://cdn.jsdelivr.net/npm/mermaid@10.6.1/dist/mermaid.min.js"></script>
    <script>
    	window.onload=mermaid.initialize({"theme": "forest"});
    </script>
</head>

本文主要从jQuery简介、核心函数、核心对象三方面介绍jQuery

文章可能有点长，但要相信干货满满

~~而不是某Dumpling太啰嗦了~~

## 0.前言

可能对于刚学web前端的同学(比如我)来说，学了很多东西，但是对于他们的内在联系不太清晰。所以在jQuery入门之前我想先梳理一下他们的关系

话不多说，先上图

<div class="mermaid">
        graph TD;
    HTML[HTML<br>网页结构] --> CSS[CSS<br>网页样式];
    HTML --> JS[JavaScript<br>动态交互];
    JS --> jQuery[jQuery<br>简化JS操作];
    JS --> Bootstrap[Bootstrap<br>响应式设计];
    CSS --> Bootstrap;
    jQuery --> Bootstrap;
    classDef someclass fill:#f9f,stroke:#333,stroke-width:2px;
    class HTML,CSS,JS,jQuery,Bootstrap someclass;
</div>

* `HTML(HyperText Markup Language)`: 
    - 是用来构建网站的基础，定义网页的结构和内容。
    - 你可以把它想象成建筑的骨架

* `CSS(Cascading Style Sheets)`:
    - 用于设置网页布局和样式，比如字体(font)、颜色(color)和间距(padding)等。
    - CSS像是给网页穿上衣服，让结构更美观

* `JavaScript`:
    - 是一种程序语言，用于添加网页的动态功能，如响应用户的点击、数据更新等。
    - 他让网页有了动起来的能力。

* `jQuery`：
    - 是一个`JavaScript`的库，简化`JavaScript`的编程。
    - 比如，他让文档操作、事件处理、动画等更容易实现
    - `jQuery`就像一个工具包，帮你更好使用`JavaScript`。

* `BootStrap`:
    - 一个前端框架，包含了`HTML`、`CSS`和`JavaScript`的组件。
    - 提供了一套预设的样式和功能，可以快速帮你开发响应式和移动优先的网页
    - `BootStrap`就像一个建筑工具包，里面有各种模块和工具，让建筑(网页)更快速的搭建起来

## 1 jQuery简介

### 1.1 jQuery简介

~~虽然感觉不会有人喜欢看定义但还是感觉要写~~

* jQuery 是一个 JavaScript 函数库。

* jQuery 是一个轻量级的"写的少，做的多"的 JavaScript 库。

* jQuery 库包含以下功能：

    - HTML 元素选取
    - HTML 元素操作
    - CSS 操作
    - HTML 事件函数
    - JavaScript 特效和动画
    - HTML DOM 遍历和修改
    - AJAX
    - Utilities
提示： 除此之外，jQuery 还提供了大量的插件。

### 1.2 jQuery上手

```HTML
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>jQuery</title>
</head>
<body>

<script src="https://cdn.bootcdn.net/ajax/libs/jquery/1.9.1/jquery.min.js"></script>
<script>
    $(function () {
        // 请将jQuery代码书写在这里 ...
        alert('Hello,World!');
    });
</script>
</body>
</html>

```

### 1.3 jQuery的双枪

`jQuery`的双枪分别是：

    * jQuery的核心函数： 即：`$()`或`jQuery()`。jQuery定义了这个全局函数供我们使用，他既可以作为一般函数调用，且传递的参数类型不同/格式不同，功能就完全不同，也可以作为对象调用其定义好的方法
    * jQuery的核心对象： 即执行`jQuery`核心函数所返回的对象，`jQuery`对象内部包含的`dom`元素对象的伪数组(可能只有一个元素)，`jQuery`对象有很多属性和方法，让程序员能够方便的操纵`dom`,调用jQuery对象的任何方法后返回的还是当前jQuery对象

以上这段话你可能没看明白，但是没关系，先看完后面的内容再回过头来看

## 2 jQuery的核心函数

### 2.1 选择器

### 2.1.1 基本选择器

写在前头：其实选择器的大部分的格式都是

```HTML
$('example').css('example1');
```

带着这个公式去读以下内容，你会很容易发现套路

#### 2.1.1.1 标签选择器

需求：选择页面中所有的div标签，设置其背景为红色

```HTML
<div>我是div1</div>
<div>我是div2</div>
<div>我是div3</div>
```

```HTML
$('div').css('background', 'red');
```

#### 2.1.1.2 id选择器

需求：选择页面中所有id为btn的按钮，将其改为红色

```HTML
<button>按钮1</button>
<button id="btn">按钮2</button>
<button>按钮3</button>
```

```HTML
$('#btn').css('background', 'red');
```

#### 2.1.1.3 class选择器

需求：选择页面中所有class为red的段落，将其背景设置成红色

```HTML
<p class="red">我会变红</p>
<p>我不红了</p>
<p class="red">我又红了</p>
```

```HTML
$('.red').css('background', 'red');
```

#### 2.1.1.4 通配符选择器

需求：将页面中class为content的div下所有元素的背景设置成红色

```HTML
<div class="content">
    <p>段落1</p>
    <p>段落2</p>
<div>
```

```HTML
$('.content *').css('background', 'red');
```

#### 2.1.1.5 并集选择器

需求：选择页面中所有段落与按钮，设置其背景为红色

```HTML
<p>我是段落，我是红色</p>
<button>我是按钮，也是红色</p>
<div>我不是红色</p>
```

```HTML
$('p, button').css('background', 'red');
```

#### 2.1.1.6 交集选择器

需求：选择页面中所有class为红色的段落，设置其背景为红色

```HTML
<p class="red">我是红的</p>
<p>我不是红的</p>
<h1 class="red">我也不是红的</h1>
```

```HTML
$('p.red').css('background', 'red');
```

### 2.1.2 层级选择器

#### 2.1.2.1 子代选择器

需求：选择ul下所有span子元素，设置其背景为红色

```HTML
<ul>
    <span>我是ul的span1,我是红的</span>
    <li>我不是红的，因为我是li</li>
    <li>我也不是</li>
<ul>
```

```HTML
$('ul>span').css('background', 'red');
```

#### 2.1.2.2 后代选择器

需求：选择ul下所有span元素，设置其背景为红色

```HTML
<ul>
    <span>我是ul的span1,我是红的</span>
    <li>我不是红的，因为我是li <span>但我还是红的</span></li>
    <li>我也不是</li>
<ul>
```

```HTML
$('ul span').css('background', 'red');
```

~~DUmpling的唠叨~~
子代选择器和后代选择器的区别：
    - 我觉得这很像西欧封建领主和中国封建领主的差别，西欧领主认为：我的附庸的附庸不是我的附庸(子代选择器)，但在中国，普天之下莫非王土，率土之滨莫非王臣，管你是谁，耶稣来了也不行，皇- 帝说的(后代选择器)。
    - 子代选择器只能管一个人，所以要带`>`。
    - 但是后代选择器却是空格。这是为什么呢？因为这不是空格，而是朕的天下

#### 2.1.2.3 兄弟选择器

需求：选中id为box的下一个兄弟li，设置其背景为红色

```HTML
<ul>
    <span>我是ul的span1</span>
    <li id="box">我是li1 <span>我是li1的span1</span></li>
    <li>我是li2 <span>我是li2的span2</span></li> <!--这一行是红色的-->
    <li>我是li3 <span>我是li3的span3</span></li>
    <span>我是ul的span2</span>
</ul>
```

```HTML
$('#box+li').css('background', 'red');
```

需求：选中id为box之后所有的li，设置其背景为红色

```HTML
<ul>
    <span>我是ul的span1</span>
    <li id="box">我是li1 <span>我是li1的span1</span></li>
    <li>我是li2 <span>我是li2的span2</span></li>
    <li>我是li3 <span>我是li3的span3</span></li>
    <span>我是ul的span2</span>
</ul>
```

```HTML
$('#box~li').css('background', 'red');
```

### 2.1.3 过滤选择器

#### 2.1.3.1 基本筛选器

需求：隔行变色，让表格奇数行背景为红色，:even代表选取下标为偶数的行

```HTML
<table cellspacing="0px" cellpadding="10px" border="1px">
    <tr><td>张三</td><td>男</td><td>21</td></tr>//我是红的
    <tr><td>李四</td><td>女</td><td>22</td></tr>
    <tr><td>王五</td><td>男</td><td>23</td></tr>//我也是红的
    <tr><td>赵六</td><td>女</td><td>24</td></tr>
</table>
```

```HTML
$('tr:even').css('background', 'red');
```

~~Dumpling又来唠叨了~~
为什么第1，3行是红色的？
    因为行数下标是从0开始取的，所以你可以理解为是第0行、第2行是红色的

* 要使表格偶数行背景为红色，把:even改成:odd就行了(行的下标从0开始)

* 要使表格第一行背景为红色，把:even改成:first

* 要使表格最后一行背景为红色，把:even改成:last

* 要使表格第0行到第n行的下标为红色，把:even改成:lt(n)就行了(行的下标从0开始)

* 要使表格从第n行开始全部变成红色，把:even改成:gt(n)就行了(行的下标从0开始)

* 要使表格第n行的背景为红色，把:even改成:eq(n)就行了(行的下标从0开始)

* 要使表格除了第n行，其他行的背景为红色，把:even改成:not(eq(n))就行了(行的下标从0开始)

~~Dumpling又双叒叕来了~~
聪明如你，肯定发现了lt是less than的缩写，gt是greater than的缩写，eq是equal的缩写，所以这些还是很好记的

#### 2.1.3.2 内容筛选器 

需求：实现让内容为"男"的单元格的背景变为红色

```HTML
<table cellspacing="0px" cellpadding="10px" border="1px">
    <tr><td>张三</td><td>男</td><td>21</td></tr>
    <tr><td>李四</td><td>女</td><td>22</td></tr>
    <tr><td>王五</td><td>男</td><td>23</td></tr>
    <tr><td>赵六</td><td>女</td><td>24</td></tr>
</table>
```

```HTML
$('td:contains("男")').css('background', 'red');
```

需求：实现让内容为span标签的单元格的背景变为红色

把:contains("男")改成:has(span)就行了

需求：实现让内容为空的单元格的背景变为红色

把:contains("男")改成:empty就行了

需求：实现让内容不为空的单元格的背景变为红色

把:contains("男")改成:parent就行了

#### 2.1.3.3 属性筛选器

需求描述：查找herflang属性的标签元素，设置其背景为红色

```HTML
<a href="" hreflang="en">en</a>
<a href="" hreflang="en-UK">en-UK</a>
<a href="" hreflang="zh-CN">zh-CN</a>
```

```HTML
$('a[hreflang]').css('background', 'red');
```

需求：查找hreflang属性值是en的所有超链接，设置其背景为红色

把[hreflang]改成[hreflang="en"]就行了

需求：查找hreflang属性值不是en的所有超链接，设置其背景为红色

把[hreflang]改成[hreflang!="en"]就行了

## 2.2 工具

### 2.2.1 $.each方法

方法描述：一个通用的迭代函数，它可以用来无缝迭代对象和数组。数组和类似数组的对象通过一个长度属性（如一个函数的参数对象）来迭代数字索引，从0到length - 1，其他对象通过其属性名进行迭代。

需求：给定一个数组，使用$.each方法进行遍历输出

```HTML
var arr = [10, 90, 20, 80, 30, 70, 40, 60, 50];
$.each(arr, function (index, element) {
    console.log(index, element);
});
```

### 2.2.2 $.trim方法

方法描述：去掉字符串起始和结尾的空格。(trim的中文意思是修剪)

需求：给定一个字符串，去掉该字符串的前后空格

```HTML
var str = '    hello    ';
console.log($.trim(str));//hello
```

### 2.2.3 $.type方法

方法描述：确定JavaScript 对象的类型。

需求：给定一个对象，输出该对象的类型

```HTML
var str = '    hello    ';
console.log($.type(str));//string
```

### 2.2.4 $.isArray方法

方法描述：用来测试指定对象是否为一个数组。

需求：给定一个对象，输出该对象是不是数组类型

```HTML
var arr = [10, 90, 20, 80, 30, 70, 40, 60, 50];
console.log($.isArray(arr));//true
```

### 2.2.5 $.isFunction方法

方法描述：用来测试指定对象是否为一个函数。

需求：给定一个对象，输出该对象是不是函数类型

```HTML
var fun = function () {
    console.log("hello");
};
console.log($.isFunction(fun));//true
```

## 3 jQuery的核心对象

### 3.1 属性

#### 3.1.1 属性

#### 3.1.1.1 attr()
 
方法描述：专门操作属性值为非布尔值的属性，该方法读写一体。

需求：设置p标签的title属性为"我是attr修改后的段落标题"

```HTML
<p id="content" title="我是段落标题">我是段落</p>
```

```HTML
$('#content').attr('title', '我是attr修改后的段落标题');
```

#### 3.1.1.2 prop()

方法描述：专门操作属性值为布尔值的属性，该方法读写一体。

需求：设置复选框的状态为选中状态

```HTML
<input type="checkbox">复选框
```

```HTML
$(':checkbox').prop('checked', 'true');
```

#### 3.1.1.3 val()

方法描述：该方法主要用于获取表单元素的值和设置表单元素的值，该方法读写一体。

需求：设置文本框的值为"123456"

```HTML
<input type="text">
```

```HTML
$(':text').val('123456')
```

### 3.1.2 样式

#### 3.1.2.1 css()

方法描述：获取匹配元素集合中的第一个元素的样式属性的计算值或设置每个匹配元素的一个或多个CSS属性。

需求描述：设置div的背景颜色为红色，字体颜色为白色

```HTML
<div>我是div</div>
```

```HTML
$('div').css({
    'background': 'red',
    'color': 'white'
});
```

#### 3.1.2.2 addClass()

方法描述：为每个匹配的元素添加指定的样式类名。

需求描述：为所有的li添加样式”beauty“

```HTML
.beauty {
    font-weight: bold;
    font-size: 18px;
    color: coral;
}
```
```HTML
<ul>
    <li>列表项1</li>
    <li>列表项2</li>
    <li>列表项3</li>
    <li>列表项4</li>
</ul>
```

```HTML
$('li').addClass('beauty');
```

#### 3.1.2.3 removeClass()

方法描述：移除集合中每个匹配元素上一个，多个或全部样式。

需求：为所有的li移除样式”beauty“

```HTML
.beauty {
    font-weight: bold;
    font-size: 18px;
    color: coral;
}
```
```HTML
<ul>
    <li class="beauty">列表项1</li>
    <li class="beauty">列表项2</li>
    <li class="beauty">列表项3</li>
    <li class="beauty">列表项4</li>
</ul>
```

```HTML
$('li').removeClass('beauty');
```

#### 3.1.2.4 toggleClass()

方法描述：为匹配的元素集合中的每个元素上添加或删除一个或多个样式类，取决于这个样式类是否存在。

```HTML
.hide {
    width: 100px;
    height: 100px;
    display: none;
}
```

```HTML
<button>按钮</button>
<div>我是div</div>
```

```HTML
$('button').click(function () {
    $('div').toggleClass('hide');
});
```

### 3.1.3 尺寸

#### 3.1.3.1 width()

方法描述：获取内容元素width的值。

#### 3.1.3.2 height()

方法描述：获取内容元素height的值。

#### 3.1.3.3 innerWidth()

方法描述：获取内容元素width+padding的值。

#### 3.1.3.4 innerHeight()

方法描述：获取内容元素height+padding的值。

#### 3.1.3.5 outerWidth()

方法描述：outerWidth(false/true)，获取内容元素width+padding+border的值，如果是true再加上margin的值。

#### 3.1.3.6 outerHeight()

方法描述：outerHeight(false/true)，获取内容元素height+padding+border的值，如果是true再加上margin的值。

