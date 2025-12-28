<script lang="ts" setup>
  import { useRouter } from 'vue-router';
  import Tooltip from './Tooltip.vue';
  import 'devicon';
  import { useBusy } from '../states/busy';
  import type { CodeObj } from '@/types/code';

  const router = useRouter();
  const busy = useBusy();
  const props = defineProps<{
    data: CodeObj;
  }>();

  function returnDateString(dateString: string) {
    const date = new Date(dateString);
    return date.toLocaleString();
  }

  function navigator(path: { name: string; params: { id: number } }) {
    busy.setBusy(true);
    router.push(path).then(() => {
      busy.setBusy(false);
    });
  }
</script>
<template>
  <a
    @click="navigator({ name: 'code-details', params: { id: props.data.id } })"
    class="transition-colors duration-200 bg-kikyou-200 hover:bg-kikyou-300 dark:bg-kikyou-900
      hover:dark:bg-kikyou-700 text-kikyou-900 dark:text-kikyou-50 shadow-xl rounded-2xl p-5 flex
      flex-col gap-2 min-h-52 cursor-pointer"
  >
    <span class="opacity-50 text-xs">{{ returnDateString(data.date.toLocaleString()) }}</span>
    <span class="text-2xl font-bold">{{ props.data.title }}</span>
    <span class="grow">{{ props.data.description }}</span>
    <div class="flex gap-2 text-sm">
      <a
        class="transition-colors duration-200 bg-kikyou-700 hover:bg-kikyou-600 dark:bg-kikyou-50
          hover:dark:bg-kikyou-200 rounded-full px-2 text-kikyou-50 dark:text-kikyou-700"
        v-for="(license, index) in props.data.licenses"
        :key="index"
        :href="license.link"
      >
        {{ license.name }}
      </a>
    </div>
    <div class="flex items-center gap-2">
      <div
        :key="stack"
        v-for="stack in props.data.stacks"
      >
        <i
          :class="[`devicon-${stack}-plain`]"
          class="bg-kikyou-700 dark:bg-kikyou-50 rounded-full text-kikyou-50 dark:text-kikyou-700
            text-xl p-2"
        ></i>
      </div>
      <span class="grow"></span>
      <Tooltip
        msg="Open Site"
        v-if="props.data.link"
        @click.stop
      >
        <a
          :href="props.data.link"
          target="_blank"
          rel="noreferrer noopener"
          class="transition-colors duration-200 bg-kikyou-100 hover:bg-kikyou-200 dark:bg-kikyou-900
            hover:dark:bg-kikyou-800 text-kikyou-900 dark:text-kikyou-50 no-underline rounded-full
            flex items-center justify-center w-12 h-12"
        >
          <span class="material-symbols-outlined"> open_in_new </span>
        </a>
      </Tooltip>
      <Tooltip
        msg="Repository"
        @click.stop
      >
        <a
          :href="props.data.repository"
          target="_blank"
          rel="noreferrer noopener"
          class="transition-colors duration-200 bg-kikyou-100 hover:bg-kikyou-200 dark:bg-kikyou-900
            hover:dark:bg-kikyou-800 text-kikyou-900 dark:text-kikyou-50 no-underline rounded-full
            flex items-center justify-center w-12 h-12"
        >
          <span class="material-symbols-outlined"> code </span>
        </a>
      </Tooltip>
    </div>
  </a>
</template>
