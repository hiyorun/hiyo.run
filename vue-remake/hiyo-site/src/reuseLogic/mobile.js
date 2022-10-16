import { computed, onMounted, onUnmounted, ref } from "vue";

export const hiBreakpoints = () => {
  let windowWidth = ref(window.innerWidth);
  let windowHeight = ref(window.innerHeight);

  const onWidthChange = () => (windowWidth.value = window.innerWidth);

  // Add listener on mount
  onMounted(() => window.addEventListener("resize", onWidthChange));

  // Remove listener on detach
  onUnmounted(() => window.removeEventListener("resize", onWidthChange));

  const screenType = computed(() => {
    if (windowWidth.value < 550) return "xs";
    if (windowWidth.value >= 550 && windowWidth.value < 1200) return "md";
    if (windowWidth.value >= 1200) return "lg";
    return null; // Just to make ESlint happy, this line can never be reached.
  });
  const innerWidth = windowWidth.value;
  const innerHeight = windowHeight.value;

  return { innerWidth, innerHeight, screenType };
};
