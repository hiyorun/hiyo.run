<script lang="ts" setup>
  import { onMounted, onUnmounted, ref } from 'vue';
  import NavBar from './components/NavBar.vue';
  import { usePreferences } from './states/preferences';

  const floating = ref(false);
  const preferences = usePreferences();

  onMounted(() => {
    window.addEventListener('scroll', handleScroll);
  });

  onUnmounted(() => {
    window.removeEventListener('scroll', handleScroll);
  });

  function handleScroll() {
    if (window.scrollY <= 0) {
      floating.value = false;
      return;
    }
    floating.value = true;
  }
</script>
<template>
  <div
    :class="{ 'reduce-motion': preferences.reducedMotion }"
    class="initial-load opacity-100"
  >
    <RouterView v-slot="{ Component }">
      <Transition
        :name="preferences.reducedMotion ? '' : 'fade'"
        mode="out-in"
      >
        <component :is="Component" />
      </Transition>
    </RouterView>
    <NavBar
      class="fixed top-0 left-0 w-full"
      :floating="floating"
    />
  </div>
</template>

<!-- To hide FOUC -->
<style>
  .initial-load {
    opacity: 0;
    transition: all 2s;
  }
</style>
