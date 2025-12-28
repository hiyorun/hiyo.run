<script lang="ts" setup>
  import 'devicon';
  import { onBeforeMount, ref } from 'vue';
  import { useAPI } from '../uses/useAPI';
  import { useBusy } from '../states/busy';
  import { useRoute } from 'vue-router';
  import { type CodeObj } from '@/types/code';

  const api = useAPI();
  const busy = useBusy();
  const route = useRoute();
  const data = ref<CodeObj>();

  onBeforeMount(async () => {
    busy.setBusy(true);
    const response = await api.get<CodeObj>('codes/' + route.params.id + '?include=codeDetails');
    console.log(response);
    data.value = response;
    busy.setBusy(false);
  });

  function returnDateString(dateString: string) {
    const date = new Date(dateString);
    return date.toLocaleString();
  }
</script>
<template>
  <div class="pt-20 p-4 flex flex-col gap-4 max-w-screen-xl mx-auto">
    <RouterLink
      to="/code"
      class="flex items-center gap-2"
    >
      <span class="material-symbols-outlined text-sm"> arrow_back_ios </span>
      Back
    </RouterLink>
    <template
      :key="detail.id"
      v-for="detail in data?._relations?.codeDetails"
    >
      <div class="flex flex-col gap-2">
        <span class="opacity-50 text-sm">{{ returnDateString(data?.date ? data.date : '') }}</span>
        <span class="text-4xl tracking-tighter font-bold">
          {{ data?.title }}
        </span>
        <span class="">{{ data?.description }}</span>
        <div class="flex items-baseline gap-2">
          <i
            v-for="stack in detail.stacks"
            :class="[`devicon-${stack}-plain`]"
            :key="stack"
            class="text-xl"
          ></i>
        </div>
      </div>
      <div class="mt-12 flex flex-col gap-6">
        <template
          :key="section.title"
          v-for="section in detail.sections"
        >
          <span>
            <div class="text-2xl font-bold mb-2">{{ section.title }}</div>
            {{ section.body }}
          </span>
        </template>
      </div>
    </template>
  </div>
</template>
