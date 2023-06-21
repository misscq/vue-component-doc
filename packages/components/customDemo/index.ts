import type { App } from "vue";
import CustomDemo from "./CustomDemo";
export type { CustomDemoProps } from "./CustomDemo";

CustomDemo.install = function (app: App) {
  app.component(CustomDemo.name, CustomDemo);
  return app;
};

export default CustomDemo as typeof CustomDemo;
