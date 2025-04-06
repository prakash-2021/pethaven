import { useQuery } from "@tanstack/react-query";
import { axios } from "../../lib";
import { Pet } from "../../types";

// Fetch all pets
export const useGetPet = (id: string) => {
  return useQuery({
    queryKey: ["get-pet", { id }],
    queryFn: async () => {
      const { data } = await axios.get<Pet>(`/pet/${id}`, {});
      return data;
    },
  });
};
