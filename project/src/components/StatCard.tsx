import { Card, Statistic } from "antd";

interface Props {
  title: string;
  value: number | string;
}

export default function StatCard({ title, value }: Props) {
  return (
    <Card>
      <Statistic title={title} value={value} />
    </Card>
  );
}