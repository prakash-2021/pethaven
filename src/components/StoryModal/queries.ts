import { useMutation, useQueryClient } from "@tanstack/react-query";
import { axios } from "../../lib";
import { CreateStoryPayload } from "../../types";

export const useCreateStory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (application: CreateStoryPayload) => {
      const { data } = await axios.post("/story", application);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["get-story-id"] });
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
