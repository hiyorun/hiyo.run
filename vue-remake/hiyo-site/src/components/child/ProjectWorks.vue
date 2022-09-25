<script setup>
import { reactive, onMounted } from "vue";

let imageArr = reactive([]);

onMounted(() => {
  imageArr.value = [];
  for (let count = 0; count < 10; count++) {
    let structImg = {
      id: count,
      url:
        "https://picsum.photos/" +
        getRndInteger(100, 300) +
        "/" +
        getRndInteger(100, 300),
    };
    imageArr.push(structImg);
  }
});
function getRndInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
</script>
<template>
  <div class="hi-flex hi-photo-grid hi-flex-justify-center">
    <img
      v-for="image in imageArr"
      :key="image.id"
      :src="image.url"
      loading="lazy"
    />
  </div>
</template>
