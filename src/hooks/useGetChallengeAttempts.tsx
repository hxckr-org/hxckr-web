import axios from "axios";

import { GET_CHALLENGE_ATTEMPTS } from "@/config/endpoints";
import { ChallengePeriod, Period } from "@/types";
import { useQuery } from "@tanstack/react-query";

const fetchChallengeAttempts = async ({
  challenge_id,
  period = Period.AllTime,
}: {
  challenge_id: string;
  period?: ChallengePeriod;
}) => {
  const response = await axios.get(GET_CHALLENGE_ATTEMPTS, {
    params: { challenge_id, period },
  });
  return response.data;
};

export const useGetChallengeAttempts = ({
  challenge_id,
  period,
}: {
  challenge_id: string;
  period?: ChallengePeriod;
}) => {
  return useQuery({
    queryKey: ["challenge-attempts", challenge_id, period],
    queryFn: () => fetchChallengeAttempts({ challenge_id, period }),
  });
};

export default useGetChallengeAttempts;
