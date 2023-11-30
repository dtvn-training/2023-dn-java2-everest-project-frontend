import axiosClient from "../../api/axiosClient";
import { useQuery } from "react-query";

const fetchAccounts = async (pageSize, pageNo) => {
  const response = await axiosClient.get("/api/v1/accounts", {
    params: {
      pageSize,
      pageNo,
    },
  });
  return response.data;
};
export const useFetchAccounts = (pageSize, pageNo) => {
  
  return useQuery(["FETCH_LIST", pageSize, pageNo], () => fetchAccounts(pageSize, pageNo), {
    refetchOnWindowFocus: true,
    retry: 3,
  });
};

