import { useMutation, useQuery } from "@tanstack/react-query";
import { axios } from "../../lib";
import {
  GetProfileResponse,
  Login,
  TokenData,
  User,
} from "../../types/account";

export const useSignUp = () => {
  return useMutation({
    mutationFn: async (user: User) => {
      const { data } = await axios.post<User>("/users/signup", user);
      return data;
    },
  });
};

export const useLogin = () => {
  return useMutation({
    mutationFn: async (user: Login) => {
      const { data } = await axios.post<TokenData>("/users/login", user);
      return data;
    },
    onSuccess: (data) => {
      localStorage.setItem("token", "Bearer " + data.token);
    },
  });
};

export const useVerifyToken = (token: string | null) => {
  return useQuery({
    queryKey: ["token", { token }],
    queryFn: async () => {
      const { data } = await axios.get<TokenData>(`/users/verify-email`, {
        params: { token },
      });
      localStorage.setItem("token", "Bearer " + data.token);
      return data;
    },

    enabled: !!token, // will only run if token is truthy
  });
};

export const useGetProfile = (token: string | null) => {
  return useQuery({
    queryKey: ["profile"],
    queryFn: async () => {
      const { data } = await axios.get<GetProfileResponse>(`/users/me`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return data;
    },
    enabled: !!token, // only run if token is truthy
  });
};
