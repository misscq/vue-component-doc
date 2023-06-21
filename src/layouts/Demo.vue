<template>
  <article>
    <section class="markdown">
      <h1>
        {{ frontmatter.title }}
        <span class="subtitle">{{ frontmatter.subtitle }}</span>
      </h1>
      <section class="markdown" v-html="description"></section>
    </section>
    <section class="markdown">
      <h2>代码演示</h2>
    </section>
    <slot />
    <section class="markdown api-container" v-html="api"></section>
  </article>
</template>
<script lang="ts">
import { defineComponent, computed } from "vue";
import { useRoute } from "vue-router";

export default defineComponent({
  name: "Demo",
  props: ["pageData"],
  setup(props) {
    const route = useRoute();
    const frontmatter = computed(() => props?.pageData?.frontmatter || {});
    const docHtml = computed(() => {
      return props?.pageData?.html || "";
    });
    const description = computed(() => {
      return docHtml.value.split(
        '<h2 id="API">API <a class="header-anchor" href="#API">'
      )[0];
    });
    const api = computed(() => {
      return `
      <h2 id="API"><span>API</span><a href="#API" class="anchor">#</a></h2>
      ${
        docHtml.value.split(
          '<h2 id="API">API <a class="header-anchor" href="#API">'
        )[1]
      }
      `;
    });
    return { frontmatter, description, api, route, docHtml };
  },
});
</script>
<style lang="less" scoped>
.code-boxes-col-2-1 {
  display: inline-block;
  vertical-align: top;
}
</style>
