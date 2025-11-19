export const baseAPI = (() => {
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
  if (!baseUrl) {
    throw new Error("API base URL is not configured");
  }
  return baseUrl;
})();
