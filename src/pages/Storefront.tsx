import type React from "react";

import { useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Edit, Save, Eye, Upload, X } from "lucide-react";

const Storefront = () => {
  const [editingUrl, setEditingUrl] = useState(false);
  const [editingPointsName, setEditingPointsName] = useState(false);
  const [storefrontUrl, setStorefrontUrl] = useState(
    "https://stores.xxxxday.com/sifycorp"
  );
  const [pointsName, setPointsName] = useState("Points");
  const [footerEnabled, setFooterEnabled] = useState(true);
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [logoPreview, setLogoPreview] = useState<string | null>(null);

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setLogoFile(file);
      setLogoPreview(URL.createObjectURL(file));
    }
  };
  console.log(logoFile);
  return (
    <div className="container mx-auto p-4">
      <Card className="w-full max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle>Storefront Branding</CardTitle>
          <CardDescription>
            Manage your storefront branding settings here.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-8">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label className="text-base font-medium">Storefront URL</Label>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setEditingUrl(!editingUrl)}
              >
                {editingUrl ? (
                  <Save className="h-4 w-4 mr-2" />
                ) : (
                  <Edit className="h-4 w-4 mr-2" />
                )}
                {editingUrl ? "Save" : "Edit"}
              </Button>
            </div>
            <p className="text-sm text-muted-foreground">
              This is the URL for the one-stop redemption store.
            </p>
            <div className="flex gap-2 mt-2">
              <Input
                value={storefrontUrl}
                onChange={(e) => setStorefrontUrl(e.target.value)}
                readOnly={!editingUrl}
                className={!editingUrl ? "bg-muted" : ""}
              />
            </div>
          </div>

          <Separator />

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label className="text-base font-medium">
                Global Reward Catalog
              </Label>
              <Button variant="outline" size="sm">
                <Eye className="h-4 w-4 mr-2" />
                View Catalog
              </Button>
            </div>
            <p className="text-sm text-muted-foreground">
              You can choose to view and customize the global reward catalog of
              1000+ brand vouchers.
            </p>
          </div>

          <Separator />

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label className="text-base font-medium">Points Name</Label>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setEditingPointsName(!editingPointsName)}
              >
                {editingPointsName ? (
                  <Save className="h-4 w-4 mr-2" />
                ) : (
                  <Edit className="h-4 w-4 mr-2" />
                )}
                {editingPointsName ? "Save" : "Edit"}
              </Button>
            </div>
            <p className="text-sm text-muted-foreground">
              Customize what your reward points are called on the storefront.
            </p>
            <div className="flex gap-2 mt-2">
              <Input
                value={pointsName}
                onChange={(e) => setPointsName(e.target.value)}
                readOnly={!editingPointsName}
                className={!editingPointsName ? "bg-muted" : ""}
                placeholder="Points"
              />
            </div>
          </div>

          <Separator />

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label className="text-base font-medium">Company Logo</Label>
            </div>
            <p className="text-sm text-muted-foreground">
              This logo will be displayed in the storefront website, campaigns,
              and in all emails to the rewardees.
            </p>

            <div className="flex items-center gap-4 mt-4">
              {logoPreview && (
                <div className="relative">
                  <img
                    src={logoPreview || "/placeholder.svg"}
                    alt="Logo preview"
                    className="h-16 w-auto object-contain border rounded p-2"
                  />
                  <Button
                    variant="destructive"
                    size="icon"
                    className="absolute -top-2 -right-2 h-6 w-6"
                    onClick={() => {
                      setLogoFile(null);
                      setLogoPreview(null);
                    }}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </div>
              )}

              <div className="flex-1 flex gap-2">
                <Input
                  type="file"
                  onChange={handleLogoChange}
                  accept="image/*"
                  className="flex-1"
                />
                <Button>
                  <Upload className="h-4 w-4 mr-2" />
                  Upload
                </Button>
              </div>
            </div>
          </div>

          <Separator />

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label className="text-base font-medium">Storefront Footer</Label>
              <Switch
                checked={footerEnabled}
                onCheckedChange={setFooterEnabled}
              />
            </div>
            <p className="text-sm text-muted-foreground">
              Enable or disable the footer section on your storefront.
            </p>
          </div>
        </CardContent>
        <CardFooter>
          <Button className="w-full">Save All Changes</Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Storefront;
