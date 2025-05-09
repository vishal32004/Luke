"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  CardDescription,
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
import { Separator } from "@/components/ui/separator";
import {
  AlertCircle,
  CreditCard,
  FileText,
  Info,
  Wallet,
  CheckCircle2,
  ArrowRight,
  Building,
  Globe,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function AddFunds() {
  const [amount, setAmount] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("online");
  const [currency, setCurrency] = useState("inr");

  const currencySymbols = {
    inr: "₹",
    usd: "$",
    eur: "€",
    gbp: "£",
  };

  return (
    <div className="container mx-auto py-10 px-4 max-w-6xl bg-gradient-to-b from-slate-50 to-white min-h-screen">
      <div className="flex items-center mb-8">
        <div className="bg-primary/10 p-3 rounded-full mr-4">
          <Wallet className="h-6 w-6 text-primary" />
        </div>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Add Funds to Wallet
          </h1>
          <p className="text-muted-foreground mt-1">
            Add money to your account to send rewards to recipients
          </p>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <Card className="shadow-sm border-slate-200">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center text-xl">
                <Building className="h-5 w-5 mr-2 text-primary" />
                Billing Details
              </CardTitle>
              <CardDescription>Enter your billing information</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="currency" className="text-sm font-medium">
                  Billing Currency
                </Label>
                <Select
                  defaultValue="inr"
                  onValueChange={(value) => setCurrency(value)}
                >
                  <SelectTrigger id="currency" className="bg-white">
                    <SelectValue placeholder="Select currency" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="inr">
                      <div className="flex items-center">
                        <span className="mr-2">🇮🇳</span>
                        <span>India - INR (₹)</span>
                      </div>
                    </SelectItem>
                    <SelectItem value="usd">
                      <div className="flex items-center">
                        <span className="mr-2">🇺🇸</span>
                        <span>United States - USD ($)</span>
                      </div>
                    </SelectItem>
                    <SelectItem value="eur">
                      <div className="flex items-center">
                        <span className="mr-2">🇪🇺</span>
                        <span>Europe - EUR (€)</span>
                      </div>
                    </SelectItem>
                    <SelectItem value="gbp">
                      <div className="flex items-center">
                        <span className="mr-2">🇬🇧</span>
                        <span>United Kingdom - GBP (£)</span>
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-sm text-muted-foreground flex items-center mt-1">
                  <Info className="h-4 w-4 mr-1 text-primary/70" />
                  This is the billing currency of your account wallet used to
                  send rewards to recipients.
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="business" className="text-sm font-medium">
                  Registered Business Name
                </Label>
                <Select>
                  <SelectTrigger id="business" className="bg-white">
                    <SelectValue placeholder="Search for your registered business name" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="acme">Acme Corporation</SelectItem>
                    <SelectItem value="globex">Globex Industries</SelectItem>
                    <SelectItem value="initech">Initech Solutions</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button className="mt-4 px-6">
                Verify Business
                <CheckCircle2 className="ml-2 h-4 w-4" />
              </Button>
            </CardContent>
          </Card>

          <Card className="shadow-sm border-slate-200">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center text-xl">
                <Globe className="h-5 w-5 mr-2 text-primary" />
                Enter Amount
              </CardTitle>
              <CardDescription>
                Specify how much you want to add to your wallet
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                  <span className="text-gray-500 font-medium">
                    {currencySymbols[currency]}
                  </span>
                </div>
                <Input
                  type="text"
                  className="pl-10 text-lg h-12 bg-white"
                  placeholder="Enter your amount"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                />
              </div>
              <div className="flex gap-2 mt-4">
                {[1000, 5000, 10000, 25000].map((quickAmount) => (
                  <Button
                    key={quickAmount}
                    variant="outline"
                    className="flex-1 bg-slate-50 hover:bg-slate-100"
                    onClick={() => setAmount(quickAmount.toString())}
                  >
                    {currencySymbols[currency]}
                    {quickAmount.toLocaleString()}
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-sm border-slate-200">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center text-xl">
                <CreditCard className="h-5 w-5 mr-2 text-primary" />
                Select Payment Method
              </CardTitle>
              <CardDescription>Choose how you want to pay</CardDescription>
            </CardHeader>
            <CardContent>
              <RadioGroup
                value={paymentMethod}
                onValueChange={setPaymentMethod}
                className="space-y-5"
              >
                <div
                  className={`border rounded-lg p-5 transition-all ${
                    paymentMethod === "online"
                      ? "border-primary bg-primary/5 shadow-sm"
                      : "hover:border-slate-300 border-slate-200"
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
                        className="text-base font-medium flex items-center cursor-pointer"
                      >
                        Pay using Online Methods
                        <Badge className="ml-2 bg-green-100 text-green-800 hover:bg-green-100">
                          Recommended
                        </Badge>
                      </Label>
                      <p className="text-sm text-muted-foreground mt-1">
                        Pay using NEFT, IMPS, UPI, or Debit Card and others.
                      </p>
                      <ul className="mt-3 space-y-2 text-sm text-muted-foreground ml-1">
                        <li className="flex items-center">
                          <CheckCircle2 className="h-4 w-4 mr-2 text-green-600" />
                          Instantly credited to your wallet
                        </li>
                        <li className="flex items-center">
                          <CheckCircle2 className="h-4 w-4 mr-2 text-green-600" />
                          Multiple payment options available
                        </li>
                        <li className="flex items-center">
                          <AlertCircle className="h-4 w-4 mr-2 text-amber-600" />
                          Additional 2-3% charges may apply
                        </li>
                      </ul>
                      <div className="mt-3 p-3 bg-blue-50 rounded-md text-sm text-blue-700 flex items-center">
                        <Info className="h-4 w-4 mr-2 flex-shrink-0" />
                        <span>
                          Credit card option will be active after business
                          verification.
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div
                  className={`border rounded-lg p-5 transition-all ${
                    paymentMethod === "invoice"
                      ? "border-primary bg-primary/5 shadow-sm"
                      : "hover:border-slate-300 border-slate-200"
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
                        className="text-base font-medium cursor-pointer"
                      >
                        Generate an Invoice
                      </Label>
                      <p className="text-sm text-muted-foreground mt-1">
                        Generate an invoice and pay through your finance team.
                      </p>
                      <ul className="mt-3 space-y-2 text-sm text-muted-foreground ml-1">
                        <li className="flex items-center">
                          <CheckCircle2 className="h-4 w-4 mr-2 text-green-600" />
                          No additional charges applicable
                        </li>
                        <li className="flex items-center">
                          <AlertCircle className="h-4 w-4 mr-2 text-amber-600" />
                          Takes up to 2-3 business days after payment receipt
                        </li>
                      </ul>

                      {paymentMethod === "invoice" && (
                        <div className="mt-4 p-4 bg-slate-50 rounded-md">
                          <Label htmlFor="po" className="text-sm font-medium">
                            Enter PO number (optional)
                          </Label>
                          <Input
                            id="po"
                            className="mt-2 bg-white"
                            placeholder="Enter PO number"
                          />
                          <p className="text-xs text-muted-foreground mt-2 flex items-center">
                            <FileText className="h-3 w-3 mr-1" />
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
          <Card className="sticky top-6 shadow-md border-slate-200">
            <CardHeader className="pb-3 border-b">
              <CardTitle className="text-xl">Payment Summary</CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="space-y-4">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Net amount</span>
                  <span className="font-medium">
                    {currencySymbols[currency]}{" "}
                    {amount
                      ? Number.parseFloat(amount).toLocaleString(undefined, {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        })
                      : "0.00"}
                  </span>
                </div>

                {paymentMethod === "online" && (
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">
                      Processing fee (2%)
                    </span>
                    <span className="font-medium">
                      {currencySymbols[currency]}{" "}
                      {amount
                        ? (Number.parseFloat(amount) * 0.02).toLocaleString(
                            undefined,
                            {
                              minimumFractionDigits: 2,
                              maximumFractionDigits: 2,
                            }
                          )
                        : "0.00"}
                    </span>
                  </div>
                )}

                <Separator className="my-2" />

                <div className="flex justify-between font-medium text-lg pt-2">
                  <span>Total payable</span>
                  <span className="text-primary font-bold">
                    {currencySymbols[currency]}{" "}
                    {amount
                      ? paymentMethod === "online"
                        ? (Number.parseFloat(amount) * 1.02).toLocaleString(
                            undefined,
                            {
                              minimumFractionDigits: 2,
                              maximumFractionDigits: 2,
                            }
                          )
                        : Number.parseFloat(amount).toLocaleString(undefined, {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                          })
                      : "0.00"}
                  </span>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex-col space-y-4 border-t pt-6">
              <div className="p-3 bg-amber-50 rounded-md text-sm text-amber-700 flex items-center w-full">
                <AlertCircle className="h-5 w-5 mr-2 flex-shrink-0" />
                <span>Verify your business to continue adding funds.</span>
              </div>
              <div className="flex gap-3 w-full">
                <Button variant="outline" className="flex-1">
                  Cancel
                </Button>
                <Button className="flex-1 gap-1" disabled={!amount}>
                  Proceed to Pay
                  <ArrowRight className="h-4 w-4 ml-1" />
                </Button>
              </div>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}
