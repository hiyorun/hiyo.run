<script lang="ts" setup>
  import TitleSection from '../components/TitleSection.vue';
  import WorksSection from '../components/WorksSection.vue';
  import { onBeforeUnmount, onMounted, ref } from 'vue';
  import { useRouter } from 'vue-router';

  const router = useRouter();

  let projectPage: Element;
  let observer: IntersectionObserver;
  let trackPos = 0;
  const loadProjects = ref(false);

  const observerCallback: IntersectionObserverCallback = (entries) => {
    entries.forEach((entry) => {
      const ratio = entry.intersectionRatio;
      if (ratio < 0.1 && trackPos > ratio) {
        router.replace('/');
      }
      trackPos = ratio;
    });
  };

  onMounted(() => {
    projectPage = document.getElementById('spotlight') as Element;
    observer = new IntersectionObserver(observerCallback, {
      rootMargin: '0px',
      threshold: [0, 0.1],
    });

    observer.observe(projectPage);
  });

  onBeforeUnmount(() => {
    observer.unobserve(projectPage);
  });
</script>

<template>
  <div class="w-full flex flex-col">
    <TitleSection />
    <WorksSection
      :load="loadProjects"
      id="spotlight"
    />
  </div>
</template>
