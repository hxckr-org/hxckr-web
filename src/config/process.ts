// Client-side environment variables
export const coreBaseUrl = process.env.NEXT_PUBLIC_APP_CORE_BASE_URL;
export const websocketUrl = process.env.NEXT_PUBLIC_APP_WEBSOCKET_URL;

// Server-side environment variables
export const githubClientID = process.env.GITHUB_ID as string;
export const githubClientSecret = process.env.GITHUB_SECRET as string;

// Only run client-side checks in the browser
if (typeof window !== "undefined") {
  if (!coreBaseUrl || !websocketUrl) {
    console.log({ coreBaseUrl, websocketUrl });
    throw new Error("Missing client-side environment variables");
  }
}

// Server-side checks
if (typeof window === "undefined") {
  if (!githubClientID || !githubClientSecret) {
    console.warn("Missing server-side environment variables for GitHub OAuth.");
  }
}
