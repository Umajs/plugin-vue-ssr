# @umajs/plugin-vue-ssr
> 针对Umajs提供vue服务端渲染模式的插件，插件基于服务端渲染骨架工具[Srejs](https://github.com/dazjean/srejs)开发。

## 插件介绍
`plugin-vue-ssr`插件扩展了`Umajs`中提供的统一返回处理`Result`对象，新增了`vue`页面组件渲染方法，可在`controller`自由调用,使用类似传统模板引擎；也同时将方法挂载到了koa中间件中的`ctx`对象上；当一些公关的页面组件，比如404、异常提示页面、登录或者需要在中间件中拦截跳转时可以在`middleware`中调用。

## 插件安装

```
 yarn add @umajs/plugin-vue-ssr --save
```
## 插件配置
```ts
    // plugin.config.ts
    export default <{ [key: string]: TPluginConfig }>{
        vue: {
            enable:true,
            options:{
                rootDir:'web', // 客户端页面组件根文件夹
                rootNode:'app', // 客户端页面挂载根元素ID
                ssr: true, // 全局开启服务端渲染
                cache: false, // 全局使用服务端渲染缓存 开发环境设置true无效
                prefixCDN: '/' // 客户端代码部署CDN前缀
            }
        }
    };
```
## 目录结构
框架默认配置属性`rootDir`默认为根目录下`web`，pages下是页面组件入口，比如`list`页面，vue主入口文件为`list/index.js`，页面组件为`list/App.vue`
```
└── web
    └── pages
        └── list
            ├── App.vue
            ├── index.js
```

## 页面组件(App.vue)
```vue
<template>
 <!--vue2.0版本APP.vue必须要设置根元素-->
  <div id ='app'>
    <h1>{{msg}}</h1>
  </div>
</template>

<script>
  export default {
    name: 'app',
    data () {
		return {
			'msg' : 'hi vue ssr!'
		}
    },
  }
</script>
```

## 页面主入口文件(index.js)
```js
import App from './App.vue';
export default {
    App, // 必须导出App
    Router, //如使用vue-router 导出路由配置对象
    Store, //如使用vuex 导出store对象
};
```
`Pages`下按照文件夹名称定义vue页面组件，每一个页面组件必须包含`inde.js`主入口文件,文件必须导出组件`App`。如果使用`vue-router`,则将路由配置导出为``Router``对象；当使用`vuex`时，则将初始化配置导出为`Store`。


## 插件使用
```ts
import { BaseController, Path } from '@umajs/core';
import { Result } from '../plugins/vue-ssr';

export default class Index extends BaseController {
    @Path('/')
    index() {
        return Result.vue('index', { title: 'umajs-vue-ssr'});
    }
}

```

## **[官网使用文档](https://umajs.gitee.io/%E6%9C%8D%E5%8A%A1%E7%AB%AF%E6%B8%B2%E6%9F%93/vue-ssr.html)**

## 案例
- [css-module](https://github.com/dazjean/Srejs/tree/mian/example/uma--vue-css-module)
- [vuex](https://github.com/dazjean/Srejs/tree/mian/example/uma-vue-vuex)
- [vue-router](https://github.com/dazjean/Srejs/tree/mian/example/uma-vue-router)
- [elementUI](https://github.com/dazjean/Srejs/tree/mian/example/uma-elementUI)
- [ant-design-vue](https://github.com/dazjean/Srejs/tree/mian/example/uma-ant-design-vue)
