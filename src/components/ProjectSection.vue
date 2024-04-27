<script setup>
import { onMounted, reactive, ref, watch } from 'vue';

const waveProps = reactive({
    height: 200,
    length: 500,
    total: 2000,
    skew: 0.5,
    gravity: true,
})

watch(waveProps, () => { generateWave() })

const wavePath = ref('')
function generateWave() {
    wavePath.value = `M 0,${waveProps.height / 2}`
    for (let i = 0; i <= Math.ceil(waveProps.total / waveProps.length); i++) {
        let path = 'C '
        path += `${waveProps.length * i + waveProps.length * waveProps.skew},${waveProps.height} ${waveProps.length * (i + 1) - waveProps.length * waveProps.skew},0 ${waveProps.length * (i + 1)},${waveProps.height / 2} `
        wavePath.value += path
    }
    wavePath.value += `L ${waveProps.length * Math.ceil(waveProps.total / waveProps.length)},${waveProps.gravity ? waveProps.height : 0} L 0,${waveProps.gravity ? waveProps.height : 0}`
}

onMounted(() => {
    generateWave()
})
</script>
<template>
    <div class="w-screen h-full">
        <svg :viewBox="`0 0 ${waveProps.total}, ${waveProps.height}`">
            <path :d="wavePath"></path>
        </svg>
    </div>
</template>