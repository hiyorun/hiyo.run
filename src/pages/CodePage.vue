<script setup>
import { TransitionGroup, onBeforeMount, ref } from 'vue'
import { useAPI } from '../uses/useAPI';
import { useBusy } from '../states/busy';
import CodeGallery from '../components/CodeGallery.vue';

const strapi = useAPI()
const busy = useBusy()
const codes = ref({})

onBeforeMount(async () => {
    busy.setBusy(true)
    const response = await strapi.get("codes")
    response.data.sort((a, b) => {
        const dateA = new Date(a.attributes.date),
            dateB = new Date(b.attributes.date)
        return dateA.getTime() < dateB.getTime()
    })
    codes.value = response
    busy.setBusy(false)
})
</script>
<template>
    <div class="pt-20 p-4 flex flex-col gap-4 max-w-screen-xl mx-auto">
        <div class="flex flex-col">
            <span class="text-4xl tracking-tighter font-bold">Under the Digital Hood</span>
            <span class="">A glimpse into my code works</span>
        </div>
        <TransitionGroup name="fade" mode="out-in" tag="div" class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <CodeGallery v-for="code in codes.data" :key="code.id" :data="code" />
        </TransitionGroup>
    </div>
</template>