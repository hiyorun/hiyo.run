<script setup>
import { computed, onMounted, ref, watchEffect } from "vue";
import { storeToRefs } from "pinia";
import { hiBreakpoints } from "@/reuseLogic/mobile";
import { loadingStates } from "@/states/load.js";
import { prompt as promptState } from "@/states/prompts.js";

const titleAnim = ref(null);
const loadState = loadingStates();
const { prompt } = storeToRefs(promptState());
const { projects, title } = storeToRefs(loadingStates());
const { screenType } = hiBreakpoints();

const logoWidth = computed(() => {
  switch (screenType.value) {
    case "xs":
      return { width: "400px" };
    case "md":
      return { width: "600px" };
    default:
      return { width: "800px" };
  }
});

watchEffect(() => {
  if (projects.value && title.value) {
    titleAnim.value.play();
  }
});

onMounted(() => {
  titleAnim.value.addEventListener("loadeddata", () => {
    loadState.$patch({ title: true });
  });
});
</script>
<template>
  <div class="hi-flex hi-flex-column hi-align-center hi-justify-center content">
    <div>
      <video muted ref="titleAnim" class="white-imgs" :style="logoWidth">
        <source src="../../assets/imgs/title.webm" type="video/webm" />
        Your browser does not support the video tag.
      </video>
    </div>
    <span>"{{ prompt }}"</span>
  </div>
</template>
