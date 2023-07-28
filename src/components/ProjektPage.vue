<script setup>
import { ArrowDownCircleIcon } from '@heroicons/vue/24/solid'
import { onMounted, reactive } from 'vue';
import { useRouter } from 'vue-router';

onMounted(() => {
  logJSONData()
})

const router = useRouter(),
  states = reactive({
    loading: false
  })

function explore() {
  states.loading = true

  setTimeout(() => { router.push('/projekt') }, 1000)
}

async function logJSONData() {
  const response = await fetch("http://localhost:8080/api/projects");
  const jsonData = await response.json();
  console.log(jsonData);
}


</script>
<template>
  <div class="min-h-full flex flex-col justify-center items-center bg-arisu-200 dark:bg-arisu-900 noisy">
    <h1 :class="[states.loading ? 'opacity-0' : '']" class="mt-5 text-7xl text-arisu-900 dark:text-arisu-100">
      hiyo.run
    </h1>
    <h2 :class="[states.loading ? 'opacity-0' : '']" class="mt-5 text-xl text-arisu-900 dark:text-arisu-100">
      Take
      a dive into my little imagination.</h2>
    <button @click="explore" :class="[states.loading ? 'pb-52 opacity-0' : '']">
      <ArrowDownCircleIcon class="mt-5 h-10 text-arisu-900 dark:text-arisu-100" />
    </button>
  </div>
</template>