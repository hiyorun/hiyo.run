import { onUnmounted } from "vue"

export function useAPI() {
  const token = import.meta.env.VITE_STRAPI_TOKEN
  const apiURL = import.meta.env.VITE_API_URL
  const basePath = import.meta.env.VITE_API_BASE_PATH
  let controller = null

  async function get(path) {
    const headers = new Headers({
      'Authorization': 'Bearer ' + token
    });

    controller = new AbortController()

    try {

      const resp = await fetch(apiURL + basePath + path, {
        method: "GET",
        headers: headers,
        signal: controller.signal
      })
      return resp
    } catch (error) {
      throw new Error(error)
    }

  }

  onUnmounted(() => {
    if (controller) {
      controller.abort();
    }
    controller = null;
  })

  return {get}
};
