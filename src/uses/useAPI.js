import { onUnmounted } from "vue"

export function useAPI() {
  const token = import.meta.env.VITE_STRAPI_TOKEN
  const apiURL = import.meta.env.VITE_API_URL
  const basePath = import.meta.env.VITE_API_BASE_PATH
  let controller = null

  // @param {Object} queries Queries to query on the URL
  async function get(path, query) {
    controller = new AbortController()

    let urlString = apiURL + "/"

    if (basePath !== "") {
      urlString += basePath + "/"
    }
    urlString += path

    const queries = new URLSearchParams(query)
    const queryString = queries.size > 0 ? "?" + queries : ""
    urlString += queryString

    try {
      const resp = await fetch(urlString, {
        mode: "cors",
        method: "GET",
        headers: {
          "Authorization": "Bearer " + token,
          "Content-Type": "application/json",
        },
        signal: controller.signal
      })
      return resp.json()
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

  return { get }
};
