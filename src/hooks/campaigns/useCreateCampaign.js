import axiosClient from "../../api/axiosClient";
import { useMutation, useQueryClient } from "react-query";
const accessToken = window.localStorage.getItem("accessToken");

const createCampaign = async (formData, token) => {
  const response = await axiosClient.post("/api/v1/campaigns/createCampaign", formData, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

const useCreateCampaign = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation((formData) => createCampaign(formData, getAuthToken()), {
    onSuccess: () => {
      queryClient.invalidateQueries("SEARCH_LIST");
    },
  });

  const getAuthToken = () => {
    // Implement your logic to retrieve the authorization token from localStorage or wherever it's stored
    return window.localStorage.getItem("accessToken");
  };

  return {
    createCampaign: mutation.mutateAsync,
  };
};

export default useCreateCampaign;
