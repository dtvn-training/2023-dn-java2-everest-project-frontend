import { useMutation } from "react-query";
import axiosClient from "../../api/axiosClient"; // Import your axios instance

const useCreateCampaign = () => {
  // Define the mutation function
  const createCampaign = async (formData) => {
    const accessToken = window.localStorage.getItem("accessToken");
    const response = await axiosClient.post("/api/v1/campaigns/createCampagin", formData, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data;
  };

  // Create the mutation instance
  const { mutate, isLoading, isError, error } = useMutation(createCampaign);

  return {
    createCampaign: mutate,
    isLoading,
    isError,
    error,
  };
};

export default useCreateCampaign;
