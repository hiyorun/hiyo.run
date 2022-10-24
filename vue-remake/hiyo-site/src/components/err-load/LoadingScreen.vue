<script setup>
import { loadingStates } from "@/states/load.js";
import { prompt as promptState } from "@/states/prompts.js";
import { storeToRefs } from "pinia";
import { onMounted, reactive, watchEffect } from "vue";

const loadState = loadingStates();
const { prompt } = storeToRefs(promptState());
const { projects, title, loadingProgress } = storeToRefs(loadState);

let prompts = [];

let showLoading = reactive({
  opacity: 1,
  display: "flex",
});

onMounted(() => {
  fetch(
    "https://raw.githubusercontent.com/hiyorun/hiyorun.github.io/prompts/prompts.json"
  )
    .then((response) => response.json())
    .then((data) => {
      prompts = data.prompts;
    })
    .catch((e) => console.error("Error lol", e))
    .finally(() => {
      let Rand = Math.floor(Math.random() * prompts.length);
      prompt.value = prompts[Rand];
      console.log(prompt, prompts, Rand);
    });
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
    <!-- <span>{{ loadingProgress }}%</span> -->
    <h4>
      <i>"{{ prompt }}"</i>
    </h4>
    <div class="loading-bar-container">
      <div class="loading-bar" :style="{ width: loadingProgress + '%' }"></div>
    </div>
  </div>
</template>
