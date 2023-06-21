import { createApp } from "vue";
import App from "./App.vue";
import Antd from "ant-design-vue";
import router from "./router";
import demoBox from "./components/DemoBox.vue";
import demoContainer from "./components/demoContainer.vue";
import demoSort from "./components/demoSort.jsx";
import clipboard from "./directives/clipboard";
import components from "../packages/components";

const app = createApp(App);
app.use(Antd);
app.use(clipboard);
app.component("DemoBox", demoBox);
app.component("DemoContainer", demoContainer);
app.component("DemoSort", demoSort);
app.component("VNodes", function (_, { attrs: { value } }) {
  return value;
});

app.use(router);
app.use(components);
app.mount("#app");
