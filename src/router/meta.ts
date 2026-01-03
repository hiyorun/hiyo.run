import 'vue-router';

declare module 'vue-router' {
  interface RouteMeta {
    title?: string;
    metaTags?: Array<Record<string, string>>;
  }
}
