<template>
  <a-config-provider :locale="locale">
    <router-view />
  </a-config-provider>
</template>
<script lang="ts" setup>
const locale = "zh-CN";
</script>
