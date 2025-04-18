import { useMutation, useQuery } from "@tanstack/react-query";
import { axios } from "../../lib";
import { ApplicationInput } from "../../types/account";
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

export const useCreateApplication = () => {
  return useMutation({
    mutationFn: async (application: ApplicationInput) => {
      const { data } = await axios.post("/applications", application);
      return data;
    },
  });
};
