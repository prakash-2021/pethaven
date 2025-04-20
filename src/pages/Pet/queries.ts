import { useQuery } from "@tanstack/react-query";
import { axios } from "../../lib";
import { Pets } from "../../types";

// Fetch all pets
export const useGetAllPets = (
  page?: number,
  pageSize?: number,
  search?: string,
  adoptionStatus?: string
) => {
  return useQuery({
    queryKey: ["get-all-pets", { page, pageSize, search, adoptionStatus }],
    queryFn: async () => {
      const { data } = await axios.get<Pets>("/pet", {
        params: { page, pageSize, search, adoptionStatus },
      });
      return data;
    },
  });
};
