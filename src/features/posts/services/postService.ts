// features/posts/services/postService.ts

import { axiosInstance } from "../../../api/axios";
import type {
  getPostsParams,
  ICreatePost,
  IPost,
  IPostsResponse,
} from "../types";

export const fetchPosts = async (
  params?: getPostsParams
): Promise<IPostsResponse> => {
  const { data } = await axiosInstance.get("/api/posts", { params });
  return data;
};

// ICreatePost is the type of the post object that is sent to the server
// IPost is the type of the post object that is received from the server
export const createPost = async (post: ICreatePost): Promise<IPost> => {
  const { data } = await axiosInstance.post("/api/posts", post);
  return data;
};
