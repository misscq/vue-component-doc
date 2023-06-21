<template>
  <header class="header">
    <a-row :style="{ flexFlow: 'nowrap', height: 64 }">
      <a-col :xxxl="4" :xxl="4" :xl="5" :lg="6" :md="6" :sm="24" :xs="24">
        <div class="logo">LS 组件库</div>
      </a-col>
      <a-col
        :xxxl="20"
        :xxl="20"
        :xl="19"
        :lg="18"
        :md="18"
        :sm="24"
        :xs="24"
        class="menu-row"
      >
        <SearchBox key="search" @triggerFocus="onTriggerSearching" />
        <Menu />
      </a-col>
    </a-row>
  </header>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import SearchBox from "./SearchBox.vue";
import Menu from "./Menu.vue";

export default defineComponent({
  components: {
    SearchBox,
    Menu,
  },
  setup() {
    const searching = ref(false);
    const onTriggerSearching = (value: boolean) => {
      searching.value = value;
    };
    return { onTriggerSearching };
  },
});
</script>

<style lang="less" scoped>
.header {
  position: relative;
  z-index: 10;
  max-width: 100%;
  background: #fff;
  box-shadow: 0 2px 8px rgba(240, 241, 242, 65);

  .menu-row {
    display: flex;
    align-items: center;
    margin: 0;

    > * {
      flex: none;
      margin: 0 16px 0 0;

      &:last-child {
        margin-right: 40px;
      }
    }
  }

  // Adjust github button style

  .ant-row-rtl {
    .menu-row {
      > * {
        &:last-child {
          margin-right: 16px;
          margin-left: 40px;
        }
      }
    }
  }

  .logo {
    height: 100%;
    text-align: center;
    font-size: 20px;
    font-weight: bold;
    line-height: 64px;
  }
}
</style>
