<script setup>
import { ref } from 'vue'
import LoadingIndicator from './err-load/LoadingIndicator.vue'
const navigations = ref([
    {
        label: "Gallery",
        href: "/illust"
    },
    {
        label: "Codes",
        href: "/code"
    },
])
const props = defineProps({
    floating: Boolean
})
</script>
<template>
    <div class="transition-all duration-1000" :class="{ 'p-2': floating }">
        <div class="transition-all duration-1000 bg-none p-2 w-full flex justify-between items-center rounded-full mx-auto max-w-screen-xl"
            :class="{ 'bg-kikyou-100 dark:bg-kikyou-900 shadow-xl': floating }">
            <div class="flex items-baseline px-4 gap-2">
                <RouterLink class="rounded-full text-kikyou-900 dark:text-kikyou-50" to="/">hiyorun
                </RouterLink>
                <LoadingIndicator class="m-3" />
            </div>
            <div class="flex items-center justify-evenly gap-2">
                <RouterLink v-for="navigate in navigations" :to="navigate.href"
                    class="transition-colors duration-200 py-2 px-4 bg-kikyou-200 hover:bg-kikyou-300 dark:bg-kikyou-800 hover:dark:bg-kikyou-700 text-kikyou-900 dark:text-kikyou-50 rounded-full">{{
                        navigate.label }}</RouterLink>
            </div>
        </div>
    </div>
</template>