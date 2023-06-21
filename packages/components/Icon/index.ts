import type { App } from "vue";

import Icon from "./src/Icon.vue";
import SvgIcon from "./src/SvgIcon.vue";
import IconPicker from "./src/IconPicker.vue";

export { Icon, IconPicker, SvgIcon };

Icon.install = function (app: App) {
  app.component(Icon.name, Icon);
  return app;
};
SvgIcon.install = function (app: App) {
  app.component(Icon.name, Icon);
  return app;
};

IconPicker.install = function (app: App) {
  app.component(Icon.name, Icon);
  return app;
};

export default Icon;
