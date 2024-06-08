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
    {
      path: "/code",
      name: "code-works",
      component: () => import('../pages/CodePage.vue')
    },
    {
      path: "/code/:id",
      name: "code-details",
      component: () => import('../pages/CodeDetails.vue')
    },
    {
      path: "/illust",
      name: "illustrations",
      component: () => import('../pages/IllustPage.vue')
    }
  ],
  scrollBehavior(to, from, savedPosition) {
    if (to.hash) {
      return {
        el: to.hash,
        behavior: 'smooth',
      }
    }
  },
});

export default router;
