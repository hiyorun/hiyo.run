<script setup>
import { onMounted, reactive } from 'vue';
import { usePrompt } from './states/prompts.js'
import { useBusy } from '@/states/busy.js'
import LoadingIndicator from './components/err-load/LoadingIndicator.vue'

const prompt = usePrompt(),
  busy = useBusy()

onMounted(() => {
  busy.setBusy(true)
  getPrompts()
  busy.setBusy(false)
})

function getPrompts() {
  fetch(
    "https://raw.githubusercontent.com/hiyorun/site-prompts/main/prompts.json"
  )
    .then((response) => response.json())
    .then((data) => prompt.storePrompts(data.prompts))
    .catch((e) => console.error("error at get prompts:", e))
}
</script>
<template>
  <LoadingIndicator class="absolute m-3 z-50" v-if="busy.isBusy" />
  <div class="absolute">{{ busy.isBusy }}</div>
  <div class="text-arisu-900 dark:text-arisu-100 bg-arisu-100 dark:bg-arisu-900 noisy w-full h-full">
    <router-view/>
  </div>
</template>
