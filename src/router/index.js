import { createRouter, createWebHistory } from "vue-router";
import HomePage from "../pages/HomePage.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomePage,
    },
    // // Use this style to lazy-load them mfs
    // {
    //   path: "/me",
    //   name: "about-me",
    //   component: () => import("../components/child/AboutMe.vue"),
    // },
  ],
});

export default router;
