// Client-side environment variables
export const coreBaseUrl = process.env.NEXT_PUBLIC_APP_CORE_BASE_URL || '';
export const websocketUrl = process.env.NEXT_PUBLIC_APP_WEBSOCKET_URL || '';

// Server-side environment variables
export const githubClientID = process.env.GITHUB_ID as string;
export const githubClientSecret = process.env.GITHUB_SECRET as string;

// Helper function to check if we're in a browser environment
export const isBrowser = typeof window !== 'undefined';

// Helper function to validate client-side environment variables
export const validateClientEnv = () => {
  if (!coreBaseUrl || !websocketUrl) {
    console.error('Environment variables missing:', { 
      NEXT_PUBLIC_APP_CORE_BASE_URL: coreBaseUrl ? '✓' : '✗',
      NEXT_PUBLIC_APP_WEBSOCKET_URL: websocketUrl ? '✓' : '✗',
    });
    return false;
  }
  return true;
};

// Server-side checks
if (!isBrowser && (!githubClientID || !githubClientSecret)) {
  console.warn("Missing server-side environment variables for GitHub OAuth.");
}
