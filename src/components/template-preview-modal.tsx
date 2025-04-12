import { useState, useEffect, useRef } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import type { Category, Template } from "@/types/email-templates";
import { ScrollArea } from "./ui/scroll-area";
import styled from "styled-components";
import { Button } from "./ui/button";
import { Edit, Upload, X } from "lucide-react";
import { Textarea } from "./ui/textarea";

interface TemplatePreviewModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  template: Template | null;
  categories: Category[];
  onSave?: (template: Partial<Template>) => void;
}

const ReddemBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 10px;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  padding: 20px 20px;
  width: 50%;
  border-radius: 20px;
`;
const Codebox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  padding: 20px;
  border: 1px solid #00000037;
  border-radius: 20px;
`;

export function TemplatePreviewModal({
  isOpen,
  onOpenChange,
  template,
  // onSave,
}: TemplatePreviewModalProps) {
  const [customizedTemplate, setCustomizedTemplate] = useState<
    Partial<Template>
  >({});
  const [editContent, setEditContent] = useState<boolean>(false);
  const [editImage, setEditImage] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (template) {
      setCustomizedTemplate({
        imageUrl: template.imageUrl,
        content: template.content,
      });
    }
  }, [template]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const newImageUrl = event.target?.result as string;
        setCustomizedTemplate((prev) => ({
          ...prev,
          imageUrl: newImageUrl,
        }));
        setEditImage(false);
      };
      reader.readAsDataURL(file);
    }
  };

  // const handleCustomize = () => {
  //   if (onSave && customizedTemplate) {
  //     onSave(customizedTemplate);
  //   }
  //   onOpenChange(false);
  // };

  if (!template) return null;
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="md:max-w-[90%] bg-[#f9f9f9]">
        <DialogHeader>
          <DialogTitle>Template Preview</DialogTitle>
          <DialogDescription>
            Preview and customize your email template
          </DialogDescription>
        </DialogHeader>
        <ScrollArea className="h-125">
          <div className="flex justify-center">
            <Card className="max-w-2xl py-2 px-2">
              <CardHeader className="bg-white p-0 relative">
                <img
                  src={customizedTemplate.imageUrl || "images/bbanner.webp"}
                  alt="Email banner"
                  className="w-full email-banner-img"
                />
                <div className="absolute top-2 right-2">
                  {editImage ? (
                    <>
                      <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleImageChange}
                        accept="image/*"
                        className="hidden"
                      />
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => fileInputRef.current?.click()}
                        className="bg-white rounded-full p-2 shadow-md"
                      >
                        <Upload className="h-5 w-5" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setEditImage(false)}
                        className="bg-white rounded-full p-2 shadow-md ml-2"
                      >
                        <X className="h-5 w-5" />
                      </Button>
                    </>
                  ) : (
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setEditImage(true)}
                      className="bg-white rounded-full p-2 shadow-md"
                    >
                      <Edit className="h-5 w-5" />
                    </Button>
                  )}
                </div>
              </CardHeader>
              <CardContent className="bg-[#f9f9f9]">
                <div className="text-center">
                  <h2 className="mt-10 text-2xl">Hi, (Name)</h2>
                  <div className="relative editable-content min-w-full">
                    {editContent ? (
                      <>
                        <Textarea
                          value={
                            " Wishing You Very happy birthday filled with joy,success, and wonderful memories!"
                          }
                        />
                        <X
                          className="edit"
                          height={40}
                          width={40}
                          onClick={() => setEditContent((el) => !el)}
                        />
                      </>
                    ) : (
                      <>
                        <p className="mt-4">
                          Wishing You Very happy birthday filled with joy,
                          success, and wonderful memories!
                        </p>
                        <Edit
                          className="edit"
                          height={40}
                          width={40}
                          onClick={() => setEditContent((el) => !el)}
                        />
                      </>
                    )}
                  </div>
                  <p className="mt-4">(Personal Message)</p>
                  <div className="flex justify-center my-5">
                    <ReddemBox>
                      <img
                        src="images/logo.svg"
                        alt=""
                        height={100}
                        width={100}
                      />

                      <p className="mt-4">XOXO Rewards Codde worth</p>
                      <p className="text-5xl font-bold my-4">INR ****</p>

                      <Codebox>
                        <p>USE THIS CODE</p>

                        <p>****_****_****</p>

                        <p>Expires on** Feb ****</p>
                      </Codebox>

                      <Button className="bg-first mt-4">Reddem Now</Button>
                    </ReddemBox>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
