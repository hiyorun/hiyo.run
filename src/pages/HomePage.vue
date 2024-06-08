<script setup>
import TitleSection from '../components/TitleSection.vue';
import IllustSection from '../components/IllustSection.vue';
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter()

let projectPage;
let observer;
let trackPos = 0;
let loadProjects = ref(false);

function observerCallback(entries) {
  entries.forEach((entry) => {
    const ratio = entry.intersectionRatio
    if (ratio > 0.1 && trackPos < ratio) {
      // router.replace("#spotlight")
      // loadProjects.value = true
    } else if (ratio < 0.1 && trackPos > ratio) {
      router.replace("/")
    }
    trackPos = ratio
  })
}

onMounted(() => {
  projectPage = document.getElementById("spotlight")
  observer = new IntersectionObserver(observerCallback, {
    rootMargin: '0px',
    threshold: [0, 0.1]
  })

  observer.observe(projectPage)
})
</script>

<template>
  <div class="w-full flex flex-col">
    <TitleSection />
    <IllustSection :load="loadProjects" id="spotlight" />
  </div>
</template>