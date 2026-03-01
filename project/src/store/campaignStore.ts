import { create } from "zustand";
import type { Campaign } from "../types/campaign";
import { campaignService } from "../services/campaignService";


interface CampaignState {
  campaigns: Campaign[];
  loading: boolean;
  fetchCampaigns: () => Promise<void>;
}

export const useCampaignStore = create<CampaignState>((set) => ({
  campaigns: [],
  loading: false,

  fetchCampaigns: async () => {
    set({ loading: true });
    const data = await campaignService.getCampaigns();
    set({ campaigns: data, loading: false });
  },
}));