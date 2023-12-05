import axiosClient from "../../api/axiosClient";
import { useQueryClient, useMutation } from "react-query";
const deleteAccount = async ({ id }) => {
  const accessToken = window.localStorage.getItem("accessToken");

  const response = await axiosClient.patch(
    `/api/v1/accounts?id=${id}`,
    {},
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
  return response.data;
};

export const useDeleteAccount = () => {
  const queryClient = useQueryClient();

  return useMutation(
    ({ id }) => {
      return deleteAccount({ id });
    },
    {
      onSuccess: () => {
        // Invalidate and refetch
        queryClient.invalidateQueries("SEARCH_LIST");
      },
    }
  );
};
