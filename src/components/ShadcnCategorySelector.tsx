import React from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { categories, getCategoryById } from "@/data/categories";
import type { CategoryId } from "@/types/categories";

interface ShadcnCategorySelectorProps {
  selectedCategories: CategoryId[];
  onChange: (categories: CategoryId[]) => void;
  className?: string;
}

export const ShadcnCategorySelector: React.FC<ShadcnCategorySelectorProps> = ({
  selectedCategories,
  onChange,
  className,
}) => {
  const [searchTerm, setSearchTerm] = React.useState("");

  const filteredCategories = categories.filter((category) =>
    category.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const handleSelect = (categoryId: CategoryId) => {
    if (!selectedCategories.includes(categoryId)) {
      onChange([...selectedCategories, categoryId]);
    }
  };

  const handleRemove = (categoryId: CategoryId) => {
    onChange(selectedCategories.filter((id) => id !== categoryId));
  };

  const clearAll = () => {
    onChange([]);
  };

  return (
    <div className={`w-full space-y-2 ${className || ""}`}>
      <div className="flex items-center gap-2">
        <Select onValueChange={handleSelect}>
          <SelectTrigger className="flex-1">
            <SelectValue placeholder="Select categories to filter..." />
          </SelectTrigger>
          <SelectContent>
            <div className="p-2">
              <Input
                placeholder="Search categories..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="mb-2"
              />
            </div>
            {filteredCategories.map((category) => (
              <SelectItem
                key={category.id}
                value={category.id}
                disabled={selectedCategories.includes(
                  category.id as CategoryId,
                )}
              >
                <div className="flex items-center gap-2">
                  <div style={{ color: category.color }}>{category.icon}</div>
                  <span>{category.name}</span>
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {selectedCategories.length > 0 && (
          <Button
            variant="outline"
            size="sm"
            onClick={clearAll}
            className="shrink-0"
          >
            {"Clear All"}
          </Button>
        )}
      </div>

      {selectedCategories.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {selectedCategories.map((categoryId) => {
            const category = getCategoryById(categoryId);
            if (!category) return null;

            return (
              <Badge
                key={categoryId}
                variant="secondary"
                className="flex items-center gap-1"
                style={{ borderColor: category.color }}
              >
                <div style={{ color: category.color }}>{category.icon}</div>
                <span>{category.name}</span>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-auto p-0 ml-1"
                  onClick={() => handleRemove(categoryId)}
                >
                  <X className="h-3 w-3" />
                </Button>
              </Badge>
            );
          })}
        </div>
      )}
    </div>
  );
};
