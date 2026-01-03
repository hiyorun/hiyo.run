export type APIResponse<T = unknown> = {
  items: T[];
  limit: number;
  page: number;
  total: number;
};
