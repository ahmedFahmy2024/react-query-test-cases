// features/users/queries/userQueries.ts

import { queryOptions, type UseQueryOptions } from "@tanstack/react-query";
import type { getUsersParams, IUsersResponse } from "../types";
import { fetchUsers } from "../services/userService";

export default function createUsersQueryOptions<
  TData = IUsersResponse,
  TError = Error
>(
  params?: getUsersParams,
  options?: Omit<
    UseQueryOptions<IUsersResponse, TError, TData>,
    "queryKey" | "queryFn"
  >
) {
  return queryOptions({
    ...options,
    queryKey: ["users", params],
    queryFn: () => fetchUsers(params),
  });
}
