import React, { useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Check, Palette } from "lucide-react";
import { cn } from "@/lib/utils";

interface ColorPickerProps {
  value?: string;
  onChange?: (color: string) => void;
  className?: string;
  placeholder?: string;
}

const DEFAULT_COLORS = [
  "#FF0000", // Red
  "#00FF00", // Green
  "#0000FF", // Blue
  "#FFFF00", // Yellow
  "#FF00FF", // Magenta
  "#00FFFF", // Cyan
  "#FFA500", // Orange
  "#800080", // Purple
  "#008000", // Dark Green
  "#000080", // Navy
];

export const ColorPicker: React.FC<ColorPickerProps> = ({
  value,
  onChange,
  className,
  placeholder = "Select a color",
}) => {
  const [color, setColor] = useState(value || "");
  const [customColor, setCustomColor] = useState("");

  const handleColorChange = (newColor: string) => {
    setColor(newColor);
    if (onChange) {
      onChange(newColor);
    }
  };

  const handleCustomColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newColor = e.target.value;
    setCustomColor(newColor);
    if (newColor.startsWith("#") && newColor.length === 7) {
      handleColorChange(newColor);
    }
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            "w-full justify-start text-left font-normal",
            className
          )}
        >
          <div className="flex items-center gap-2">
            {color ? (
              <>
                <div
                  className="h-4 w-4 rounded-full border"
                  style={{ backgroundColor: color }}
                />
                <span>{color}</span>
              </>
            ) : (
              <>
                <Palette className="h-4 w-4 opacity-50" />
                <span className="text-muted-foreground">{placeholder}</span>
              </>
            )}
          </div>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-64">
        <div className="grid grid-cols-5 gap-2">
          {DEFAULT_COLORS.map((defaultColor) => (
            <button
              key={defaultColor}
              className="h-8 w-8 rounded-full border"
              style={{ backgroundColor: defaultColor }}
              onClick={() => handleColorChange(defaultColor)}
            >
              {color === defaultColor && (
                <Check className="h-4 w-4 text-white m-auto" />
              )}
            </button>
          ))}
        </div>
        <div className="mt-4">
          <Input
            type="text"
            placeholder="#FFFFFF"
            value={customColor}
            onChange={handleCustomColorChange}
            className="w-full"
          />
        </div>
      </PopoverContent>
    </Popover>
  );
};
