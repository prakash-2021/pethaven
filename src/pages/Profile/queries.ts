import { useQuery } from "@tanstack/react-query";
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
