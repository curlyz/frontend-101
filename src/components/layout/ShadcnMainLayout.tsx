import React, { useEffect, useCallback } from "react";
import { usePathname } from "next/navigation";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { AppSidebar } from "./AppSidebar";
import { AppHeader } from "./AppHeader";
import { useThemeMode, useToggleTheme } from "@/contexts/ThemeContext";
import { triggerCelebrationConfetti } from "@/utils/confetti";

/**
 * New shadcn-based main layout component
 * Replaces the ProLayout with modern shadcn/ui components
 */
export const ShadcnMainLayout: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const pathname = usePathname();
  const themeMode = useThemeMode();
  const toggleTheme = useToggleTheme();

  // Hotkey effect to toggle theme
  useEffect(() => {
    const handleThemeKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key === "k") {
        event.preventDefault();
        toggleTheme();
      }
    };

    window.addEventListener("keydown", handleThemeKeyDown);
    return () => {
      window.removeEventListener("keydown", handleThemeKeyDown);
    };
  }, [toggleTheme]);

  // Hotkey effect for confetti
  const handleConfettiKeyDown = useCallback((event: KeyboardEvent) => {
    console.log(
      `[ShadcnMainLayout] Confetti KeyDown: ${event.key}, Meta: ${event.metaKey}, Ctrl: ${event.ctrlKey}`,
    );
    if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "i") {
      console.log("[ShadcnMainLayout] Cmd/Ctrl + I for confetti detected");
      event.preventDefault();
      triggerCelebrationConfetti();
      // TODO: Add applause sound here
      console.log("[ShadcnMainLayout] Applause and Confetti! (Sound pending)");
    }
  }, []);

  useEffect(() => {
    console.log("[ShadcnMainLayout] Confetti useEffect called");
    window.addEventListener("keydown", handleConfettiKeyDown);
    return () => {
      window.removeEventListener("keydown", handleConfettiKeyDown);
    };
  }, [handleConfettiKeyDown]);

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <AppHeader />
        <main className="flex-1 overflow-auto">
          <div className="container mx-auto p-6">{children}</div>
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
};
