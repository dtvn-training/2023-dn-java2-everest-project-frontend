import { useQuery } from "react-query";
import axiosClient from "../../api/axiosClient";

const fetchAccounts = async (pageSize, pageNo) => {
  const accessToken = window.localStorage.getItem("accessToken");

  const response = await axiosClient.get("/api/v1/accounts/getAllAccount", {
    params: {
      pageSize,
      pageNo,
    },
    headers: {
      Authorization: `Bearer ${accessToken}`,
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
