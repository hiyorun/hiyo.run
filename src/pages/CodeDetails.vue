<script setup>
import { TransitionGroup, onBeforeMount, ref } from 'vue'
import { useAPI } from '../uses/useAPI';
import { useBusy } from '../states/busy';
import { useRoute } from 'vue-router'

const strapi = useAPI()
const busy = useBusy()
const route = useRoute()
const data = ref({})

onBeforeMount(async () => {
    const response = await strapi.get("codes/" + route.params.id)
    data.value = response.data
})

function returnDateString(dateString) {
    const date = new Date(dateString)
    return date.toLocaleString()
}

</script>
<template>
    <div class="pt-20 p-4 flex flex-col gap-4 max-w-screen-xl mx-auto">
        <RouterLink to="/code" class="flex items-center gap-2">
            <span class="material-symbols-outlined text-sm">
                arrow_back_ios
            </span>
            Back
        </RouterLink>
        <div class="flex flex-col gap-2">
            <span class="opacity-50 text-sm">{{ returnDateString(data.attributes.date) }}</span>
            <span class="text-4xl tracking-tighter font-bold">
                {{ data.attributes.title }}
            </span>
            <span class="">{{ data.attributes.description }}</span>
            <div class="flex items-baseline gap-2">
                <i v-for="stack in data.attributes.details.stack" :class="[`devicon-${stack}-plain`]"
                    class="text-xl"></i>
            </div>
        </div>
        <div class="mt-12 flex flex-col gap-6">
            <p>
                <div class="text-2xl font-bold mb-2">The What</div>
                {{ data.attributes.details.what }}
            </p>
            <p>
                <div class="text-2xl font-bold mb-2">The Why</div>
                {{ data.attributes.details.why }}
            </p>
        </div>
    </div>
</template>