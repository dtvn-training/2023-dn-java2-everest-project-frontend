import axiosClient from "../../api/axiosClient";
import { useQuery, useMutation } from "react-query";
const dataAccounts = async ({ id }) => {
  const response = await axiosClient.patch(`/api/v1/accounts?id=${id}`);
  return response.data;
};
export const useDeleteAccount = () => {
  return useMutation(({ id }) => {
    return dataAccounts({id});
  });
};  