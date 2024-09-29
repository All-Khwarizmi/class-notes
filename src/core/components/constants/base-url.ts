export const BASE_URL =
  process.env.NODE_ENV === 'development'
    ? process.env.NEXT_PUBLIC_DEV_BASE_URL!
    : process.env.NEXT_PUBLIC_PROD_BASE_URL!;

export function trimProtocol(url: string) {
  return url.replace(/^https?:\/\//, '');
}
export function isRootUrl(url: string, baseUrl: string) {
  return url === baseUrl;
}
