<script setup>
import { onMounted, watch } from 'vue';
import { useAPI } from '../uses/useAPI';

const props = defineProps({
    load: Boolean
})
const api = useAPI()

let illustrations = []

function lazyLoad(load) {
    if (!load) return;
    console.log("Loading illusts")
    api.get("/illustrations").then((resp) => { console.log(resp) })
}

watch(props,(val)=>{lazyLoad(val)})

onMounted(() => {
    lazyLoad(props.load)
})

</script>
<template>
    <div class="h-screen bg-arisu-700 dark:bg-arisu-900">

    </div>
</template>