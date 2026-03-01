import { useEffect, useState } from "react";
import { Table, Tag, Input, Select, Card } from "antd";
import type { ColumnsType } from "antd/es/table";
import { useCampaignStore } from "../store/campaignStore";
import type { Campaign } from "../types/campaign";

const { Search } = Input;

export default function CampaignPage() {
  const { campaigns, loading, fetchCampaigns } = useCampaignStore();
  const [searchText, setSearchText] = useState("");
  const [statusFilter, setStatusFilter] = useState<string | undefined>();

  useEffect(() => {
    fetchCampaigns();
  }, [fetchCampaigns]);

  const filteredData = campaigns.filter((campaign) => {
    const matchesSearch = campaign.name
      .toLowerCase()
      .includes(searchText.toLowerCase());

    const matchesStatus = statusFilter
      ? campaign.status === statusFilter
      : true;

    return matchesSearch && matchesStatus;
  });

  const columns: ColumnsType<Campaign> = [
    {
      title: "Campaign Name",
      dataIndex: "name",
    },
    {
      title: "Status",
      dataIndex: "status",
      render: (status: string) => {
        const color =
          status === "Active"
            ? "green"
            : status === "Paused"
            ? "orange"
            : "red";

        return <Tag color={color}>{status}</Tag>;
      },
    },
    {
      title: "Budget ($)",
      dataIndex: "budget",
    },
    {
      title: "Spend ($)",
      dataIndex: "spend",
    },
    {
      title: "Impressions",
      dataIndex: "impressions",
    },
    {
      title: "Clicks",
      dataIndex: "clicks",
    },
  ];

  return (
    <div className="p-6">
      <Card title="Campaign Management">
        <div className="flex justify-between mb-4">
          <Search
            placeholder="Search campaigns..."
            onChange={(e) => setSearchText(e.target.value)}
            style={{ width: 250 }}
          />

          <Select
            placeholder="Filter by Status"
            allowClear
            style={{ width: 200 }}
            onChange={(value) => setStatusFilter(value)}
            options={[
              { label: "Active", value: "Active" },
              { label: "Paused", value: "Paused" },
              { label: "Completed", value: "Completed" },
            ]}
          />
        </div>

        <Table
          columns={columns}
          dataSource={filteredData}
          loading={loading}
          rowKey="id"
          pagination={{ pageSize: 5 }}
        />
      </Card>
    </div>
  );
}