import { useSession } from "next-auth/react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { API_URL } from "@/config";

function useGetData({ path }) {
  const { data: session } = useSession();

  const url = `${API_URL}${path}`;

  const token = session?.user?.token;

  const fetcher = async () => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    return axios.get(url, config).then(({ data }) => data);
  };

  return useQuery({
    queryKey: [path],
    queryFn: fetcher,
    enabled: !!session,
    retry: false,
  });
}

export default useGetData;
