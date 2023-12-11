import axiosClient from "../../api/axiosClient";
import { useQueryClient, useMutation } from "react-query";
const deleteCampagign = async ({ id }) => {
  const accessToken = window.localStorage.getItem("accessToken");

  const response = await axiosClient.patch(
    `/api/v1/campaigns/deleteCampagign?id=${id}`,
    {},
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
  return response.data;
};

export const useDeleteCampaign = () => {
  const queryClient = useQueryClient();

  return useMutation(
    ({ id }) => {
      return deleteCampagign({ id });
    },
    {
      onSuccess: () => {
        // Invalidate and refetch
        queryClient.invalidateQueries("SEARCH_LIST");
      },
    }
  );
};
