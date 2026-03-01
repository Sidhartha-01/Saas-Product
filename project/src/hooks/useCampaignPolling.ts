import { useEffect } from "react";
import { useCampaignStore } from "../store/campaignStore";

export const useCampaignPolling = () => {
  useEffect(() => {
    const interval = setInterval(() => {
      const campaigns = useCampaignStore.getState().campaigns;
      const refreshMetrics = useCampaignStore.getState().refreshMetrics;
      refreshMetrics(campaigns);
    }, 5000);

    return () => clearInterval(interval);
  }, []);
};