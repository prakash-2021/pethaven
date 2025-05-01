import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { axios } from "../../lib";
import { Story } from "../../types";

export const useGetStoryId = (userId: string) => {
  return useQuery({
    queryKey: ["get-story-id", { userId }],
    queryFn: async () => {
      const { data } = await axios.get<{ stories: Story[] }>(
        `/story/user/${userId}`
      );
      return data;
    },
    enabled: !!userId,
  });
};

export const useUploadImage = (id: string) => {
  const queryClient = useQueryClient(); // Initialize Query Client

  return useMutation({
    mutationFn: async (formData: FormData) => {
      const { data } = await axios.post(`/users/upload/${id}`, formData);
      return data.data;
    },
    onSuccess: () => {
      // Invalidate profile query so it refetches
      queryClient.invalidateQueries({ queryKey: ["profile"] });
    },
  });
};
