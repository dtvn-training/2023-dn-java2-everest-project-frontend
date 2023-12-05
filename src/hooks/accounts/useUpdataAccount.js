import axiosClient from "../../api/axiosClient";
import { useQueryClient, useMutation } from "react-query";

const dataAccounts = async ({ id, record }) => {
  const accessToken = window.localStorage.getItem("accessToken");

  const response = await axiosClient.put(`/api/v1/accounts/update?id=${id}`, record, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return response.data;
};

export const useUpdataAccount = () => {
  const queryClient = useQueryClient();

  return useMutation(
    ({ id, record }) => {
      return dataAccounts({ id, record });
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("SEARCH_LIST");
      },
    }
  );
};
