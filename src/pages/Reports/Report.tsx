import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DatePickerWithRange } from "@/components/date-range-picker";
import { Button } from "@/components/ui/button";
import { Download, RefreshCw } from "lucide-react";
import PointsReports from "@/components/reports/points-report";
import CodesReports from "@/components/reports/code-report";
import RecipientReports from "@/components/reports/recipient-report";
import ProductReports from "@/components/reports/product-report";

import { DateRange } from "react-day-picker";

export default function ReportsDashboard() {
  const [dateRange, setDateRange] = useState<DateRange>({
    from: new Date(new Date().setDate(new Date().getDate() - 30)),
    to: new Date(),
  });
  const [program, setProgram] = useState("all");
  const [recipientType, setRecipientType] = useState("all");
  const [activeTab, setActiveTab] = useState("points");

  // Filter options
  const programs = [
    { value: "all", label: "All Programs" },
    { value: "loyalty", label: "Loyalty Program" },
    { value: "referral", label: "Referral Program" },
    { value: "promotion", label: "Promotional" },
  ];

  const recipientTypes = [
    { value: "all", label: "All Types" },
    { value: "individual", label: "Individual" },
    { value: "team", label: "Team" },
    { value: "client", label: "Client" },
  ];

  // Handle filter changes
  const handleProgramChange = (value: string) => {
    setProgram(value);
  };

  const handleRecipientTypeChange = (value: string) => {
    setRecipientType(value);
  };

  const handleTabChange = (value: string) => {
    setActiveTab(value);
  };

  const handleRefresh = () => {
    // In a real app, this would refetch data
    alert("Refreshing data...");
  };

  const handleExport = () => {
    // In a real app, this would export data
    alert("Exporting data...");
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Reports</h1>
          <p className="text-muted-foreground mt-1">
            Monitor and analyze reward points and codes performance
          </p>
        </div>
        <div className="flex items-center gap-4 w-full md:w-auto">
          <DatePickerWithRange
            className="w-full md:w-auto"
            date={dateRange}
            setDate={setDateRange}
          />
          <Button variant="outline" size="icon" onClick={handleRefresh}>
            <RefreshCw className="h-4 w-4" />
          </Button>
          <Button className="gap-2" onClick={handleExport}>
            <Download className="h-4 w-4" /> Export
          </Button>
        </div>
      </div>

      <Tabs
        defaultValue="points"
        className="space-y-6"
        value={activeTab}
        onValueChange={handleTabChange}
      >
        <div className="flex justify-between items-center flex-wrap gap-4">
          <TabsList>
            <TabsTrigger value="points">Points Reports</TabsTrigger>
            <TabsTrigger value="codes">Codes Reports</TabsTrigger>
            <TabsTrigger value="recipients">Recipient Reports</TabsTrigger>
            <TabsTrigger value="products">Product Reports</TabsTrigger>
          </TabsList>

          <div className="flex items-center gap-2">
            <Select value={program} onValueChange={handleProgramChange}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by program" />
              </SelectTrigger>
              <SelectContent>
                {programs.map((prog) => (
                  <SelectItem key={prog.value} value={prog.value}>
                    {prog.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {activeTab === "recipients" && (
              <Select
                value={recipientType}
                onValueChange={handleRecipientTypeChange}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filter by type" />
                </SelectTrigger>
                <SelectContent>
                  {recipientTypes.map((type) => (
                    <SelectItem key={type.value} value={type.value}>
                      {type.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          </div>
        </div>

        <TabsContent value="points" className="space-y-6">
          <PointsReports dateRange={dateRange} program={program} />
        </TabsContent>

        <TabsContent value="codes" className="space-y-6">
          <CodesReports dateRange={dateRange} program={program} />
        </TabsContent>

        <TabsContent value="recipients" className="space-y-6">
          <RecipientReports
            dateRange={dateRange}
            program={program}
            recipientType={recipientType}
          />
        </TabsContent>

        <TabsContent value="products" className="space-y-6">
          <ProductReports dateRange={dateRange} program={program} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
