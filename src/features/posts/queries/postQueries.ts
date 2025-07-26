// features/posts/queries/postQueries.ts

import {
  infiniteQueryOptions,
  queryOptions,
  type UseQueryOptions,
} from "@tanstack/react-query";
import { fetchPosts } from "../services/postService";
import type { getPostsParams, IPostsResponse } from "../types";

export default function createPostsQueryOptions<
  TData = IPostsResponse,
  TError = Error
>(
  params?: getPostsParams,
  options?: Omit<
    UseQueryOptions<IPostsResponse, TError, TData>,
    "queryKey" | "queryFn"
  >
) {
  return queryOptions({
    ...options,
    queryKey: ["posts", params],
    queryFn: () => fetchPosts(params),
  });
}

// initialPageParam is what is number of page you want to start from
// getNextPageParam is a function that returns the next page number form me its an object {currentPage: number, totalPages: number, posts: IPost[]} so we return data and access currentPage
export function createInfinitePostsQueryOptions() {
  return infiniteQueryOptions({
    queryKey: ["posts"],
    queryFn: ({ pageParam }) => fetchPosts({ page: pageParam, limit: 10 }),
    initialPageParam: 1,
    getNextPageParam: (data) => {
      return data?.currentPage ? data.currentPage + 1 : undefined;
    },
  });
}
