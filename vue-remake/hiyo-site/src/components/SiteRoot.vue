<script setup>
// Imports
import { onMounted, ref, reactive, watchEffect, onUnmounted } from "vue";
import { useRouter } from "vue-router";
import { hiBreakpoints } from "@/reuseLogic/mobile";
import { loadingStates } from "@/states/load.js";
import SiteContent from "./child/SiteContent.vue";
import LoadingScreen from "./err-load/LoadingScreen.vue";

// Val from imports
const { innerWidth, innerHeight, screenType } = hiBreakpoints();
const router = useRouter();
const root = ref(null);
const contentContainer = ref(null);
const loadState = loadingStates();

let patternPos = reactive({
  backgroundPosition: "50% 1%",
});

let center = {
  x: innerWidth / 2,
  y: innerHeight / 2,
};

let contentParallax = reactive({
  top: "0px",
  left: "0px",
  transformOrigin: `${center.x}px ${center.y}px`,
});

let padding = reactive({
  paddingBottom: "0px",
});

let pointer = {
  x: 0,
  y: 0,
};

let prevOrient = reactive({
  beta: 0,
  gamma: 0,
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

// Vue
watchEffect(() => {
  let currentRoute = router.currentRoute.value.path;
  setActive(currentRoute);
});

onMounted(() => {
  window.addEventListener("deviceorientation", rotationParallax);

  window.addEventListener("resize", onResizeWindow);

  patternPos.backgroundPosition = `${center.x}px ${center.y}px`;
  contentContainer.value.addEventListener("scroll", onScroll);

  root.value.addEventListener("pointermove", onPointerMove);
});

onUnmounted(() => {
  // window.removeEventListener("deviceorientation", rotationParallax);
  // window.removeEventListener("resize", onResizeWindow);
  // contentContainer.value.removeEventListener("scroll", onScroll);
  // root.value.removeEventListener("mousemove", onPointerMove);
  loadState.$reset;
});

// Functions
function rotationParallax(ev) {
  let currentOrient = {
    beta: Math.floor(ev.beta),
    gamma: Math.floor(ev.gamma),
  };
  if (prevOrient.beta === 0 && prevOrient.gamma === 0) {
    prevOrient = currentOrient;
  }
  if (
    currentOrient.beta !== prevOrient.beta ||
    currentOrient.gamma !== prevOrient.gamma
  ) {
    console.log(currentOrient);
    prevOrient = currentOrient;
  }
}

function onResizeWindow() {
  center.x = window.innerWidth / 2;
  contentParallax.transformOrigin = `${center.x}px ${
    innerHeight / 2 + contentContainer.value.scrollTop
  }px`;
  parallaxEffect();
}

function onScroll() {
  // console.log(contentContainer.value.scrollTop);
  center.y = innerHeight / 2 - contentContainer.value.scrollTop / 10;
  contentParallax.transformOrigin = `${innerWidth / 2}px ${
    innerHeight / 2 + contentContainer.value.scrollTop
  }px`;
  patternPos.backgroundPosition = `${
    center.x + (pointer.x - center.x) / 30
  }px ${center.y + (pointer.y - center.y) / 30}px`;
}

function onPointerMove(ev) {
  if (ev.pointerType !== "touch") {
    pointer.x = ev.clientX;
    pointer.y = ev.clientY;
    parallaxEffect();
  }
}

function setActive(path) {
  railItems.value.forEach((item, index) => {
    if (item.name === path) {
      railItems.value[index].active = true;
      return;
    }
    railItems.value[index].active = false;
  });
}

function parallaxEffect() {
  // console.log("params", x, y);
  // console.log("backgroundPos", patternPos.backgroundPosition);
  // console.log("client size", innerHeight, innerWidth);
  patternPos.backgroundPosition = `${
    center.x + (pointer.x - center.x) / 30
  }px ${center.y + (pointer.y - center.y) / 30}px`;
  contentParallax.top = ((innerHeight / 2 - pointer.y) * -1) / 15 + "px";
  contentParallax.left = ((center.x - pointer.x) * -1) / 15 + "px";
  padding.paddingBottom = (pointer.y / innerHeight) * -75 + 75 + "px";
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
          {{ item.name }}
        </button>
      </div>
      <div
        ref="contentContainer"
        style="
          overflow-y: scroll;
          overflow-x: hidden;
          position: relative;
          width: 100vw;
          height: 100vh;
        "
        class="hi-flex hi-flex-column content-parent"
      >
        <div
          style="position: absolute"
          class="content"
          :style="contentParallax"
        >
          <LoadingScreen />
          <SiteContent class="site-content" :style="padding" />
        </div>
      </div>
      <div class="dots-pattern" :style="patternPos"></div>
    </div>
  </div>
</template>