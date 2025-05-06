import React, { useEffect, useCallback } from "react";
import { Outlet, useParams, useNavigate } from "react-router-dom";

// --- Configuration ---
// TODO: Find a better way to determine total slides (e.g., from router config)
const TOTAL_SLIDES = 2;
// ---------------------

/**
 * Root layout component for the slide presentation.
 * Handles navigation between slides via arrows and keyboard.
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

  /**
   * Handles keyboard events for slide navigation (left/right arrows).
   * @param {KeyboardEvent} event - The keyboard event.
   */
  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === "ArrowLeft") {
        goToPrevSlide();
      } else if (event.key === "ArrowRight") {
        goToNextSlide();
      }
    },
    [goToPrevSlide, goToNextSlide],
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleKeyDown]);

  return (
    <div className="relative h-screen w-screen overflow-hidden">
      {/* Previous Slide Button */}
      {currentSlideIndex > 1 && (
        <button
          type="button"
          onClick={goToPrevSlide}
          className="absolute left-4 top-1/2 z-10 -translate-y-1/2 transform rounded-full bg-gray-800 bg-opacity-50 p-3 text-white transition hover:bg-opacity-75 focus:outline-none"
          aria-label="Previous Slide"
        >
          &#8592; {/* Left Arrow */}
        </button>
      )}

      {/* Slide Content */}
      <div className="h-full w-full">
        <Outlet />
      </div>

      {/* Next Slide Button */}
      {currentSlideIndex < TOTAL_SLIDES && (
        <button
          type="button"
          onClick={goToNextSlide}
          className="absolute right-4 top-1/2 z-10 -translate-y-1/2 transform rounded-full bg-gray-800 bg-opacity-50 p-3 text-white transition hover:bg-opacity-75 focus:outline-none"
          aria-label="Next Slide"
        >
          &#8594; {/* Right Arrow */}
        </button>
      )}
    </div>
  );
}
