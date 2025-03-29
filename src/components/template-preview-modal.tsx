import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { Category, Template } from "@/types/email-templates";

interface TemplatePreviewModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  template: Template | null;
  categories: Category[];
  onSave?: (template: Partial<Template>) => void;
}

export function TemplatePreviewModal({
  isOpen,
  onOpenChange,
  template,
  categories,
  onSave,
}: TemplatePreviewModalProps) {
  const [customizedTemplate, setCustomizedTemplate] = useState<
    Partial<Template>
  >({});

  // Reset customized template when the selected template changes
  useEffect(() => {
    if (template) {
      setCustomizedTemplate({
        title: template.title,
        category: template.category,
        subCategory: template.subCategory,
        content: template.content,
      });
    }
  }, [template]);

  // Handle template customization
  const handleCustomize = () => {
    if (onSave && customizedTemplate) {
      onSave(customizedTemplate);
    }
    onOpenChange(false);
  };

  if (!template) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>Template Preview</DialogTitle>
          <DialogDescription>
            Preview and customize your email template
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="preview" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="preview">Preview</TabsTrigger>
            <TabsTrigger value="customize">Customize</TabsTrigger>
          </TabsList>

          <TabsContent value="preview" className="mt-4">
            <div className="border rounded-lg overflow-hidden">
              <div className="relative h-60 w-full">
                <img
                  src={template.imageUrl || "/placeholder.svg"}
                  alt={template.title}
                  className="object-contain"
                />
              </div>
              <div className="p-4">
                <h3 className="text-lg font-medium mb-2">
                  {customizedTemplate.title || template.title}
                </h3>
                <p className="text-gray-700">
                  {customizedTemplate.content || template.content}
                </p>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="customize" className="mt-4">
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="template-title">Template Title</Label>
                <Input
                  id="template-title"
                  value={customizedTemplate.title || ""}
                  onChange={(e) =>
                    setCustomizedTemplate({
                      ...customizedTemplate,
                      title: e.target.value,
                    })
                  }
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="template-category">Category</Label>
                <Select
                  value={customizedTemplate.category}
                  onValueChange={(value) =>
                    setCustomizedTemplate({
                      ...customizedTemplate,
                      category: value,
                      subCategory: "",
                    })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories
                      .filter((c) => c.name !== "All Templates")
                      .map((category) => (
                        <SelectItem key={category.name} value={category.name}>
                          {category.name}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="template-subcategory">Sub-Category</Label>
                <Select
                  value={customizedTemplate.subCategory}
                  onValueChange={(value) =>
                    setCustomizedTemplate({
                      ...customizedTemplate,
                      subCategory: value,
                    })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select sub-category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories
                      .find((c) => c.name === customizedTemplate.category)
                      ?.subCategories.map((subCategory) => (
                        <SelectItem key={subCategory} value={subCategory}>
                          {subCategory}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="template-content">Email Content</Label>
                <Textarea
                  id="template-content"
                  rows={6}
                  value={customizedTemplate.content || ""}
                  onChange={(e) =>
                    setCustomizedTemplate({
                      ...customizedTemplate,
                      content: e.target.value,
                    })
                  }
                />
              </div>

              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => onOpenChange(false)}>
                  Cancel
                </Button>
                <Button onClick={handleCustomize}>Save Changes</Button>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
