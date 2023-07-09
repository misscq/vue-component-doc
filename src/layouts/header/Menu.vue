<template>
  <a-menu
    class="nav menu-site"
    mode="horizontal"
    :selected-keys="[activeMenuItem]"
    disabled-overflow
  >
    <!-- <a-menu-item key="docs/vue">
      <router-link to="/docs/vue/introduce-cn"> 文档 </router-link>
    </a-menu-item> -->
    <a-menu-item key="components">
      <router-link to="/components/overview/"> 组件 </router-link>
    </a-menu-item>
  </a-menu>
</template>
<script lang="ts" setup name="HeaderMenu">
import { ref, watch } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();
const activeMenuItem = ref("home");
watch(
  () => route.path,
  (pathname) => {
    const modules = pathname.split("/");
    if (pathname === "/docs/resources" || pathname === "/docs/resources-cn") {
      activeMenuItem.value = "docs/resources";
    } else if (modules[1] === "components") {
      activeMenuItem.value = "components";
    } else if (modules[1] === "docs") {
      activeMenuItem.value = `${modules[1]}/${modules[2]}`;
    } else {
      activeMenuItem.value = "home";
    }
  },
  // eslint-disable-next-line comma-dangle
  { immediate: true }
);
</script>
<style lang="less" scoped>
.nav {
  height: 100%;
  font-size: 14px;
  border: 0;

  &.ant-menu-horizontal {
    border-bottom: none;

    & > .ant-menu-item,
    & > .ant-menu-submenu {
      min-width: (40px + 12px * 2);
      height: 64px;
      padding-right: 12px;
      padding-left: 12px;
      line-height: 64px;

      &::after {
        top: 0;
        right: 12px;
        bottom: auto;
        left: 12px;
        border-width: 2px;
      }
    }

    & .ant-menu-submenu-title .anticon {
      margin: 0;
    }

    & > .ant-menu-item-selected {
      a {
        color: #1890ff;
      }
    }
  }

  & > .ant-menu-item,
  & > .ant-menu-submenu {
    text-align: center;
  }
}
</style>
