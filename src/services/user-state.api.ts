import { createServerFn } from "@tanstack/start";
import { userStateMiddleware } from "../middleware/auth";

/**
 * Fetch the current user state.
 */
export const getAuthState = createServerFn({ method: "GET" })
  .middleware([userStateMiddleware])
  .handler(async ({ context }) => {
    await new Promise((resolve) => setTimeout(resolve, 500));

    return {
      profile: context.auth.profile,
    };
  });
