import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Edit2 } from "lucide-react";
import { templates } from "@/data/landingTemplate";
import { Button } from "@/components/ui/button";

export default function LandingTemplatePreview() {
  const { id } = useParams<{ id: string }>();
  const template = templates.find((t) => t.id === id);

  if (!template) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-2">Template not found</h2>
          <Link to="/" className="text-primary hover:underline">
            Return to templates
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-white border-b sticky top-0 z-10">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <Link
            to="/"
            className="flex items-center text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back to templates
          </Link>

          <div className="flex items-center gap-2">
            <Link to={`/templates/${template.id}/edit`}>
              <Button size="sm">
                <Edit2 className="h-4 w-4 mr-1" />
                Edit Template
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Preview Content */}
      <div className="flex-1 bg-gray-50 p-6">
        <div className="bg-white border rounded-lg mx-auto max-w-4xl overflow-hidden shadow-lg">
          <div className="relative">
            {/* Banner Image Section */}
            <div className="h-48 relative overflow-hidden">
              {template.elements.bannerImage ? (
                <img
                  src={template.elements.bannerImage}
                  alt="Banner"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-r from-blue-500 to-blue-700" />
              )}
            </div>

            {/* Content Section */}
            <div className="bg-white rounded-t-3xl -mt-6 px-8 py-12 text-center">
              {/* Logo */}
              {template.elements.logo && (
                <div className="mb-4 flex justify-center">
                  <img
                    src={template.elements.logo}
                    alt="Logo"
                    className="h-12"
                  />
                </div>
              )}

              {/* Title */}
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                {template.elements.title || "Thank you for registering!"}
              </h1>

              {/* Description */}
              <p className="text-lg text-gray-600 max-w-md mx-auto mb-8">
                {template.elements.description ||
                  "We have a little something for you as a token of appreciation."}
              </p>

              {/* Button */}
              <div className="flex justify-center mb-4">
                <Button className="px-6 py-6 text-lg">
                  {template.elements.buttonText || "Claim your reward"}
                </Button>
              </div>

              {/* Footer Link */}
              {template.elements.footerText && (
                <div className="text-blue-500 hover:underline cursor-pointer mt-4">
                  {template.elements.footerText}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Template Info */}
        <div className="mt-8 bg-white p-6 rounded-lg max-w-4xl mx-auto">
          <h2 className="text-xl font-bold mb-4">Template Details</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h3 className="text-sm font-medium text-gray-500">Name</h3>
              <p>{template.name}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500">Category</h3>
              <p>{template.category}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500">ID</h3>
              <p>{template.id}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
