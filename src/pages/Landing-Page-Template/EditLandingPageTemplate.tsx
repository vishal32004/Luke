import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ChevronDown, ExternalLink, Save, ChevronRight } from "lucide-react";
import { templates } from "@/data/landingTemplate";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LandingPageTemplate } from "@/types/templates";

export default function EditLandingPageTemplate() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [template, setTemplate] = useState<LandingPageTemplate | null>(null);
  const [activeElement, setActiveElement] = useState<string | null>("title");
  const [previewMode, setPreviewMode] = useState<"desktop" | "mobile">(
    "desktop"
  );

  useEffect(() => {
    const foundTemplate = templates.find((t) => t.id === id);
    if (foundTemplate) {
      setTemplate(foundTemplate);
    } else {
      navigate("/");
    }
  }, [id, navigate]);

  if (!template) {
    return (
      <div className="flex items-center justify-center h-screen">
        Loading...
      </div>
    );
  }

  const handleElementChange = (element: string, value: string) => {
    if (!template) return;
    setTemplate({
      ...template,
      elements: {
        ...template.elements,
        [element]: value,
      },
    });
  };

  const handleSave = () => {
    alert("Template saved successfully!");
  };

  const handlePreview = () => {
    window.open(`/landing/${template.id}/preview`, "_blank");
  };
  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-white border-b sticky top-0 z-10">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <h1 className="text-xl font-bold">{template.name}</h1>
          </div>

          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={handlePreview}>
              <ExternalLink className="h-4 w-4 mr-1" />
              Preview in new tab
            </Button>
            <Button size="sm" onClick={handleSave}>
              <Save className="h-4 w-4 mr-1" />
              Save
            </Button>
          </div>
        </div>
      </header>

      <div className="flex flex-1">
        {/* Sidebar with collapsible sections */}
        <div className="w-72 border-r bg-white overflow-auto">
          <div className="p-4 border-b">
            <h2 className="font-medium">Edit Elements</h2>
          </div>

          <div className="divide-y">
            {/* Logo Section */}
            <div className="border-b">
              <button
                className={`w-full text-left px-4 py-3 flex items-center justify-between hover:bg-gray-50 ${
                  activeElement === "logo" ? "bg-gray-50" : ""
                }`}
                onClick={() =>
                  setActiveElement(activeElement === "logo" ? null : "logo")
                }
              >
                <span>Logo</span>
                {activeElement === "logo" ? (
                  <ChevronDown className="h-4 w-4 text-muted-foreground" />
                ) : (
                  <ChevronRight className="h-4 w-4 text-muted-foreground" />
                )}
              </button>

              {activeElement === "logo" && (
                <div className="px-4 py-3 bg-gray-50 border-t">
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">
                        Logo Image
                      </label>
                      <div className="border-2 border-dashed rounded-lg p-4 text-center">
                        <p className="text-muted-foreground mb-2 text-xs">
                          Drag and drop a logo here or click to upload
                        </p>
                        <Button variant="outline" size="sm">
                          Upload Logo
                        </Button>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">
                        Logo Size
                      </label>
                      <Select defaultValue="medium">
                        <SelectTrigger className="h-8 text-sm">
                          <SelectValue placeholder="Select size" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="small">Small</SelectItem>
                          <SelectItem value="medium">Medium</SelectItem>
                          <SelectItem value="large">Large</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Title Section */}
            <div className="border-b">
              <button
                className={`w-full text-left px-4 py-3 flex items-center justify-between hover:bg-gray-50 ${
                  activeElement === "title" ? "bg-gray-50" : ""
                }`}
                onClick={() =>
                  setActiveElement(activeElement === "title" ? null : "title")
                }
              >
                <span>Title</span>
                {activeElement === "title" ? (
                  <ChevronDown className="h-4 w-4 text-muted-foreground" />
                ) : (
                  <ChevronRight className="h-4 w-4 text-muted-foreground" />
                )}
              </button>

              {activeElement === "title" && (
                <div className="px-4 py-3 bg-gray-50 border-t">
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">
                        Title Text
                      </label>
                      <Input
                        className="h-8 text-sm"
                        value={template.elements.title || ""}
                        onChange={(e) =>
                          handleElementChange("title", e.target.value)
                        }
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">
                        Font Size
                      </label>
                      <Select defaultValue="5xl">
                        <SelectTrigger className="h-8 text-sm">
                          <SelectValue placeholder="Select size" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="3xl">Small</SelectItem>
                          <SelectItem value="4xl">Medium</SelectItem>
                          <SelectItem value="5xl">Large</SelectItem>
                          <SelectItem value="6xl">Extra Large</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">
                        Font Weight
                      </label>
                      <Select defaultValue="bold">
                        <SelectTrigger className="h-8 text-sm">
                          <SelectValue placeholder="Select weight" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="normal">Normal</SelectItem>
                          <SelectItem value="medium">Medium</SelectItem>
                          <SelectItem value="bold">Bold</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Description Section */}
            <div className="border-b">
              <button
                className={`w-full text-left px-4 py-3 flex items-center justify-between hover:bg-gray-50 ${
                  activeElement === "description" ? "bg-gray-50" : ""
                }`}
                onClick={() =>
                  setActiveElement(
                    activeElement === "description" ? null : "description"
                  )
                }
              >
                <span>Description</span>
                {activeElement === "description" ? (
                  <ChevronDown className="h-4 w-4 text-muted-foreground" />
                ) : (
                  <ChevronRight className="h-4 w-4 text-muted-foreground" />
                )}
              </button>

              {activeElement === "description" && (
                <div className="px-4 py-3 bg-gray-50 border-t">
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">
                        Description Text
                      </label>
                      <Textarea
                        className="text-sm"
                        value={template.elements.description || ""}
                        onChange={(e) =>
                          handleElementChange("description", e.target.value)
                        }
                        rows={3}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">
                        Font Size
                      </label>
                      <Select defaultValue="base">
                        <SelectTrigger className="h-8 text-sm">
                          <SelectValue placeholder="Select size" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="sm">Small</SelectItem>
                          <SelectItem value="base">Medium</SelectItem>
                          <SelectItem value="lg">Large</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Image Section */}
            <div className="border-b">
              <button
                className={`w-full text-left px-4 py-3 flex items-center justify-between hover:bg-gray-50 ${
                  activeElement === "image" ? "bg-gray-50" : ""
                }`}
                onClick={() =>
                  setActiveElement(activeElement === "image" ? null : "image")
                }
              >
                <span>Image</span>
                {activeElement === "image" ? (
                  <ChevronDown className="h-4 w-4 text-muted-foreground" />
                ) : (
                  <ChevronRight className="h-4 w-4 text-muted-foreground" />
                )}
              </button>

              {activeElement === "image" && (
                <div className="px-4 py-3 bg-gray-50 border-t">
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">
                        Background Image
                      </label>
                      <div className="border-2 border-dashed rounded-lg p-4 text-center">
                        <p className="text-muted-foreground mb-2 text-xs">
                          Drag and drop an image here or click to upload
                        </p>
                        <Button variant="outline" size="sm">
                          Upload Image
                        </Button>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">
                        Image Overlay
                      </label>
                      <Select defaultValue="dark">
                        <SelectTrigger className="h-8 text-sm">
                          <SelectValue placeholder="Select overlay" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="none">None</SelectItem>
                          <SelectItem value="light">Light</SelectItem>
                          <SelectItem value="dark">Dark</SelectItem>
                          <SelectItem value="gradient">Gradient</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Button Section */}
            <div className="border-b">
              <button
                className={`w-full text-left px-4 py-3 flex items-center justify-between hover:bg-gray-50 ${
                  activeElement === "button" ? "bg-gray-50" : ""
                }`}
                onClick={() =>
                  setActiveElement(activeElement === "button" ? null : "button")
                }
              >
                <span>Button</span>
                {activeElement === "button" ? (
                  <ChevronDown className="h-4 w-4 text-muted-foreground" />
                ) : (
                  <ChevronRight className="h-4 w-4 text-muted-foreground" />
                )}
              </button>

              {activeElement === "button" && (
                <div className="px-4 py-3 bg-gray-50 border-t">
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">
                        Button Text
                      </label>
                      <Input
                        className="h-8 text-sm"
                        value={template.elements.buttonText || ""}
                        onChange={(e) =>
                          handleElementChange("buttonText", e.target.value)
                        }
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">
                        Button Link
                      </label>
                      <Input
                        className="h-8 text-sm"
                        value={template.elements.buttonLink || ""}
                        onChange={(e) =>
                          handleElementChange("buttonLink", e.target.value)
                        }
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">
                        Button Style
                      </label>
                      <Select defaultValue="primary">
                        <SelectTrigger className="h-8 text-sm">
                          <SelectValue placeholder="Select style" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="primary">Primary</SelectItem>
                          <SelectItem value="secondary">Secondary</SelectItem>
                          <SelectItem value="outline">Outline</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">
                        Button Size
                      </label>
                      <Select defaultValue="default">
                        <SelectTrigger className="h-8 text-sm">
                          <SelectValue placeholder="Select size" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="sm">Small</SelectItem>
                          <SelectItem value="default">Default</SelectItem>
                          <SelectItem value="lg">Large</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Additional Settings Section */}
            <div className="border-b">
              <button
                className={`w-full text-left px-4 py-3 flex items-center justify-between hover:bg-gray-50 ${
                  activeElement === "additionalSettings" ? "bg-gray-50" : ""
                }`}
                onClick={() =>
                  setActiveElement(
                    activeElement === "additionalSettings"
                      ? null
                      : "additionalSettings"
                  )
                }
              >
                <span>Additional Settings</span>
                {activeElement === "additionalSettings" ? (
                  <ChevronDown className="h-4 w-4 text-muted-foreground" />
                ) : (
                  <ChevronRight className="h-4 w-4 text-muted-foreground" />
                )}
              </button>

              {activeElement === "additionalSettings" && (
                <div className="px-4 py-3 bg-gray-50 border-t">
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">
                        Text Alignment
                      </label>
                      <Select defaultValue="center">
                        <SelectTrigger className="h-8 text-sm">
                          <SelectValue placeholder="Select alignment" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="left">Left</SelectItem>
                          <SelectItem value="center">Center</SelectItem>
                          <SelectItem value="right">Right</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">
                        Content Spacing
                      </label>
                      <Select defaultValue="default">
                        <SelectTrigger className="h-8 text-sm">
                          <SelectValue placeholder="Select spacing" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="compact">Compact</SelectItem>
                          <SelectItem value="default">Default</SelectItem>
                          <SelectItem value="spacious">Spacious</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">
                        Animation
                      </label>
                      <Select defaultValue="none">
                        <SelectTrigger className="h-8 text-sm">
                          <SelectValue placeholder="Select animation" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="none">None</SelectItem>
                          <SelectItem value="fade">Fade In</SelectItem>
                          <SelectItem value="slide">Slide Up</SelectItem>
                          <SelectItem value="zoom">Zoom In</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Main content */}
        <div className="flex-1 bg-gray-50 p-6">
          <div className="mb-4 flex items-center justify-end">
            <Tabs defaultValue="desktop" className="w-[200px]">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger
                  value="desktop"
                  onClick={() => setPreviewMode("desktop")}
                >
                  Desktop
                </TabsTrigger>
                <TabsTrigger
                  value="mobile"
                  onClick={() => setPreviewMode("mobile")}
                >
                  Mobile
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          {/* Preview area */}
          <div
            className={`bg-white border rounded-lg mx-auto overflow-hidden ${
              previewMode === "mobile" ? "max-w-sm" : "max-w-4xl"
            }`}
          >
            <div className="relative">
              <img
                src="https://img.freepik.com/free-vector/mandala-illustration_53876-75291.jpg?t=st=1744441981~exp=1744445581~hmac=5ff80677b5920e3b22834db304973ddb4a0b3ddb26291d4fe3de171deaf55a85&w=900"
                alt="Template background"
                width={1200}
                height={600}
                className="w-full h-auto"
              />

              <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white p-6">
                {template.elements.logo && (
                  <div className="mb-4">
                    <img
                      src={template.elements.logo || "/placeholder.svg"}
                      alt="Logo"
                      width={100}
                      height={40}
                      className="h-10 w-auto"
                    />
                  </div>
                )}
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
