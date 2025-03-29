import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function Payment() {
  const [paymentMethod, setPaymentMethod] = useState("online");
  const [poNumber, setPoNumber] = useState("");

  return (
    <div className="min-h-screen p-6 md:p-8 bg-white">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-2xl font-semibold mb-8 text-gray-800">Payment</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Payment Methods Section */}
          <div className="lg:col-span-2 space-y-6">
            {/* Pay Online Option */}
            <div
              className={`rounded-xl p-5 cursor-pointer transition-all duration-200 ${
                paymentMethod === "online"
                  ? "bg-green-50 border-2 border-green-500"
                  : "bg-gray-50 hover:bg-gray-100"
              }`}
              onClick={() => setPaymentMethod("online")}
            >
              <div className="flex items-center">
                <div
                  className={`w-5 h-5 rounded-full mr-4 flex-shrink-0 ${
                    paymentMethod === "online"
                      ? "bg-green-500 border-green-500"
                      : "border border-gray-400"
                  }`}
                >
                  {paymentMethod === "online" && (
                    <div className="w-full h-full flex items-center justify-center">
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                    </div>
                  )}
                </div>
                <div>
                  <h3 className="font-medium text-gray-800">Pay Online</h3>
                  <p className="text-sm text-gray-600 mt-1">
                    Pay immediately with credit card or bank transfer
                  </p>
                </div>
              </div>
            </div>

            {/* PO Number Option */}
            <div
              className={`rounded-xl p-5 cursor-pointer transition-all duration-200 ${
                paymentMethod === "po"
                  ? "bg-green-50 border-2 border-green-500"
                  : "bg-gray-50 hover:bg-gray-100"
              }`}
              onClick={() => setPaymentMethod("po")}
            >
              <div className="flex items-center">
                <div
                  className={`w-5 h-5 rounded-full mr-4 flex-shrink-0 ${
                    paymentMethod === "po"
                      ? "bg-green-500 border-green-500"
                      : "border border-gray-400"
                  }`}
                >
                  {paymentMethod === "po" && (
                    <div className="w-full h-full flex items-center justify-center">
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                    </div>
                  )}
                </div>
                <div>
                  <h3 className="font-medium text-gray-800">PO Number</h3>
                  <p className="text-sm text-gray-600 mt-1">
                    Upload your purchase order number for invoice payment
                  </p>
                </div>
              </div>
            </div>

            {/* PO Number Input (shown when PO option is selected) */}
            {paymentMethod === "po" && (
              <div className="mt-4 space-y-2">
                <Label htmlFor="poNumber" className="text-gray-700">
                  Purchase Order Number*
                </Label>
                <Input
                  id="poNumber"
                  value={poNumber}
                  onChange={(e) => setPoNumber(e.target.value)}
                  placeholder="Enter your PO number"
                  className="bg-white border-gray-300"
                />
              </div>
            )}

            <Button className="w-full bg-green-600 hover:bg-green-700 text-white mt-8 h-12 rounded-lg text-base font-medium">
              {paymentMethod === "online" ? "Proceed to Payment" : "Submit PO"}
            </Button>
          </div>

          {/* Order Summary Section */}
          <div className="space-y-5">
            <div className="bg-gray-50 rounded-xl p-5 border border-gray-200">
              <h3 className="font-medium text-gray-800 mb-4">Order Summary</h3>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="text-gray-800">$6,592.00</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Tax</span>
                  <span className="text-gray-800">$799.00</span>
                </div>
                <div className="border-t border-gray-300 my-3 pt-3"></div>
                <div className="flex justify-between font-medium">
                  <span className="text-gray-800">Total</span>
                  <span className="text-lg text-gray-800">$7,391.00</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
