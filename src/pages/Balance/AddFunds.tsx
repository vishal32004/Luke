import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Info } from "lucide-react";

export default function AddFunds() {
  const [amount, setAmount] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("online");

  return (
    <div className="container mx-auto py-10 max-w-5xl">
      <div className="flex items-center mb-6">
        <h1 className="text-2xl font-bold">Add Funds to Wallet</h1>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Enter Billing Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="currency">Billing Currency</Label>
                <Select defaultValue="inr">
                  <SelectTrigger id="currency">
                    <SelectValue placeholder="Select currency" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="inr">India - INR</SelectItem>
                    <SelectItem value="usd">United States - USD</SelectItem>
                    <SelectItem value="eur">Europe - EUR</SelectItem>
                    <SelectItem value="gbp">United Kingdom - GBP</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-sm text-gray-500">
                  This is the billing currency of your account wallet used to
                  send rewards to recipients.
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="business">Registered Business Name</Label>
                <Select>
                  <SelectTrigger id="business">
                    <SelectValue placeholder="Search for your registered business name" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="acme">Acme Corporation</SelectItem>
                    <SelectItem value="globex">Globex Industries</SelectItem>
                    <SelectItem value="initech">Initech Solutions</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button className="mt-2">Submit Details</Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Enter Amount</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <span className="text-gray-500">INR</span>
                </div>
                <Input
                  type="text"
                  className="pl-12"
                  placeholder="Enter your amount"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Select Payment Method</CardTitle>
            </CardHeader>
            <CardContent>
              <RadioGroup
                value={paymentMethod}
                onValueChange={setPaymentMethod}
                className="space-y-4"
              >
                <div
                  className={`border rounded-lg p-4 ${
                    paymentMethod === "online"
                      ? "border-purple-500 bg-purple-50"
                      : ""
                  }`}
                >
                  <div className="flex items-start">
                    <RadioGroupItem
                      value="online"
                      id="online"
                      className="mt-1"
                    />
                    <div className="ml-3">
                      <Label
                        htmlFor="online"
                        className="text-base font-medium flex items-center"
                      >
                        Pay using Online Methods
                        <span className="ml-2 text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded">
                          Recommended
                        </span>
                      </Label>
                      <p className="text-sm text-gray-500 mt-1">
                        Pay using NEFT, IMPS or Debit Card and others.
                      </p>
                      <ul className="mt-2 space-y-1 text-sm text-gray-500 list-disc list-inside ml-2">
                        <li>Instantly credited.</li>
                        <li>Additional 2-3% charges may apply.</li>
                      </ul>
                      <p className="mt-2 text-sm text-gray-500 flex items-center">
                        <Info className="h-4 w-4 mr-1" /> Credit card option
                        will be active after business verification.
                      </p>
                    </div>
                  </div>
                </div>

                <div
                  className={`border rounded-lg p-4 ${
                    paymentMethod === "invoice"
                      ? "border-purple-500 bg-purple-50"
                      : ""
                  }`}
                >
                  <div className="flex items-start">
                    <RadioGroupItem
                      value="invoice"
                      id="invoice"
                      className="mt-1"
                    />
                    <div className="ml-3">
                      <Label
                        htmlFor="invoice"
                        className="text-base font-medium"
                      >
                        Generate an Invoice
                      </Label>
                      <p className="text-sm text-gray-500 mt-1">
                        Generate an invoice and pay through your finance team.
                      </p>
                      <ul className="mt-2 space-y-1 text-sm text-gray-500 list-disc list-inside ml-2">
                        <li>
                          Takes upto 2-3 business days after we receive the
                          payment.
                        </li>
                        <li>No additional charges applicable.</li>
                      </ul>

                      {paymentMethod === "invoice" && (
                        <div className="mt-3">
                          <Label htmlFor="po" className="text-sm">
                            Enter PO number (optional)
                          </Label>
                          <Input
                            id="po"
                            className="mt-1"
                            placeholder="Enter PO number"
                          />
                          <p className="text-xs text-gray-500 mt-1">
                            This number will be printed on your invoice for your
                            internal record.
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </RadioGroup>
            </CardContent>
          </Card>
        </div>

        <div>
          <Card className="sticky top-6">
            <CardHeader>
              <CardTitle>Payment Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between">
                <span className="text-gray-500">Net amount</span>
                <span>
                  {amount ? `${Number.parseFloat(amount).toFixed(2)}` : "0.00"}
                </span>
              </div>
              <div className="flex justify-between font-medium text-lg pt-2 border-t">
                <span>Total payable</span>
                <span>
                  INR{" "}
                  {amount ? `${Number.parseFloat(amount).toFixed(2)}` : "0.00"}
                </span>
              </div>
            </CardContent>
            <CardFooter className="flex-col space-y-2">
              <div className="flex items-center text-sm text-blue-600 w-full">
                <Info className="h-4 w-4 mr-1" />
                <span>Verify your business to continue adding funds.</span>
              </div>
              <div className="flex gap-2 w-full">
                <Button variant="outline" className="flex-1">
                  Cancel
                </Button>
                <Button className="flex-1">Proceed to Pay</Button>
              </div>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}
