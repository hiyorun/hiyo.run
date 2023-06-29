<script setup>
import { onMounted, reactive } from 'vue';
import { usePrompt } from './states/prompts.js'
import LoadingIndicator from './components/err-load/LoadingIndicator.vue'

const firstTake = reactive({
  initiated: false
}),
  prompt = usePrompt()

onMounted(() => {
  getPrompts()
  setTimeout(() => {
    firstTake.initiated = true
  }, 1000)
})

function getPrompts() {
  fetch(
    "https://raw.githubusercontent.com/hiyorun/site-prompts/main/prompts.json"
  )
    .then((response) => response.json())
    .then((data) => prompt.storePrompts(data.prompts))
    .catch((e) => console.error("error at get prompts:", e))
    .finally(() => prompt.choosePrompt)
}
</script>
<template>
  <LoadingIndicator class="absolute m-3 z-50"/>
  <router-view :class="[firstTake.initiated ? 'smoothing opacity-1' : 'opacity-0']"></router-view>
</template>
