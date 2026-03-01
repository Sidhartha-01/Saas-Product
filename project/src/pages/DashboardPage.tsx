import { Row, Col, Card} from "antd";
import StatCard from "../components/StatCard";
import {
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  AreaChart,
} from "recharts";

const AreaChartData = [
  { name: "Jan", revenue: 4000 },
  { name: "Feb", revenue: 3000 },
  { name: "Mar", revenue: 5000 },
  { name: "Apr", revenue: 7000 },
];

const pieData = [
  { name: "Active", value: 5 },
  { name: "Paused", value: 2 },
  { name: "Completed", value: 3 },
];

export default function DashboardPage() {
  return (
    <>
      <Row gutter={16}>
        <Col span={6}>
          <StatCard title="Total Campaigns" value={10} />
        </Col>
        <Col span={6}>
          <StatCard title="Active Campaigns" value={5} />
        </Col>
        <Col span={6}>
          <StatCard title="Revenue" value="$24,000" />
        </Col>
        <Col span={6}>
          <StatCard title="CTR" value="4.2%" />
        </Col>
      </Row>

      <Row gutter={16} style={{ marginTop: 24 }}>
        <Col span={12}>
          <Card title="Revenue Overview">
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={AreaChartData}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="revenue" />
              </AreaChart>
            </ResponsiveContainer>
          </Card>
        </Col>

        <Col span={12}>
          <Card title="Campaign Status">
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie data={pieData} dataKey="value" nameKey="name" />
              </PieChart>
            </ResponsiveContainer>
          </Card>
        </Col>
      </Row>
    </>
  );
}