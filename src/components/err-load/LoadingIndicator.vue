<script setup>
import { usePrompt } from '@/states/prompts.js'
import { onMounted, reactive, ref } from 'vue';
const prompt = usePrompt(),
  chosen = ref("")

onMounted(()=>{
  chosen.value = prompt.choosePrompt
  console.log(chosen.value)
})
</script>
<template>
  <div class="text-arisu-900 dark:text-arisu-100 ">
    <div
      class="inline-block h-4 w-4 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
      role="status">  
    </div>
    <span class="pl-3">{{ chosen }}</span>
  </div>
</template>
<style scoped></style>
