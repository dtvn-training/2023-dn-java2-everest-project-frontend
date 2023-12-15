import { useQuery } from "react-query";
import axiosClient from "../../api/axiosClient";

const fetchRoles = async () => {
  const accessToken = window.localStorage.getItem("accessToken");

  const response = await axiosClient.get("/api/v1/accounts/getRoles", {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return response.data;
};

export const useFetchRoles = () => {
  return useQuery(["FETCH_LIST"], () => fetchRoles(), {
    refetchOnWindowFocus: true,
    retry: 3,
  });
};
