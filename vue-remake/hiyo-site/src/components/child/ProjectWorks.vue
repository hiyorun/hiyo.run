<script setup>
import { reactive, onMounted, inject, onUnmounted } from "vue";
import { getRndInteger } from "@/reuseLogic/randomNum.js";
import { loadingStates } from "@/states/load.js";
import { hiBreakpoints } from "@/reuseLogic/mobile";

// Val from imports
const { clientSize } = hiBreakpoints()

let loadState = loadingStates(),
  imageArr = reactive([]),
  loadedImgs = 0,
  movementPercentage = inject('movement')

onMounted(() => {
  for (let count = 0; count < 10; count++) {
    const x = getRndInteger(100, 300),
      y = getRndInteger(100, 300),
      structImg = "https://picsum.photos/" + x + "/" + y
    imageArr.push(structImg);
  }
  // imageArr.push("lol");
  // imgLoaded();
});

function imgLoaded() {
  loadedImgs += 1;
  loadState.projectCounter(imageArr.length, loadedImgs);
}

onUnmounted(() => {
  loadState.resetCounter()
})
</script>
<template>
  <div class="hi-flex hi-photo-grid hi-justify-center" style="padding: 75px 0px">
    <div v-for="(image, index) in imageArr" :key="index">
      <img ref="images" :style="{
        objectPosition:
          `${(clientSize.width / 7 * ((movementPercentage.x - 50) / 100)) / -10}px
                    ${(clientSize.height / 7 * ((movementPercentage.y - 50) / 100)) / -10}px`
      }" :src="image" @load="imgLoaded()" class="gallery" />
    </div>
  </div>
</template>
<style scoped>
.gallery {
  min-height: 30vh;
  transform: scale(170%);
}
</style>