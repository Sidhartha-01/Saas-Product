import { Row, Col, Card } from "antd";
import { useMemo } from "react";
import {
  TrendingUp,
  Users,
  Target,
  Zap,
} from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  CartesianGrid,
} from "recharts";
import RecentCampaigns from "../components/RecentCampaigns";
import { useCampaignStore } from "../store/campaignStore";
import StatCard from "../components/StatCard";
import { useCampaignPolling } from "../hooks/useCampaignPolling";

const COLORS = ["#52c41a", "#faad14", "#ff4d4f"];

export default function DashboardPage() {
  const { campaigns } = useCampaignStore();

  useCampaignPolling();

  const activeCampaigns = campaigns.filter(c => c.status === "Active").length;
  const totalReach = campaigns.reduce((acc, c) => acc + c.impressions,0);
  const totalClicks = campaigns.reduce((acc, c) => acc + c.clicks,0 );
  const avgConversion =totalReach > 0 ? ((totalClicks / totalReach) * 100).toFixed(2) : "0";
  const totalBudget = campaigns.reduce((acc, c) => acc + c.budget,0);
  const totalSpend = campaigns.reduce((acc, c) => acc + c.spend,0);
  const budgetUtilization = totalBudget > 0? ((totalSpend / totalBudget) * 100).toFixed(0): 0;

  const areaChartData = useMemo(() => {
    if (campaigns.length === 0) {
      return [{ name: "No Data", revenue: 0 }];
    }

    const grouped: Record<string, number> = {};
    const monthOrder: Record<string, number> = {
      "Jan": 1, "Feb": 2, "Mar": 3, "Apr": 4, "May": 5, "Jun": 6,
      "Jul": 7, "Aug": 8, "Sep": 9, "Oct": 10, "Nov": 11, "Dec": 12
    };

    campaigns.forEach((c) => {
      if (!c.createdAt) return;

      const month = new Date(c.createdAt).toLocaleString("default", {
        month: "short",
      });

      grouped[month] = (grouped[month] || 0) + c.spend;
    });

    const data = Object.entries(grouped)
      .map(([name, revenue]) => ({ name, revenue }))
      .sort((a, b) => (monthOrder[a.name] || 0) - (monthOrder[b.name] || 0));

    return data.length > 0 ? data : [{ name: "No Data", revenue: 0 }];
  }, [campaigns]);


  const pieData = useMemo(() => {
    const statusCount: Record<string, number> = {};

    campaigns.forEach((c) => {
      statusCount[c.status] = (statusCount[c.status] || 0) + 1;
    });

    return Object.entries(statusCount).map(([name, value]) => ({
      name,
      value,
    }));
  }, [campaigns]);

  return (
    <div style={{ padding: 24 }}>
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12} md={6}>
          <StatCard
            title="Active Campaigns"
            value={activeCampaigns}
            icon={Zap}
            color="text-amber-600"
            bg="bg-amber-50" change={""} trend={"up"}/>
        </Col>

        <Col xs={24} sm={12} md={6}>
          <StatCard
            title="Total Reach"
            value={totalReach.toLocaleString()}
            icon={Users}
            color="text-blue-600"
            bg="bg-blue-50" change={""} trend={"up"}/>
        </Col>

        <Col xs={24} sm={12} md={6}>
          <StatCard
            title="Avg. Conversion"
            value={`${avgConversion}%`}
            icon={Target}
            color="text-purple-600"
            bg="bg-purple-50" change={""} trend={"up"}/>
        </Col>

        <Col xs={24} sm={12} md={6}>
          <StatCard
            title="Budget Utilization"
            value={`${budgetUtilization}%`}
            icon={TrendingUp}
            color="text-emerald-600"
            bg="bg-emerald-50" change={""} trend={"up"}/>
        </Col>
      </Row>

      <Row gutter={[16, 16]} style={{ marginTop: 24 }}>
        <Col xs={24} lg={14}>
          <Card title="Revenue Overview" bordered={false}>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={areaChartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Area
                  type="monotone"
                  dataKey="revenue"
                  stroke="#10b981"
                  strokeWidth={2}
                  fillOpacity={0.3}
                  fill="#10b981"
                />
              </AreaChart>
            </ResponsiveContainer>
          </Card>
        </Col>

        <Col xs={24} lg={10}>
          <Card title="Campaign Status" bordered={false}>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={pieData}
                  dataKey="value"
                  nameKey="name"
                  outerRadius={100}
                  label
                >
                  {pieData.map((_entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </Card>
        </Col>
      </Row>

      <div className="mt-6">
        <RecentCampaigns />
      </div>

    </div>
  );
}