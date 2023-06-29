<script setup>
import { usePrompt } from '@/states/prompts.js'
import { reactive } from 'vue';
const prompt = usePrompt()
</script>
<template>
  <div class="text-arisu-900 dark:text-arisu-100 ">
    <div
      class="inline-block h-4 w-4 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
      role="status">  
    </div>
    <span class="pl-3">{{ prompt.getPrompt }}</span>
  </div>
</template>
<style scoped></style>
