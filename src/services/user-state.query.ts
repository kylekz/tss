import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";
import { getAuthState } from "./user-state.api";

export const authStateQueryOptions = () =>
  queryOptions({
    queryKey: ["auth-state"],
    queryFn: () => getAuthState(),
    staleTime: Infinity,
  });

export const useAuthState = () => {
  return useSuspenseQuery(authStateQueryOptions());
};
