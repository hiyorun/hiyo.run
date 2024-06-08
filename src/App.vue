<script setup>
import { Transition, onMounted, onUnmounted, ref } from 'vue';
import NavBar from './components/NavBar.vue';

let floating = ref(false)

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})

function handleScroll() {
  if (window.scrollY <= 0) {
    floating.value = false
    return
  }
  floating.value = true
}
</script>
<template>
  <div class="initial-load opacity-100">
    <RouterView v-slot="{ Component, route }">
      <Transition name="fade" mode="out-in">
        <component :is="Component" />
      </Transition>
    </RouterView>
    <NavBar class="fixed top-0 left-0 w-full" :floating="floating" />
  </div>
</template>

<!-- To hide FOUC -->
<style>
.initial-load {
  opacity: 0;
  transition: all 2s;
}
</style>