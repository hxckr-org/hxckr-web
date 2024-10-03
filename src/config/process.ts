import dotenv from "dotenv";

dotenv.config();

// Client-side environment variables
export const coreBaseUrl =
  process.env.NEXT_PUBLIC_APP_CORE_BASE_URL ?? "http://localhost:4925";
export const websocketUrl =
  process.env.NEXT_PUBLIC_APP_WEBSOCKET_URL ?? "ws://localhost:4925/ws";

// Server-side environment variables
export const githubClientID = process.env.GITHUB_ID as string;
export const githubClientSecret = process.env.GITHUB_SECRET as string;

// Check only client-side variables
if (!coreBaseUrl || !websocketUrl) {
  throw new Error("Missing client-side environment variables");
}

// Function to check server-side variables (call this only on the server)
export function checkServerEnv() {
  if (!githubClientID || !githubClientSecret) {
    throw new Error("Missing server-side environment variables");
  }
}
