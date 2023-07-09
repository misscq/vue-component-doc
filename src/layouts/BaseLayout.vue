<template>
  <div>
    <HeaderCom :name="name" />
    <div style="padding: 20px; margin: 0 auto; width: 960px">
      <router-view />
    </div>
    <FooterCom />
  </div>
</template>

<script lang="ts" setup name="BaseLayout">
// import Header from "../components/header";
// import Footer from "./Footer.vue";
// import NProgress from "nprogress";

defineProps({
  name: String,
});
mountedCallback();

function mountedCallback() {
  // NProgress?.done();
  document.documentElement.scrollTop = 0;
}
</script>
