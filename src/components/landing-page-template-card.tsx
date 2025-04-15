"use client";

import type React from "react";

import { useState } from "react";
import { Edit2, Eye, Trash2, ChevronRight } from "lucide-react";
import type { Template } from "@/data/landingTemplate";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Link } from "react-router-dom";

interface TemplateCardProps {
  template: Template;
}

export default function LandingTemplateCard({ template }: TemplateCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (isDeleting) {
      // In a real app, this would delete from a database
      alert(`Template "${template.name}" deleted!`);
    } else {
      setIsDeleting(true);
      setTimeout(() => setIsDeleting(false), 2000); // Reset after 2 seconds
    }
  };

  return (
    <Card
      className="overflow-hidden transition-all duration-300 group relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setIsDeleting(false);
      }}
    >
      <div className="relative aspect-video overflow-hidden">
        <img
          src={template.thumbnail || "/placeholder.svg"}
          alt={template.name}
          //   fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />

        {isHovered && (
          <div className="absolute inset-0 bg-black/60 flex items-center justify-center gap-2">
            <Link to={`/landing/${template.id}/edit`}>
              <Button size="sm" variant="secondary">
                <Edit2 className="h-4 w-4 mr-1" />
                Edit
              </Button>
            </Link>
            <Link to={`/landing/${template.id}/preview`}>
              <Button size="sm" variant="secondary">
                <Eye className="h-4 w-4 mr-1" />
                Preview
              </Button>
            </Link>
            <Button
              size="sm"
              variant={isDeleting ? "destructive" : "secondary"}
              onClick={handleDelete}
            >
              <Trash2 className="h-4 w-4 mr-1" />
              {isDeleting ? "Confirm" : ""}
            </Button>
          </div>
        )}
      </div>

      <CardContent className="p-4">
        <h3 className="font-medium text-lg">{template.name}</h3>
        <p className="text-muted-foreground text-sm">{template.description}</p>
      </CardContent>

      <CardFooter className="p-4 pt-0 flex justify-between">
        <div className="text-xs text-muted-foreground">
          Last edited: {template.lastEdited}
        </div>
        <Link
          to={`/landing/${template.id}/edit`}
          className="text-xs text-primary flex items-center"
        >
          Customize
          <ChevronRight className="h-3 w-3 ml-1" />
        </Link>
      </CardFooter>
    </Card>
  );
}
