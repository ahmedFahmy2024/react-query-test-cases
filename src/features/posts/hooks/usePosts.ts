// features/posts/hooks/usePosts.ts

import { useQuery, type UseQueryOptions } from "@tanstack/react-query";
import createPostsQueryOptions from "../queries/postQueries";
import type { getPostsParams, IPostsResponse } from "../types";

// IPostsResponse first is the type of What your fetchPosts function returns
// Error is the type of the error returned by the query
// IPostsResponse second is the type of  What the hook returns after any potential transformations
export const usePosts = <TData = IPostsResponse>(
  params?: getPostsParams,
  options?: Omit<
    UseQueryOptions<IPostsResponse, Error, TData>,
    "queryKey" | "queryFn"
  >
) => {
  return useQuery(createPostsQueryOptions(params, options));
};

// only when we use select we need to specify the type of the data returned by the query
/*
  so we added <TData = IPostsResponse> to the usePosts hook
  then we pass it to the select function UseQueryOptions<IPostsResponse, Error, TData>,
*/
