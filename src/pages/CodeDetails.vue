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
    <div class="flex flex-col gap-3">
      <span class="opacity-50 text-sm">{{ returnDateString(data?.date ? data.date : '') }}</span>
      <span class="tracking-tight flex flex-col">
        <span class="text-4xl font-bold">{{ data?.title }}</span>
        <span class="font-medium text-xl">{{ data?.description }}</span>
      </span>
      <div class="flex gap-2 text-sm font-semibold">
        <a
          class="transition-colors duration-200 px-2.5 py-0.5 bg-kikyou-200 hover:bg-kikyou-300
            dark:bg-kikyou-800 hover:dark:bg-kikyou-700 text-kikyou-900 dark:text-kikyou-50
            rounded-full"
          v-for="(license, index) in data?.licenses"
          target="_blank"
          rel="noreferrer noopener"
          :key="index"
          :href="license.link"
        >
          {{ license.name }}
        </a>
      </div>
      <div class="flex items-baseline gap-1">
        <i
          v-for="stack in data?.stacks"
          :class="[`devicon-${stack}-plain`]"
          :key="stack"
          class="p-2 text-kikyou-900 dark:text-kikyou-50 rounded-full text-xl"
        ></i>
      </div>
    </div>
    <template
      :key="detail.id"
      v-for="detail in data?._relations?.codeDetails"
    >
      <div class="mt-12 flex flex-col gap-6">
        <template
          :key="section.title"
          v-for="section in detail.sections"
        >
          <div class="flex flex-col gap-3">
            <div class="text-3xl font-bold">{{ section.title }}</div>
            <template
              v-for="(body, index) in section.body"
              :key="index"
            >
              <p v-if="body.type === 'p'">
                {{ body.value }}
              </p>
              <ol
                class="list-decimal"
                v-if="body.type === 'ol'"
              >
                <li
                  v-for="(val, index) in body.value"
                  :key="index"
                >
                  {{ val }}
                </li>
              </ol>
              <ul
                class="list-disc px-5"
                v-if="body.type === 'ul'"
              >
                <li
                  v-for="(val, index) in body.value"
                  :key="index"
                >
                  {{ val }}
                </li>
              </ul>
            </template>
          </div>
        </template>
      </div>
    </template>
  </div>
</template>
