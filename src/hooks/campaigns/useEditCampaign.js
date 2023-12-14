import axiosClient from "../../api/axiosClient";
import { useQueryClient, useMutation } from "react-query";

const dataCampaign = async ({ id, record }) => {
  const accessToken = window.localStorage.getItem("accessToken");

  const response = await axiosClient.put(`/api/v1/accounts/update?id=${id}`, record, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return response.data;
};

export const useEditCampaign = () => {
  const queryClient = useQueryClient();

  return useMutation(
    ({ id, record }) => {
      return dataCampaign({ id, record });
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("SEARCH_LIST");
      },
    }
  );
};
