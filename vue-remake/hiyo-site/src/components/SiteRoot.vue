<script setup>
// Component imports
import HomePage from "./child/HomePage.vue";

import { onMounted, ref, reactive, watchEffect } from "vue";
import { useRouter } from "vue-router";
import { hiBreakpoints } from "../reuseLogic/mobile";

// Val from imports
const { innerWidth, innerHeight, screenType } = hiBreakpoints();
const router = useRouter();
const root = ref(null);
const dotsPattern = ref(null);
let xBefore = -1;
let yBefore = -1;
let patternPos = reactive({
  backgroundPosition: "50% 1%",
});

// Local var
const railItems = ref([
  {
    name: "Home",
    icon: "home",
    route: "/",
    active: false,
  },
  {
    name: "Projects",
    icon: "folder",
    route: "/projects",
    active: false,
  },
  {
    name: "Me",
    icon: "help",
    route: "/me",
    active: false,
  },
]);

// Vue directives

onMounted(() => {
  // window.addEventListener("deviceorientation", (ev) => {

  // });
  root.value.addEventListener("pointermove", (ev) => {
    let pointerX = ev.clientX;
    let pointerY = ev.clientY;
    let x = pointerX / innerWidth;
    let y = pointerY / innerHeight;
    parallaxEffect(x, y);
  });
});

watchEffect(() => {
  let currentRoute = router.currentRoute.value.path;
  setActive(currentRoute);
});

// Functions

function setActive(path) {
  railItems.value.forEach((item, index) => {
    if (item.name === path) {
      railItems.value[index].active = true;
      return;
    }
    railItems.value[index].active = false;
  });
}

function parallaxEffect(x, y) {
  // if (xBefore === -1 && yBefore === -1) {
  //   xBefore = x;
  //   yBefore = y;
  //   return;
  // }

  let xIncrement = x;
  let yIncrement = y;
  xBefore = x;
  yBefore = y;
  console.log(xIncrement, yIncrement);
  patternPos.backgroundPosition = `${50 + xIncrement}px ${50 + yIncrement}px`;
}
</script>
<template>
  <div ref="root">
    <!-- Use Navigation Bar if screen less than 550, otherwise use Navigation Rail -->
    <div
      class="hi-flex hi-height-100"
      :class="[screenType === 'xs' ? 'hi-flex-column' : 'hi-flex-row']"
    >
      <div
        :class="[screenType === 'xs' ? 'hi-nav-bar' : 'hi-nav-rail']"
        class="hi-flex"
      >
        <button
          class="hi-nav-btn"
          :class="{ 'hi-nav-btn-active': item.active }"
          v-for="(item, index) in railItems"
          :key="index"
          @click="setActive(item.name)"
        >
          <span class="material-symbols-outl<HomePage />ined hi-nav-btn-icon">
            {{ item.icon }}
          </span>
          {{ item.name }}
        </button>
      </div>
      <div>
        <HomePage class="content" />
      </div>
      <div ref="dotsPattern" class="dots-pattern" :style="patternPos"></div>
    </div>
  </div>
</template>
