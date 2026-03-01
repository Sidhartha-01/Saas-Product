import type { Campaign } from "../types/campaign";

const mockCampaigns: Campaign[] = [
  {
    id: "1",
    name: "Summer Sale 2026",
    status: "Active",
    budget: 5000,
    spend: 3200,
    impressions: 120000,
    clicks: 4200,
  },
  {
    id: "2",
    name: "Gaming Launch Promo",
    status: "Paused",
    budget: 8000,
    spend: 6100,
    impressions: 240000,
    clicks: 8200,
  },
  {
    id: "3",
    name: "Black Friday Blast",
    status: "Completed",
    budget: 10000,
    spend: 10000,
    impressions: 500000,
    clicks: 21000,
  },
];

export const campaignService = {
  async getCampaigns(): Promise<Campaign[]> {
    return new Promise((resolve) => {
      setTimeout(() => resolve(mockCampaigns), 800);
    });
  },
};