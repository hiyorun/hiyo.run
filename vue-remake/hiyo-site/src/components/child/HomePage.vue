<script setup>
import { computed } from "vue";
import { hiBreakpoints } from "../../reuseLogic/mobile";

const { screenType } = hiBreakpoints();

const logoWidth = computed(() => {
  switch (screenType.value) {
    case "xs":
      return { width: "400px" };
    case "md":
      return { width: "600px" };
    default:
      return { width: "800px" };
  }
});
</script>
<template>
  <div class="hi-flex hi-flex-column hi-flex-align-item-center">
    <div>
      <video autoplay class="white-imgs" :style="logoWidth">
        <source src="../../assets/imgs/title.webm" type="video/webm" />
        Your browser does not support the video tag.
      </video>
    </div>
  </div>
</template>
