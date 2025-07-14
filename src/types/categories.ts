export interface Category {
  id: string;
  name: string;
  icon: React.ReactNode;
  color: string;
  description: string;
}

export interface RouteItem {
  path: string;
  name: string;
  icon: React.ReactNode;
  categoryId: string;
  routes?: RouteItem[];
}

export type CategoryId = "frontend" | "ai";
