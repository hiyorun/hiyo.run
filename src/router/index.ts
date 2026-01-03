import { createRouter, createWebHistory, type RouteLocationNormalized } from 'vue-router';
import HomePage from '../pages/HomePage.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomePage,
      meta: {
        title: 'Hiyorun',
        metaTags: [
          {
            name: 'description',
            property: 'description',
            content:
              "Hiyorun's (or Hiyorrun's) little world, a log of my thoughts and dreams. Dive in, an adventure awaits!",
          },
          {
            property: 'og:title',
            content: 'Hiyorun',
          },
          {
            property: 'og:description',
            content:
              "Hiyorun's (or Hiyorrun's) little world, a log of my thoughts and dreams. Dive in, an adventure awaits!",
          },
          {
            property: 'twitter:title',
            content: 'Hiyorun',
          },
          {
            property: 'twitter:description',
            content:
              "Hiyorun's (or Hiyorrun's) little world, a log of my thoughts and dreams. Dive in, an adventure awaits!",
          },
        ],
      },
    },
    {
      path: '/code',
      name: 'code-works',
      component: () => import('../pages/CodePage.vue'),
      meta: {
        title: 'Under the Digital Hood',
        metaTags: [
          {
            name: 'description',
            property: 'description',
            content:
              'A glimpse into my code works. Collections of what I have learned throughout my digital journey.',
          },
          {
            property: 'og:title',
            content: 'Under the Digital Hood',
          },
          {
            property: 'og:description',
            content:
              'A glimpse into my code works. Collections of what I have learned throughout my digital journey.',
          },
          {
            property: 'twitter:title',
            content: 'Under the Digital Hood',
          },
          {
            property: 'twitter:description',
            content:
              'A glimpse into my code works. Collections of what I have learned throughout my digital journey.',
          },
        ],
      },
    },
    {
      path: '/code/:id',
      name: 'code-details',
      component: () => import('../pages/CodeDetails.vue'),
    },
    {
      path: '/illust',
      name: 'illustrations',
      component: () => import('../pages/IllustPage.vue'),
      meta: {
        title: 'The Dance of the Digital Strokes',
        metaTags: [
          {
            name: 'description',
            property: 'description',
            content: 'A gallery of my imaginations. Where I let it run wild on a canvas of pixels.',
          },
          {
            property: 'og:title',
            content: 'The Dance of the Digital Strokes',
          },
          {
            property: 'og:description',
            content: 'A gallery of my imaginations. Where I let it run wild on a canvas of pixels.',
          },
          {
            property: 'twitter:title',
            content: 'The Dance of the Digital Strokes',
          },
          {
            property: 'twitter:description',
            content: 'A gallery of my imaginations. Where I let it run wild on a canvas of pixels.',
          },
        ],
      },
    },
  ],
  scrollBehavior(to) {
    if (to.hash) {
      return {
        el: to.hash,
        behavior: 'smooth',
      };
    }
  },
});

router.beforeEach((to: RouteLocationNormalized, from: RouteLocationNormalized) => {
  const nearestWithTitle = [...to.matched].reverse().find((r) => r.meta.title);
  const nearestWithMeta = [...to.matched].reverse().find((r) => r.meta.metaTags);
  const previousNearestWithMeta = [...from.matched].reverse().find((r) => r.meta.metaTags);

  if (nearestWithTitle?.meta.title) {
    document.title = nearestWithTitle.meta.title;
  } else if (previousNearestWithMeta?.meta.title) {
    document.title = previousNearestWithMeta.meta.title;
  }

  document.querySelectorAll('[data-vue-router-controlled]').forEach((el) => el.remove());

  if (!nearestWithMeta?.meta.metaTags) return;

  nearestWithMeta.meta.metaTags
    .map((tagDef) => {
      const tag = document.createElement('meta');

      Object.entries(tagDef).forEach(([key, value]) => {
        tag.setAttribute(key, value);
      });

      tag.setAttribute('data-vue-router-controlled', '');
      return tag;
    })
    .forEach((tag) => document.head.appendChild(tag));
});
export default router;
