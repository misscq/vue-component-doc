import { createRouter, createWebHashHistory } from "vue-router";
import type { RouteRecordRaw } from "vue-router";

import Layout from "../layouts/index.vue";
import demoRoutes from "./demoRoutes";
const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "index",
    redirect: "/components/customDemo",
  },
  {
    path: "/components",
    component: Layout,
    children: [
      {
        path: "overview:lang(.*)",
        component: () => import("../views/ComponentOverview.vue"),
      },
      ...demoRoutes,
    ],
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
