<script lang="ts" setup>
  import { ref } from 'vue';
  import LoadingIndicator from './err-load/LoadingIndicator.vue';
  import { useRouter } from 'vue-router';
  import { useBusy } from '../states/busy';
  import { useViewport } from '@/uses/useViewport';
  import { usePreferences } from '@/states/preferences';

  const router = useRouter();
  const busy = useBusy();
  const viewport = useViewport();
  const preferences = usePreferences();
  const navigations = ref([
    {
      label: 'Gallery',
      href: '/illust',
    },
    {
      label: 'Codes',
      href: '/code',
    },
  ]);
  const { floating = false } = defineProps<{
    floating: boolean;
  }>();

  function navigator(path: string) {
    busy.setBusy(true);
    router.push(path).then(() => {
      busy.setBusy(false);
    });
  }
</script>
<template>
  <div
    class="transition-all duration-1000"
    :class="{ 'p-2': floating || preferences.reducedMotion }"
  >
    <div
      class="transition-all duration-1000 bg-none p-2 w-full flex
        justify-between items-center rounded-full mx-auto max-w-screen-xl"
      :class="{
        'bg-kikyou-100 dark:bg-kikyou-900 shadow-xl': floating || preferences.reducedMotion,
      }"
    >
      <div class="flex items-center px-4 h-10 gap-4">
        <button
          aria-label="Home"
          @click="navigator('/')"
          class="font-bold text-kikyou-900 dark:text-kikyou-50"
          v-if="!viewport.media.isMdAndUp ? !busy.isBusy : true"
        >
          hiyorun
        </button>
        <LoadingIndicator />
      </div>
      <div class="flex items-center justify-evenly gap-2">
        <button
          v-for="navigate in navigations"
          :key="navigate.href"
          :aria-label="navigate.label"
          @click="navigator(navigate.href)"
          class="transition-colors duration-200 py-2 px-4 bg-kikyou-200 hover:bg-kikyou-300
            dark:bg-kikyou-800 hover:dark:bg-kikyou-700 text-kikyou-900 dark:text-kikyou-50
            rounded-full shadow-md"
        >
          {{ navigate.label }}
        </button>
      </div>
    </div>
  </div>
</template>
