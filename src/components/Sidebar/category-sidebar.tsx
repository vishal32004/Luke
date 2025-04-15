"use client";

import type React from "react";

import { useState, useEffect, useRef } from "react";
import { ChevronDown, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Category } from "@/types/email-templates";

interface CategorySidebarProps {
  categories: Category[];
  selectedCategory: string;
  selectedSubCategory: string | null;
  onCategorySelect: (category: string) => void;
  onSubCategorySelect: (category: string, subCategory: string) => void;
}

export function CategorySidebar({
  categories,
  selectedCategory,
  selectedSubCategory,
  onCategorySelect,
  onSubCategorySelect,
}: CategorySidebarProps) {
  // Track only the currently expanded category (single string instead of array)
  const [expandedCategory, setExpandedCategory] = useState<string | null>(
    selectedCategory !== "All Templates" ? selectedCategory : null
  );
  const sidebarRef = useRef<HTMLDivElement>(null);

  // Toggle category expansion - now ensures only one category is expanded at a time
  const toggleCategoryExpansion = (
    categoryName: string,
    event?: React.MouseEvent
  ) => {
    if (event) {
      event.stopPropagation();
    }

    // If clicking the already expanded category, collapse it
    // Otherwise, expand the clicked category and collapse others
    setExpandedCategory((prev) =>
      prev === categoryName ? null : categoryName
    );
  };

  // Handle category selection
  const handleCategorySelect = (categoryName: string) => {
    onCategorySelect(categoryName);

    // Auto-expand the selected category if it has sub-categories
    const category = categories.find((c) => c.name === categoryName);
    if (category && category.subCategories.length > 0) {
      setExpandedCategory(categoryName);
    } else {
      // If category has no sub-categories, collapse all
      setExpandedCategory(null);
    }
  };

  // Handle click outside to close expanded categories
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target as Node)
      ) {
        // Close all expanded categories when clicking outside
        setExpandedCategory(null);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Update expanded category when selected category changes
  useEffect(() => {
    if (selectedCategory && selectedCategory !== "All Templates") {
      const category = categories.find((c) => c.name === selectedCategory);
      if (category && category.subCategories.length > 0) {
        setExpandedCategory(selectedCategory);
      }
    }
  }, [selectedCategory, categories]);

  return (
    <div
      ref={sidebarRef}
      className="w-full md:w-64 bg-white rounded-lg shadow-sm"
    >
      <div className="p-4 border-b">
        <h2 className="font-medium">Categories</h2>
      </div>
      <div className="flex flex-col">
        {categories.map((category) => (
          <div key={category.name} className="border-b last:border-b-0">
            <button
              className={cn(
                "flex justify-between items-center w-full px-4 py-3 text-left hover:bg-gray-100 transition-colors",
                selectedCategory === category.name &&
                  !selectedSubCategory &&
                  "bg-gray-200 font-medium"
              )}
              onClick={() => handleCategorySelect(category.name)}
            >
              <span>{category.name}</span>
              {category.subCategories.length > 0 && (
                <button
                  onClick={(e) => toggleCategoryExpansion(category.name, e)}
                  className="p-1 rounded-full hover:bg-gray-200"
                >
                  {expandedCategory === category.name ? (
                    <ChevronDown className="h-4 w-4" />
                  ) : (
                    <ChevronRight className="h-4 w-4" />
                  )}
                </button>
              )}
            </button>

            {/* Sub-categories */}
            {category.subCategories.length > 0 &&
              expandedCategory === category.name && (
                <div className="pl-6 pb-2">
                  {category.subCategories.map((subCategory) => (
                    <button
                      key={subCategory}
                      className={cn(
                        "w-full text-left px-4 py-2 text-sm hover:bg-gray-100 transition-colors rounded-md",
                        selectedCategory === category.name &&
                          selectedSubCategory === subCategory &&
                          "bg-gray-200 font-medium"
                      )}
                      onClick={() =>
                        onSubCategorySelect(category.name, subCategory)
                      }
                    >
                      {subCategory}
                    </button>
                  ))}
                </div>
              )}
          </div>
        ))}
      </div>
    </div>
  );
}
