import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/agent/:uuid",
    name: "Agent",

    pages: () =>
      import("../pages/agent/[uuid].vue"),
    props: true,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
