// features/posts/hooks/usePosts.ts

import { useInfiniteQuery } from "@tanstack/react-query";
import { createInfinitePostsQueryOptions } from "../queries/postQueries";

export const useInfinitePosts = () => {
  return useInfiniteQuery(createInfinitePostsQueryOptions());
};
