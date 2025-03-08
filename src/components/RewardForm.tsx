"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { ChevronLeft, ChevronRight, Minus, Plus } from "lucide-react";

export default function RewardForm({
  setShowRewardForm,
}: {
  setShowRewardForm: (bool: boolean) => void;
}) {
  const [quantity, setQuantity] = useState(1);
  const [value, setValue] = useState("");

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  const formatQuantity = (num: number) => {
    return num.toString().padStart(2, "0");
  };

  const calculateTotal = () => {
    const numValue = Number.parseFloat(value) || 0;
    return (numValue * quantity).toFixed(0);
  };

  return (
    <Card className="w-full">
      <CardContent className="pt-6">
        <h2 className="text-lg font-medium mb-6">Send Rewards</h2>

        <div className="space-y-6">
          <div>
            <label className="block text-sm mb-2">Choose who can redeem</label>
            <Select defaultValue="recipient">
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select who can redeem" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="recipient">
                  Only the recipient of the code
                </SelectItem>
                <SelectItem value="anyone">Anyone with the code</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex gap-2">
            <Button
              variant="outline"
              className="rounded-full bg-gray-100 hover:bg-gray-200 border-gray-200"
            >
              Send in Bulk
            </Button>
            <Button
              variant="outline"
              className="rounded-full bg-gray-100 hover:bg-gray-200 border-gray-200"
            >
              Send Individually
            </Button>
          </div>

          <div>
            <p className="mb-2 text-sm">Send via</p>
            <RadioGroup defaultValue="email" className="flex gap-6">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="email" id="email" />
                <Label htmlFor="email">Email address</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="sms" id="sms" />
                <Label htmlFor="sms">SMS</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="both" id="both" />
                <Label htmlFor="both">Both</Label>
              </div>
            </RadioGroup>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input placeholder="Enter Recipient Name" />
            <Input placeholder="Enter Recipient Email Address" type="email" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <span className="text-gray-500">INR</span>
              </div>
              <Input
                placeholder="Enter Value of Code"
                className="pl-12"
                value={value}
                onChange={(e) => setValue(e.target.value)}
              />
            </div>
            <div className="flex items-center">
              <div className="flex items-center border rounded-md">
                <Button
                  variant="ghost"
                  className="px-3 h-10 rounded-none border-r"
                  onClick={decreaseQuantity}
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <div className="w-12 text-center py-2">
                  {formatQuantity(quantity)}
                </div>
                <Button
                  variant="ghost"
                  className="px-3 h-10 rounded-none border-l"
                  onClick={increaseQuantity}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              <div className="ml-4">
                <span className="text-sm">Total: INR {calculateTotal()}</span>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox id="advanced" />
            <label
              htmlFor="advanced"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Show advanced details
            </label>
          </div>

          <div className="flex justify-end">
            <Button className="bg-blue-600 hover:bg-blue-700">
              Add Recipient
            </Button>
          </div>

          <div className="flex justify-between pt-4">
            <Button
              variant="outline"
              className="flex items-center gap-1"
              onClick={() => setShowRewardForm(false)}
            >
              <ChevronLeft className="h-4 w-4" />
              Back
            </Button>
            <Button variant="outline" className="flex items-center gap-1">
              Next
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
