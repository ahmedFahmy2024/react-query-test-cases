// features/posts/hooks/useCreatePostOptimistic.ts

import { useMutation } from "@tanstack/react-query";
import { createPost } from "../services/postService";
import type { ICreatePost, IPost, IPostsResponse } from "../types";
import { queryClient } from "../../../lib/queryClient";
import createPostsQueryOptions from "../queries/postQueries";
import { toast } from "sonner";
import { AxiosError } from "axios";

// Define the context type for optimistic updates
type OptimisticContext = {
  previousPosts?: IPostsResponse;
};

// Optimistic update hook that immediately updates the UI before server response
// IPost is the type of the post object that is received from the server
// Error is the type of the error that is thrown by the server
// ICreatePost is the type of the post object that is sent to the server
// OptimisticContext is the type of the context that is passed to the mutation (!important) it must be added to the useMutation function
export const useCreatePostOptimistic = () => {
  return useMutation<
    IPost,
    AxiosError<{ message: string }>,
    ICreatePost,
    OptimisticContext
  >({
    mutationFn: createPost,

    // onMutate runs before the mutation and is used for optimistic updates
    onMutate: async (newPost) => {
      console.log("onMutate - starting optimistic update", newPost);

      // Cancel any outgoing refetches so they don't overwrite our optimistic update
      await queryClient.cancelQueries({
        queryKey: createPostsQueryOptions().queryKey,
      });

      // Snapshot the previous value for rollback
      const previousPosts = queryClient.getQueryData<IPostsResponse>(
        createPostsQueryOptions().queryKey
      );

      // Optimistically update the cache with the new post
      queryClient.setQueryData<IPostsResponse>(
        createPostsQueryOptions().queryKey,
        (old) => {
          if (!old) return { posts: [] };

          // Create optimistic post with temporary ID
          const optimisticPost: IPost = {
            ...newPost,
            _id: `temp-${Date.now()}`, // Temporary ID
            __v: 0,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          };

          return {
            ...old,
            posts: [optimisticPost, ...old.posts], // Add to beginning
          };
        }
      );

      // Return context with previous data for potential rollback
      return { previousPosts };
    },

    onSuccess: (data) => {
      console.log("onSuccess - server responded with:", data);
      toast.success(`Post "${data.title}" created successfully!`);

      // Invalidate and refetch to get the real data from server
      queryClient.invalidateQueries({
        queryKey: createPostsQueryOptions().queryKey,
      });
    },

    onError: (error, variables, context) => {
      console.error("onError - rolling back optimistic update", error);
      console.log("context", context);

      // Rollback to previous state on error
      if (context?.previousPosts) {
        queryClient.setQueryData(
          createPostsQueryOptions().queryKey,
          context.previousPosts
        );
      }

      toast.error(error?.response?.data?.message || "Failed to create post");
    },

    onSettled: (data, error, variables, context) => {
      console.log("onSettled - mutation completed");
      console.log("Final data:", data);
      console.log("Error:", error);
      console.log("Variables:", variables);
      console.log("Context:", context);
    },
  });
};
