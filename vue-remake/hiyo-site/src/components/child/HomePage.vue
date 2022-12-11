<script setup>
import { computed, onMounted, reactive, ref, watchEffect } from "vue";
import { storeToRefs } from "pinia";
import { hiBreakpoints } from "@/reuseLogic/mobile";
import { loadingStates } from "@/states/load.js";
import { prompt as promptState } from "@/states/prompts.js";

let arrowStyle = reactive({
  transition: "1s ease",
  fontWeight: "bold",
  lineHeight: 0,
  textAlign: "center",
  opacity: 0,
});
let promptStyle = reactive({
  transition: "1s ease",
  opacity: 1,
  textAlign: "center",
});
const showArrow = ref(false);
const titleAnim = ref(null);
const loadState = loadingStates();
const { prompt } = storeToRefs(promptState());
const { projects, title } = storeToRefs(loadingStates());
const { screenType } = hiBreakpoints();

const logoWidth = computed(() => {
  switch (screenType.value) {
    case "xs":
      return { width: "400px" };
    case "md":
      return { width: "500px" };
    default:
      return { width: "600px" };
  }
});

watchEffect(() => {
  if (projects.value && title.value) {
    let waitTitle = setInterval(()=>{
      if(!titleAnim.value){
        return
      }
      clearInterval(waitTitle)
      titleAnim.value.play();
    },100)
    setTimeout(() => {
      convertArrow();
    }, 3000);
  }
});

onMounted(() => {
  titleAnim.value.addEventListener("loadeddata", () => {
    loadState.$patch({ title: true });
  });
});

function convertArrow() {
  promptStyle.opacity = 0;
  setTimeout(() => {
    showArrow.value = true;
    arrowAnim();
  }, 1000);
}

function arrowAnim() {
  setTimeout(() => {
    arrowStyle.opacity = 1;
  }, 10);
  arrowUp();
}

function arrowDown() {
  arrowStyle.lineHeight = 0.7;
  setTimeout(() => {
    arrowUp();
  }, 1000);
}

function arrowUp() {
  arrowStyle.lineHeight = 0;
  setTimeout(() => {
    arrowDown();
  }, 1000);
}
</script>
<template>
  <div class="hi-flex hi-flex-column hi-align-center hi-justify-center content">
    <div>
      <video muted ref="titleAnim" class="white-imgs" :style="logoWidth">
        <source src="../../assets/imgs/title.webm" type="video/webm" />
        Your browser does not support the video tag.
      </video>
      <span class="prompt">
        <p v-if="showArrow" :style="arrowStyle">
          <span class="material-symbols-outlined"> keyboard_arrow_down </span>
        </p>
        <p v-else :style="promptStyle">"{{ prompt }}"</p>
      </span>
    </div>
  </div>
</template>
<style scoped>
.prompt {
  position: absolute;
  top: 85vh;
  left: 50vw;
  transform: translateX(-50%);
}
</style>
