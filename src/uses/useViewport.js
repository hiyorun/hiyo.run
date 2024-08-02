import { computed, onMounted, onUnmounted, reactive } from "vue";
import resolveConfig from "tailwindcss/resolveConfig"
import tailwindConfig from "../../tailwind.config";

const config = resolveConfig(tailwindConfig)
const breakpoints = config.theme.screens

export function useViewport() {
  const clientSize = reactive({
    width: window.innerWidth,
    height: window.innerHeight
  })
  const media = reactive({
    isSm: false,
    isMd: false,
    isMdAndUp: false,
    isMdAndDown: false,
    isLg: false,
    isLgAndUp: false,
    isLgAndDown: false,
    isXl: false,
    isXlAndUp: false,
    isXlAndDown: false
  })

  function onResize() {
    clientSize.width = window.innerWidth
    clientSize.height = window.innerHeight
    const w = clientSize.width
    const h = clientSize.height
    const sm = parseInt(breakpoints.sm)
    const md = parseInt(breakpoints.md)
    const lg = parseInt(breakpoints.lg)
    const xl = parseInt(breakpoints.xl)
    media.isSm = w <= sm
    media.isMd = w > sm && w <= md
    media.isMdAndUp = w > sm
    media.isMdAndDown = w <= md
    media.isLg = w > md && w <= lg
    media.isLgAndUp = w > md
    media.isLgAndDown = w <= lg
    media.isXl = w > lg && w <= xl
    media.isXlAndUp = w > lg
    media.isXlAndDown = w <= xl
  };

  // Add listener on mount
  onMounted(() => {
    onResize()
    window.addEventListener("resize", onResize)
  })

  // Remove listener on detach
  onUnmounted(() => window.removeEventListener("resize", onResize));

  return { clientSize, media };
};
