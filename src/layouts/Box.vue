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
  name: "Box",
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
    console.log("description", description);
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

.markdown {
  color: #314659;
  font-size: 14px;
  line-height: 2;
  h1 {
    color: #0d1a26;
    font-weight: 500;
    margin-bottom: 20px;
    margin-top: 8px;
    font-family: Avenir, -apple-system, BlinkMacSystemFont, Segoe UI,
      PingFang SC, Hiragino Sans GB, Microsoft YaHei, Helvetica Neue, Helvetica,
      Arial, sans-serif, Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol;
    font-size: 30px;
    font-variant: tabular-nums;
    line-height: 38px;
  }

  p,
  pre {
    margin: 1em 0;
    text-align: left;
  }
  h2,
  h3,
  h4,
  h5,
  h6 {
    color: #0d1a26;
    font-family: Avenir, -apple-system, BlinkMacSystemFont, Segoe UI,
      PingFang SC, Hiragino Sans GB, Microsoft YaHei, Helvetica Neue, Helvetica,
      Arial, sans-serif, Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol;
    font-variant: tabular-nums;
    margin: 1.6em 0 0.6em;
    font-weight: 500;
    clear: both;
  }
}

/deep/ .markdown.api-container {
  table {
    font-size: 14px;
    line-height: 1.5;
    font-family: SFMono-Regular, Consolas, Liberation Mono, Menlo, Courier,
      monospace;
    border-width: 0;
    margin: 2em 0;
    td,
    th {
      padding: 14px 16px;
      border-width: 1px 0;
      border-color: #e8e8e8;
    }
  }
}

/deep/.api-container table {
  border-collapse: collapse;
  border-spacing: 0;
  empty-cells: show;
  border: 1px solid #ebedf0;
  width: 100%;
  margin: 8px 0 16px;

  th {
    white-space: nowrap;
    color: #5c6b77;
    font-weight: 500;
    background: rgba(0, 0, 0, 0.02);
    border: 1px solid #ebedf0;
    text-align: left;
  }

  td {
    padding: 14px 16px;
    border-width: 1px 0;
    border-color: #e8e8e8;
  }

  td:nth-child(3) {
    width: 22%;
    color: #c41d7f;
    font-size: 13px;
  }
}
</style>
