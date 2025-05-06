import React from "react";
import { Layout, Typography } from "antd";

const { Header: AntHeader } = Layout;
const { Title } = Typography;

/**
 * A simple application header component.
 *
 * @returns {JSX.Element} The Header component.
 */
const Header: React.FC = () => {
  return (
    <AntHeader
      style={{
        display: "flex",
        alignItems: "center",
        background: "#fff",
        padding: "0 24px",
      }}
    >
      {/* ProLayout might override this, but creating as requested */}
      <Title level={4} style={{ margin: 0 }}>
        Simple Header
      </Title>
      {/* Add Nav items or user profile info here if needed */}
    </AntHeader>
  );
};

export default Header;
