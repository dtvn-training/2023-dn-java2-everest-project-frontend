import { useQuery } from "react-query";
import axiosClient from "../../api/axiosClient";

const fetchCampaigns = async (pageSize, pageNo) => {
  const accessToken = window.localStorage.getItem("accessToken");

  const response = await axiosClient.get("/api/v1/campaigns/getCampaign", {
    params: {
      pageSize,
      pageNo,
    },
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return response.data;
};

export const useFetchCampaign = (pageSize, pageNo) => {
  return useQuery(["FETCH_LIST", pageSize, pageNo], () => fetchCampaigns(pageSize, pageNo), {
    refetchOnWindowFocus: true,
    retry: 3,
  });
};
