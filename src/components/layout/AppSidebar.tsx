import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRight, Home, Github } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { categories, getCategoryById } from "@/data/categories";
import { useCategoryFilter } from "@/hooks/useCategoryFilter";
import type { RouteItem } from "@/types/categories";
import DatumLogo from "@/assets/logo_white.png";

export function AppSidebar() {
  const pathname = usePathname();
  const { filteredRoutes, isFiltered } = useCategoryFilter();

  const groupedRoutes = React.useMemo(() => {
    const groups: { [key: string]: RouteItem[] } = {};

    filteredRoutes.forEach((route) => {
      if (!groups[route.categoryId]) {
        groups[route.categoryId] = [];
      }
      groups[route.categoryId].push(route);
    });

    return groups;
  }, [filteredRoutes]);

  const isActiveRoute = (path: string) => {
    return pathname === path;
  };

  const renderRoute = (route: RouteItem) => {
    const isActive = isActiveRoute(route.path);

    if (route.routes && route.routes.length > 0) {
      return (
        <Collapsible key={route.path} className="group/collapsible">
          <SidebarMenuItem>
            <CollapsibleTrigger asChild>
              <SidebarMenuButton
                tooltip={route.name}
                className={
                  isActive
                    ? "bg-sidebar-accent text-sidebar-accent-foreground"
                    : ""
                }
              >
                {route.icon}
                <span>{route.name}</span>
                <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
              </SidebarMenuButton>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <SidebarMenuSub>
                {route.routes.map((subRoute) => (
                  <SidebarMenuSubItem key={subRoute.path}>
                    <SidebarMenuSubButton
                      asChild
                      isActive={isActiveRoute(subRoute.path)}
                    >
                      <Link href={subRoute.path || ("/" as any)}>
                        {subRoute.icon}
                        <span>{subRoute.name}</span>
                      </Link>
                    </SidebarMenuSubButton>
                  </SidebarMenuSubItem>
                ))}
              </SidebarMenuSub>
            </CollapsibleContent>
          </SidebarMenuItem>
        </Collapsible>
      );
    }

    return (
      <SidebarMenuItem key={route.path}>
        <SidebarMenuButton asChild tooltip={route.name} isActive={isActive}>
          <Link href={route.path || ("/" as any)}>
            {route.icon}
            <span>{route.name}</span>
          </Link>
        </SidebarMenuButton>
      </SidebarMenuItem>
    );
  };

  return (
    <TooltipProvider>
      <Sidebar collapsible="icon">
        <SidebarHeader>
          <div className="flex items-center gap-2 px-4 py-2">
            <img
              src={typeof DatumLogo === "string" ? DatumLogo : DatumLogo.src}
              alt="Datum Logo"
              className="h-8 w-8"
            />
            <span className="text-lg font-semibold">{"Frontend 101"}</span>
          </div>
          {isFiltered && (
            <div className="px-4 pb-2">
              <Badge variant="secondary" className="text-xs">
                {"Filtered"}
              </Badge>
            </div>
          )}
        </SidebarHeader>

        <SidebarContent>
          {Object.entries(groupedRoutes).map(([categoryId, routes]) => {
            const category = getCategoryById(categoryId);
            if (!category) return null;

            return (
              <SidebarGroup key={categoryId}>
                <SidebarGroupLabel className="flex items-center gap-2">
                  <div style={{ color: category.color }}>{category.icon}</div>
                  <span>{category.name}</span>
                  <Badge variant="outline" className="ml-auto">
                    {routes.length}
                  </Badge>
                </SidebarGroupLabel>
                <SidebarGroupContent>
                  <SidebarMenu>{routes.map(renderRoute)}</SidebarMenu>
                </SidebarGroupContent>
              </SidebarGroup>
            );
          })}
        </SidebarContent>

        <SidebarFooter>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <a
                  href="https://github.com/curlyz/frontend-101"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2"
                >
                  <Github className="h-4 w-4" />
                  <span>{"View Source"}</span>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>

        <SidebarRail />
      </Sidebar>
    </TooltipProvider>
  );
}
