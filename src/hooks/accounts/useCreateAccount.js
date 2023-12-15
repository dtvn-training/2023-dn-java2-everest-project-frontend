import { useMutation, useQueryClient } from "react-query";
import axiosClient from "../../api/axiosClient";

const createAccount = async (data, token) => {
  const response = await axiosClient.post("/api/v1/accounts/registerAccount", data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

const useCreateAccount = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation((data) => createAccount(data, getAuthToken()), {
    onSuccess: () => {
      queryClient.invalidateQueries("SEARCH_LIST");
    },
  });

  const getAuthToken = () => {
    return window.localStorage.getItem("accessToken");
  };

  return {
    createAccount: mutation.mutateAsync,
  };
};

export default useCreateAccount;
