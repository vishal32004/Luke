import { useState } from "react";
import { ChevronDown, ChevronRight, Eye } from "lucide-react";
import { cn } from "@/lib/utils";
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

// Define the template data structure
interface Template {
  id: string;
  title: string;
  category: string;
  subCategory: string;
  imageUrl: string;
  content?: string;
}

// Define the category structure
interface Category {
  name: string;
  subCategories: string[];
}

// Sample categories with sub-categories
const categories: Category[] = [
  { name: "All Templates", subCategories: [] },
  {
    name: "Employee Rewarding",
    subCategories: ["Birthday", "Anniversary", "Milestone", "Appreciation"],
  },
  { name: "Birthday", subCategories: ["Personal", "Professional"] },
  { name: "Anniversary", subCategories: ["Work", "Company"] },
  { name: "Milestone", subCategories: ["Achievement", "Career"] },
  { name: "Appreciation", subCategories: ["Team", "Individual"] },
  { name: "Referral", subCategories: ["Customer", "Employee"] },
  { name: "Festive Rewarding", subCategories: ["Holiday", "Seasonal"] },
  { name: "Survey Rewarding", subCategories: ["Feedback", "Research"] },
  { name: "Consumer Rewarding", subCategories: ["Loyalty", "Promotion"] },
];

// Sample template data
const templates: Template[] = [
  {
    id: "1",
    title: "Birthday-1",
    category: "Birthday",
    subCategory: "Personal",
    imageUrl: "https://placehold.co/280x200",
    content:
      "Happy Birthday! Wishing you a fantastic day filled with joy and celebration.",
  },
  {
    id: "2",
    title: "Birthday-2",
    category: "Birthday",
    subCategory: "Professional",
    imageUrl: "https://placehold.co/280x200",
    content:
      "Happy Birthday! The entire team wishes you a wonderful day and a successful year ahead.",
  },
  {
    id: "3",
    title: "Birthday-3",
    category: "Birthday",
    subCategory: "Personal",
    imageUrl: "https://placehold.co/280x200",
    content: "Sending you the warmest birthday wishes on your special day!",
  },
  {
    id: "4",
    title: "Birthday-4",
    category: "Birthday",
    subCategory: "Professional",
    imageUrl: "https://placehold.co/280x200",
    content:
      "Happy Birthday from all of us! We appreciate your contributions to our team.",
  },
  {
    id: "5",
    title: "Birthday-5",
    category: "Birthday",
    subCategory: "Personal",
    imageUrl: "https://placehold.co/280x200",
    content:
      "Wishing you a day filled with happiness and a year filled with joy!",
  },
  {
    id: "6",
    title: "Birthday-6",
    category: "Birthday",
    subCategory: "Professional",
    imageUrl: "https://placehold.co/280x200",
    content: "Happy Birthday! We're grateful to have you as part of our team.",
  },
  {
    id: "7",
    title: "Anniversary-1",
    category: "Anniversary",
    subCategory: "Work",
    imageUrl: "https://placehold.co/280x200",
    content:
      "Congratulations on your work anniversary! Thank you for your dedication.",
  },
  {
    id: "8",
    title: "Anniversary-2",
    category: "Anniversary",
    subCategory: "Company",
    imageUrl: "https://placehold.co/280x200",
    content: "Happy Company Anniversary! We've come so far together.",
  },
  {
    id: "9",
    title: "Anniversary-3",
    category: "Anniversary",
    subCategory: "Work",
    imageUrl: "https://placehold.co/280x200",
    content:
      "Celebrating another year of your valuable contributions to our team!",
  },
  {
    id: "10",
    title: "Anniversary-4",
    category: "Anniversary",
    subCategory: "Company",
    imageUrl: "https://placehold.co/280x200",
    content:
      "Happy Anniversary to our amazing company! Here's to many more years of success.",
  },
  {
    id: "11",
    title: "Anniversary-5",
    category: "Anniversary",
    subCategory: "Work",
    imageUrl: "https://placehold.co/280x200",
    content:
      "Congratulations on your work anniversary! Your dedication inspires us all.",
  },
  {
    id: "12",
    title: "Anniversary-6",
    category: "Anniversary",
    subCategory: "Company",
    imageUrl: "https://placehold.co/280x200",
    content:
      "Celebrating our company's journey and looking forward to a bright future together.",
  },
  {
    id: "13",
    title: "Milestone-1",
    category: "Milestone",
    subCategory: "Achievement",
    imageUrl: "https://placehold.co/280x200",
    content:
      "Congratulations on reaching this important milestone! Your hard work has paid off.",
  },
  {
    id: "14",
    title: "Milestone-2",
    category: "Milestone",
    subCategory: "Career",
    imageUrl: "https://placehold.co/280x200",
    content: "Celebrating your career milestone! Your journey inspires us all.",
  },
  {
    id: "15",
    title: "Milestone-3",
    category: "Milestone",
    subCategory: "Achievement",
    imageUrl: "https://placehold.co/280x200",
    content:
      "Congratulations on your achievement! This milestone marks the beginning of even greater success.",
  },
  {
    id: "16",
    title: "Milestone-4",
    category: "Milestone",
    subCategory: "Career",
    imageUrl: "https://placehold.co/280x200",
    content: "Celebrating your career growth and achievements! Well deserved.",
  },
  {
    id: "17",
    title: "Appreciation-1",
    category: "Appreciation",
    subCategory: "Team",
    imageUrl: "https://placehold.co/280x200",
    content: "A big thank you to our amazing team for your outstanding work!",
  },
  {
    id: "18",
    title: "Appreciation-2",
    category: "Appreciation",
    subCategory: "Individual",
    imageUrl: "https://placehold.co/280x200",
    content:
      "Thank you for your exceptional contribution. Your work makes a difference!",
  },
  {
    id: "19",
    title: "Referral-1",
    category: "Referral",
    subCategory: "Customer",
    imageUrl: "https://placehold.co/280x200",
    content:
      "Thank you for referring us to your friends and family. We appreciate your trust!",
  },
  {
    id: "20",
    title: "Referral-2",
    category: "Referral",
    subCategory: "Employee",
    imageUrl: "https://placehold.co/280x200",
    content:
      "Thank you for referring a new team member. Great teams are built through great connections!",
  },
  {
    id: "21",
    title: "Festive-1",
    category: "Festive Rewarding",
    subCategory: "Holiday",
    imageUrl: "https://placehold.co/280x200",
    content: "Wishing you joy and peace this holiday season!",
  },
  {
    id: "22",
    title: "Festive-2",
    category: "Festive Rewarding",
    subCategory: "Seasonal",
    imageUrl: "https://placehold.co/280x200",
    content: "Celebrate the season with special rewards!",
  },
  {
    id: "23",
    title: "Survey-1",
    category: "Survey Rewarding",
    subCategory: "Feedback",
    imageUrl: "https://placehold.co/280x200",
    content: "Thank you for helping us improve with your feedback!",
  },
  {
    id: "24",
    title: "Survey-2",
    category: "Survey Rewarding",
    subCategory: "Research",
    imageUrl: "https://placehold.co/280x200",
    content: "Your input is valuable to our research efforts!",
  },
  {
    id: "25",
    title: "Consumer-1",
    category: "Consumer Rewarding",
    subCategory: "Loyalty",
    imageUrl: "https://placehold.co/280x200",
    content: "Thank you for being a loyal customer!",
  },
  {
    id: "26",
    title: "Consumer-2",
    category: "Consumer Rewarding",
    subCategory: "Promotion",
    imageUrl: "https://placehold.co/280x200",
    content: "Enjoy exclusive rewards with our special promotion!",
  },
  {
    id: "27",
    title: "Referral-3",
    category: "Referral",
    subCategory: "Customer",
    imageUrl: "https://placehold.co/280x200",
    content: "Spread the word and earn rewards for every referral!",
  },
  {
    id: "28",
    title: "Referral-4",
    category: "Referral",
    subCategory: "Employee",
    imageUrl: "https://placehold.co/280x200",
    content: "Refer talented professionals and get rewarded!",
  },
];

export default function EmailTemplatesGallery() {
  const [selectedCategory, setSelectedCategory] =
    useState("Employee Rewarding");
  const [selectedSubCategory, setSelectedSubCategory] = useState<string | null>(
    null
  );
  const [expandedCategories, setExpandedCategories] = useState<string[]>([
    "Employee Rewarding",
  ]);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(
    null
  );
  const [customizedTemplate, setCustomizedTemplate] = useState<
    Partial<Template>
  >({});

  // Toggle category expansion
  const toggleCategoryExpansion = (categoryName: string) => {
    setExpandedCategories((prev) =>
      prev.includes(categoryName)
        ? prev.filter((c) => c !== categoryName)
        : [...prev, categoryName]
    );
  };

  // Handle category selection
  const handleCategorySelect = (categoryName: string) => {
    setSelectedCategory(categoryName);
    setSelectedSubCategory(null);

    // Auto-expand the selected category if it has sub-categories
    const category = categories.find((c) => c.name === categoryName);
    if (
      category &&
      category.subCategories.length > 0 &&
      !expandedCategories.includes(categoryName)
    ) {
      toggleCategoryExpansion(categoryName);
    }
  };

  // Handle sub-category selection
  const handleSubCategorySelect = (
    parentCategoryName: string,
    subCategoryName: string
  ) => {
    if (parentCategoryName === "Employee Rewarding") {
      // Treat Employee Rewarding sub-categories as main categories
      setSelectedCategory(subCategoryName);
      setSelectedSubCategory(null);
      // Auto-expand the new category if it has sub-categories
      const newCategory = categories.find((c) => c.name === subCategoryName);
      if (
        newCategory?.subCategories.length &&
        !expandedCategories.includes(subCategoryName)
      ) {
        setExpandedCategories((prev) => [...prev, subCategoryName]);
      }
    } else {
      setSelectedCategory(parentCategoryName);
      setSelectedSubCategory(subCategoryName);
    }
  };

  // Filter templates based on selected category and sub-category
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
  // Handle template preview
  const handlePreview = (template: Template) => {
    setSelectedTemplate(template);
    setCustomizedTemplate({
      title: template.title,
      content: template.content,
    });
    setIsPreviewOpen(true);
  };

  // Handle template customization
  const handleCustomize = () => {
    // Here you would typically save the customized template or perform other actions
    setIsPreviewOpen(false);
  };

  return (
    <div className="bg-gray-50 min-h-screen p-4">
      <h1 className="text-2xl font-semibold mb-4">Email Templates</h1>

      <div className="flex flex-col md:flex-row gap-4">
        {/* Sidebar */}
        <div className="w-full md:w-64 bg-white rounded-lg shadow-sm">
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
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleCategoryExpansion(category.name);
                      }}
                      className="p-1 rounded-full hover:bg-gray-200"
                    >
                      {expandedCategories.includes(category.name) ? (
                        <ChevronDown className="h-4 w-4" />
                      ) : (
                        <ChevronRight className="h-4 w-4" />
                      )}
                    </button>
                  )}
                </button>

                {/* Sub-categories */}
                {category.subCategories.length > 0 &&
                  expandedCategories.includes(category.name) && (
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
                            handleSubCategorySelect(category.name, subCategory)
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

        <div className="flex-1">
          {/* Gallery Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredTemplates.map((template) => (
              <div
                key={template.id}
                className="bg-white rounded-lg overflow-hidden shadow-sm group relative"
              >
                <div className="relative h-40">
                  <img
                    src={template.imageUrl || "/placeholder.svg"}
                    alt={template.title}
                    className="w-full h-full object-cover"
                  />
                  {/* Preview button overlay */}
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <Button
                      variant="secondary"
                      size="sm"
                      className="flex items-center gap-1"
                      onClick={() => handlePreview(template)}
                    >
                      <Eye className="h-4 w-4" />
                      Preview
                    </Button>
                  </div>
                </div>
                <div className="p-2 text-center">
                  <h3 className="text-sm">{template.title}</h3>
                  <p className="text-xs text-gray-500">
                    {template.subCategory}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Template Preview/Customization Modal */}
      <Dialog open={isPreviewOpen} onOpenChange={setIsPreviewOpen}>
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
              {selectedTemplate && (
                <div className="border rounded-lg overflow-hidden">
                  <div className="relative h-60 w-full">
                    <img
                      src={selectedTemplate.imageUrl || "/placeholder.svg"}
                      alt={selectedTemplate.title}
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="text-lg font-medium mb-2">
                      {customizedTemplate.title || selectedTemplate.title}
                    </h3>
                    <p className="text-gray-700">
                      {customizedTemplate.content || selectedTemplate.content}
                    </p>
                  </div>
                </div>
              )}
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
                    defaultValue={selectedTemplate?.category}
                    onValueChange={(value) =>
                      setCustomizedTemplate({
                        ...customizedTemplate,
                        category: value,
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
                    defaultValue={selectedTemplate?.subCategory}
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
                        .find(
                          (c) =>
                            c.name ===
                            (customizedTemplate.category ||
                              selectedTemplate?.category)
                        )
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
                  <Button
                    variant="outline"
                    onClick={() => setIsPreviewOpen(false)}
                  >
                    Cancel
                  </Button>
                  <Button onClick={handleCustomize}>Save Changes</Button>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </DialogContent>
      </Dialog>
    </div>
  );
}
