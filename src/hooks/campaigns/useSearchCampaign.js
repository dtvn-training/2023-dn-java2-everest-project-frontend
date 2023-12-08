import axiosClient from "../../api/axiosClient";
import { useQuery } from "react-query";

export const fetchSearchCampaigns = async ({ name, pageSize, pageNo }) => {
  const accessToken = window.localStorage.getItem("accessToken");

  const response = await axiosClient.get("/api/v1/campaigns/getCampaign", {
    params: {
      name,
      pageSize,
      pageNo,
    },
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return response.data;
};

export const useSearchCampaign = (name, pageSize, pageNo) => {
  return useQuery(["SEARCH_LIST", name, pageSize, pageNo], () => fetchSearchCampaigns({ name, pageSize, pageNo }));
};
