import { PlusIcon } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Link } from "react-router-dom";

export default function WalletBalance() {
  return (
    <div className="mx-auto p-4 md:p-6">
      <h1 className="text-lg font-medium text-gray-900 mb-4">Wallet Balance</h1>

      <Card className="p-6 mb-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm text-gray-500 mb-1">Available</p>
            <h2 className="text-3xl font-semibold mb-4">INR 0.00</h2>
            <p className="text-sm text-gray-500">
              Your account wallet will be used to maintain funds to send rewards
              to your recipients.
            </p>
          </div>
          <div className="mt-4 md:mt-0">
            <Link
              to="/add-funds"
              className=" px-2 py-2 text-white bg-blue-600 flex items-center rounded-lg"
            >
              <PlusIcon className="h-4 w-4 mr-1 " /> Add Funds to Wallet
            </Link>
          </div>
        </div>
      </Card>

      <div>
        <h2 className="text-base font-medium text-gray-900 mb-4">
          Recent Activity
        </h2>
        <Card className="p-6 flex items-center justify-center min-h-[200px]">
          <p className="text-sm text-gray-500 text-center max-w-xs">
            Data will be available once you add funds to your wallet.
          </p>
        </Card>
      </div>
    </div>
  );
}
