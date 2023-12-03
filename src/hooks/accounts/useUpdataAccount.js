import axiosClient from "../../api/axiosClient";
import { useQueryClient, useMutation } from "react-query";
const dataAccounts = async ({ id, record }) => {
  const response = await axiosClient.put(`/api/v1/accounts?id=${id}`, record);
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
