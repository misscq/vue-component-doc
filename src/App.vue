<template>
  <a-config-provider>
    <router-view />
  </a-config-provider>
</template>
<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  setup() {
    return {
      locale: "zh-CN",
    };
  },
});
</script>

<style scoped></style>
