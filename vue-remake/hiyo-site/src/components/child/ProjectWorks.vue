<script setup>
import { reactive, onMounted } from "vue";
import { getRndInteger } from "@/reuseLogic/randomNum.js";
import { loadingStates } from "@/states/load.js";

let loadState = loadingStates();
let imageArr = reactive([]);
let loadedImgs = 0;

onMounted(() => {
  for (let count = 0; count < 10; count++) {
    let structImg =
      "https://picsum.photos/" +
      getRndInteger(100, 300) +
      "/" +
      getRndInteger(100, 300);
    imageArr.push(structImg);
  }
  // imageArr.push("lol");
  // imgLoaded();
});

function imgLoaded() {
  loadedImgs += 1;
  loadState.projectCounter(imageArr.length, loadedImgs);
}
</script>
<template>
  <div
    class="hi-flex hi-photo-grid hi-justify-center"
    style="padding: 75px 0px"
  >
    <div v-for="(image, index) in imageArr" :key="index">
      <img :src="image" @load="imgLoaded()" />
    </div>
  </div>
</template>
