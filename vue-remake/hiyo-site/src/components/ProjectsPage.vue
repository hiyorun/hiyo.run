<script setup>
import { ArrowDownCircleIcon } from '@heroicons/vue/24/solid'
import { onMounted, reactive } from 'vue';
import { useRouter } from 'vue-router';
import { useApiUrl } from '../uses/useAPI';

onMounted(() => {
  logJSONData()
  for (let count = 0; count < 10; count++) {
    const x = Math.floor(Math.random() * (300 - 100 + 1)) + 100,
      y = Math.floor(Math.random() * (300 - 100 + 1)) + 100,
      structImg = "https://picsum.photos/" + x + "/" + y
    imgs.push(structImg);
  }
})

const router = useRouter(),
  states = reactive({
    loading: false
  }),
  imgs = reactive([])
// imgs = ["https://tailwindui.com/img/ecommerce-images/product-feature-03-detail-01.jpg",
//   "https://tailwindui.com/img/ecommerce-images/product-feature-03-detail-02.jpg",
//   "https://tailwindui.com/img/ecommerce-images/product-feature-03-detail-03.jpg",
//   "https://tailwindui.com/img/ecommerce-images/product-feature-03-detail-04.jpg"]

function explore() {
  states.loading = true

  setTimeout(() => { router.push('/projekt') }, 1000)
}

async function logJSONData() {
  const response = await fetch(useApiUrl("/projects"));
  const jsonData = await response.json();
  console.log(jsonData);
}

</script>
<template>
  <div class="flex flex-wrap">
    <div v-for="img in imgs" class="grow m-2 rounded-xl bg-arisu-800 dark:bg-arisu-200 noisy">
      <img :src="img" class="block h-full min-w-full rounded-xl bg-gray-100" />
      <div class="p-2">{{ img }}</div>
    </div>
  </div>
</template>