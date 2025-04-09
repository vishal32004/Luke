import { useState } from "react";
import {
  Download,
  Filter,
  MoreHorizontal,
  ChevronDown,
  Check,
} from "lucide-react";
import { format } from "date-fns";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

// Sample transaction data
const transactions: Transaction[] = [
  {
    id: "INV-001",
    paymentReference: "PAY-1234-ABCD",
    date: new Date("2023-01-15"),
    reason: "Monthly Subscription",
    status: "Completed",
    amount: 29.99,
    closingBalance: 120.45,
  },
  {
    id: "INV-002",
    paymentReference: "PAY-2345-BCDE",
    date: new Date("2023-02-15"),
    reason: "Monthly Subscription",
    status: "Completed",
    amount: 29.99,
    closingBalance: 90.46,
  },
  {
    id: "INV-003",
    paymentReference: "PAY-3456-CDEF",
    date: new Date("2023-03-15"),
    reason: "Monthly Subscription",
    status: "Completed",
    amount: 29.99,
    closingBalance: 60.47,
  },
  {
    id: "INV-004",
    paymentReference: "PAY-4567-DEFG",
    date: new Date("2023-04-15"),
    reason: "Monthly Subscription",
    status: "Failed",
    amount: 0,
    closingBalance: 60.47,
  },
  {
    id: "INV-005",
    paymentReference: "PAY-5678-EFGH",
    date: new Date("2023-05-15"),
    reason: "Monthly Subscription",
    status: "Completed",
    amount: 29.99,
    closingBalance: 30.48,
  },
  {
    id: "INV-006",
    paymentReference: "PAY-6789-FGHI",
    date: new Date("2023-06-15"),
    reason: "Monthly Subscription",
    status: "Completed",
    amount: 29.99,
    closingBalance: 0.49,
  },
  {
    id: "INV-007",
    paymentReference: "PAY-7890-GHIJ",
    date: new Date("2023-07-15"),
    reason: "Monthly Subscription",
    status: "Completed",
    amount: 29.99,
    closingBalance: -29.5,
  },
  {
    id: "INV-008",
    paymentReference: "PAY-8901-HIJK",
    date: new Date("2023-08-15"),
    reason: "Account Top-up",
    status: "Completed",
    amount: -100.0,
    closingBalance: 70.5,
  },
  {
    id: "INV-009",
    paymentReference: "PAY-9012-IJKL",
    date: new Date("2023-09-15"),
    reason: "Monthly Subscription",
    status: "Completed",
    amount: 29.99,
    closingBalance: 40.51,
  },
  {
    id: "INV-010",
    paymentReference: "PAY-0123-JKLM",
    date: new Date("2023-10-15"),
    reason: "Monthly Subscription",
    status: "Pending",
    amount: 29.99,
    closingBalance: 10.52,
  },
];

const allColumns: { id: ColumnKey; name: string; key: TransactionFieldKey }[] =
  [
    { id: "invoice", name: "Invoice", key: "id" },
    {
      id: "paymentReference",
      name: "Payment Reference ID",
      key: "paymentReference",
    },
    { id: "date", name: "Date (UTC)", key: "date" },
    { id: "reason", name: "Reason", key: "reason" },
    { id: "status", name: "Status", key: "status" },
    { id: "amount", name: "Adjusted amount", key: "amount" },
    { id: "closingBalance", name: "Closing Balance", key: "closingBalance" },
  ];
type ColumnKey =
  | "invoice"
  | "paymentReference"
  | "date"
  | "reason"
  | "status"
  | "amount"
  | "closingBalance";

type Transaction = {
  id: string;
  paymentReference: string;
  date: Date;
  reason: string;
  status: string;
  amount: number;
  closingBalance: number;
};

type TransactionFieldKey = keyof Transaction;
export default function TransactionHistory() {
  // State for visible columns
  const [visibleColumns, setVisibleColumns] = useState<
    Record<ColumnKey, boolean>
  >({
    invoice: true,
    paymentReference: true,
    date: true,
    reason: false,
    status: true,
    amount: true,
    closingBalance: true,
  });

  // State for time filter
  const [timeFilter, setTimeFilter] = useState("filtered");

  // State for column selection dialog
  const [columnDialogOpen, setColumnDialogOpen] = useState(false);

  // Temporary state for column selection
  const [tempColumns, setTempColumns] =
    useState<Record<ColumnKey, boolean>>(visibleColumns);


  // Filter transactions based on time filter
  const filteredTransactions = transactions.filter((transaction) => {
    const now = new Date();
    const twelveMonthsAgo = new Date(now.getTime());
    twelveMonthsAgo.setMonth(twelveMonthsAgo.getMonth() - 12);

    if (timeFilter === "last12Months") {
      return transaction.date >= twelveMonthsAgo;
    } else if (timeFilter === "filtered") {
      return transaction.status === "Completed";
    } else if (timeFilter === "historical") {
      return true;
    }

    return true;
  });

  // Handle download
  const handleDownload = () => {
    // Create headers based on visible columns
    const headers = allColumns
      .filter((col) => visibleColumns[col.id])
      .map((col) => col.name)
      .join(",");

    // Create CSV content
    const csvContent = filteredTransactions
      .map((transaction) => {
        return allColumns
          .filter((col) => visibleColumns[col.id])
          .map((col) => {
            if (col.key === "date") {
              return format(transaction[col.key], "yyyy-MM-dd");
            } else if (col.key === "amount" || col.key === "closingBalance") {
              return transaction[col.key].toFixed(2);
            } else {
              return transaction[col.key];
            }
          })
          .join(",");
      })
      .join("\n");

    // Combine headers and content
    const csv = `${headers}\n${csvContent}`;

    // Create download link
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", "transaction_history.csv");
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Apply column changes
  const applyColumnChanges = () => {
    setVisibleColumns(tempColumns);
    setColumnDialogOpen(false);
  };
  console.log("Filtered Transactions:", filteredTransactions);
  return (
    <div className="container mx-auto py-6">
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle>Transaction History</CardTitle>
            <div className="flex gap-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm" className="h-8 gap-1">
                    <Filter className="h-4 w-4" />
                    Filters
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-[200px]">
                  <DropdownMenuItem
                    onClick={() => setTimeFilter("last12Months")}
                    className="flex items-center justify-between"
                  >
                    Last 12 months record
                    {timeFilter === "last12Months" && (
                      <Check className="h-4 w-4" />
                    )}
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => setTimeFilter("filtered")}
                    className="flex items-center justify-between"
                  >
                    Filtered records
                    {timeFilter === "filtered" && <Check className="h-4 w-4" />}
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => setTimeFilter("historical")}
                    className="flex items-center justify-between"
                  >
                    Historical records
                    {timeFilter === "historical" && (
                      <Check className="h-4 w-4" />
                    )}
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              <Dialog
                open={columnDialogOpen}
                onOpenChange={setColumnDialogOpen}
              >
                <DialogTrigger asChild>
                  <Button variant="outline" size="sm" className="h-8 gap-1">
                    <MoreHorizontal className="h-4 w-4" />
                    Columns
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Select Columns</DialogTitle>
                    <DialogDescription>
                      Choose which columns to display in the transaction
                      history.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="select-all"
                        checked={Object.values(tempColumns).every(Boolean)}
                        onCheckedChange={(checked) => {
                          const newState = Object.fromEntries(
                            allColumns.map((col) => [col.id, checked === true])
                          ) as Record<ColumnKey, boolean>;
                          setTempColumns(newState);
                        }}
                      />
                      <Label htmlFor="select-all" className="font-medium">
                        Select All
                      </Label>
                    </div>
                    {allColumns.map((column) => (
                      <div
                        key={column.id}
                        className="flex items-center space-x-2"
                      >
                        <Checkbox
                          id={column.id}
                          checked={tempColumns[column.id]}
                          onCheckedChange={(checked) => {
                            setTempColumns({
                              ...tempColumns,
                              [column.id]: checked === true,
                            });
                          }}
                        />
                        <Label htmlFor={column.id}>{column.name}</Label>
                      </div>
                    ))}
                  </div>
                  <DialogFooter>
                    <Button onClick={applyColumnChanges}>Apply Changes</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>

              <Button size="sm" className="h-8 gap-1" onClick={handleDownload}>
                <Download className="h-4 w-4" />
                Download
              </Button>
            </div>
          </div>
          <CardDescription>
            View and download your transaction history
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  {allColumns.map((column) =>
                    visibleColumns[column.id] ? (
                      <TableHead key={column.id}>{column.name}</TableHead>
                    ) : null
                  )}
                  <TableHead className="w-[100px]">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredTransactions.length === 0 ? (
                  <TableRow>
                    <TableCell
                      colSpan={
                        Object.values(visibleColumns).filter(Boolean).length + 1
                      }
                      className="text-center"
                    >
                      No transactions found
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredTransactions.map((transaction) => (
                    <TableRow key={transaction.id}>
                      {visibleColumns.invoice && (
                        <TableCell>{transaction.id}</TableCell>
                      )}
                      {visibleColumns.paymentReference && (
                        <TableCell>{transaction.paymentReference}</TableCell>
                      )}
                      {visibleColumns.date && (
                        <TableCell>
                          {format(transaction.date, "yyyy-MM-dd")}
                        </TableCell>
                      )}
                      {visibleColumns.reason && (
                        <TableCell>{transaction.reason}</TableCell>
                      )}
                      {visibleColumns.status && (
                        <TableCell>
                          <span
                            className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                              transaction.status === "Completed"
                                ? "bg-green-100 text-green-800"
                                : transaction.status === "Pending"
                                ? "bg-yellow-100 text-yellow-800"
                                : "bg-red-100 text-red-800"
                            }`}
                          >
                            {transaction.status}
                          </span>
                        </TableCell>
                      )}
                      {visibleColumns.amount && (
                        <TableCell
                          className={
                            transaction.amount < 0
                              ? "text-green-600"
                              : "text-red-600"
                          }
                        >
                          {transaction.amount < 0 ? "+" : "-"}$
                          {Math.abs(transaction.amount).toFixed(2)}
                        </TableCell>
                      )}
                      {visibleColumns.closingBalance && (
                        <TableCell>
                          ${transaction.closingBalance.toFixed(2)}
                        </TableCell>
                      )}
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <MoreHorizontal className="h-4 w-4" />
                              <span className="sr-only">Open menu</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>View details</DropdownMenuItem>
                            <DropdownMenuItem>
                              Download invoice
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
