import { Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Template } from "@/types/email-templates";

interface EmailTemplateCardProps {
  template: Template;
  onPreview: (template: Template) => void;
}

export function EmailTemplateCard({
  template,
  onPreview,
}: EmailTemplateCardProps) {
  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-sm group relative">
      <div className="relative h-40">
        <img
          src={template.imageUrl || "/placeholder.svg"}
          alt={template.title}
          className="object-cover w-full max-h-full"
        />
        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <Button
            variant="secondary"
            size="sm"
            className="flex items-center gap-1"
            onClick={() => onPreview(template)}
          >
            <Eye className="h-4 w-4" />
            Preview
          </Button>
        </div>
      </div>
      <div className="p-2 text-center">
        <h3 className="text-sm">{template.title}</h3>
      </div>
    </div>
  );
}
