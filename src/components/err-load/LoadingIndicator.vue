<script lang="ts" setup>
  import { shufflePrompt } from '@/uses/usePrompts';
  import { usePrompt } from '@/states/prompts';
  import { onMounted } from 'vue';
  import BrailleAnimation from './BrailleAnimation.vue';
  import { useBusy } from '@/states/busy';

  const prompt = usePrompt();
  const busy = useBusy();

  onMounted(() => {
    getPrompts();
  });

  function getPrompts() {
    fetch('https://raw.githubusercontent.com/hiyorun/site-prompts/main/prompts.json')
      .then((response) => response.json())
      .then((data) => prompt.storePrompts(data.prompts))
      .catch((e) => console.error('error at get prompts:', e));
  }

  function truncatePrompts() {
    const maxLen = 1000;
    const prompt = shufflePrompt();
    if (prompt.length > maxLen) {
      const withEllipsis = prompt.substring(0, maxLen) + '...';
      return withEllipsis;
    }
    return prompt;
  }
</script>
<template>
  <div
    v-if="busy.isBusy"
    class="flex gap-2 items-center"
  >
    <BrailleAnimation />
    <span class="overflow-hidden text-sm tracking-tight line-clamp-2 leading-4">{{
      truncatePrompts()
    }}</span>
  </div>
</template>
<style scoped></style>
