<template>
  <section :id="sectionId" class="code-box">
    <section class="code-box-demo">
      <template v-if="iframeDemo[iframeDemoKey]">
        <div class="browser-mockup with-url">
          <iframe :src="iframeDemo[iframeDemoKey]" :height="iframeHeight" />
        </div>
      </template>
      <template v-else>
        <slot />
      </template>
    </section>
    <section class="code-box-meta markdown">
      <div class="code-box-title">
        <a :href="`#${sectionId}`">{{ title }}</a>
      </div>
      <div class="code-box-description" v-html="docHtml"></div>
      <div class="code-box-actions">
        <a-tooltip
          title="复制"
          :visible="copyTooltipVisible"
          @visibleChange="onCopyTooltipVisibleChange"
        >
          <component
            :is="
              copied && copyTooltipVisible
                ? 'CheckOutlined'
                : 'SnippetsOutlined'
            "
            key="copy"
            v-clipboard:copy="type === 'TS' ? sourceCode : jsSourceCode"
            v-clipboard:success="handleCodeCopied"
            class="code-box-code-copy code-box-code-action"
          />
        </a-tooltip>
        <a-tooltip :title="`${codeExpand ? '收起代码' : '展示代码'}`">
          <span class="code-expand-icon code-box-code-action">
            <img
              alt="expand code"
              :src="
                theme === 'dark'
                  ? 'https://gw.alipayobjects.com/zos/antfincdn/btT3qDZn1U/wSAkBuJFbdxsosKKpqyq.svg'
                  : 'https://gw.alipayobjects.com/zos/antfincdn/Z5c7kzvi30/expand.svg'
              "
              :class="
                codeExpand ? 'code-expand-icon-hide' : 'code-expand-icon-show'
              "
              @click="handleCodeExpand"
            />
            <img
              alt="expand code"
              :src="
                theme === 'dark'
                  ? 'https://gw.alipayobjects.com/zos/antfincdn/CjZPwcKUG3/OpROPHYqWmrMDBFMZtKF.svg'
                  : 'https://gw.alipayobjects.com/zos/antfincdn/4zAaozCvUH/unexpand.svg'
              "
              :class="
                codeExpand ? 'code-expand-icon-show' : 'code-expand-icon-hide'
              "
              @click="handleCodeExpand"
            />
          </span>
        </a-tooltip>
      </div>
    </section>
    <section v-show="codeExpand" :class="highlightClass">
      <div ref="codeRef" class="highlight">
        <slot v-if="type === 'TS'" name="htmlCode" />
        <slot v-else name="jsVersionHtml" />
      </div>
    </section>
  </section>
</template>

<script lang="ts">
import { computed, defineComponent, inject, onMounted, ref } from "vue";
import {
  CheckOutlined,
  SnippetsOutlined,
  // CodeSandboxOutlined,
} from "@ant-design/icons-vue";
// import { getCodeSandboxParams } from "../utils/generateOnlineDemo";

export default defineComponent({
  name: "DemoBox",
  components: {
    CheckOutlined,
    SnippetsOutlined,
    // CodeSandboxOutlined,
  },
  props: {
    jsfiddle: Object,
  },
  setup(props) {
    const codeExpand = ref(false);
    const type = ref("TS");

    const copyTooltipVisible = ref(false);
    const copied = ref(false);
    const codeRef = ref<HTMLDivElement>();
    const sectionId = computed(() => {
      const relativePath = props.jsfiddle?.relativePath || "";
      return `${relativePath
        .split("/")
        .slice(1)
        .join("-")
        .replace(".vue", "")}`;
    });
    const iframeHeight = computed(() => props.jsfiddle?.iframe);
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    const addDemosInfo: any = inject("addDemosInfo", () => {});

    const title = computed(
      () =>
        props.jsfiddle && props.jsfiddle.title && props.jsfiddle?.title["zh-CN"]
    );
    const iframeDemoKey = computed(() => {
      return (
        props.jsfiddle &&
        props.jsfiddle.title &&
        props.jsfiddle?.title["en-US"] &&
        String(props.jsfiddle?.title["en-US"])
          .split(" ")
          .join("-")
          .toLowerCase()
      );
    });
    const onCopyTooltipVisibleChange = (visible: boolean) => {
      if (visible) {
        copyTooltipVisible.value = visible;
        copied.value = false;
      } else {
        copyTooltipVisible.value = visible;
      }
    };
    const docHtml = computed(() =>
      props.jsfiddle && props.jsfiddle.docHtml
        ? (
            props.jsfiddle.docHtml.replace(
              `<h2 id="zh-CN">zh-CN <a class="header-anchor" href="#zh-CN">
          <span aria-hidden="true" class="anchor">#</span>
        </a></h2>`,
              ""
            )
              .split(`<h2 id="en-US">en-US <a class="header-anchor" href="#en-US">
          <span aria-hidden="true" class="anchor">#</span>
        </a></h2>`)[0] || ""
          ).trim()
        : ""
    );
    const handleCodeExpand = () => {
      codeExpand.value = !codeExpand.value;
    };
    const handleCodeCopied = () => {
      copied.value = true;
    };
    const handleChangeType = () => {
      type.value = type.value === "TS" ? "JS" : "TS";
    };
    const highlightClass = computed(() => {
      return {
        "highlight-wrapper": true,
        "highlight-wrapper-expand": codeExpand.value,
      };
    });
    const iframeDemo = inject("iframeDemo", {});
    onMounted(() => {
      addDemosInfo({
        href: `#${sectionId.value}`,
        title,
      });
    });
    const theme = computed(
      () => inject("themeMode", { theme: ref("default") }).theme.value
    );
    return {
      docHtml,
      iframeDemo,
      iframeDemoKey,
      iframeHeight,
      theme,
      type,
      sectionId,
      title,
      codeExpand,
      copyTooltipVisible,
      copied,
      onCopyTooltipVisibleChange,
      handleCodeExpand,
      handleCodeCopied,
      handleChangeType,
      highlightClass,
      sourceCode: decodeURIComponent(
        escape(window.atob(props.jsfiddle?.sourceCode))
      ),
      jsSourceCode: decodeURIComponent(
        escape(window.atob(props.jsfiddle?.jsSourceCode))
      ),
      codeRef,
    };
  },
});
</script>

<style lang="less" scoped>
.code-box {
  border: 1px solid #ebedf0;
  border-radius: 2px;
  display: inline-block;
  width: 100%;
  position: relative;
  margin: 0 0 16px;
  transition: all 0.2s;

  .code-box-demo {
    border-bottom: 1px solid #ebedf0;
    padding: 42px 24px 50px;
    color: rgba(0, 0, 0, 0.65);
  }
  .code-box-meta {
    p {
      margin: 0;
      width: 98%;
    }
  }
  .code-box-meta.markdown {
    position: relative;
    width: 100%;
    font-size: 14px;
    border-radius: 0 0 2px 2px;
    transition: background-color 0.4s;
  }

  .code-box-meta .code-box-description {
    padding: 8px;
  }
  .code-box-meta .code-box-title {
    position: absolute;
    top: -14px;
    padding: 1px 8px;
    margin-left: 16px;
    color: #777;
    border-radius: 2px 2px 0 0;
    background: #fff;
    font-size: 14px;
    width: auto;
  }

  .code-box-meta .demo-description > p,
  .code-box-meta > p {
    font-size: 12px;
    margin: 0.5em 0;
    padding: 18px 24px 12px;
    width: 100%;
    word-break: break-word;
  }

  .code-box-actions {
    padding-top: 12px;
    text-align: center;
    opacity: 0.7;
    transition: opacity 0.3s;
  }

  .code-box-actions,
  .code-box .highlight:not(:first-child) {
    border-top: 1px dashed #ebedf0;
  }
  .code-box .code-expand-icon {
    cursor: pointer;
  }

  .code-box-actions > form,
  .code-box-actions > i,
  .code-box-actions > span {
    position: relative;
    display: inline-block;
    width: 16px;
    height: 16px;
    margin-left: 16px;
    vertical-align: top;
  }

  .code-expand-icon-hide,
  .code-expand-icon-show {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    max-width: 100%;
    margin: 0;
    box-shadow: none;
    transition: all 0.4s;
    -webkit-user-select: none;
    -moz-user-select: none;
    user-select: none;
  }

  .code-expand-icon-hide {
    opacity: 0;
    pointer-events: none;
  }
}
/deep/ .highlight-wrapper {
  pre {
    padding: 12px 20px;
    overflow: auto;
    // .tag {
    //   color: #f81d22;
    // }
    // .attr-name{
    //   color:#0b8235;
    // }
  }
}
.token.boolean,
.token.constant,
.token.deleted,
.token.number,
.token.property,
.token.symbol,
.token.tag {
  color: #f81d22;
}
</style>
