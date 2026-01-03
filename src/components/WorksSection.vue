<script lang="ts" setup>
  import { ref, watch } from 'vue';
  import { useAPI } from '../uses/useAPI';
  import type { CodeObj } from '@/types/code';
  import type { APIResponse } from '@/types/response';

  const props = defineProps<{ load: boolean }>();
  const api = useAPI();

  const posts = ref<CodeObj[]>([]);

  async function lazyLoad(load: boolean) {
    if (!load) return;

    const response = await api.get<APIResponse<CodeObj>>('timeline-posts');
    posts.value = response.items;
  }

  watch(
    () => props.load,
    (load) => {
      lazyLoad(load);
    },
    { immediate: true },
  );
</script>
<template>
  <div class="h-screen text-kikyou-50 bg-kikyou-700 dark:bg-kikyou-900 pt-20">
    <div class="px-4 flex flex-col gap-1">
      <span>This section hasn't finished:</span>
      <span class="text-4xl tracking-tighter font-bold">Corals of Creation</span>
      <span class="text-xl">A glance of my artistic psyche</span>
    </div>
    <div v-for="post in posts" :key="post.id">
      {{ post.description }}
      {{ post.id }}
    </div>
  </div>
</template>
import tailwindcss from '@tailwindcss/vite';
