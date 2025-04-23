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
  PieChart,
  Pie,
  Cell,
  Legend,
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

interface Transaction {
  id: string;
  user: string;
  type: "Earned" | "Redeemed";
  points: number;
  reason: string;
  date: string;
}

interface MonthlyData {
  name: string;
  sent: number;
  redeemed: number;
}

interface ChannelData {
  name: string;
  value: number;
}

interface PointsReportsProps {
  dateRange: DateRange;
  program: string;
}

export default function PointsReports({
  dateRange,
  program,
}: PointsReportsProps) {
  // Filter data based on program
  const filterDataByProgram = (data: MonthlyData[]) => {
    if (program === "all") return data;

    return data.map((item) => ({
      ...item,
      sent:
        program === "loyalty"
          ? item.sent * 0.6
          : program === "referral"
          ? item.sent * 0.3
          : item.sent * 0.1,
      redeemed:
        program === "loyalty"
          ? item.redeemed * 0.6
          : program === "referral"
          ? item.redeemed * 0.3
          : item.redeemed * 0.1,
    }));
  };

  // Sample data - in a real app, this would come from an API
  const totalPointsSent = 125750;
  const totalPointsRedeemed = 87320;
  const redemptionRate = Math.round(
    (totalPointsRedeemed / totalPointsSent) * 100
  );

  const monthlyData: MonthlyData[] = [
    { name: "Jan", sent: 12500, redeemed: 8700 },
    { name: "Feb", sent: 13200, redeemed: 9100 },
    { name: "Mar", sent: 15800, redeemed: 10500 },
    { name: "Apr", sent: 14700, redeemed: 9800 },
    { name: "May", sent: 16800, redeemed: 11200 },
    { name: "Jun", sent: 17500, redeemed: 12300 },
    { name: "Jul", sent: 18250, redeemed: 13100 },
    { name: "Aug", sent: 17000, redeemed: 12620 },
  ];

  const channelData: ChannelData[] = [
    { name: "Purchase Rewards", value: 45 },
    { name: "Referral Bonuses", value: 25 },
    { name: "Promotional", value: 20 },
    { name: "Birthday Rewards", value: 10 },
  ];

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

  const recentTransactions: Transaction[] = [
    {
      id: "TX-9001",
      user: "Linda Perez",
      type: "Earned",
      points: 300,
      reason: "Purchase",
      date: "2025-04-10",
    },
    {
      id: "TX-9002",
      user: "Raj Patel",
      type: "Redeemed",
      points: 700,
      reason: "Gift Card",
      date: "2025-03-22",
    },
    {
      id: "TX-9003",
      user: "Emily Johnson",
      type: "Earned",
      points: 500,
      reason: "Referral",
      date: "2025-02-07",
    },
    {
      id: "TX-9004",
      user: "Innovation Team",
      type: "Earned",
      points: 1200,
      reason: "Milestone Achievement",
      date: "2024-12-19",
    },
    {
      id: "TX-9005",
      user: "Sales Rocket Team",
      type: "Redeemed",
      points: 900,
      reason: "Product Discount",
      date: "2024-11-27",
    },
    {
      id: "TX-9006",
      user: "Olivia Nguyen",
      type: "Earned",
      points: 250,
      reason: "Feedback Bonus",
      date: "2024-10-16",
    },
    {
      id: "TX-9007",
      user: "NeoCorp Ltd",
      type: "Redeemed",
      points: 1800,
      reason: "Hardware Purchase",
      date: "2024-09-05",
    },
  ];

  // Apply filter to monthly data
  const filteredMonthlyData = filterDataByProgram(monthlyData);

  // Filter transactions based on date range if needed
  const filteredTransactions = recentTransactions.filter((tx) => {
    if (!dateRange?.from || !dateRange?.to) return true;

    const txDate = parseISO(tx.date);

    return isWithinInterval(txDate, {
      start: startOfDay(dateRange.from),
      end: endOfDay(dateRange.to),
    });
  });

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Points Sent
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {totalPointsSent.toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">
              +12.5% from previous period
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Points Redeemed
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {totalPointsRedeemed.toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">
              +8.2% from previous period
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Redemption Rate
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{redemptionRate}%</div>
            <p className="text-xs text-muted-foreground">
              -2.1% from previous period
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Avg. Points Per User
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">325</div>
            <p className="text-xs text-muted-foreground">
              +5.7% from previous period
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Points Sent vs. Redeemed</CardTitle>
            <CardDescription>
              Monthly comparison for the current year
            </CardDescription>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={filteredMonthlyData}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="sent" fill="#8884d8" name="Points Sent" />
                <Bar dataKey="redeemed" fill="#82ca9d" name="Points Redeemed" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Points Distribution by Channel</CardTitle>
            <CardDescription>Percentage of points by source</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={channelData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) =>
                    `${name}: ${(percent * 100).toFixed(0)}%`
                  }
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {channelData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Point Transactions</CardTitle>
          <CardDescription>
            Latest point activities across all users
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Transaction ID</TableHead>
                <TableHead>User</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Points</TableHead>
                <TableHead>Reason</TableHead>
                <TableHead>Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredTransactions.map((tx) => (
                <TableRow key={tx.id}>
                  <TableCell className="font-medium">{tx.id}</TableCell>
                  <TableCell>{tx.user}</TableCell>
                  <TableCell>
                    <Badge
                      variant={tx.type === "Earned" ? "default" : "secondary"}
                    >
                      {tx.type}
                    </Badge>
                  </TableCell>
                  <TableCell
                    className={
                      tx.type === "Earned" ? "text-green-600" : "text-red-600"
                    }
                  >
                    {tx.type === "Earned" ? "+" : "-"}
                    {tx.points}
                  </TableCell>
                  <TableCell>{tx.reason}</TableCell>
                  <TableCell>{tx.date}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
