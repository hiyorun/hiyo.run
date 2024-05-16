<script setup>
import TitleSection from '../components/TitleSection.vue';
import ProjectSection from '../components/ProjectSection.vue';
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter()

let projectPage;
let observer;
let trackPos = 0;

function observerCallback(entries) {
  entries.forEach((entry) => {
    const ratio = entry.intersectionRatio
    if (ratio > 0.1 && trackPos < ratio) {
      // projectPage.scrollIntoView({ behavior: "smooth" })
      router.replace("#project")
    } else if (ratio < 0.1 && trackPos > ratio) {
      router.replace("/")
    }
    trackPos = ratio
  })
}

onMounted(() => {
  projectPage = document.getElementById("project")
  observer = new IntersectionObserver(observerCallback, {
    rootMargin: '0px',
    threshold: [0, 0.1]
  })

  observer.observe(projectPage)
})
</script>

<template>
  <div class="w-full noisy bg-arisu-100 dark:bg-arisu-800 text-arisu-900 dark:text-arisu-100 flex flex-col">
    <TitleSection />
    <ProjectSection id="project" />
  </div>
</template>