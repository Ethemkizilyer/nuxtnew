import { createRouter, createWebHistory } from "vue-router";
import Error from "@/views/Error.vue";
const routes = [
  {
    path: "/agent/:uuid",
    name: "Agent",

    pages: () => import("../pages/agent/[uuid].vue"),
    props: true,
  },
  {
    path: "/:catchAll(.*)",
    name: "Error",
    component: Error,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
