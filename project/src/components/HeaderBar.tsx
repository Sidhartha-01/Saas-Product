import { Layout, Dropdown, Space, Avatar } from "antd";
import { UserOutlined } from "@ant-design/icons";

const { Header } = Layout;

export default function HeaderBar() {
  return (
    <Header
      style={{
        background: "#fff",
        display: "flex",
        justifyContent: "flex-end",
        paddingRight: 24,
      }}
    >
      <Dropdown
        menu={{
          items: [
            { key: "1", label: "Profile" },
            { key: "2", label: "Logout" },
          ],
        }}
      >
        <Space style={{ cursor: "pointer" }}>
          <Avatar icon={<UserOutlined />} />
          Admin
        </Space>
      </Dropdown>
    </Header>
  );
}