import React from "react";
import { createIcon } from "@/utils/iconMapping";
import type { Category } from "@/types/categories";

export const categories: Category[] = [
  {
    id: "frontend",
    name: "Frontend Development",
    icon: createIcon("CodeSandboxOutlined"),
    color: "#1890ff",
    description: "React, performance, state management, tools, and security",
  },
  {
    id: "ai",
    name: "AI & LLMs",
    icon: createIcon("RobotOutlined"),
    color: "#722ed1",
    description: "Artificial Intelligence and Large Language Models",
  },
];

export const getCategoryById = (id: string): Category | undefined => {
  return categories.find((category) => category.id === id);
};

export const getCategoryColor = (categoryId: string): string => {
  const category = getCategoryById(categoryId);
  return category?.color || "#666";
};
