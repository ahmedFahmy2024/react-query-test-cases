// features/users/services/userService.ts

import { axiosInstance } from "../../../api/axios";
import type { getUsersParams, IUsersResponse } from "../types";

export const fetchUsers = async (
  params?: getUsersParams
): Promise<IUsersResponse> => {
  const { data } = await axiosInstance.get("/api/users", { params });
  return data;
};
