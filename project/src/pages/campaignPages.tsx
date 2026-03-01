import { useState } from "react";
import {
  Table,
  Tag,
  Input,
  Select,
  Card,
  Button,
  Modal,
  Form,
  InputNumber,
  Space,
  Popconfirm,
} from "antd";
import type { ColumnsType } from "antd/es/table";
import { useCampaignStore } from "../store/campaignStore";
import type { Campaign } from "../types/campaign";
import { PlusOutlined } from "@ant-design/icons";
import { useCampaignPolling } from "../hooks/useCampaignPolling";

const { Search } = Input;

export default function CampaignPage() {
  const {
    campaigns,
    loading,
    addCampaign,
    updateCampaign,
    deleteCampaign,
  } = useCampaignStore();

  const [searchText, setSearchText] = useState("");
  const [statusFilter, setStatusFilter] = useState<string | undefined>();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCampaign, setEditingCampaign] = useState<Campaign | null>(null);

  const [form] = Form.useForm();

  // useEffect(() => {
  //   fetchCampaigns();
  // }, [fetchCampaigns]);

  useCampaignStore((state) => state.refreshMetrics);
 

  useCampaignPolling();

  const filteredData = campaigns.filter((campaign) => {
    const matchesSearch = campaign.name
      .toLowerCase()
      .includes(searchText.toLowerCase());

    const matchesStatus = statusFilter
      ? campaign.status === statusFilter
      : true;

    return matchesSearch && matchesStatus;
  });

  const handleAddOrUpdate = () => {
    form.validateFields().then((values) => {
      if (editingCampaign) {
        updateCampaign({ ...editingCampaign, ...values });
      } else {
        const newCampaign: Campaign = {
          impressions: 0,
          clicks: 0,  
          id: Date.now().toString(),
          ...values,
        };
        addCampaign(newCampaign);
      }

      form.resetFields();
      setEditingCampaign(null);
      setIsModalOpen(false);
    });
  };

  const handleEdit = (record: Campaign) => {
    setEditingCampaign(record);
    form.setFieldsValue(record);
    setIsModalOpen(true);
  };

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
    {
      title: "Actions",
      render: (_, record) => (
        <Space>
          <Button type="link" onClick={() => handleEdit(record)}>
            Edit
          </Button>

          <Popconfirm
            title="Delete this campaign?"
            onConfirm={() => deleteCampaign(record.id)}
          >
            <Button type="link" danger>
              Delete
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div className="p-6">
      <Card
        title="Campaign Management"
        extra={
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => {
              setEditingCampaign(null);
              form.resetFields();
              setIsModalOpen(true);
            }}
          >
            Add Campaign
          </Button>
        }
      >
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

      {/* Modal */}
      <Modal
        title={editingCampaign ? "Edit Campaign" : "Add Campaign"}
        open={isModalOpen}
        onOk={handleAddOrUpdate}
        onCancel={() => {
          setIsModalOpen(false);
          setEditingCampaign(null);
        }}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="name"
            label="Campaign Name"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="status"
            label="Status"
            rules={[{ required: true }]}
          >
            <Select
              options={[
                { label: "Active", value: "Active" },
                { label: "Paused", value: "Paused" },
                { label: "Completed", value: "Completed" },
              ]}
            />
          </Form.Item>

          <Form.Item
            name="budget"
            label="Budget"
            rules={[{ required: true }]}
          >
            <InputNumber style={{ width: "100%" }} />
          </Form.Item>

          <Form.Item
            name="spend"
            label="Spend"
            rules={[{ required: true }]}
          >
            <InputNumber style={{ width: "100%" }} />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}