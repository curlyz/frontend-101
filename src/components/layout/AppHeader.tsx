import React from "react";
import { Filter, User, LogOut, LogIn } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { SidebarTrigger } from "@/components/ui/sidebar";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ShadcnCategorySelector } from "@/components/ShadcnCategorySelector";
import { useCategoryFilter } from "@/hooks/useCategoryFilter";
import { useThemeMode } from "@/contexts/ThemeContext";
import {
  useIsAuthenticated,
  useUser,
  useLogin,
  useLogout,
} from "@/contexts/AuthContext";

export function AppHeader() {
  const themeMode = useThemeMode();
  const isAuthenticated = useIsAuthenticated();
  const user = useUser();
  const login = useLogin();
  const logout = useLogout();

  const { selectedCategories, handleCategoryChange, clearFilters, isFiltered } =
    useCategoryFilter();

  const handleLogin = () => {
    login({ id: "1", name: "Demo User", email: "demo@example.com" });
  };

  return (
    <TooltipProvider>
      <header className="flex h-14 items-center gap-4 border-b bg-background px-4">
        <SidebarTrigger />

        <div className="flex flex-1 items-center gap-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Filter className="h-4 w-4" />
            <span>{"Filter:"}</span>
          </div>

          <div className="flex-1 max-w-sm">
            <ShadcnCategorySelector
              selectedCategories={selectedCategories}
              onChange={handleCategoryChange}
            />
          </div>

          {isFiltered && (
            <Button variant="outline" size="sm" onClick={clearFilters}>
              {"Clear Filters"}
            </Button>
          )}
        </div>

        <div className="flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="relative">
                <Avatar className="h-8 w-8">
                  <AvatarImage
                    src={
                      user?.email
                        ? `https://api.dicebear.com/7.x/initials/svg?seed=${user.email}`
                        : undefined
                    }
                    alt={user?.name || "User"}
                  />
                  <AvatarFallback>
                    <User className="h-4 w-4" />
                  </AvatarFallback>
                </Avatar>
                <span className="ml-2 text-sm font-medium">
                  {user?.name || "Not Logged In"}
                </span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {isAuthenticated ? (
                <DropdownMenuItem onClick={logout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  {"Logout"}
                </DropdownMenuItem>
              ) : (
                <DropdownMenuItem onClick={handleLogin}>
                  <LogIn className="mr-2 h-4 w-4" />
                  {"Login"}
                </DropdownMenuItem>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>
    </TooltipProvider>
  );
}
