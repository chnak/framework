# framework

##一个nodejs搭建的快速web服务开发架构


###nodejs 层优点：


1.用到jaydata这个orm架构


2.在app.js直接引人常用的库，在controllers中开发的时候不需要引入重复的库，只需要在方法中直接this即可得到在app.js 定义中引入的库；


3.controllers 路由控制及权限控制更加方便明确，直接在controllers/index.js 中定义即可


###前端优点：


1、采用UIkit作为CSS框架


2、采用require.js标准模块化加载


3、采用PJAX局部加载框架，使页面加载更快速，比单页应用框架更加容易控制权限！！！


4、采用knockoutjs 双向绑定的MVVM框架，支持双向绑定部件化；