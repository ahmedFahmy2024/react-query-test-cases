// features/posts/types.ts

export interface IPost {
  _id: string;
  title: string;
  content: string;
  __v: number;
  createdAt: string;
  updatedAt: string;
}

export interface IPostsResponse {
  currentPage?: number;
  posts: IPost[];
  totalPages?: number;
}

export type ICreatePost = Omit<
  IPost,
  "_id" | "__v" | "createdAt" | "updatedAt"
>;

export type getPostsParams = {
  limit?: number;
  page?: number;
};
