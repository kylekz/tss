import { createMiddleware } from "@tanstack/start";
import { getEvent } from "vinxi/http";

/**
 * Gets the auth status and artist and inserts into the context.
 */
export const userStateMiddleware = createMiddleware().server(
  async ({ next }) => {
    const event = getEvent();

    return next({
      context: {
        auth: event.context.auth,
      },
    });
  }
);
