import { ChevronDown, ChevronRight } from "lucide-react";

interface ElementEditorProps {
  label: string;
  active: boolean;
  onClick: () => void;
}

export function ElementEditor({ label, active, onClick }: ElementEditorProps) {
  return (
    <button
      className={`w-full text-left px-4 py-3 flex items-center justify-between hover:bg-gray-50 ${
        active ? "bg-gray-50" : ""
      }`}
      onClick={onClick}
    >
      <span>{label}</span>
      {active ? (
        <ChevronDown className="h-4 w-4 text-muted-foreground" />
      ) : (
        <ChevronRight className="h-4 w-4 text-muted-foreground" />
      )}
    </button>
  );
}

interface TemplateSidebarProps {
  activeElement: string | null;
  setActiveElement: (element: string) => void;
}

export default function TemplateSidebar({
  activeElement,
  setActiveElement,
}: TemplateSidebarProps) {
  return (
    <div className="w-72 border-r bg-white">
      <div className="p-4 border-b">
        <h2 className="font-medium">Edit Elements</h2>
      </div>

      <div className="divide-y">
        <ElementEditor
          label="Logo"
          active={activeElement === "logo"}
          onClick={() => setActiveElement("logo")}
        />
        <ElementEditor
          label="Title"
          active={activeElement === "title"}
          onClick={() => setActiveElement("title")}
        />
        <ElementEditor
          label="Description"
          active={activeElement === "description"}
          onClick={() => setActiveElement("description")}
        />
        <ElementEditor
          label="Image"
          active={activeElement === "image"}
          onClick={() => setActiveElement("image")}
        />
        <ElementEditor
          label="Button"
          active={activeElement === "button"}
          onClick={() => setActiveElement("button")}
        />
        <ElementEditor
          label="Additional Settings"
          active={activeElement === "additionalSettings"}
          onClick={() => setActiveElement("additionalSettings")}
        />
      </div>
    </div>
  );
}
