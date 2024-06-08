<script setup>
import { onMounted, ref, watch } from 'vue';
import { useAPI } from '../uses/useAPI';

const props = defineProps({
    load: Boolean
})
const strapi = useAPI()

let posts = ref({})

async function lazyLoad(load) {
    if (!load) return;
    const response = await strapi.get("timeline-posts", { populate: "*" })
    response.data.forEach((val) => {
        console.log(val.attributes[val.attributes.post_type], val.attributes.post_type, val.attributes2)
    })
    posts.value = response
}

watch(props, (val) => { lazyLoad(val) })

onMounted(() => {
    lazyLoad(props.load)
})

</script>
<template>
    <div class="h-screen bg-kikyou-700 dark:bg-kikyou-900 pt-20">
        <div class="px-4 flex flex-col gap-1">
            <span>This section hasn't finished:</span>
            <span class="text-4xl tracking-tighter font-bold">Corals of Creation</span>
            <span class="text-xl">A glance of my artistic psyche</span>
        </div>
        <div v-for="post in posts">
            {{ post.attributes }}
            {{ post.id }}
        </div>
    </div>
</template>