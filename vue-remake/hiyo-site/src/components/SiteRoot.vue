<script setup>
// Imports
import { onMounted, ref, reactive, watchEffect, onUnmounted } from "vue";
import { useRouter } from "vue-router";
import { hiBreakpoints } from "@/reuseLogic/mobile";
import { loadingStates } from "@/states/load.js";
import SiteContent from "./child/SiteContent.vue";
import LoadingScreen from "./err-load/LoadingScreen.vue";

// Val from imports
const { innerWidth, innerHeight, screenType } = hiBreakpoints(),
  router = useRouter(),
  root = ref(null),
  contentContainer = ref(null),
  loadState = loadingStates();

let patternPos = reactive({
  backgroundPosition: "50% 1%",
}),

  center = {
    x: innerWidth / 2,
    y: innerHeight / 2,
  },

  contentParallax = reactive({
    top: "0px",
    left: "0px",
    transformOrigin: `${center.x}px ${center.y}px`,
  }),

  padding = reactive({
    paddingBottom: "0px",
  }),

  pointer = {
    x: 0,
    y: 0,
  },

  prevOrient = reactive({
    beta: 0,
    gamma: 0,
  }),

  currentOrient = reactive({
    beta: 0,
    gamma: 0,
  }),

  anchorOrient = reactive({
    beta: 0,
    gamma: 0,
  }),

  statsForGeeks = reactive({
    hasRotationEvent: false,
    showRotationEventValue: false
  })

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
  currentOrient.beta = Math.floor(ev.beta) + 180
  currentOrient.gamma = Math.floor(ev.gamma) + 90

  if (prevOrient.beta === 0 && prevOrient.gamma === 0) {
    statsForGeeks.hasRotationEvent = true
    prevOrient.beta = currentOrient.beta;
    prevOrient.gamma = currentOrient.gamma
    anchorOrient.beta = currentOrient.beta
    anchorOrient.gamma = currentOrient.gamma
  }
  if (
    currentOrient.beta !== prevOrient.beta ||
    currentOrient.gamma !== prevOrient.gamma
  ) {
    if (319 <= currentOrient.beta && currentOrient.beta <= 359 && 0 <= anchorOrient.beta && anchorOrient.beta <= 40) {
      anchorOrient.beta = anchorOrient.beta + 360
    }
    if (0 <= currentOrient.beta && currentOrient.beta <= 40 && 360 <= anchorOrient.beta) {
      anchorOrient.beta = anchorOrient.beta - 360
    }
    if (0 <= currentOrient.beta && currentOrient.beta <= 40 && 319 <= anchorOrient.beta && anchorOrient.beta <= 359) {
      anchorOrient.beta = anchorOrient.beta - 360
    }
    if (319 <= currentOrient.beta && currentOrient.beta <= 359 && anchorOrient.beta <= 0) {
      anchorOrient.beta = anchorOrient.beta + 360
    }
    if (139 <= currentOrient.gamma && currentOrient.gamma <= 179 && 0 <= anchorOrient.gamma && anchorOrient.gamma <= 40) {
      anchorOrient.gamma = anchorOrient.gamma + 180
    }
    if (0 <= currentOrient.gamma && currentOrient.gamma <= 40 && 180 <= anchorOrient.gamma) {
      anchorOrient.gamma = anchorOrient.gamma - 180
    }
    if (0 <= currentOrient.gamma && currentOrient.gamma <= 40 && 139 <= anchorOrient.gamma && anchorOrient.gamma <= 179) {
      anchorOrient.gamma = anchorOrient.gamma - 180
    }
    if (139 <= currentOrient.gamma && currentOrient.gamma <= 179 && anchorOrient.gamma <= 0) {
      anchorOrient.gamma = anchorOrient.gamma + 180
    }
    if (currentOrient.beta - anchorOrient.beta >= 40) {
      anchorOrient.beta = currentOrient.beta - 40;
    }
    if (anchorOrient.beta - currentOrient.beta >= 40) {
      anchorOrient.beta = currentOrient.beta + 40;
    }
    if (currentOrient.gamma - anchorOrient.gamma >= 40) {
      anchorOrient.gamma = currentOrient.gamma - 40;
      console.log('5')
    }
    if (anchorOrient.gamma - currentOrient.gamma >= 40) {
      anchorOrient.gamma = currentOrient.gamma + 40;
      console.log('6')
    }
    // console.log(currentOrient, anchorOrient);

    rotParallaxMove();

    prevOrient.beta = currentOrient.beta;
    prevOrient.gamma = currentOrient.gamma
  }
}

function rotParallaxMove() {
  let mapBetaY =
    ((currentOrient.beta - (anchorOrient.beta - 40)) / 80) *
    innerHeight;
  let mapGammaX =
    ((currentOrient.gamma - (anchorOrient.gamma - 40)) / 80) *
    innerWidth;
  // patternPos.backgroundPosition = `${
  //   center.x + (mapGammaX - center.x) / 40.125
  // }px ${center.y + (mapBetaY - center.y) / 40.125}px`;
  contentParallax.top = ((innerHeight / 2 - mapBetaY) * -1) / 7.5 + "px";
  contentParallax.left = ((center.x - mapGammaX) * -1) / 7.5 + "px";
  padding.paddingBottom = (mapBetaY / innerHeight) * -75 + 75 + "px";
}

function onResizeWindow() {
  center.x = window.innerWidth / 2;
  contentParallax.transformOrigin = `${center.x}px ${innerHeight / 2 + contentContainer.value.scrollTop
    }px`;
  parallaxEffect();
}

function onScroll() {
  center.y = innerHeight / 2 - contentContainer.value.scrollTop / 10;
  contentParallax.transformOrigin = `${innerWidth / 2}px ${innerHeight / 2 + contentContainer.value.scrollTop
    }px`;
  patternPos.backgroundPosition = `${center.x + (pointer.x - center.x) / 100
    }px ${center.y + (pointer.y - center.y) / 100}px`;
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
  patternPos.backgroundPosition = `${center.x + (pointer.x - center.x) / 160.5
    }px ${center.y + (pointer.y - center.y) / 160.5}px`;
  contentParallax.top = ((innerHeight / 2 - pointer.y) * -1) / 30 + "px";
  contentParallax.left = ((center.x - pointer.x) * -1) / 30 + "px";
  padding.paddingBottom = (pointer.y / innerHeight) * -75 + 75 + "px";
}
</script>
<template>
  <div ref="root">
    <!-- Use Navigation Bar if screen less than 550, otherwise use Navigation Rail -->
    <div class="hi-flex hi-height-100" :class="[screenType === 'xs' ? 'hi-flex-column' : 'hi-flex-row']">
      <div :class="[screenType === 'xs' ? 'hi-nav-bar' : 'hi-nav-rail']" class="hi-flex">
        <button class="hi-nav-btn" :class="{ 'hi-nav-btn-active': item.active }" v-for="(item, index) in railItems"
          :key="index" @click="setActive(item.name)">
          {{ item.name }}
        </button>
      </div>
      <div ref="contentContainer" style="
          overflow-y: scroll;
          overflow-x: hidden;
          position: relative;
          width: 100vw;
          height: 100vh;
        " class="hi-flex hi-flex-column content-parent">
        <div style="position: absolute" class="content" :style="contentParallax">
          <LoadingScreen />
          <SiteContent class="site-content" :style="padding" />
        </div>
      </div>
      <div class="dots-pattern" :style="patternPos"></div>
    </div>
    <span v-if="statsForGeeks.hasRotationEvent" style="position:fixed;top:5px;left:5px;font-size:smaller">
      <label for="geek">Show rotation handler values</label>
      <input v-model="statsForGeeks.showRotationEventValue" type="checkbox" id="geek" name="geek">
      <br /><br />
      <span v-if="statsForGeeks.showRotationEventValue">
        curr: <br />
        beta:
        {{ currentOrient.beta }}<br />
        gamma:
        {{ currentOrient.gamma }}<br /><br />
        prev:<br />
        beta:
        {{ prevOrient.beta }}<br />
        gamma:
        {{ prevOrient.gamma }}<br /><br />
        anchor:<br />
        beta:
        {{ anchorOrient.beta }}<br />
        gamma:
        {{ anchorOrient.gamma }}<br />
      </span>
    </span>
  </div>
</template>
