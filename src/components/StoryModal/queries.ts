import { useMutation } from "@tanstack/react-query";
import { axios } from "../../lib";
import { CreateStoryPayload } from "../../types";

export const useCreateStory = () => {
  return useMutation({
    mutationFn: async (application: CreateStoryPayload) => {
      const { data } = await axios.post("/story", application);
      return data;
    },
  });
};

export type UploadedImage = {
  secure_url: string;
  created_at: string;
};

export const useUploadImage = () => {
  return useMutation({
    mutationFn: async (formData: FormData) => {
      const { data } = await axios.post("/story/upload", formData);
      return data.data; // assuming responseGenerator wraps the result
    },
  });
};
