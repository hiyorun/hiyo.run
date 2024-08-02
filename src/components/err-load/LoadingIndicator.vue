<script setup>
import { shufflePrompt } from '@/uses/usePrompts';
import { usePrompt } from '@/states/prompts'
import { onMounted } from 'vue';
import BrailleAnimation from './BrailleAnimation.vue';
import { useViewport } from '@/uses/useViewport';
import { useBusy } from '@/states/busy';

const prompt = usePrompt()
const viewport = useViewport()
const busy = useBusy()

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

function truncatePrompts() {
  if (viewport.media.isSm) return ""
  const maxLen = 30
  const prompt = shufflePrompt();
  if (prompt.length > maxLen) {
    const withEllipsis = prompt.substring(0, maxLen) + "..."
    return withEllipsis
  }
  return prompt
}

</script>
<template>
  <div v-if="busy.isBusy" class="flex gap-2 items-baseline">
    <BrailleAnimation />
    <span class="overflow-hidden text-sm text-nowrap">{{ truncatePrompts() }}</span>
  </div>
</template>
<style scoped></style>
