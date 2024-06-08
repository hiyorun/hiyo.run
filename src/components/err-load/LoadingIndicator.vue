<script setup>
import { shufflePrompt } from '@/uses/usePrompts.js';
import { usePrompt } from '@/states/prompts.js'
import { useBusy } from '@/states/busy.js'
import { onMounted } from 'vue';

const prompt = usePrompt(),
  busy = useBusy()

onMounted(() => {
  getPrompts()
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
  <div v-if="busy.isBusy">
    <div
      class="inline-block h-3 w-3 animate-spin rounded-full border-2 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
      role="status">
    </div>
    <span class="overflow-hidden text-sm text-nowrap">{{ shufflePrompt() }}</span>
  </div>
</template>
<style scoped></style>
