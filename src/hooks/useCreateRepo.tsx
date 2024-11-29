import { CREATE_REPO } from "@/config/endpoints";
import axios from "@/services/axios";
import { CreateRepoResponse } from "@/types";
import { useMutation } from "@tanstack/react-query";

const createRepo = async ({
  repo_url,
  language,
}: {
  repo_url: string;
  language: string;
}) => {
  try {
    const response = await axios.post<CreateRepoResponse>(CREATE_REPO, {
      repo_url,
      language,
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const useCreateRepo = ({
  repo_url,
  language,
  callback,
}: {
  repo_url: string;
  language: string;
  callback: (data: CreateRepoResponse) => void;
}) => {
  return useMutation({
    mutationFn: () => createRepo({ repo_url, language }),
    onSuccess: (data) => {
      console.log("Mutation succeeded with data:", data);
      callback(data);
    },
  });
};

export default useCreateRepo;
