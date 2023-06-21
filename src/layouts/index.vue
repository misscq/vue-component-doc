<template>
  <Header />
  <div class="main-wrapper">
    <a-row>
      <a-col :span="4" class="main-menu">
        <Menu :menus="dataSource" :active-menu-item="activeMenuItem" />
      </a-col>
      <a-col :span="20">
        <section :class="mainContainerClass">
          <Box v-if="isDemo" :page-data="pageData">
            <component :is="matchCom" />
          </Box>
          <router-view v-else />
          <a-affix v-if="headers.length" class="toc-affix" :offset-top="20">
            <a-anchor>
              <a-anchor-link
                v-for="h in headers"
                :key="h.title"
                :href="h.href || `#${slugifyTitle(h.title)}`"
                :target="h.target"
              >
                <template #title>
                  <LinkOutlined v-if="h.target" />
                  {{ isZhCN ? h.title : h.enTitle || h.title }}
                </template>
              </a-anchor-link>
            </a-anchor>
          </a-affix>
        </section>
        <a-back-top />
        <PrevAndNext
          :menus="menus"
          :current-menu-index="currentMenuIndex"
          :is-zh-c-n="isZhCN"
        />
      </a-col>
    </a-row>
  </div>
</template>

<script script lang="ts">
import { defineComponent, ref, computed, provide, watch } from "vue";
import { useRoute } from "vue-router";

import Header from "./header/index.vue";
import Menu from "./Menu.vue";
import PrevAndNext from "./PrevAndNext.vue";
import Demo from "./Demo.vue";
import Box from "./Box.vue";

import { LinkOutlined } from "@ant-design/icons-vue";

import useMenus from "../hooks/useMenus";

const rControl = /[\u0000-\u001f]/g;
const rSpecial = /[\s~`!@#$%^&*()\-_+=[\]{}|\\;:"'<>,.?/]+/g;

export default defineComponent({
  name: "Layout",
  components: {
    Demo,
    Header,
    Menu,
    PrevAndNext,
    LinkOutlined,
    Box,
  },
  setup() {
    const visible = ref(false);
    const route = useRoute();
    const { menus, activeMenuItem, currentMenuIndex, dataSource } = useMenus();
    console.log("dataSource", dataSource);

    const demos = ref<any[]>([]);
    provide("addDemosInfo", (info: any) => {
      if (!demos.value.find((d) => d.href === info.href)) {
        console.log(info.href);
        demos.value.push(info);
      }
    });

    watch(
      () => route.path,
      () => {
        demos.value.length = 0;
      }
    );

    const isDemo = computed(() => {
      return (
        route.path.indexOf("/components") === 0 &&
        route.path.indexOf("/components/overview") !== 0
      );
    });
    const matchCom = computed(() => {
      console.log("route", route);
      return route.matched[route.matched.length - 1]?.components?.default;
    });
    console.log("matchCom", matchCom);
    const isZhCN = ref(true);
    const pageData = computed(() =>
      isDemo.value
        ? (matchCom.value as any)["CN"]?.pageData
        : (matchCom.value as any)?.pageData
    );
    const headers = computed(() => {
      let tempHeaders = (pageData.value?.headers || []).filter(
        (h: Header) => h.level === 2
      );
      if (isDemo.value) {
        tempHeaders = [...demos.value];
        tempHeaders.push({ title: "API", href: "#API" });
      }
      return tempHeaders;
    });
    const mainContainerClass = computed(() => {
      return {
        "main-container": true,
        "main-container-component": isDemo.value,
      };
    });
    const handleClickShowButton = () => {
      visible.value = !visible.value;
    };
    return {
      slugifyTitle: (str: string) => {
        return (
          str
            // Remove control characters
            .replace(rControl, "")
            // Replace special characters
            .replace(rSpecial, "-")
            // Remove continuos separators
            .replace(/\-{2,}/g, "-")
            // Remove prefixing and trailing separtors
            .replace(/^\-+|\-+$/g, "")
            // ensure it doesn't start with a number (#121)
            .replace(/^(\d)/, "_$1")
        );
      },
      visible,
      isZhCN,
      mainContainerClass,
      menus,
      currentMenuIndex,
      activeMenuItem,
      isDemo,
      matchCom,
      pageData,
      dataSource,
      headers,
      handleClickShowButton,
      iconStyle: {
        // color: '#fff',
        fontSize: "20px",
      },
    };
  },
});
</script>

<style lang="less" scoped>
.main-wrapper {
  padding-top: 40px;
}

.main-container {
  padding: 0 200px 144px 64px;
  min-height: 500px;
  overflow: hidden;
  background: #fff;
  position: relative;

  .toc-affix {
    width: 150px;
    position: fixed;
    top: 100px;
    right: 10px;
  }
}

.toc-affix :deep(.ant-anchor) {
  font-size: 12px;
  max-width: 110px;

  .ant-anchor-link {
    border-left: 2px solid #f0f0f0;
    padding: 4px 0 4px 16px;
  }

  .ant-anchor-link-active {
    border-left: 2px solid #1890ff;
  }

  .ant-anchor-ink::before {
    display: none;
  }

  .ant-anchor-ink-ball {
    display: none;
  }
}

[data-theme="dark"] .toc-affix :deep(.ant-anchor) {
  .ant-anchor-link {
    border-left: 2px solid #303030;
  }

  .ant-anchor-link-active {
    border-left: 2px solid #177ddc;
  }
}

.prev-next-nav {
  margin-left: 64px;
  margin-right: 64px;
  overflow: hidden;
  font-size: 14px;
  border-top: 1px solid #ebedf0;
}
</style>
