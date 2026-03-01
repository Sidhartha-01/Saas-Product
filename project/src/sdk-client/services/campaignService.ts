import type { Campaign } from "../../types/campaign";

// let mockCampaigns: Campaign[] = [
//   {
//     id: "1",
//     name: "Summer Promo",
//     status: "Active",
//     budget: 10000,
//     spend: 4500,
//     impressions: 120000,
//     clicks: 3400,
//     createdAt: "2026-01-15",
//   },
//   {
//     id: "2",
//     name: "Gaming Launch",
//     status: "Paused",
//     budget: 8000,
//     spend: 6100,
//     impressions: 240000,
//     clicks: 8200,
//     createdAt: "2026-02-10",
//   },
//   {
//     id: "3",
//     name: "Black Friday",
//     status: "Completed",
//     budget: 15000,
//     spend: 15000,
//     impressions: 500000,
//     clicks: 21000,
//     createdAt: "2026-03-05",
//   },
// ]

// export const campaignService = {
//   async getCampaigns(): Promise<Campaign[]> {
//     return new Promise((resolve) => {
//       setTimeout(() => resolve(mockCampaigns), 800);
//     });
//   },
// };

const simulateDelay = (min = 500, max = 1200) =>
  new Promise((res) =>
    setTimeout(res, Math.random() * (max - min) + min)
  );

export const campaignService = {
  async getCampaigns(data: Campaign[]): Promise<Campaign[]> {
    await simulateDelay();
    return [...data];
  },

  async simulateMetricUpdate(data: Campaign[]): Promise<Campaign[]> {
    await simulateDelay();

    data = data.map((campaign) => {
      if (campaign.status !== "Active") return campaign;

      const randomImpressions = Math.floor(Math.random() * 5000);
      const randomClicks = Math.floor(Math.random() * 100);

      return {
        ...campaign,
        impressions: campaign.impressions + randomImpressions,
        clicks: campaign.clicks + randomClicks,
        spend: campaign.spend + randomClicks * 0.1,
      };
    });


    return [...data];
  },
};