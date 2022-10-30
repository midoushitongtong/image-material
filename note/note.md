### 课程带来的收获

项目的基本搭建设计

数十种业务模型对应的解决方案

数十种组件的构建思路

### vite（新的项目构建方案）

vite 为什么那么快？

- webpack 在开发构建的时候，会抓取构建整个应用，然后才能提供服务，`也正是这个原因，项目越大，启动的时间就越长`
- vite 在开发构建的时候，不会抓取构建整个应用，就能提供服务，一开始只会构建必须要构建的内容，`后续由浏览器承包了构建的服务，正是这个原因，无论项目多大，他只会一开始只构建必须要构建的内容，所以启动的时间就大大减少`

vite 快的机制会存在那些问题？

- vite 既然以 ESM 的方式为浏览器提供源代码，让浏览器承包了构建的服务，`如果项目存在 CommonJS 的代码应该怎么办呢？是不是意味着无法构建`，是的！

官方如何解决这些问题？

- vite 提供了依赖预构建的功能，目前 vite 会将 CommonJs 或 UMD 的依赖项转为 ESM 后，在重新进行编译

### tailwindcss

简介

- tailwindcss 是一个 class 工具集，内置了丰富的样式，帮助我们快速开发

tailwindcss 的设计理念

- 每一个类名就代表一组 css 属性，这个样式在 tailwindcss 中被称为`原子化 css`

- 前端 css 颗粒度发展史，颗粒度自上而下逐渐增大，颗粒度越大约束性越高，可定制性越弱

  1. 行内样式, 优点：可定制性最强，缺点：复用性最差

     ```html
     <div style="color: blue;">123</div>
     ```

  2. 原子化样式，优点：可定制性强，利于复用，缺点：会造成大量的类名

     ```html
     <div class="text-blue">123</div>
     ```

  3. 传统样式，优点：封装性强，语义化强，缺点：可定制性一般，自由度较一般，大量的 html 需要大量语义化的 class

     ```html
     <div class="container">123</div>
     ```

  4. 组件样式，优点：封装性强，语义化强，缺点：可定制性最差，自由度最差，一般用于组件库，风格较为死板

     ```html
     <button>123</button>
     ```

### prettier

简介

- prettier 工具用来处理代码格式化问题，让代码变得更漂亮

### 目录结构

- 目录

  ```
  |-	src
  |	|- 	apis // api 请求
  |	|- 	assets // 静态资源
  |	|	|-	icons // 图标
  |	|	|-	images // 图片
  |	|- 	components // 业务组件
  |	|- 	constants // 常量
  |	|- 	directives // 指令
  |	|- 	hooks // 钩子工具
  |	|- 	layouts // 布局组件
  |	|- 	router // 路由
  |	|	|-	index.ts // 路由核心文件
  |	|	|-	resources // 路由模块资源
  |	|	|	|-	routes.ts // 路由表
  |	|- 	store // 状态管理
  |	|	|-	index.ts // 状态管理核心文件
  |	|	|-	resources // 状态管理模块资源
  |	|	|	|-	app // 存放 app 相关的状态
  |	|-	styles // 样式文件
  |	|- 	utils // 工具库
  |	|- 	vendors // 外部供应资源
  |	|- 	views // 页面组件
  |	|- 	App.vue // 根组件
  |	|- 	permission.ts // 权限控制中心
  ```

### 自动注册组件

- 自动注册 components 下的所有组件

  ```
  // 1. 拿到当前路径下 components 目录中所有的 .vue 文件
  const components = import.meta.glob('./components/**/*.vue');
  // 2. 遍历获取到的组件
  for (const [fullPath, fn] of Object.entries(components)) {
     const componentName = fullPath.split('/').slice(-1)[0].split('.')[0];
     const component = defineAsyncComponent(fn as any);
     // 3. 利用 app.component 来注册组件
     app.component(componentName, component);
  }
  ```

### 什么是物料

- 我们可以将组件，模板等一些的资源统称为物料，基于这些物料可以快速创建项目，进行页面搭建，完成构建并发布上线
