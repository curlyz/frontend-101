import { Component } from "react";
import { Card, Spin, Alert, Descriptions } from "antd";
import { UserOutlined } from "@ant-design/icons";

interface UserProfileProps {
  userId: number; // Example prop to potentially trigger updates
}

interface UserProfileState {
  user: { name: string; email: string } | null;
  loading: boolean;
  error: Error | null;
}

/**
 * Demonstrates a class component fetching user data on mount
 * and handling loading/error states.
 */
class UserProfile extends Component<UserProfileProps, UserProfileState> {
  state: UserProfileState = {
    user: null,
    loading: true,
    error: null,
  };

  componentDidMount() {
    this.fetchUserData();
  }

  componentDidUpdate(prevProps: UserProfileProps) {
    // Example: Refetch if userId prop changes
    if (this.props.userId !== prevProps.userId) {
      console.log(
        `UserProfile: userId changed from ${prevProps.userId} to ${this.props.userId}, refetching...`,
      );
      this.fetchUserData();
    }
  }

  fetchUserData = async () => {
    this.setState({ loading: true, error: null });
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      // Mock data based on userId (very basic example)
      const mockUser = {
        name: `User ${this.props.userId}`,
        email: `user${this.props.userId}@example.com`,
      };
      // Simulate potential error for specific IDs for demo
      if (this.props.userId === 0) {
        throw new Error("Invalid user ID: 0");
      }
      this.setState({ user: mockUser, loading: false });
    } catch (err) {
      this.setState({
        error:
          err instanceof Error ? err : new Error("An unknown error occurred"),
        loading: false,
      });
    }
  };

  render() {
    const { loading, error, user } = this.state;

    if (loading) {
      return <Spin tip="Loading user profile..." />;
    }

    if (error) {
      return (
        <Alert
          message="Error loading profile"
          description={error.message}
          type="error"
          showIcon
        />
      );
    }

    if (!user) {
      return <Alert message="No user data found" type="warning" showIcon />;
    }

    return (
      <Card
        title={
          <>
            <UserOutlined /> User Profile (Class Component)
          </>
        }
        bordered={false}
      >
        <Descriptions bordered column={1}>
          <Descriptions.Item label="User ID">
            {this.props.userId}
          </Descriptions.Item>
          <Descriptions.Item label="Name">{user.name}</Descriptions.Item>
          <Descriptions.Item label="Email">{user.email}</Descriptions.Item>
        </Descriptions>
      </Card>
    );
  }
}

export default UserProfile;
