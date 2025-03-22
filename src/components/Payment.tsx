import { useState } from "react";
import { CreditCard, HelpCircle } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function Payment() {
  const [paymentMethod, setPaymentMethod] = useState("visa");
  const [showNewCardForm, setShowNewCardForm] = useState(false);

  return (
    <div className="min-h-screen p-6 md:p-8 bg-white">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-2xl font-semibold mb-8 text-gray-800">Payment</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Payment Methods Section - 2 columns on desktop */}
          <div className="lg:col-span-2 space-y-4">
            {/* Visa Card Option */}
            <div
              className={`rounded-xl transition-all duration-200 overflow-hidden ${
                paymentMethod === "visa"
                  ? "bg-first ring-1 ring-green-500/30 text-white"
                  : "bg-green-50/70 hover:bg-green-50 text-gray-800"
              }`}
            >
              <button
                onClick={() => setPaymentMethod("visa")}
                className="w-full text-left p-5"
              >
                <div className="flex items-center">
                  <div
                    className={`w-4 h-4 rounded-sm mr-4 flex-shrink-0 ${
                      paymentMethod === "visa"
                        ? "bg-white"
                        : "border border-gray-500"
                    }`}
                  >
                    {paymentMethod === "visa" && (
                      <svg
                        className="w-4 h-4 text-green-600"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M5 12L10 17L20 7"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-center">
                      <div>
                        <span className="font-medium">Visa ending in 7658</span>
                        <p className="text-sm mt-1">Expiry 01/2024</p>
                      </div>
                    </div>
                  </div>
                </div>
              </button>
              <div className="px-5 pb-4 ml-8">
                <div className="flex text-xs space-x-3">
                  <button className="hover:underline transition-all">
                    Delete
                  </button>
                  <span className="text-gray-600">|</span>
                  <button className="hover:underline transition-all">
                    Edit
                  </button>
                </div>
              </div>
            </div>

            {/* Mastercard Option */}
            <div
              className={`rounded-xl transition-all duration-200 overflow-hidden ${
                paymentMethod === "mastercard"
                  ? "bg-first ring-1 ring-green-500/30 text-white"
                  : "bg-green-50/70 hover:bg-green-50 text-gray-800"
              }`}
            >
              <button
                onClick={() => setPaymentMethod("mastercard")}
                className="w-full text-left p-5"
              >
                <div className="flex items-center">
                  <div
                    className={`w-4 h-4 rounded-sm mr-4 flex-shrink-0 ${
                      paymentMethod === "mastercard"
                        ? "bg-white"
                        : "border border-gray-500"
                    }`}
                  >
                    {paymentMethod === "mastercard" && (
                      <svg
                        className="w-4 h-4 text-green-600"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M5 12L10 17L20 7"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-center">
                      <div>
                        <span className="font-medium">
                          Mastercard ending in 8426
                        </span>
                        <p className="text-sm mt-1">Expiry 04/2025</p>
                      </div>
                    </div>
                  </div>
                </div>
              </button>
              <div className="px-5 pb-4 ml-8">
                <div className="flex text-xs space-x-3">
                  <button className="hover:underline transition-all">
                    Delete
                  </button>
                  <span className="text-gray-600">|</span>
                  <button className="hover:underline transition-all">
                    Edit
                  </button>
                </div>
              </div>
            </div>

            {/* PayPal Option */}
            <div
              className={`rounded-xl transition-all duration-200 overflow-hidden ${
                paymentMethod === "paypal"
                  ? "bg-first ring-1 ring-green-500/30 text-white"
                  : "bg-green-50/70 hover:bg-green-50 text-gray-800"
              }`}
            >
              <button
                onClick={() => setPaymentMethod("paypal")}
                className="w-full text-left p-5"
              >
                <div className="flex items-center">
                  <div
                    className={`w-4 h-4 rounded-sm mr-4 flex-shrink-0 ${
                      paymentMethod === "paypal"
                        ? "bg-white"
                        : "border border-gray-500"
                    }`}
                  >
                    {paymentMethod === "paypal" && (
                      <svg
                        className="w-4 h-4 text-green-600"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M5 12L10 17L20 7"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-center">
                      <span className="font-medium">Paypal account</span>
                    </div>
                  </div>
                </div>
              </button>
              <div className="px-5 pb-4 ml-8">
                <div className="flex text-xs space-x-3">
                  <button className="hover:underline transition-all">
                    Delete
                  </button>
                  <span className="text-gray-600">|</span>
                  <button className="hover:underline transition-all">
                    Edit
                  </button>
                </div>
              </div>
            </div>

            <div className="relative my-8">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center">
                <span className="bg-white px-4 text-sm text-gray-500">or</span>
              </div>
            </div>

            {/* Add New Payment Method */}
            <button
              onClick={() => setShowNewCardForm(!showNewCardForm)}
              className="text-green-600 text-sm hover:text-green-500 transition-colors flex items-center"
            >
              <span className="mr-2 text-lg">+</span>
              Add a new payment method
            </button>

            {/* New Card Form */}
            {showNewCardForm && (
              <div className="mt-6 space-y-6 bg-green-50 p-6 rounded-xl border border-green-100 animate-in fade-in duration-300">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label
                      htmlFor="fullName"
                      className="text-sm font-medium text-gray-700"
                    >
                      Full name (as displayed on card)*
                    </Label>
                    <Input
                      id="fullName"
                      placeholder="Bonnie Green"
                      className="bg-white border-gray-300 text-gray-800 h-11 rounded-lg focus:ring-green-500 focus:border-green-500"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label
                      htmlFor="cardNumber"
                      className="text-sm font-medium text-gray-700"
                    >
                      Card number*
                    </Label>
                    <Input
                      id="cardNumber"
                      placeholder="xxxx-xxxx-xxxx-xxxx"
                      className="bg-white border-gray-300 text-gray-800 h-11 rounded-lg focus:ring-green-500 focus:border-green-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label
                      htmlFor="expiration"
                      className="text-sm font-medium text-gray-700"
                    >
                      Card expiration*
                    </Label>
                    <Input
                      id="expiration"
                      placeholder="MM/YY"
                      className="bg-white border-gray-300 text-gray-800 h-11 rounded-lg focus:ring-green-500 focus:border-green-500"
                    />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-1">
                      <Label
                        htmlFor="cvv"
                        className="text-sm font-medium text-gray-700"
                      >
                        CVV*
                      </Label>
                      <HelpCircle className="h-4 w-4 text-gray-500 cursor-help" />
                    </div>
                    <div className="flex gap-2">
                      <Input
                        id="cvv"
                        placeholder="•••"
                        className="bg-white border-gray-300 text-gray-800 h-11 rounded-lg focus:ring-green-500 focus:border-green-500"
                      />
                      <div className="bg-white border border-gray-300 rounded-lg flex items-center justify-center w-14 h-11">
                        <CreditCard className="h-5 w-5 text-gray-500" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <Button className="w-full bg-green-600 hover:bg-green-700 text-white mt-8 h-12 rounded-lg text-base font-medium transition-all duration-200 shadow-lg shadow-green-900/20">
              Pay now
            </Button>
          </div>

          {/* Order Summary Section - 1 column on desktop */}
          <div className="space-y-5">
            {/* Price Breakdown */}
            <div className="bg-green-50 rounded-xl p-5 border border-green-100">
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-700">Original price</span>
                  <span className="font-medium text-gray-800">$6,592.00</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-700">Savings</span>
                  <span className="text-green-600 font-medium">-$299.00</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-700">Store Pickup</span>
                  <span className="font-medium text-gray-800">$99</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-700">Tax</span>
                  <span className="font-medium text-gray-800">$799</span>
                </div>
                <div className="border-t border-gray-300 my-3 pt-3"></div>
                <div className="flex justify-between font-medium">
                  <span className="text-gray-800">Total</span>
                  <span className="text-lg text-gray-800">$7,191.00</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
