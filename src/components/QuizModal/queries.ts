import { useMutation, useQuery } from "@tanstack/react-query";
import { axios } from "../../lib";
import { AnswerPetMappingResponse, QuizQuestion } from "../../types/quiz";

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

interface AnswerIdRequest {
  answerIds: string[];
}

export const usePetsByAnswerId = () => {
  return useMutation({
    mutationFn: async (answerIds: AnswerIdRequest) => {
      const { data } = await axios.post<AnswerPetMappingResponse[]>(
        "/quiz-answers/pets-by-answers",
        answerIds
      );
      return data;
    },
  });
};
