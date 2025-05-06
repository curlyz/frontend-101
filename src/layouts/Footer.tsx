import React from "react";
import { Layout, Typography } from "antd";

const { Footer: AntFooter } = Layout;
const { Text } = Typography;

/**
 * A simple application footer component.
 *
 * @returns {JSX.Element} The Footer component.
 */
const Footer: React.FC = () => {
  return (
    <AntFooter style={{ textAlign: "center" }}>
      <Text type="secondary">
        Frontend 101 Presentation ©{new Date().getFullYear()}
      </Text>
    </AntFooter>
  );
};

export default Footer;
