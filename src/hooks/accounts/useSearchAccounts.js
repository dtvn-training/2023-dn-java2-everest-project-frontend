import axiosClient from "../../api/axiosClient";
import { useQuery } from "react-query";

const fetchSearchAccounts = async ({ emailOrName, pageSize, pageNo }) => {
  const response = await axiosClient.get("/api/v1/accounts", {
    params: {
      emailOrName,
      pageSize,
      pageNo,
    },
  });
  return response.data;
};

export const useSearchAccounts = (emailOrName, pageSize, pageNo) => {
  return useQuery(["SEARCH_LIST", emailOrName, pageSize, pageNo], () =>
    fetchSearchAccounts({ emailOrName, pageSize, pageNo })
  );
};
