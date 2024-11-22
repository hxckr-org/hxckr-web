import { CREATE_REPO } from "@/config/endpoints";
import axios from "@/services/axios";
import { CreateRepoResponse } from "@/types";
import { useMutation } from "@tanstack/react-query";

const createRepo = async (repo_url: string) => {
  try {
    const response = await axios.post<CreateRepoResponse>(CREATE_REPO, {
      repo_url,
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const useCreateRepo = (repo_url: string) => {
  return useMutation({
    mutationFn: () => createRepo(repo_url),
    onSuccess: (data) => {
      console.log(data);
    },
  });
};

export default useCreateRepo;
