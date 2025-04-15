import { useState } from "react";
import { EmailTemplateCard } from "@/components/email-template-card";
import { CategorySidebar } from "@/components/Sidebar/category-sidebar";
import { TemplatePreviewModal } from "@/components/Popup/template-preview-modal";
import type { Template } from "@/types/email-templates";
import { categories, templates } from "@/data/email-templates";

export default function EmailTemplatesGallery() {
  const [selectedCategory, setSelectedCategory] = useState("All Templates");
  const [selectedSubCategory, setSelectedSubCategory] = useState<string | null>(
    null
  );
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(
    null
  );

  const filteredTemplates = (() => {
    let filtered = templates;

    if (selectedCategory === "All Templates") {
      return filtered;
    }

    if (selectedCategory === "Employee Rewarding") {
      filtered = templates.filter((t) =>
        ["Birthday", "Anniversary", "Milestone", "Appreciation"].includes(
          t.category
        )
      );
    } else {
      filtered = templates.filter((t) => t.category === selectedCategory);
    }

    if (selectedSubCategory) {
      filtered = filtered.filter((t) => t.subCategory === selectedSubCategory);
    }

    return filtered;
  })();

  const handlePreview = (template: Template) => {
    setSelectedTemplate(template);
    setIsPreviewOpen(true);
  };

  const handleCategorySelect = (categoryName: string) => {
    setSelectedCategory(categoryName);
    setSelectedSubCategory(null);
  };

  const handleSubCategorySelect = (
    categoryName: string,
    subCategoryName: string
  ) => {
    setSelectedCategory(categoryName);
    setSelectedSubCategory(subCategoryName);
  };

  const handleTemplateSave = (updatedTemplate: Partial<Template>) => {
    console.log("Template saved:", updatedTemplate);
  };

  return (
    <div className="bg-gray-50 min-h-screen p-4">
      <h1 className="text-2xl font-semibold mb-4">Email Templates</h1>

      <div className="flex flex-col md:flex-row gap-4">
        <CategorySidebar
          categories={categories}
          selectedCategory={selectedCategory}
          selectedSubCategory={selectedSubCategory}
          onCategorySelect={handleCategorySelect}
          onSubCategorySelect={handleSubCategorySelect}
        />

        <div className="flex-1">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredTemplates.map((template) => (
              <EmailTemplateCard
                key={template.id}
                template={template}
                onPreview={handlePreview}
              />
            ))}
          </div>
        </div>
      </div>

      <TemplatePreviewModal
        isOpen={isPreviewOpen}
        onOpenChange={setIsPreviewOpen}
        template={selectedTemplate}
        categories={categories}
        onSave={handleTemplateSave}
      />
    </div>
  );
}
