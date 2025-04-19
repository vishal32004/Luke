import { useState, useEffect } from "react";
import {
  ArrowLeft,
  ChevronDown,
  ChevronRight,
  ExternalLink,
  Save,
} from "lucide-react";
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
import { templates } from "@/data/landingTemplate";
import { Link, useNavigate, useParams } from "react-router-dom";
import { LandingPagebannerDemoImage } from "@/imports/images";

export default function LandingTemplateEditor() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [template, setTemplate] = useState<LandingPageTemplate | null>(null);
  const [activeElement, setActiveElement] = useState<string | null>("title");
  const [previewMode, setPreviewMode] = useState<"desktop" | "mobile">(
    "desktop"
  );
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    const foundTemplate = templates.find((t) => t.id === id);
    if (foundTemplate) {
      setTemplate({ ...foundTemplate });
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

  const handleElementChange = <K extends keyof LandingPageTemplate["elements"]>(
    element: K,
    value: LandingPageTemplate["elements"][K]
  ) => {
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
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      alert("Template saved successfully!");
    }, 800);
  };

  const handlePreview = () => {
    window.open(`/landing/${template.id}/preview`, "_blank");
  };

  const getStyleClasses = () => {
    return {
      titleSize: template.elements.titleSize || "text-5xl",
      titleWeight:
        template.elements.titleWeight === "bold"
          ? "font-bold"
          : template.elements.titleWeight === "medium"
          ? "font-medium"
          : "font-normal",
      descriptionSize:
        template.elements.descriptionSize === "sm"
          ? "text-sm"
          : template.elements.descriptionSize === "lg"
          ? "text-lg"
          : "text-base",
      textColor:
        template.elements.textColor === "dark" ? "text-gray-900" : "text-white",
      textAlignment:
        template.elements.textAlignment === "left"
          ? "text-left"
          : template.elements.textAlignment === "right"
          ? "text-right"
          : "text-center",
      buttonVariant:
        template.elements.buttonStyle === "secondary"
          ? "secondary"
          : template.elements.buttonStyle === "outline"
          ? "outline"
          : "default",
      buttonSize:
        template.elements.buttonSize === "sm"
          ? "sm"
          : template.elements.buttonSize === "lg"
          ? "lg"
          : "default",
      overlay:
        template.elements.overlay === "light"
          ? "bg-black/20"
          : template.elements.overlay === "dark"
          ? "bg-black/50"
          : template.elements.overlay === "gradient"
          ? "bg-gradient-to-t from-black/60 to-transparent"
          : "",
      contentPadding:
        template.elements.contentSpacing === "compact"
          ? "py-8"
          : template.elements.contentSpacing === "spacious"
          ? "py-16"
          : "py-12",
    };
  };

  const styles = getStyleClasses();

  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-white border-b sticky top-0 z-10">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link
              to="/"
              className="flex items-center text-muted-foreground hover:text-foreground"
            >
              <ArrowLeft className="h-4 w-4 mr-1" />
              Back to templates
            </Link>
            <h1 className="text-xl font-bold">{template.name}</h1>
          </div>

          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={handlePreview}>
              <ExternalLink className="h-4 w-4 mr-1" />
              Preview
            </Button>
            <Button size="sm" onClick={handleSave} disabled={isSaving}>
              <Save className="h-4 w-4 mr-1" />
              {isSaving ? "Saving..." : "Save"}
            </Button>
          </div>
        </div>
      </header>

      <div className="flex flex-1">
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
                        Logo Image URL
                      </label>
                      <Input
                        className="h-8 text-sm"
                        value={template.elements.logo || ""}
                        onChange={(e) =>
                          handleElementChange("logo", e.target.value)
                        }
                        placeholder="Enter logo URL"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">
                        Logo Size
                      </label>
                      <Select
                        value={template.elements.logoSize || "medium"}
                        onValueChange={(value) =>
                          handleElementChange("logoSize", value)
                        }
                      >
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
                      <Select
                        value={template.elements.titleSize || "5xl"}
                        onValueChange={(value) =>
                          handleElementChange("titleSize", value)
                        }
                      >
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
                      <Select
                        value={template.elements.titleWeight || "bold"}
                        onValueChange={(value) =>
                          handleElementChange("titleWeight", value)
                        }
                      >
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
                      <Select
                        value={template.elements.descriptionSize || "base"}
                        onValueChange={(value) =>
                          handleElementChange("descriptionSize", value)
                        }
                      >
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

            {/* Banner Image Section */}
            <div className="border-b">
              <button
                className={`w-full text-left px-4 py-3 flex items-center justify-between hover:bg-gray-50 ${
                  activeElement === "bannerImage" ? "bg-gray-50" : ""
                }`}
                onClick={() =>
                  setActiveElement(
                    activeElement === "bannerImage" ? null : "bannerImage"
                  )
                }
              >
                <span>Banner Image</span>
                {activeElement === "bannerImage" ? (
                  <ChevronDown className="h-4 w-4 text-muted-foreground" />
                ) : (
                  <ChevronRight className="h-4 w-4 text-muted-foreground" />
                )}
              </button>

              {activeElement === "bannerImage" && (
                <div className="px-4 py-3 bg-gray-50 border-t">
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">
                        Banner Image URL
                      </label>
                      <Input
                        className="h-8 text-sm"
                        value={template.elements.bannerImage || ""}
                        onChange={(e) =>
                          handleElementChange("bannerImage", e.target.value)
                        }
                        placeholder="Enter image URL"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">
                        Image Overlay
                      </label>
                      <Select
                        value={template.elements.overlay || "none"}
                        onValueChange={(value) =>
                          handleElementChange("overlay", value)
                        }
                      >
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
                      <Select
                        value={template.elements.buttonStyle || "default"}
                        onValueChange={(value: string) =>
                          handleElementChange("buttonStyle", value)
                        }
                      >
                        <SelectTrigger className="h-8 text-sm">
                          <SelectValue placeholder="Select style" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="default">Primary</SelectItem>
                          <SelectItem value="secondary">Secondary</SelectItem>
                          <SelectItem value="outline">Outline</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">
                        Button Size
                      </label>
                      <Select
                        value={template.elements.buttonSize || "default"}
                        onValueChange={(value) =>
                          handleElementChange("buttonSize", value)
                        }
                      >
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

            {/* Footer Text Section */}
            <div className="border-b">
              <button
                className={`w-full text-left px-4 py-3 flex items-center justify-between hover:bg-gray-50 ${
                  activeElement === "footerText" ? "bg-gray-50" : ""
                }`}
                onClick={() =>
                  setActiveElement(
                    activeElement === "footerText" ? null : "footerText"
                  )
                }
              >
                <span>Footer Text</span>
                {activeElement === "footerText" ? (
                  <ChevronDown className="h-4 w-4 text-muted-foreground" />
                ) : (
                  <ChevronRight className="h-4 w-4 text-muted-foreground" />
                )}
              </button>

              {activeElement === "footerText" && (
                <div className="px-4 py-3 bg-gray-50 border-t">
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">
                        Footer Text
                      </label>
                      <Input
                        className="h-8 text-sm"
                        value={template.elements.footerText || ""}
                        onChange={(e) =>
                          handleElementChange("footerText", e.target.value)
                        }
                      />
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
                        Text Color
                      </label>
                      <Select
                        value={template.elements.textColor || "white"}
                        onValueChange={(value) =>
                          handleElementChange("textColor", value)
                        }
                      >
                        <SelectTrigger className="h-8 text-sm">
                          <SelectValue placeholder="Select color" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="white">White</SelectItem>
                          <SelectItem value="dark">Dark</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">
                        Text Alignment
                      </label>
                      <Select
                        value={template.elements.textAlignment || "center"}
                        onValueChange={(value) =>
                          handleElementChange("textAlignment", value)
                        }
                      >
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
                      <Select
                        value={template.elements.contentSpacing || "default"}
                        onValueChange={(value) =>
                          handleElementChange("contentSpacing", value)
                        }
                      >
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

          {/* Preview area - Gift-themed template */}
          <div
            className={`bg-white border rounded-lg mx-auto overflow-hidden shadow-lg ${
              previewMode === "mobile" ? "max-w-sm" : "max-w-4xl"
            }`}
          >
            <div className="relative">
              {/* Banner image with overlay */}
              <div className="h-48 relative overflow-hidden">
                <img
                  src={
                    template.elements.bannerImage || LandingPagebannerDemoImage
                  }
                  alt="Banner"
                  className="w-full h-full object-cover"
                />
                {template.elements.overlay !== "none" && (
                  <div className={`absolute inset-0 ${styles.overlay}`} />
                )}
              </div>

              <div
                className={`bg-white rounded-t-3xl -mt-6 px-8 ${styles.contentPadding} ${styles.textAlignment}`}
              >
                {template.elements.logo && (
                  <div className="mb-4 flex justify-center">
                    <img
                      src={template.elements.logo}
                      alt="Logo"
                      className={`${
                        template.elements.logoSize === "small"
                          ? "h-8"
                          : template.elements.logoSize === "large"
                          ? "h-16"
                          : "h-12"
                      }`}
                    />
                  </div>
                )}

                <h1
                  className={`${styles.titleSize} ${styles.titleWeight} ${styles.textColor} mb-4`}
                >
                  {template.elements.title || "Thank you for registering!"}
                </h1>

                <p
                  className={`${styles.descriptionSize} ${styles.textColor} max-w-md mx-auto mb-8`}
                >
                  {template.elements.description ||
                    "We have a little something for you as a token of appreciation."}
                </p>

                <div className="flex justify-center mb-4">
                  <Button
                    variant={
                      styles.buttonVariant as
                        | "link"
                        | "default"
                        | "destructive"
                        | "outline"
                        | "secondary"
                        | "ghost"
                        | null
                        | undefined
                    }
                    size={
                      styles.buttonSize as
                        | "sm"
                        | "lg"
                        | "default"
                        | "icon"
                        | null
                        | undefined
                    }
                    className="px-6 py-6 text-lg"
                  >
                    {template.elements.buttonText || "Claim your reward"}
                  </Button>
                </div>

                {template.elements.footerText && (
                  <div
                    className={`${styles.textColor} hover:underline cursor-pointer mt-4`}
                  >
                    {template.elements.footerText}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
