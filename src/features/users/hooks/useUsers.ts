// features/users/hooks/useUsers.ts

import { useQuery, type UseQueryOptions } from "@tanstack/react-query";
import type { getUsersParams, IUsersResponse } from "../types";
import createUsersQueryOptions from "../queries/userQueries";

// IUsersResponse first is the type of What your fetchUsers function returns
// Error is the type of the error returned by the query
// IUsersResponse second is the type of  What the hook returns after any potential transformations
export const useUsers = <TData = IUsersResponse>(
  params?: getUsersParams,
  options?: Omit<
    UseQueryOptions<IUsersResponse, Error, TData>,
    "queryKey" | "queryFn"
  >
) => {
  return useQuery(createUsersQueryOptions(params, options));
};

// only when we use select we need to specify the type of the data returned by the query
/*
  so we added <TData = IUsersResponse> to the useUsers hook
  then we pass it to the select function UseQueryOptions<IUsersResponse, Error, TData>,
*/
