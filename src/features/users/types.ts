// features/users/types.ts

export interface IUser {
  _id: string;
  name: string;
  email: string;
  __v: number;
  createdAt: string;
  updatedAt: string;
}

export interface IUsersResponse {
  currentPage?: number;
  users: IUser[];
  totalPages?: number;
}

export type ICreateUser = Omit<
  IUser,
  "_id" | "__v" | "createdAt" | "updatedAt"
>;

export type getUsersParams = {
  limit?: number;
  page?: number;
};
