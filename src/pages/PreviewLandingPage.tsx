import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Edit2 } from "lucide-react";
import { templates } from "@/lib/landingTemplate";
import { Button } from "@/components/ui/button";

export default function PreviewLandingTemplate() {
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

      <div className="flex-1 bg-gray-100">
        <div className="container mx-auto px-4 py-8">
          <div className="bg-white border rounded-lg overflow-hidden max-w-4xl mx-auto">
            <div className="relative">
              <img
                src="https://img.freepik.com/free-vector/mandala-illustration_53876-75291.jpg?t=st=1744441981~exp=1744445581~hmac=5ff80677b5920e3b22834db304973ddb4a0b3ddb26291d4fe3de171deaf55a85&w=900"
                alt="Template background"
                width={1200}
                height={600}
                className="w-full h-auto"
              />

              <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white p-6">
                <h2 className="text-3xl md:text-5xl font-bold mb-4">
                  {template.elements.title || "Happy Work Anniversary!"}
                </h2>
                <p className="mb-6 max-w-md">
                  {template.elements.description ||
                    "Here is something to brighten your celebrations a little more!"}
                </p>
                <Button className="px-6">
                  {template.elements.buttonText || "Claim reward"}
                </Button>
                <div className="mt-4 text-sm">How to redeem?</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
