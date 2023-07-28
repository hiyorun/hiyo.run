import { computed, onMounted, onUnmounted, reactive } from "vue";

export function hiBreakpoints() {
  const clientSize = reactive({
    width: window.innerWidth,
    height: window.innerHeight
  }),
    screenType = computed(() => {
      if (clientSize.width < 550) return "xs";
      if (clientSize.width >= 550 && clientSize.width < 1200) return "md";
      if (clientSize.width >= 1200) return "lg";
    });

  function onResize() {
    clientSize.width = window.innerWidth
    clientSize.height = window.innerHeight
  };

  // Add listener on mount
  onMounted(() => window.addEventListener("resize", onResize));

  // Remove listener on detach
  onUnmounted(() => window.removeEventListener("resize", onResize));


  return { clientSize, screenType };
};
