/* eslint-disable @typescript-eslint/no-var-requires */
const globby = require("globby");
const fs = require("fs");
const path = require("path");
const matter = require("gray-matter");
const { ESLint } = require("eslint");

(async () => {
  const paths = await globby("packages/components/*/index.*.md");
  const components = {};

  paths.forEach((path) => {
    const content = fs.readFileSync(path).toString();
    const componentName = path.split("/")[2];

    if (componentName !== "color-picker") {
      const { data } = matter(content);
      components[componentName] = { ...components[componentName], ...data };
    }
  });

  const TEMPLATE = `
  export default [
    ${Object.keys(components).map(
      (component) => `
    {
      path: '${component}:lang(-cn)?',
      meta: ${JSON.stringify(components[component])},
      component: () => import('../../packages/components/${component}/demo/index.vue'),
    }`,
    )}
  ];`;

  const engine = new ESLint({
    fix: true,
    useEslintrc: false,
    baseConfig: require(path.join(process.cwd(), ".eslintrc.js")),
  });

  const report = await engine.lintText(TEMPLATE);

  fs.writeFileSync("src/router/demoRoutes.js", report[0].output);
})();