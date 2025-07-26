// features/posts/hooks/useCreatePosts.ts

import { useMutation } from "@tanstack/react-query";
import { createPost } from "../services/postService";
import type { ICreatePost, IPost } from "../types";
import { queryClient } from "../../../lib/queryClient";
import createPostsQueryOptions from "../queries/postQueries";
import { toast } from "sonner";
import { AxiosError } from "axios";

// IPost is the type of the post object that is received from the server
// Error is the type of the error that is thrown by the server
// ICreatePost is the type of the post object that is sent to the server

// onSuccess is called when the mutation is successful
// onError is called when the mutation fails
// onSettled is called when the mutation is settled (success or failure)
// onMutate is called when the mutation is about to be executed (used with optimistic updates)
// queryClient.invalidateQueries is used to invalidate the query cache
// queryKey is used to identify the query

// data is the data returned by the mutation
// variables is the variables passed to the mutation
// context is the context passed to the mutation
export const useCreatePost = () => {
  return useMutation<IPost, AxiosError<{ message: string }>, ICreatePost>({
    mutationFn: createPost,
    onSuccess: (data, variables, context) => {
      console.log("data", data);
      queryClient.invalidateQueries({
        queryKey: createPostsQueryOptions().queryKey,
      });
      toast.success(data.title);
    },
    onError: (error: AxiosError<{ message: string }>) => {
      console.error("an error occurred", error);
      toast.error(error?.response?.data?.message || error.message);
    },
    onSettled: (data, error, variables, context) => {
      console.log("data", data); // {title: 'test', content: 'test', _id: '686451e44afec5da0acbf8a0', createdAt: '2025-07-01T21:23:48.380Z', updatedAt: '2025-07-01T21:23:48.380Z',…}
      console.log("error", error);
      console.log("variables", variables); // {title: 'test', content: 'test'}
      console.log("context", context); // {title: 'test', content: 'test'} only if onMutate returns it
    },
    onMutate: (variables) => {
      console.log("onMutate variables", variables); // {title: 'test', content: 'test'}
      return variables;
    },
  });
};
