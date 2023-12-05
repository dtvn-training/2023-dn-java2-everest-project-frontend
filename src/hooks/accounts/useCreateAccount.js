import axiosClient from "../../api/axiosClient";
import { useMutation, useQueryClient } from "react-query";

const createAccount = async (data, token) => {
  const response = await axiosClient.post("/api/v1/accounts", data, {
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
    // Implement your logic to retrieve the authorization token from localStorage or wherever it's stored
    return window.localStorage.getItem("accessToken");
  };

  return {
    createAccount: mutation.mutateAsync,
  };
};

export default useCreateAccount;
