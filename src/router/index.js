import { createRouter, createWebHistory } from "vue-router";
import HomePage from "../pages/HomePage.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomePage,
      meta: {
        title: "Hiyorun",
        metaTags: [
          {
            name: 'description',
            content: "Hiyorun's (or Hiyorrun's) little world, a log of my thoughts and dreams. Dive in, an adventure awaits!"
          },
          {
            property: 'og:description',
            content: "Hiyorun's (or Hiyorrun's) little world, a log of my thoughts and dreams. Dive in, an adventure awaits!"
          }
        ]
      }
    },
    {
      path: "/code",
      name: "code-works",
      component: () => import('../pages/CodePage.vue'),
      meta: {
        title: "Under the Digital Hood",
        metaTags: [
          {
            name: 'description',
            content: "A glimpse into my code works. Collections of what I have learned throughout my digital journey."
          },
          {
            property: 'og:description',
            content: "A glimpse into my code works. Collections of what I have learned throughout my digital journey."
          }
        ]
      }
    },
    {
      path: "/code/:id",
      name: "code-details",
      component: () => import('../pages/CodeDetails.vue')
    },
    {
      path: "/illust",
      name: "illustrations",
      component: () => import('../pages/IllustPage.vue'),
      meta: {
        title: "The Dance of the Digital Strokes",
        metaTags: [
          {
            name: 'description',
            content: "A gallery of my imaginations. Where I let it run wild on a canvas of pixels."
          },
          {
            property: 'og:description',
            content: "A gallery of my imaginations. Where I let it run wild on a canvas of pixels."
          }
        ]
      }
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

router.beforeEach((to, from, next) => {
  const nearestWithTitle = to.matched.slice().reverse().find(r => r.meta && r.meta.title);
  const nearestWithMeta = to.matched.slice().reverse().find(r => r.meta && r.meta.metaTags);
  const previousNearestWithMeta = from.matched.slice().reverse().find(r => r.meta && r.meta.metaTags);

  if (nearestWithTitle) {
    document.title = nearestWithTitle.meta.title;
  } else if (previousNearestWithMeta) {
    document.title = previousNearestWithMeta.meta.title;
  }
  Array.from(document.querySelectorAll('[data-vue-router-controlled]')).map(el => el.parentNode.removeChild(el));

  if (!nearestWithMeta) return next();

  nearestWithMeta.meta.metaTags.map(tagDef => {
    const tag = document.createElement('meta');
    Object.keys(tagDef).forEach(key => {
      tag.setAttribute(key, tagDef[key]);
    });
    tag.setAttribute('data-vue-router-controlled', '');
    return tag;
  }).forEach(tag => document.head.appendChild(tag));

  next();
});

export default router;
