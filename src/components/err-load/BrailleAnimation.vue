<script setup>
import { onMounted, ref } from 'vue';

const brailles = [
    '⡿',
    '⣟',
    '⣯',
    '⣷',
    '⣾',
    '⣽',
    '⣻',
    '⢿'
]
const current = ref(0)
const props = defineProps({
    speed: {
        type: Number,
        default: 100
    }
})

onMounted(async () => {
    setInterval(() => {
        current.value += 1
        if (current.value >= brailles.length) {
            current.value = 0
        }
    }, props.speed)
})
</script>
<template>
    <span class=" text-xl">{{ brailles[current] }}</span>
</template>