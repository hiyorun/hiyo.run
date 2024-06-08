<script setup>
import Tooltip from './Tooltip.vue';
import 'devicon'

const props = defineProps({
    data: Object
})

function returnDateString(dateString) {
    const date = new Date(dateString)
    return date.toLocaleString()
}
</script>
<template>
    <RouterLink :to="{ name: 'code-details', params: { id: props.data.id } }"
        class="transition-colors duration-200 bg-kikyou-200 hover:bg-kikyou-300 dark:bg-kikyou-900 hover:dark:bg-kikyou-700 text-kikyou-900 dark:text-kikyou-50 shadow-xl rounded-2xl p-4 flex flex-col gap-2 min-h-52">
        <span class="opacity-50 text-xs">{{ returnDateString(data.attributes.date) }}</span>
        <span class="text-2xl font-bold">{{ props.data.attributes.title }}</span>
        <span class="grow">{{ props.data.attributes.description }}</span>
        <div class="flex items-center gap-2" v-if="props.data.attributes.details">
            <div v-for="stack in props.data.attributes.details.stack">
                <i :class="[`devicon-${stack}-plain`]" class="text-xl"></i>
            </div>
            <span class="grow"></span>
            <Tooltip msg="Open Site" v-if="props.data.attributes.details.links" @click.stop>
                <a :href="props.data.attributes.details.links" target="_blank" rel="noreferrer noopener"
                    class="transition-colors duration-200 bg-kikyou-100 hover:bg-kikyou-200 dark:bg-kikyou-900 hover:dark:bg-kikyou-800 text-kikyou-900 dark:text-kikyou-50 no-underline rounded-full flex items-center justify-center w-12 h-12">
                    <span class="material-symbols-outlined">
                        open_in_new
                    </span>
                </a>
            </Tooltip>
            <Tooltip msg="Repository" @click.stop>
                <a :href="props.data.attributes.git_repo" target="_blank" rel="noreferrer noopener"
                    class="transition-colors duration-200 bg-kikyou-100 hover:bg-kikyou-200 dark:bg-kikyou-900 hover:dark:bg-kikyou-800 text-kikyou-900 dark:text-kikyou-50 no-underline rounded-full flex items-center justify-center w-12 h-12">
                    <span class="material-symbols-outlined">
                        code
                    </span>
                </a>
            </Tooltip>
        </div>
    </RouterLink>
</template>