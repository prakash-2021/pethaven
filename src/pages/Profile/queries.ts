import { useQuery } from "@tanstack/react-query";
import { axios } from "../../lib";
import { QuizQuestion } from "../../types/quiz";

// Fetch all pets
export const useGetQuiz = () => {
  return useQuery({
    queryKey: ["get-all-quiz"],
    queryFn: async () => {
      const { data } = await axios.get<QuizQuestion[]>("/quiz", {});
      return data;
    },
  });
};
