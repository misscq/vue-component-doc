<template>
  <a-menu
    :inline-indent="30"
    class="aside-container menu-site"
    mode="inline"
    :selected-keys="[activeMenuItem]"
  >
    <a-menu-item v-if="showOverview" key="/components/overview">
      <router-link to="/components/overview"> 组件总览 </router-link>
    </a-menu-item>
    <template v-for="m in menus">
      <template v-if="m.children">
        <a-menu-item-group :key="m.order" :title="m.title">
          <template v-for="n in m.children">
            <a-menu-item v-if="n.path" :key="n.path">
              <a v-if="n.target" :target="n.target" :href="n.path">
                <span>{{ n.title }}</span>
                <span class="chinese">{{ n.subtitle }}</span>
              </a>
              <router-link v-else :to="n.path">
                <span>{{ n.title }}</span>
                <span class="chinese">{{ n.subtitle }}</span>
              </router-link>
            </a-menu-item>
          </template>
        </a-menu-item-group>
      </template>
      <template v-else>
        <a-menu-item :key="m.path">
          <a v-if="m.target" :target="m.target" :href="m.path">
            {{ `${m.title} ${m.subtitle || ""}` }}
          </a>
          <router-link v-else :to="m.path">
            {{ `${m.title} ${m.subtitle || ""}` }}
          </router-link>
        </a-menu-item>
      </template>
    </template>
  </a-menu>
</template>
<script lang="ts">
import { computed, defineComponent, watch } from "vue";
import { useRoute } from "vue-router";
export default defineComponent({
  name: "Menu",
  props: ["menus", "activeMenuItem"],
  setup(props) {
    const route = useRoute();
    const showOverview = computed(() => {
      return route.path.indexOf("/components") === 0;
    });
    watch(
      [() => props.activeMenuItem, () => props.menus],
      () => {
        const menus = props.menus.reduce(
          (pre: any, current: { children: any }) => [
            ...pre,
            current,
            ...(current.children || []),
          ],
          [
            {
              path: "/components/overview",
              title: "组件总览",
              enTitle: "Components Overview",
            },
          ]
        );
        const item = menus.find(
          (m: { path: any }) => m.path === props.activeMenuItem
        );
        let title = "";
        if (item && item.title) {
          title = `${item.subtitle || ""} ${item.title}`;
        }
        document.title = title.trim();
      },
      { immediate: true, flush: "post" }
    );
    return {
      showOverview,
    };
  },
});
</script>
<style lang="less" scoped></style>
