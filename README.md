
# 文档中心

## 项目主要目录

```
├─plugin // 插件
├─public // 公共资源
├─scripts // 自动生成路由js
├─packages // 自动生成路由js
│    ├─components // 所有组件
│    │  └─customDemo // 组件文件夹
│    │      ├─demo // 使用组件的示例 必须文件夹
│    │      │  └─index.vue // 示例入口文件 必须文件
│    │      ├─style // 样式文件
│    │      ├─ src 组件源代码
│    │      ├─index.ts // 组件入口文件
│    │      ├─index.zh-CN.md // 组件说明文档
│    ├─utils // 组件使用的工具类
└─src
    ├─assets // 静态资源
    ├─components // 包裹组件示例的组件
    ├─directives // 指令文件夹
    ├─docBoxComponent // 包裹组件示例的组件
    ├─hooks
    ├─layouts
    ├─router 
    └─views // 页面
```

## 编写组件规范

1. 每个自定义组件需要有demo文件夹和index.ts入口文件以及index.zh-CN.md组件说明文件
2. index.ts文件中要包含组件的安装install方法以及导出组件

```
CustomDemo.install = function (app: App) {
  app.component(CustomDemo.name, CustomDemo);
  return app;
};
```

3. components文件夹下的index.ts导出所有组件

```
import type { App } from "vue";

import * as components from "./components";
export * from "./components";

export const install = function (app: App) {
  Object.keys(components).forEach((key) => {
    const component = components[key];
    if (component.install) {
      app.use(component);
    }
  });
  return app;
};
export default {
  install,
};
```

4. 在main.ts中全局注册所有组件

```
import components from "./components";
app.use(components);
```
