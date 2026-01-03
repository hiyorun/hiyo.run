import { onUnmounted } from 'vue';
import { sleep } from './useHelper';

type QueryParams = Record<string, string | number | boolean | null | undefined> | URLSearchParams;

export function useAPI() {
  const apiURL = import.meta.env.VITE_API_URL;
  const basePath = import.meta.env.VITE_API_BASE_PATH;

  let controller: AbortController | null = null;

  async function get<T = unknown>(path: string, query?: QueryParams): Promise<T> {
    controller = new AbortController();

    let urlString = `${apiURL}/`;

    if (basePath) {
      urlString += `${basePath}/`;
    }

    urlString += path;

    if (query) {
      const queries =
        query instanceof URLSearchParams
          ? query
          : new URLSearchParams(
              Object.entries(query).filter(([, v]) => v !== null && v !== undefined) as [
                string,
                string,
              ][],
            );

      if (queries.size > 0) {
        urlString += `?${queries.toString()}`;
      }
    }

    try {
      const resp = await fetch(urlString, {
        mode: 'cors',
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        signal: controller.signal,
      });

      if (!resp.ok) {
        throw new Error(`HTTP ${resp.status}: ${resp.statusText}`);
      }

      return (await resp.json()) as T;
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      }
      throw new Error(String(error));
    }
  }

  async function withRetry<T>(fn: () => Promise<T>, retries = 3, delayMs = 300): Promise<T> {
    let lastError: unknown;

    for (let i = 0; i <= retries; i++) {
      try {
        return await fn();
      } catch (err) {
        if (err instanceof DOMException && err.name === 'AbortError') {
          throw err;
        }

        lastError = err;
        if (i >= retries) break;

        await sleep(delayMs * (i + 1));
      }
    }

    throw lastError instanceof Error ? lastError : new Error(String(lastError));
  }

  onUnmounted(() => {
    controller?.abort();
    controller = null;
  });

  return { get, withRetry };
}
