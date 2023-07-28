export function useApiUrl(path) {
  const currentHost = window.location.hostname;
  const subdomain = '';
  const domain = currentHost.replace(/^www\./, ''); // Remove 'www.' if present
  const protocol = window.location.protocol;
  const port = 8080

  return `${protocol}//${subdomain}${domain}:${port}${path}`;
};
