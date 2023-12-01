import { useMutation, useQueryClient } from "react-query";
import axiosClient from "../../api/axiosClient";

const useCreateAccount = () => {
  const queryClient = useQueryClient();

  const createAccount = async (data) => {
    const response = await axiosClient.post("/api/v1/accounts", data);
    return response.data;
  };

  const { mutateAsync: createAccountMutation } = useMutation(createAccount, {
    onSuccess: () => {
      // Invalidate and refetch the accounts query to update the data after creating a new account
      queryClient.invalidateQueries("FETCH_LIST");
    },
  });

  return {
    createAccount: createAccountMutation,
  };
};

export default useCreateAccount;
