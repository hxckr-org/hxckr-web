import { GET_LEADERBOARD } from "@/config/endpoints";
import axios from "@/services/axios";
import { Leaderboard } from "@/types";
import { useQuery } from "@tanstack/react-query";

const fetchLeaderboard = async () => {
  const response = await axios.get<Leaderboard[]>(GET_LEADERBOARD);
  return response.data;
};

export const useGetLeaderboard = () => {
  return useQuery({
    queryKey: ["leaderboard"],
    queryFn: fetchLeaderboard,
    refetchInterval: 200000, // 1 minute
  });
};
