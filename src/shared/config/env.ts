const fallbackApiUrl = "http://localhost:4000/api/v1";

export const env = {
  apiUrl: process.env.NEXT_PUBLIC_API_URL || fallbackApiUrl
};

export function assertPublicEnv() {
  if (!env.apiUrl) {
    throw new Error("NEXT_PUBLIC_API_URL is required");
  }
}
