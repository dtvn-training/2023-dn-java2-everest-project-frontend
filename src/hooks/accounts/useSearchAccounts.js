import { useQuery } from "react-query";
import axiosClient from "../../api/axiosClient";

export const fetchSearchAccounts = async ({ emailOrName, pageSize, pageNo }) => {
  const accessToken = window.localStorage.getItem("accessToken");

  const response = await axiosClient.get("/api/v1/accounts/getAllAccount", {
    params: {
      emailOrName,
      pageSize,
      pageNo,
    },
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return response.data;
};

export const useSearchAccounts = (emailOrName, pageSize, pageNo) => {
  return useQuery(["SEARCH_LIST", emailOrName, pageSize, pageNo], () =>
    fetchSearchAccounts({ emailOrName, pageSize, pageNo })
  );
};
