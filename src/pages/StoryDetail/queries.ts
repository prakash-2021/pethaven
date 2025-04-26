import { useQuery } from "@tanstack/react-query";
import { axios } from "../../lib";
import { Story } from "../../types";

export const useGetAllStory = (
  page?: number,
  pageSize?: number,
  search?: string,
  category?: string
) => {
  return useQuery({
    queryKey: ["get-all-Story", { page, pageSize, search, category }],
    queryFn: async () => {
      const { data } = await axios.get<{
        stories: Story[];
        meta: {
          pageNumber: number;
          pageSize: number;
          totalPages: number;
          totalStories: number;
        };
      }>("/story", {
        params: { page, pageSize, category, search },
      });
      return data;
    },
  });
};

export const useGetStory = (id: string) => {
  return useQuery({
    queryKey: ["get-story-id", { id }],
    queryFn: async () => {
      const { data } = await axios.get<Story>(`/story/${id}`, {});
      return data;
    },
  });
};
