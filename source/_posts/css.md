---
title: CSS(够用版)
date: 2024-05-27 14:59:14
tags: [css, web前端]
author: 饺子
categories: [web前端]
index_img: /images/宇航员在轨道上探索外层空间.jpg
---

## 1 CSS简介

### 1.1 什么是CSS？

`CSS`: Cascading Style Sheet

*为什么被命名为CSS？*
*级联（Cascading）：CSS的“级联”特性意味着当多个样式应用于同一个HTML元素时，这些样式会根据它们的来源（例如用户样式表、作者样式表或浏览器默认样式）和优先级（例如内联样式、ID选择器、类选择器等）来决定如何组合或覆盖。这种机制允许开发者在多个地方定义样式，而浏览器会根据一定的规则来确定最终应用于元素的样式。*
*样式表（Style Sheets）：CSS使用“样式表”的方式来组织样式信息。一个样式表包含了一组规则，每个规则都由一个或多个选择器和一条或多条声明组成。选择器用于指定哪些HTML元素应用该规则，而声明则指定了这些元素应该如何被渲染（例如颜色、字体、布局等）。*

### 1.2 CSS的作用

页面外观美化

布局和定位

## 2 基本用法

### 2.1 CSS语法

```HTML
<head>
    <style>
        选择器{
            属性名:属性值;
            属性名:属性值;
        }
    </style>
</head>
```

* 选择器：要修饰的对象
* 属性名：修饰对象的属性
* 属性值：样式的取值

*没听懂？没关系，接着往后看就行*

```HTML
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Document</title>
    <style>
        p{
            color:red;
            background:#cccccc;
        }
        h2{
            color:blue;
        }
    </style>
</head>
<body>
    <p>CSS从入门到入土</p>
    <h2>Dumpling handsome</h2>
</body>
</html>
```

### 2.2 CSS应用方式

* 内部样式(internal styles)
* 行内样式(inline styles)
* 外部样式(external styles)

#### 2.2.1 内部样式

也称为内嵌样式，在页面头部通过style标签定义

对当前页面所有符合样式选择器的标签都起作用

#### 2.2.2 行内样式

也称为嵌入样式，使用HTML标签的style属性定义

只对设置style属性的标签起作用

### 2.2.3 外部样式

使用单独的`.css`文件定义，然后在页面中使用`link标签`或`@import指令`引入

* 使用`link标签`链接外部样式文件

```HTML
<link rel="stylesheet" type="text/css" href="path/to/your/example.css">
```

*小提示：type可省略*

* `@import`指令导入外部样式文件

```HTML
<style>
    @import "path/to/your/example.css";
    @import url(path/to/your/example.css);
</style>
```

## 3 选择器

### 3.1 基础选择器

#### 3.1.1 标签选择器

也称为元素选择器，使用HTML标签作为选择器的名称

```HTML
p {  
    color: red;  
}
```

#### 3.1.2 类选择器

使用自定义的名称，以`.`号作为前缀，然后通过HTML标签的class属性调用类选择器

*注意*<br>

* 调用时不能添加`.`号；
* 同时调用多个类选择器时，用`空格`分割
* 类选择器名称不能以`数字`开头
  
#### 3.1.3 ID选择器

使用自定义的名称，以`#`作为前缀，然后通过HTML标签的id属性进行名称匹配

ID属性是一对一的关系

### 3.2 复杂选择器

#### 3.2.1 复合选择器

标签选择器和类选择器、标签选择器和ID选择器一起使用

必须同时满足两个条件才能应用样式

* 交集选择器
    - 语法：E.F
    - 例子：`p.intro`将选择所有既是`<p>`元素又拥有`intro`类的元素

* 并集选择器
    - 语法：E,f
    - 例子：`h1,h2{color:blue;}`将选择所有的`<h1>`和`<h2>`元素，并将他们的颜色设为蓝色
  
#### 3.2.2 组合选择器

组合选择器描述了元素之间的关系，如父子关系、兄弟关系等，允许开发者更精准的选择元素

* 后代选择器
    - 符号：空格
    - 例子: `div p`将选择所有`<div>`元素内部的`<p>`元素

* 子元素选择器
    - 符号： >
    - 例子： `ul>li`将选择所有`ul`元素内部的直接子元素`li`

* 相邻兄弟选择器
    - 符号：`+`
    - 例子：`h2+p`将选择紧接在`<h2>`元素后面的`<p>`元素

* 通用兄弟选择器
    - 符号：`~`
    - 例子：`h2~p`将选择所有与`<h2>`元素在同一层级的`<p>`元素
  
#### 3.2.3 嵌套组合器

嵌套组合器允许在一个选择器的内部定义另一个选择器，以形成嵌套的样式规则

```HTML
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>Document</title>
	<style>
		/* 1.标签选择器和类选择器合起来使用----复合选择器 */
		h1.aaa{
			color:red;
		}
		/* 1.标签选择器和ID选择器合起来使用----复合选择器 */
		p#bbb{
			color:blue;
		}
		/* 2.组合选择器 */
		h1,p,div,span,.ccc{
			font-size:30px;
		}
		div{
			background:violet;
		}
		.ccc{
			font-weight:bold;
		}

		.first + .second {  
    		color: red;  
		}	

		.first ~ p {  
    		background-color: lightblue;  
		}
		/* 3.嵌套选择器 */
		/* div p{
			color:green;
			text-decoration:underline;
		} */
		div>p{
			color:green;
			text-decoration:underline;
		}
		div h3.ddd{
			color:red;
		}
	</style>
</head>
<body>
	<!-- 需求：只想修饰class属性为aaa的h1标签 -->
	<h1 class="aaa">welcome</h1>
	<h4 class="aaa">css</h4>
	<h1>hello</h1>
	<hr>
	<!-- 我要修饰ID属性为bbb的p标签 -->
	<p id="bbb">world</p >
	<p>html</p>
	<h1 id="bbb">主讲：叽叽</h1>
	<hr>
	<!-- 给h1、p、div、span标签中的内容设置字号为30px -->
	<h1>hello</h1>
	<p>CSS</p>
	<div>WEB开发</div>
	<span class="ccc">JAVA开发</span>
	<hr>
	<!-- 需求：修饰div内部的p标签 -->
	<div>
		<p>div内部的p标签</p>
		<h3>div内部的h3标签</h3>
	</div>
	<hr>
	<div>
		<h3>
			<p>div内部的h3内部的p标签</p>
		</h3>
	</div>
	<hr>
	<!-- 需求：修饰div内部的class为ddd的标签 -->
	<div>
		<p>div内部的p</p>
		<h3 class="ddd">div内部的h3</h3>
		<p class="ddd">PPPP</p>
	</div>
	<h3 class="ddd">h3h3h3</h3>
	<!-- 需求：修饰div内部class为first的标签 -->
	<div class="parent"> 
    	<p class="first">我是第一个段落。</p>  
    	<p class="second">我是相邻的段落。</p>  
    	<p class="third">我不是相邻的段落。</p>  
	</div>
</body>
</html>
```

#### 伪类选择器

根据不同的状态显示不同的样式，一般用于标签

四种状态：
    * `:link`：未访问的链接
    * `:visited`：已访问的链接
    * `:hover`：鼠标悬浮在链接上，即移动在链接上
    * `:active`：选定的链接，被激活
  
*注意：默认超链接为：蓝色，不划线*


### 3.3 选择器优先级

#### 3.3.1 优先级

行内样式 > ID选择器 > class选择器 > 标签选择器

*原因：首先加载标签选择器，再加载类选择器 ，然后加载ID选择器，最后加载行内样式*
*后加载会覆盖先加载的同名样式*

#### 3.3.2 内外部样式加载顺序

就近原则~~英语的DNA动了~~

*原因和上诉一样，在同优先级的前提下，后加载的会覆盖先加载的同名样式，所以离得越近越优先*

#### 3.3.3 !important

可以使用`!important`使某个样式有最高的优先级

```HTML
<p style="color: red !important;">这段文字是红色的，因为使用了 !important。</p>
```

## 4 常见CSS属性

### 4.1 字体属性

设置字体相关的样式

|属性          |含义      |说明                          |
|:-- |:-- |:-- |
|font-size|大小、尺寸|可以使用多种单位|
|font-weight|粗细|取值:normal,bold,自定义|
|font-family|字体|系统中要安装指定的字体|
|font-style|样式|取值：normal,italic|
|font|简写||

简写属性：font:font-style|font-weight|font-size|font-family
必须按照次顺序书写

```HTML
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>Document</title>
	<style>
		div{
			font-size: 30px;
		}
		p{
			/*font-size: 20px;*/
			font-size: 80%;
		}
		.hello{
			font-size: 2em;
		}
		body{
			font-size: 62.5%;
		}
		ul li{
			/*font-size: 30px;
			font-weight: bold;
			font-family: 华文行楷,宋体,黑体;
			font-style: italic;*/
			font: italic bold 30px 微软雅黑;
		}
	</style>
</head>
<body>
	<p>
		CSS从入门到入土
		<span>Dumpling handsome</span>
	</p>
	<span>Dumpling handsome</span>
	<hr>

	<div>
		我的DIV
		<p>
			CSS从入门到精通
			<span>Dumpling handsome</span>
		</p>
	</div>
	<hr>

	<span class="hello">Dumpling handsome</span>
	<hr>

	<ul>
		<li>
			嘿嘿
		</li>
	</ul>
</body>
</html>
```

### 4.2 文本属性

|属性          |含义           |说明       |
|:------------|:-------------- |:-- |
|color|颜色||
|line-height|行高|行之间的高度
|text-align|水平对齐方式|取值：left、center、right|
|vertical-align|垂直对齐方式|取值：top、middle、bottom|
|text-indent|首行缩进||
|text-decoration|文本修饰|取值：underline、overline、line-through|
|text-transform|字母大小写转换|取值：lowercase、uppercase、capitalize(首字母大写)|
|letter-spacing|字符间距||
|word-spacing|单词间距|只对英文有效|
|white-space|空白的处理方法|文本超出后是否换行，取值：nowrap(截断)|

### 4.3 背景属性

|属性|含义|说明|
|:--|:--|:--|
|background-color|背景颜色|取值：transparent(透明)|
|background-image|背景图片|必须用url()方式指定图片的路径|
|background-repeat|背景图片的重复方式||
|background-position|背景图片的显示位置|取值：top、bottom、left、right、center、坐标(左上角(0,0)为坐标，向右为x正方向，向下为y正方向)|
|background-attachment|背景图片是否跟随滚动|取值：scroll(默认)、fixed|
|background|简写||

简写属性：background:background-color|background-image|background-repeat|background-position

以空格隔开，书写顺序没有要求

### 4.4 列表属性

|属性|含义|说明|
|:-- |:-- |:-- |
|list-style-type|设置列表前的标记|取值:none、disc、circle、square、decimal|
|list-style-image|将图片作为列表前的标记||
|list-style-position|设置标记的位置|取值：outside(默认)、inside|
|list-style|简写||

简写属性：list-style:list-style-type|list-style-image|list-style-position

书写顺序没有要求

```HTML
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>Document</title>
	<style>
/* 		li{
			list-style-type:decimal;
		} */	
		.first{
			list-style-type:circle;
		}
		.second{
			list-style-image:url(../images/male.gif);
		}
		.third{
			list-style-type:circle;
			list-style-position:inside;
		}
		.fourth{
			list-style:circle url(../images/female.gif)inside;
			/* list-style:none; */
		}
		.nav{
			/* list-style:none;
			float:left; */
		}
		.nav li{
			list-style:none;
			float:left;
			width:70px;
		}
	</style>
</head>
<body>
	<ul>
		<li class="first">hello</li>
		<li class="second">hello</li>
		<li class="third">hello</li>
		<li class="fourth">hello</li>
	</ul>
	<hr>
	<nav>
		<ul class="nav">
			<li>新闻</li>
			<li>小说</li>
			<li>艾瑞蒂</li>
			<li>政治</li>
			<li>学习</li>
		</ul>
	</nav>
</body>
</html>
```

### 4.5 表格属性

border-collapse:表格中相邻的边框是否合并(折叠)为单一边框

取值：separated(默认) collapse

## 5 盒子模型

### 5.1 简介

盒子模型是网页布局的基础，将页面中所有元素都看作是一个盒子，盒子都包含以下几个属性：

* width 宽度
* height 高度
* border 边框
* padding 内边距
* margin 外边距
  
### 5.2 盒子模型

#### 5.2.1 border

表示盒子的边框

分为四个方向：
    * 上top、右right、下bottom、左left
    * border-top、border-right、border-bottom、border-left

每个边框包含三种样式

    * border-top-color,border-top-width,border-top-style
    * border-right-color,border-right-width,border-right-style
    * border-left-color,border-left-width,border-left-style
    * border-bottom-color,border-bottom-width,border-bottom-style

style的取值：
    * solid 实线
    * dashed 虚线
    * dotted 点线
    * double 双线
    * inset 内嵌的3D线
    * outset 外嵌的3D线

简写，三种方式

    * 按方向简写：
        - border-top
        - border-right
        - border-bottom
        - border-left
        - 书写顺序：border-顺序:width style coloe
  
    * 按样式简写
        - border-color
        - border-width
        - border-style
        - 书写顺序：border-样式:top right bottom left
        - 必须按顺时针方向书写

    * 终极简写：
        如果四个边框样式完全相同，border:width style color

#### 5.2.2 padding

表示盒子的内边距，即内容与边框之间的距离

同样也分为四个方向，也可以简写(按顺时针方向，默认上下一样，左右一样)

注意：如果上下冲突，则以上为准，左右冲突则以左为准

#### 5.2.3 margin

表示盒子的外边距，即盒子与盒子之间的距离

同样也分为四个方向，也可以简写(按顺时针方向，默认上下一样，左右一样)

### 5.3 其他

#### 5.3.1 元素所占空间

页面中的元素实际所占的空间
    * 宽度＝width+左右padding＋左右border+左右margin
    * 高度＝height+上下padding＋上下border+上下margin

#### 5.3.2 盒子属性默认值

不同标签的盒子属性默认值可能不同，需要自己设置

```HTML
body,ul,ol,dl,li{
    margin:0;
    padding:0;
}
```

#### 5.3.3 外边距的合并

也称为外边距的折叠，指的是两个块级元素垂直外边距相遇时它们将合并为一个外边距

两种情况：
    * 当一个元素出现在另一个元素上面时，第一个元素的下边距与第二个元素的上边距会发生合并
    * 当一个元素包含在另一个元素中时，并且没有内边距或边框把外边距分隔开时，两个元素的上外边距会发生合并

*好处：更加美观*

## 6 定位方法

### 6.1 简介

通过position属性实现对元素的定位，有四种定位方法

常用取值：

|取值|含义|说明|
|:-- |:-- |:-- |
|static|默认值|按照常规文档流进行显示|
|relative|相对定位|相对于标签原来的位置进行的定位|
|absolute|绝对定位|相对于第一个非static定位的父标签的定位|
|fixed|固定定位|相对于浏览器窗口进行定位|

说到这里，你可能没听懂。所以我尝试用更通俗的语言再说一遍：

* static
    - 这是元素默认的状态。元素会按照从上到下、从左到右的顺序排列在页面中。
    - 不能使用top、right、bottom、left这些属性来移动元素的位置。
* relative
    - 元素仍然会占据原本的位置，但你可以通过top、right、bottom、left这些属性让它在自己的位置上“移动”一点。
    - 元素原本的位置依然保留，占据空间不变，只是视觉上会稍微移动。
* fixed
    - 元素会固定在浏览器窗口的某个位置，不管你怎么滚动页面，它都不会动。
    - 用来制作那些始终显示在某个位置的元素，比如导航栏或广告。
* absolute
    - 元素会相对于它的父元素进行定位，而这个父元素必须是用相对定位（relative）或绝对定位（absolute）来设置的。如果没有这样的父元素，它就会相对于整个页面定位。
    - 元素会脱离正常的排列顺序，你可以完全控制它在页面中的位置。

*举个例子*
    想象你在桌子上拜访物品
    * static：所有物品都按固定的顺序摆放，不能随意移动。
    * relative：你可以在桌子上的原位稍微移动某个物品，但它还是在桌子上那个位置。
    * fixed：你把物体用绳子从天花板吊着，不管你移动桌子上的其他物品或桌子，它都不会动。
    * absolute：你可以把物品放在桌子上的任何位置，不考虑它原本的摆放顺序，就像你可以在桌子上任意摆放东西。

设置定位方式后，还要设置定位属性：top,bottom,left,right

### 6.2 z-index

设置元素定位方式后，元素会浮在页面上方，此时可以通过z-index属性设置优先级，控制元素的堆叠排序

取值为数字，值越大优先级越高，默认为auto(大多数浏览器默认为0)

注意：只能给非static定位的元素设置z-index属性

## 7 其他css属性

### 7.1 浮动和清除

#### 7.1.1 浮动属性

通过float属性来实现元素的浮动，可以让块级元素脱离常规的文档流，向左或向右移动，在同一行显示

如果一行显示不下，则会换行

常用取值：
    * left
    * right
    * none

#### 7.1.2 清除属性

通过clear属性来实现清除，设置元素的哪一侧不允许有浮动元素

常用取值：
    * left
    * right
    * both
    * none(默认取值)

### 7.2 元素的显示和隐藏

#### 7.2.1 display

通过display属性设置元素是否显示，以及是否独占一行

常用取值：

|取值|含义|说明|
|:-- |:-- |:-- |
|none|不显示||
|inline|显示为内联元素，行级元素的默认值|将块级元素变为行级元素，不在独占一行|
|block|显示为块级元素，块级元素的默认值|将行级元素变为块级元素，独占一行|
|inline-block|显示为内联元素，但是可以设置宽和高|在inline基础上允许设置宽度和高度|

#### 7.2.2 visibility

常用属性

|取值|含义|说明|
|:--|:--|:--|
|visibility|显示||
|hidden|隐藏||

#### 7.2.3 区别

    * display隐藏时不再占据页面中的空间，后面的元素会占据其位置
    * visibility隐藏时会占据页面中的空间，位置还保留在页面中，知识不显示

### 7.3 轮廓

#### 7.3.1 简介

轮廓outline，用于在元素周围绘制一个轮廓，位于border外围，可以突出显示元素

#### 7.3.2 基本用法

常用属性：
    * outline-width：轮廓宽度
    * outline-color：轮廓颜色
    * outline-style：轮廓样式
    * outline 简写

在浏览器中，当鼠标单击或者使用<kbd>TAB<kbd>键获得焦点时，该元素会有一个轮廓outline

* 优点：可以提高使用表单的用户体验
* 缺点：有时影响美观

## 8 页面布局

### 8.1 简介

常见布局页面：<br>
    * 表格布局<br>
    * div布局

### 8.2 表格布局

#### 8.2.1 简介

不适用于复杂布局，仅用于简单、有规则的结构

定位相对准确，与浏览器基本无关，适用于简单分割

#### 8.2.2 用法

table常用样式的属性

    * border在表格外围设置边框
    * border-spacing设置单元格之间的距离(相当于table标签中的cellspacing属性，即间距)
    * border-collapse表格中相邻边框是否合并，取值：separate，collapse

### 8.3 div布局

定位绝对准确，使用灵活，适用于复杂的布局方式

#### 8.3.1 简单布局

两种形式：

    * 1-1-1布局

```HTML
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>Document</title>
	<link rel="stylesheet" href="css/style1.css">
</head>
<body>
	<div id="container">
		<header class="header">
			header
		</header>
		<article class="main">
			main
		</article>
		<footer class="footer">
			footer
		</footer>
	</div>
</body>
</html>
```

    * 1-2 / 3-1布局

```HTML
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>Document</title>
	 <link rel="stylesheet" href="css/style2.css"> 
</head>
<body>
	<div id="container">
		<header class="header">
			herder
		</header>
		<article class="wrapper">
			<section>
				main
			</section>
			<aside>
				right aside
			</aside>
		</article>
		<footer class="footer">
			footer
		</footer>
	</div>
</body>
</html>
```

#### 8.3.2 圣杯布局

页面结构，两边的边栏宽度固定，中间主体在一定范围内可自适应，并且主体优先被加载

一般防止页面缩放影响浏览，都会为页面设置一个最小宽度

```HTML
<!DOCTYPE html>
<html lang="en"> 
<head>
	<meta charset="UTF-8"> 
	<title>Document</title> 
	<link rel="stylesheet" href="css/style4.css"> 
</head> 
<body>
	<div id="container">
		<header class="header"> 
            header 
        </header> 
		<article class="wrapper"> 
			<section class="main">
				main
			</section>
			<aside class="left"> 
				left
			</aside>  
			<aside class="right"> 
				right
			</aside> 
		</article>
		<footer class="footer"> 
            footer 
        </footer>  
    </div>
</body> 
</html>
```

#### 8.3.3 双飞翼布局

源自淘宝的UED(用户体验设计)团队

双飞翼布局和圣杯布局要实现的效果是相同的，只是思路不同

圣杯布局和双飞翼布局的区别

双飞翼布局比圣杯布局多创建一个div

双飞翼布局不用设置内边距和相对定位，也不用设置偏移量

双飞翼布局使用的margin,圣杯布局使用的是padding

```HTML
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
    <title>Document</title> 
    <link rel="stylesheet" href="css/style5.css">
</head>
<body>
    <div id="container">
        <header class="header">
            header 
        </header> 
        <article class="wrapper">
            <section class="main">
                <div class="main-wrapper">
                    main 
                </div> 
            </section>
            <aside class="left">
                left aside
            </aside>
            <aside class="right">
                right aside 
            </aside>
        </article>
        <footer class="footer">
            footer 
        </footer> 
    </div>
    </body>
</html>
```