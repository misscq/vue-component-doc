<template>
  <div id="search-box" class="search-box">
    <SearchOutlined />
    <a-input
      ref="inputRef"
      placeholder="搜索文档"
      @focus="triggerFocus(true)"
      @blue="triggerFocus(false)"
    ></a-input>
  </div>
</template>
<script lang="ts" setup name="SearchBox">
import { ref } from "vue";
import { SearchOutlined } from "@ant-design/icons-vue";

const emit = defineEmits(["triggerFocus"]);
const inputRef = ref();
const focused = ref(false);
function triggerFocus(focus: boolean) {
  focused.value = focus;
  emit("triggerFocus", focus);
}
</script>
<style lang="less" scoped>
.search-box {
  position: relative;
  display: flex;
  flex: auto !important;
  align-items: center;
  height: 22px;
  margin: 0 auto 0 0 !important;
  padding-left: 16px;
  line-height: 22px;
  white-space: nowrap;
  border-left: 1px solid #f0f0f0;
  transition: width 0.5s;

  .ant-row-rtl & {
    margin: 0 0 0 auto !important;
    padding-right: 16px;
    padding-left: 0;
    border-right: 1px solid #f0f0f0;
    border-left: none;
  }

  > * {
    flex: auto;
  }

  .anticon {
    position: absolute;
    top: 50%;
    z-index: 1;
    flex: none;
    color: #ced4d9;
    transform: translateY(-50%);
    pointer-events: none;
  }

  input {
    width: 100%;
    max-width: 200px;
    padding-left: 20px;
    font-size: 14px;
    background: transparent;
    border: 0;
    box-shadow: none;

    .ant-row-rtl & {
      padding-right: 20px;
      padding-left: 11px;
    }

    &::placeholder {
      color: #a3b1bf;
    }
  }
}
</style>
