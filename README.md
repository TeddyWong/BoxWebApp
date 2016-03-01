# 语戏PC端读我文档

基于 ReactJS、Amaze UI 组件、Webpack（with 'React Hot Loader'）、react-router、Facebook官方Flux改版、Electron实现等开源前端技术开发。

支持的浏览器版本：
```
IE：最低IE9，6、7、8均不支持，用户需要下载Desktop client
Chrome
Firefox
Safari
360浏览器
QQ浏览器
搜狗浏览器
2345浏览器
```

**目前只包含WebApp客户端代码（3月10日第一版）。**

**Desktop client计划3月20日发布预览版**

## 目录结构

项目文件放在 `app` 目录下：

```
./app                 // Web App的主目录
  ├── /css            // 三方库的CSS文件
  ├── /devtests       // 独立组件开发测试文件存放目录
  ├── /fonts          // 三方库的CSS中用到的图标字体文件
  ├── /images         // 三方库的图片，也可以放项目的图片图标
  ├── /js             // 编译后的js文件，自动生成的
  ├── /vender         // 三方库，react等
  ├── dev.html        // 开发环境访问的入口页面
  ├── index.html      // 生产和测试环境访问的入口页面
  └── robots.txt      // 用于搜索引擎SEO，暂时空着先
./src                 // **开发工作目录**
  ├── /components     // App里面公用的组件库都在这里放
  ├── /css            // App里面公用的样式库都放在本目录下的app.css中
  ├── /ctls           // 所有的View Controller都放在这个目录下
  ├── /pages          // react的jsx文件都放在这里，可以细分目录
  ├── /stores         // 放store的目录
  └── main.jsx        // App的主入口文件，所有的入口文件都放到src根目录下
./appconfig.js        // App配置文件，多入口文件和Alias等，给Webpack使用
./index.html          // 开发期测试引导页
./package.json        // NPM management
./README.md           // This file you are reading
./server.js           // 基于Nodejs的开发服务器
./webpack.config.dev.js // Webpack开发期配置文件
./webpack.config.js   // Webpack发布配置文件
```

## 使用说明

**首先你得有装nodejs在你的Mac上，自行脑补使用brew安装nodejs的知识，如果已经安装过了，请先执行**
```
brew doctor
```
**来检查你的brew环境是否正确，如果有warning，请参照warning内容自行调整环境。
之后请执行**
```
brew update
brew upgrade
```
**来更新你的环境到最新版本。**

### 安装依赖：

```
npm install
```
### 启动实时调试：

```
npm start
```

### 启动独立组件开发模式：
```
npm run cp
```

### 静态打包和编译混淆
```
npm run build
```
之后可以启动服务：
```
npm start
```
进入<http://localhost:3000>可以看到两个连接，根据自己需要进入。

***自动更新服务开启不需要先编译，别浪费你的时间！！！***

****

## appconfig.js配置介绍：
```javascript
defaultDevServer: {
  defaultIP: 'localhost', //默认开发服务地址
  defaultPort: 3000,      //默认开发服务端口
  apiHost: 'open.iciba.com',  //API主机名称和端口
  apiAddress: 'http://open.iciba.com:80/', //API访问协议和主机以及端口，用于开发期代理访问后端API，解决开发期API跨域调用问题，要和上面地址对应
  apiBashPath: '/dsapi/*',   //API访问路径，要和真实的地址一致
  gatewayHost: 'Teedys-MacBook-Pro.local' //如果通过网关转内网，需要在这里配置网关域名或IP
},
alias: {
  'AppCss': path.resolve(__dirname, 'src/css/app'),
  ..........
  ........
  //这里配置各个模块的私有css用于模块import
},
entry: {
  app: path.resolve(__dirname, 'src/main'),
  .....
  ......
  //这里配置独立的入口js，一般来说，有几个独立HTML页面，就有几个入口
}
```
***

*请大家把平时开发中碰到的问题和解决方案写到Keng.md中，便于后续开发和维护*

***

## 重要概念介绍

1. Flux增强单向数据（动作）循环解释：
由于采用了Flux架构设计思想，全部应用的数据都是单向流动，最终形成完整数据流动闭环。

如下图：
>  View --(dom event)--> Controller --(action)--> Store  
>   ^                                               |
>   |---------------------------------------------update
>


## 开发期资源导航

> 1. [图标库](http://fontawesome.io/icons/)
> 2. [React(英文)）](https://facebook.github.io/react/)
> 3. [React(中文)](http://reactjs.cn/react/docs/getting-started.html)
> 4. [React Router](https://github.com/reactjs/react-router)
> 5. [妹子UI](http://amazeui.org/react/components)
> 6. [If else等控制标签的使用说明](https://www.npmjs.com/package/jsx-control-statements)
> 7. [superagent(ajax)库使用教程(中文)](https://cnodejs.org/topic/5378720ed6e2d16149fa16bd)
> 8. [N多React系列组件](https://js.coach/)
> 9. [Web App solutions(中文)](https://github.com/teambition/webapp-solutions)
