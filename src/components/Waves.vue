<script setup>
import { nextTick, onMounted, reactive, ref, watch } from 'vue';
import { useViewport } from '../uses/useMobile';

const size = useViewport()

const wave = reactive({
    height: 50,
    length: size.clientSize.width / 2,
    total: size.clientSize.width * 2,
    skew: 0.5,
    pos: 0,
    gravity: true,
    path: ''
})

watch(size.clientSize,
    (val) => {
        wave.length = val.width / 2
        wave.total = val.width * 2
        generateWave()
    },
    { deep: true })

function generateWave() {
    wave.path = `M 0,${wave.height / 2}`
    for (let i = 0; i <= Math.ceil(wave.total / wave.length); i++) {
        let path = 'C '
        path += `${wave.length * i + wave.length * wave.skew},${wave.height} ${wave.length * (i + 1) - wave.length * wave.skew},0 ${wave.length * (i + 1)},${wave.height / 2} `
        wave.path += path
    }
    wave.path += `L ${wave.length * Math.ceil(wave.total / wave.length)},${wave.gravity ? wave.height : 0} L 0,${wave.gravity ? wave.height : 0}`
}

onMounted(() => {
    generateWave()
})

</script>
<template>
    <div class="w-screen overflow-hidden text-arisu-700 dark:text-arisu-900">
        <div class="wave">
            <svg :style="{ width: `${wave.total}px` }" fill="currentColor"
                :viewBox="`0 0 ${wave.total}, ${wave.height}`">
                <path :d="`${wave.path}`"></path>
            </svg>
        </div>
    </div>
</template>
<style scoped>
.wave {
    animation: waving linear 4s infinite;
}

@keyframes waving {
    0% {
        transform: translateX(-50%);
    }

    100% {
        transform: translateX(0%);
    }
}
</style>