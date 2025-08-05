// lib/queryClient.ts

import { MutationCache, QueryClient } from "@tanstack/react-query";

// Create and configure the main React Query client for the application
export const queryClient = new QueryClient({
  // Default configuration for all queries in the app
  defaultOptions: {
    queries: {
      // Disable automatic refetching when user switches back to the browser tab
      // This prevents unnecessary API calls when users return to the app
      refetchOnWindowFocus: false,

      // Limit failed queries to only retry once instead of the default 3 times
      // Reduces server load and improves user experience by failing faster
      retry: 1,
    },
  },

  // Global mutation cache with centralized error handling
  mutationCache: new MutationCache({
    // This function runs whenever ANY mutation fails anywhere in the app
    onError: (error) => {
      // Type guard to check if error has status property (HTTP error)
      if ("status" in error && error.status === 401) {
        // Assumption: Any mutation failure means the user's session is invalid
        // Clear the authentication token from browser storage
        localStorage.removeItem("token");

        // Force redirect to login page to re-authenticate
        // Uses window.location.href for immediate redirect (not router navigation)
        window.location.href = "/login";
      }
    },
  }),
});

/* 
NOTES FOR FUTURE REFERENCE:

1. GLOBAL ERROR HANDLING:
   - This setup treats ALL mutation errors as authentication failures
   - Any failed POST/PUT/DELETE/PATCH request will log the user out
   - Consider if this is too aggressive for your use case

2. POTENTIAL IMPROVEMENTS:
   - Only logout on 401/403 errors, not network/validation errors
   - Use router.push() instead of window.location.href for SPA navigation
   - Add loading states or error messages before redirect

3. ALTERNATIVE APPROACH:
   if (error.status === 401 || error.status === 403) {
     localStorage.removeItem("token");
     window.location.href = "/login";
   }

4. QUERY DEFAULTS:
   - refetchOnWindowFocus: false = no auto-refetch on tab focus
   - retry: 1 = only retry failed requests once
   - Consider adding staleTime, cacheTime based on your data freshness needs
*/
