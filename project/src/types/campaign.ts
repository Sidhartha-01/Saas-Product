export interface Campaign {
  id: string;
  name: string;
  status: "Active" | "Paused" | "Completed";
  budget: number;
  spend: number;
  impressions: number;
  clicks: number;
  createdAt: string;
}
