import { templates } from "@/data/landingTemplate";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export default function TemplatesPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {templates.map((template) => (
            <div
              key={template.id}
              className="bg-white rounded-lg border overflow-hidden shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="relative aspect-video overflow-hidden bg-gray-100">
                {template.thumbnail ? (
                  <img
                    src={template.thumbnail || "/placeholder.svg"}
                    alt={template.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="flex items-center justify-center h-full text-muted-foreground">
                    No preview
                  </div>
                )}
              </div>
              <div className="p-4">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-medium">{template.name}</h3>
                    <p className="text-sm text-muted-foreground capitalize">
                      {template.category}
                    </p>
                  </div>
                </div>
                <div className="mt-4 flex gap-2">
                  <Link to={`/landing/${template.id}/edit`} className="flex-1">
                    <Button variant="outline" className="w-full" size="sm">
                      Edit
                    </Button>
                  </Link>
                  <Link
                    to={`/landing/${template.id}/preview`}
                    className="flex-1"
                  >
                    <Button className="w-full" size="sm">
                      Preview
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
