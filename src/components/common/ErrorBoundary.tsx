// import React, { Component, ErrorInfo, ReactNode } from 'react';
import { Component, type ErrorInfo, type ReactNode } from "react"; // Use type-only imports
import { Card, Alert, Button, Typography, Space } from "antd";
import { CopyOutlined, CheckOutlined } from "@ant-design/icons";

const { Title, Paragraph, Text } = Typography;

interface Props {
  children?: ReactNode;
  fallback?: ReactNode; // Optional custom fallback UI
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
  copied: boolean;
}

/**
 * Catches JavaScript errors anywhere in its child component tree,
 * logs those errors, and displays a fallback UI instead of the crashed component tree.
 * Includes error details and a copy button.
 */
class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
    errorInfo: null,
    copied: false,
  };

  /**
   * Updates state so the next render will show the fallback UI.
   * @param {Error} error - The error that was thrown.
   * @returns {Partial<State>} - An object representing the updated state.
   */
  public static getDerivedStateFromError(error: Error): Partial<State> {
    return { hasError: true, error };
  }

  /**
   * Catches errors after they have been thrown and logs them.
   * @param {Error} error - The error that was thrown.
   * @param {ErrorInfo} errorInfo - An object with componentStack key containing information about which component threw the error.
   */
  public componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.error("Uncaught error:", error, errorInfo);
    this.setState({ errorInfo });
    // You can also log the error to an error reporting service here
    // logErrorToMyService(error, errorInfo);
  }

  /**
   * Handles copying the error details to the clipboard.
   */
  handleCopy = (): void => {
    const { error, errorInfo } = this.state;
    if (!error) return;

    const errorDetails = `Error: ${error.message}\n\nStack Trace:\n${error.stack || "N/A"}\n\nComponent Stack:\n${errorInfo?.componentStack || "N/A"}`;

    navigator.clipboard
      .writeText(errorDetails)
      .then(() => {
        this.setState({ copied: true });
        setTimeout(() => this.setState({ copied: false }), 2000); // Reset copied state after 2s
      })
      .catch((err) => {
        console.error("Failed to copy error details: ", err);
        // Optionally show an alert or notification to the user
      });
  };

  render(): ReactNode {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      if (this.props.fallback) {
        return this.props.fallback;
      }

      const { error, errorInfo, copied } = this.state;

      return (
        <div style={{ padding: "40px", margin: "auto", maxWidth: "800px" }}>
          <Card
            title={
              <Title level={3} type="danger">
                Something went wrong.
              </Title>
            }
            bordered={false}
          >
            <Space direction="vertical" style={{ width: "100%" }}>
              <Alert
                message="An unexpected error occurred."
                description="Try refreshing the page. If the problem persists, please report this issue."
                type="error"
                showIcon
              />

              {error && (
                <Card size="small" title="Error Details">
                  <Paragraph strong>Message:</Paragraph>
                  <Text code>{error.message}</Text>

                  {error.stack && (
                    <>
                      <Paragraph strong style={{ marginTop: "10px" }}>
                        Stack Trace:
                      </Paragraph>
                      <Text
                        code
                        style={{
                          whiteSpace: "pre-wrap",
                          display: "block",
                          maxHeight: "150px",
                          overflowY: "auto",
                          background: "#f5f5f5",
                          padding: "5px",
                        }}
                      >
                        {error.stack}
                      </Text>
                    </>
                  )}

                  {errorInfo?.componentStack && (
                    <>
                      <Paragraph strong style={{ marginTop: "10px" }}>
                        Component Stack:
                      </Paragraph>
                      <Text
                        code
                        style={{
                          whiteSpace: "pre-wrap",
                          display: "block",
                          maxHeight: "200px",
                          overflowY: "auto",
                          background: "#f5f5f5",
                          padding: "5px",
                        }}
                      >
                        {errorInfo.componentStack}
                      </Text>
                    </>
                  )}
                </Card>
              )}

              <Button
                icon={copied ? <CheckOutlined /> : <CopyOutlined />}
                onClick={this.handleCopy}
                disabled={!error}
              >
                {copied ? "Copied!" : "Copy Details"}
              </Button>
            </Space>
          </Card>
        </div>
      );
    }

    // Normally, just render children
    return this.props.children;
  }
}

export default ErrorBoundary;
