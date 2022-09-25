<script setup>
import { ref, watchEffect } from "vue";
import { useRouter } from "vue-router";
import { hiBreakpoints } from "../reuseLogic/mobile";

// Val from imports
const { screenType } = hiBreakpoints();
const router = useRouter();

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

// Functions
watchEffect(() => {
  let currentRoute = router.currentRoute.value.path;
  setActive(currentRoute);
});

function setActive(path) {
  railItems.value.forEach((item, index) => {
    if (item.route === path) {
      railItems.value[index].active = true;
      return;
    }
    railItems.value[index].active = false;
  });
}
</script>
<template>
  <!-- Use Navigation Bar if screen less than 550, otherwise use Navigation Rail -->
  <div
    class="hi-flex hi-height-100"
    :class="[screenType === 'xs' ? 'hi-flex-column' : 'hi-flex-row']"
  >
    <div
      :class="[screenType === 'xs' ? 'hi-nav-bar' : 'hi-nav-rail']"
      class="hi-flex"
    >
      <router-link
        class="hi-nav-btn"
        :class="{ 'hi-nav-btn-active': item.active }"
        v-for="(item, index) in railItems"
        :key="index"
        :to="item.route"
        @click="setActive(item.route)"
      >
        <span class="material-symbols-outlined hi-nav-btn-icon">
          {{ item.icon }}
        </span>
        {{ item.name }}
      </router-link>
    </div>
    <router-view
      style="overflow-x: hidden; overflow-y: scroll; flex-grow: 1"
    ></router-view>
  </div>
</template>
