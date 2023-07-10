<script setup>
import { ArrowDownCircleIcon } from '@heroicons/vue/24/solid'
import { useRouter } from 'vue-router';
import { useBusy } from '@/states/busy.js'
import { onMounted } from 'vue';

// Imported vars
const router = useRouter(),
  busy = useBusy()

// Lifecycle handlers
onMounted(() => {
  busy.setBusy(false)
})

// Functions
function startExploration() {
  busy.setBusy(true)
  setTimeout(() => { router.push('/projects') }, 1000)
}

</script>
<template>
  <div class="min-h-full flex flex-1 flex-col justify-center items-center bg-arisu-200 dark:bg-arisu-900 noisy">
    <span :class="[busy.isBusy ? 'smoothing opacity-0' : '']" class="text-arisu-600 dark:text-arisu-400">Shiz still home screen lol</span>
    <h1 :class="[busy.isBusy ? 'smoothing opacity-0' : '']" class="mt-5 text-7xl text-arisu-900 dark:text-arisu-100">
      hiyo.run
    </h1>
    <h2 :class="[busy.isBusy ? 'smoothing opacity-0' : '']" class="mt-5 text-xl text-arisu-900 dark:text-arisu-100">
      Take
      a dive into my little imagination.</h2>
    <button @click="startExploration" :class="[busy.isBusy ? 'smoothing pb-52 opacity-0' : '']">
      <ArrowDownCircleIcon class="mt-5 h-10 text-arisu-900 dark:text-arisu-100" />
    </button>
  </div>
</template>