export type CampaignStatus = "Active" | "Paused" | "Completed";

export interface Campaign {
  id: string;
  name: string;
  status: CampaignStatus;
  budget: number;
  spend: number;
  impressions: number;
  clicks: number;
  createdAt?: string;  
}