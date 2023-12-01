import axiosClient from "../../api/axiosClient";
import { useQuery, useMutation } from "react-query";
const dataAccounts = async ({ id, record }) => {
  const response = await axiosClient.put(`/api/v1/accounts?id=${id}`, 
    record,
  );
  return response.data;
};
export const useUpdataAccount = () => {
  return useMutation(({ id, record }) => {
    return dataAccounts({id, record});
  });
};
