import React, { useEffect, useCallback } from "react";
import { Outlet, useParams, useNavigate } from "react-router-dom";
import { Layout, Button, FloatButton } from "antd";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";

const { Content } = Layout;

// --- Configuration ---
// TODO: Find a better way to determine total slides (e.g., from router config)
const TOTAL_SLIDES = 2;
// ---------------------

/**
 * Root layout component for the slide presentation.
 * Handles navigation between slides via arrows and keyboard.
 * Uses Ant Design components for layout and navigation.
 * @returns {React.ReactElement} The RootLayout component.
 */
export default function RootLayout(): React.ReactElement {
  const { slideId } = useParams<{ slideId: string }>();
  const navigate = useNavigate();
  const currentSlideIndex = parseInt(slideId || "1", 10);

  /**
   * Navigates to the previous slide if one exists.
   */
  const goToPrevSlide = useCallback(() => {
    if (currentSlideIndex > 1) {
      navigate(`/slide/${currentSlideIndex - 1}`);
    }
  }, [currentSlideIndex, navigate]);

  /**
   * Navigates to the next slide if one exists.
   */
  const goToNextSlide = useCallback(() => {
    if (currentSlideIndex < TOTAL_SLIDES) {
      navigate(`/slide/${currentSlideIndex + 1}`);
    }
  }, [currentSlideIndex, navigate]);

  // Styles for the navigation buttons to mimic the original Tailwind styles
  // These could also be done with CSS classes if preferred
  const navButtonStyle: React.CSSProperties = {
    position: "absolute",
    top: "50%",
    transform: "translateY(-50%)",
    zIndex: 10,
    // antd Button default styling for type='primary' or 'default' might be good enough
    // or use type='text' or type='ghost' for more subtle buttons.
    // For now, letting antd defaults play out, can be customized further.
  };

  return (
    <Layout
      style={{ minHeight: "100vh", position: "relative", overflow: "hidden" }}
    >
      {/* Previous Slide Button - using FloatButton for a common antd pattern */}
      {currentSlideIndex > 1 && (
        <FloatButton
          icon={<LeftOutlined />}
          onClick={goToPrevSlide}
          aria-label="Previous Slide"
          style={{ ...navButtonStyle, left: 16 }} // Adjust position as needed
          // type="primary" // or default
        />
      )}

      <Content style={{ height: "100%", width: "100%", overflowY: "auto" }}>
        {" "}
        {/* Ensure content can scroll if it overflows */}
        <Outlet />
      </Content>

      {/* Next Slide Button - using FloatButton */}
      {currentSlideIndex < TOTAL_SLIDES && (
        <FloatButton
          icon={<RightOutlined />}
          onClick={goToNextSlide}
          aria-label="Next Slide"
          style={{ ...navButtonStyle, right: 16 }} // Adjust position as needed
          // type="primary"
        />
      )}
    </Layout>
  );
}
