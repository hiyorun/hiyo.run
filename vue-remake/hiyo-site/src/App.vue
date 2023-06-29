<script setup>
import { onMounted, reactive } from 'vue';

const firstTake = reactive({
  initiated: false
})

onMounted(() => {
  setTimeout(() => {
    firstTake.initiated = true
  }, 1000)
})
</script>
<template>
  <router-view :class="[firstTake.initiated ? 'smoothing opacity-1' : 'opacity-0']"></router-view>
</template>
