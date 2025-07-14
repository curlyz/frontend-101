import React from "react";
import { Select } from "antd";
import { Badge } from "@/components/ui/badge";
import { categories, getCategoryById } from "@/data/categories";
import type { CategoryId } from "@/types/categories";

interface CategorySelectorProps {
  selectedCategories: CategoryId[];
  onChange: (categories: CategoryId[]) => void;
  className?: string;
}

const CategorySelector: React.FC<CategorySelectorProps> = ({
  selectedCategories,
  onChange,
  className,
}) => {
  const handleChange = (values: CategoryId[]) => {
    onChange(values);
  };

  const tagRender = (props: any) => {
    const { label, value, closable, onClose } = props;
    const category = getCategoryById(value);

    return (
      <Badge
        variant="default"
        className="flex items-center gap-1"
        style={{ marginRight: 3 }}
      >
        {category?.icon}
        {label}
        {closable && (
          <button
            type="button"
            onClick={onClose}
            className="ml-1 hover:opacity-70"
          >
            {"×"}
          </button>
        )}
      </Badge>
    );
  };

  return (
    <Select<CategoryId[]>
      mode="multiple"
      placeholder="Filter by categories"
      value={selectedCategories}
      onChange={handleChange}
      className={className}
      style={{ width: "100%" }}
      tagRender={tagRender}
      options={categories.map((category) => ({
        label: (
          <div className="flex items-center gap-2">
            {category.icon}
            {category.name}
          </div>
        ),
        value: category.id as CategoryId,
      }))}
      allowClear
      showSearch
      filterOption={(input, option) =>
        (option?.label as any)?.props?.children[1]
          ?.toLowerCase()
          .includes(input.toLowerCase())
      }
    />
  );
};

export default CategorySelector;
