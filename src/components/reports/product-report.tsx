import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { DateRange } from "react-day-picker";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { parseISO, isWithinInterval, startOfDay, endOfDay } from "date-fns";

interface Product {
  id: string;
  name: string;
  pointsEarned: number;
  pointsRedeemed: number;
  category: string;
}

interface CategoryData {
  name: string;
  earned: number;
  redeemed: number;
}

interface Redemption {
  id: string;
  product: string;
  points: number;
  user: string;
  date: string;
}

interface ProductReportsProps {
  dateRange: DateRange;
  program: string;
}

export default function ProductReports({
  dateRange,
  program,
}: ProductReportsProps) {
  // Sample data - in a real app, this would come from an API
  const topProducts: Product[] = [
    {
      id: "P-1001",
      name: "Premium Headphones",
      pointsEarned: 16500,
      pointsRedeemed: 12000,
      category: "Electronics",
    },
    {
      id: "P-1002",
      name: "Fitness Tracker",
      pointsEarned: 13900,
      pointsRedeemed: 9800,
      category: "Wearables",
    },
    {
      id: "P-1003",
      name: "Wireless Earbuds",
      pointsEarned: 11700,
      pointsRedeemed: 8500,
      category: "Electronics",
    },
    {
      id: "P-1004",
      name: "Smart Water Bottle",
      pointsEarned: 9700,
      pointsRedeemed: 7200,
      category: "Fitness",
    },
    {
      id: "P-1005",
      name: "Yoga Mat",
      pointsEarned: 8800,
      pointsRedeemed: 6700,
      category: "Fitness",
    },
    {
      id: "P-1006",
      name: "Standing Desk Converter",
      pointsEarned: 10200,
      pointsRedeemed: 7100,
      category: "Office",
    },
    {
      id: "P-1007",
      name: "Smartphone Gimbal",
      pointsEarned: 7800,
      pointsRedeemed: 5400,
      category: "Photography",
    },
  ];

  const categoryData: CategoryData[] = [
    { name: "Electronics", earned: 35000, redeemed: 22000 },
    { name: "Wearables", earned: 25000, redeemed: 16000 },
    { name: "Fitness", earned: 20000, redeemed: 12000 },
    { name: "Home", earned: 15000, redeemed: 9000 },
    { name: "Apparel", earned: 12000, redeemed: 7000 },
  ];

  const recentRedemptions: Redemption[] = [
    {
      id: "R-6001",
      product: "Fitness Tracker",
      points: 2200,
      user: "Linda Perez",
      date: "2025-04-10",
    },
    {
      id: "R-6002",
      product: "Yoga Mat",
      points: 700,
      user: "Raj Patel",
      date: "2025-03-22",
    },
    {
      id: "R-6003",
      product: "Premium Headphones",
      points: 2700,
      user: "Emily Johnson",
      date: "2025-02-05",
    },
    {
      id: "R-6004",
      product: "Standing Desk Converter",
      points: 3100,
      user: "Innovation Team",
      date: "2024-12-18",
    },
    {
      id: "R-6005",
      product: "Smart Water Bottle",
      points: 900,
      user: "Sales Rocket Team",
      date: "2024-11-27",
    },
    {
      id: "R-6006",
      product: "Wireless Earbuds",
      points: 1600,
      user: "Olivia Nguyen",
      date: "2024-10-14",
    },
    {
      id: "R-6007",
      product: "Smartphone Gimbal",
      points: 1800,
      user: "NeoCorp Ltd",
      date: "2024-09-05",
    },
  ];

  // Filter data based on program with proper typing
  const filterDataByProgram = (data: Product[]): Product[] => {
    if (program === "all") return data;

    return data.map((item) => ({
      ...item,
      pointsEarned:
        program === "loyalty"
          ? item.pointsEarned * 0.6
          : program === "referral"
          ? item.pointsEarned * 0.3
          : item.pointsEarned * 0.1,
      pointsRedeemed:
        program === "loyalty"
          ? item.pointsRedeemed * 0.6
          : program === "referral"
          ? item.pointsRedeemed * 0.3
          : item.pointsRedeemed * 0.1,
    }));
  };

  // Filter redemptions based on date range
  const filteredRedemptions = recentRedemptions.filter((redemption) => {
    if (!dateRange?.from || !dateRange?.to) return true;
    const redemptionDate = parseISO(redemption.date);
    return isWithinInterval(redemptionDate, {
      start: startOfDay(dateRange.from),
      end: endOfDay(dateRange.to),
    });
  });

  // Apply filter to product data
  const filteredTopProducts = filterDataByProgram(topProducts);

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Products
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">125</div>
            <p className="text-xs text-muted-foreground">
              +5 from previous period
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Points Earned from Products
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">107,000</div>
            <p className="text-xs text-muted-foreground">
              +12.5% from previous period
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Points Redeemed for Products
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">66,000</div>
            <p className="text-xs text-muted-foreground">
              +8.2% from previous period
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Avg. Points Per Product
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">856</div>
            <p className="text-xs text-muted-foreground">
              +3.7% from previous period
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Points by Product Category</CardTitle>
          <CardDescription>
            Earned vs. redeemed points by product category
          </CardDescription>
        </CardHeader>
        <CardContent className="h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={categoryData}
              margin={{
                top: 20,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="earned" fill="#8884d8" name="Points Earned" />
              <Bar dataKey="redeemed" fill="#82ca9d" name="Points Redeemed" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <div className="grid gap-4 md:grid-cols-2">
        <Card className="col-span-2">
          <CardHeader>
            <CardTitle>Top Products by Points</CardTitle>
            <CardDescription>
              Products with the highest point activity
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Product ID</TableHead>
                  <TableHead>Product Name</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Points Earned</TableHead>
                  <TableHead>Points Redeemed</TableHead>
                  <TableHead>Redemption Rate</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredTopProducts.map((product) => {
                  const redemptionRate = Math.round(
                    (product.pointsRedeemed / product.pointsEarned) * 100
                  );
                  return (
                    <TableRow key={product.id}>
                      <TableCell className="font-medium">
                        {product.id}
                      </TableCell>
                      <TableCell>{product.name}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{product.category}</Badge>
                      </TableCell>
                      <TableCell>
                        {product.pointsEarned.toLocaleString()}
                      </TableCell>
                      <TableCell>
                        {product.pointsRedeemed.toLocaleString()}
                      </TableCell>
                      <TableCell>{redemptionRate}%</TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card className="col-span-2">
          <CardHeader>
            <CardTitle>Recent Product Redemptions</CardTitle>
            <CardDescription>
              Latest product redemptions from{" "}
              {dateRange?.from?.toLocaleDateString() ?? "N/A"} to{" "}
              {dateRange?.to?.toLocaleDateString() ?? "N/A"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Redemption ID</TableHead>
                  <TableHead>Product</TableHead>
                  <TableHead>Points</TableHead>
                  <TableHead>User</TableHead>
                  <TableHead>Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredRedemptions.map((redemption) => (
                  <TableRow key={redemption.id}>
                    <TableCell className="font-medium">
                      {redemption.id}
                    </TableCell>
                    <TableCell>{redemption.product}</TableCell>
                    <TableCell>{redemption.points.toLocaleString()}</TableCell>
                    <TableCell>{redemption.user}</TableCell>
                    <TableCell>{redemption.date}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
