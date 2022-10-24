<script setup>
import { loadingStates } from "@/states/load.js";
import { storeToRefs } from "pinia";
import { computed, reactive, watchEffect } from "vue";

const loadState = loadingStates();
const { projects, title, doneLoading, loadingProgress } =
  storeToRefs(loadState);

let showLoading = reactive({
  opacity: 1,
  display: "flex",
});

watchEffect(() => {
  if (projects.value && title.value) {
    showLoading.opacity = 0;
    setTimeout(() => {
      showLoading.display = "none";
    }, 500);
  }
});
</script>
<template>
  <div
    class="loading-screen hi-flex-column hi-justify-center hi-align-center"
    :style="showLoading"
  >
    <span>{{ loadingProgress }}%</span>
  </div>
</template>
