import { useState, useMemo } from "react";
import { getAllCategories } from "@/data/nextjsRoutes";
import type { CategoryId, RouteItem } from "@/types/categories";

export const useCategoryFilter = () => {
  const [selectedCategories, setSelectedCategories] = useState<CategoryId[]>(
    [],
  );

  const filteredRoutes = useMemo(() => {
    const allCategories = getAllCategories();

    if (selectedCategories.length === 0) {
      return allCategories;
    }

    return allCategories.filter((route) =>
      selectedCategories.includes(route.categoryId as CategoryId),
    );
  }, [selectedCategories]);

  const handleCategoryChange = (categories: CategoryId[]) => {
    setSelectedCategories(categories);
  };

  const clearFilters = () => {
    setSelectedCategories([]);
  };

  return {
    selectedCategories,
    filteredRoutes,
    handleCategoryChange,
    clearFilters,
    isFiltered: selectedCategories.length > 0,
  };
};
