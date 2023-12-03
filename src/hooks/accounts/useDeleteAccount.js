import axiosClient from "../../api/axiosClient";
import { useQueryClient, useMutation } from "react-query";
const dataAccounts = async ({ id }) => {
  const response = await axiosClient.patch(`/api/v1/accounts?id=${id}`);
  return response.data;
};
export const useDeleteAccount = () => {
  const queryClient = useQueryClient();
  return useMutation(
    ({ id }) => {
      return dataAccounts({ id });
    },
    {
      onSuccess: () => {
        // Invalidate and refetch
        queryClient.invalidateQueries("SEARCH_LIST");
      },
    }
  );
};
