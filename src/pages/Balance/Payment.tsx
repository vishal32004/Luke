import { Plus, ArrowDown, ArrowUp, Clock } from "lucide-react";
import { Link } from "react-router-dom";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";

export default function WalletBalance() {
  return (
    <div className="container mx-auto py-6 space-y-8 max-w-5xl">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h1 className="text-2xl font-semibold tracking-tight">
          Wallet Balance
        </h1>
        <Button asChild>
          <Link to="/add-funds" className="gap-1.5">
            <Plus className="h-4 w-4" />
            Add Funds
          </Link>
        </Button>
      </div>

      <Card className="overflow-hidden border-0 shadow-md bg-gradient-to-br from-white to-gray-50">
        <CardHeader className="pb-2">
          <CardDescription>Available Balance</CardDescription>
          <div className="flex items-baseline gap-2">
            <CardTitle className="text-4xl font-bold">₹0.00</CardTitle>
            <Badge variant="outline" className="text-xs font-normal">
              INR
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="pb-6">
          <p className="text-sm text-muted-foreground max-w-md">
            Your account wallet will be used to maintain funds to send rewards
            to your recipients.
          </p>
        </CardContent>
        <CardFooter className="bg-gray-50 py-3 border-t">
          <Button variant="ghost" size="sm" asChild>
            <Link to="/transactions" className="text-xs">
              View transaction history
            </Link>
          </Button>
        </CardFooter>
      </Card>

      <div className="space-y-4">
        <h2 className="text-xl font-medium tracking-tight">Recent Activity</h2>

        <Tabs defaultValue="all" className="w-full">
          <TabsList className="mb-4">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="deposits">Deposits</TabsTrigger>
            <TabsTrigger value="withdrawals">Withdrawals</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="mt-0">
            <Card className="border shadow-sm">
              <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
                <div className="bg-gray-50 p-4 rounded-full mb-4">
                  <Clock className="h-8 w-8 text-muted-foreground" />
                </div>
                <h3 className="text-lg font-medium mb-2">
                  No transactions yet
                </h3>
                <p className="text-sm text-muted-foreground max-w-sm mb-6">
                  Data will be available once you add funds to your wallet or
                  make your first transaction.
                </p>
                <Button asChild>
                  <Link to="/add-funds" className="gap-1.5">
                    <Plus className="h-4 w-4" />
                    Add Funds
                  </Link>
                </Button>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="deposits" className="mt-0">
            <Card className="border shadow-sm">
              <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
                <div className="bg-gray-50 p-4 rounded-full mb-4">
                  <ArrowDown className="h-8 w-8 text-muted-foreground" />
                </div>
                <h3 className="text-lg font-medium mb-2">No deposits yet</h3>
                <p className="text-sm text-muted-foreground max-w-sm mb-6">
                  Add funds to your wallet to see your deposit history here.
                </p>
                <Button asChild>
                  <Link to="/add-funds" className="gap-1.5">
                    <Plus className="h-4 w-4" />
                    Add Funds
                  </Link>
                </Button>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="withdrawals" className="mt-0">
            <Card className="border shadow-sm">
              <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
                <div className="bg-gray-50 p-4 rounded-full mb-4">
                  <ArrowUp className="h-8 w-8 text-muted-foreground" />
                </div>
                <h3 className="text-lg font-medium mb-2">No withdrawals yet</h3>
                <p className="text-sm text-muted-foreground max-w-sm mb-6">
                  Your withdrawal history will appear here once you make your
                  first withdrawal.
                </p>
                <Button variant="outline" asChild>
                  <Link to="/withdraw" className="gap-1.5">
                    Learn about withdrawals
                  </Link>
                </Button>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
