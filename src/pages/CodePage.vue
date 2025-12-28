<script lang="ts" setup>
  import { onBeforeMount, ref } from 'vue';
  import { useAPI } from '../uses/useAPI';
  import { useBusy } from '../states/busy';
  import CodeGallery from '../components/CodeGallery.vue';
import type { CodeObj } from '@/types/code';
import type { APIResponse } from '@/types/response';

  const api = useAPI();
  const busy = useBusy();
  const codes = ref<CodeObj[]>([]);

  onBeforeMount(async () => {
    busy.setBusy(true);
    const response  = await api.get<APIResponse<CodeObj>>('codes');
    response.items.sort((a: CodeObj, b: CodeObj) => {
      const dateA = new Date(a.date),
        dateB = new Date(b.date);
      return dateA.getTime() - dateB.getTime();
    });
    codes.value = response.items;
    busy.setBusy(false);
  });
</script>
<template>
  <div class="pt-20 p-4 flex flex-col gap-4 max-w-screen-xl mx-auto">
    <div class="flex flex-col">
      <span class="text-4xl tracking-tighter font-bold">Under the Digital Hood</span>
      <span class="">A glimpse into my code works</span>
    </div>
    <TransitionGroup
      name="fade"
      mode="out-in"
      tag="div"
      class="grid grid-cols-1 md:grid-cols-2 gap-4"
    >
      <CodeGallery
        v-for="code in codes"
        :key="code.id"
        :data="code"
      />
    </TransitionGroup>
  </div>
</template>
