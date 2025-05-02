import type React from "react";

import { useState, useMemo, useCallback } from "react";
import {
  Download,
  FileSpreadsheet,
  Plus,
  Search,
  X,
  SlidersHorizontal,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import ExternalClient from "./Form/ExternalClient";
import AutoDealersForm from "./Form/AutoDealers";
import ChannelPartnerForm from "./Form/ChannelPartner";
import InternalEmployees from "./Form/InternalEmployees";

// Sample data for demonstration
const sampleReceptionists = [
  {
    id: 1,
    name: "Jane Smith",
    email: "jane.smith@example.com",
    phone: "555-1234",
    team: "Front Desk",
    client: "ABC Corp",
    status: "Active",
  },
  {
    id: 2,
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "555-5678",
    team: "Customer Service",
    client: "XYZ Inc",
    status: "Active",
  },
  {
    id: 3,
    name: "Alice Johnson",
    email: "alice.j@example.com",
    phone: "555-9012",
    team: "Front Desk",
    client: "123 Industries",
    status: "Inactive",
  },
  {
    id: 4,
    name: "Robert Chen",
    email: "robert.c@example.com",
    phone: "555-3456",
    team: "Support",
    client: "Tech Solutions",
    status: "Active",
  },
  {
    id: 5,
    name: "Emily Davis",
    email: "emily.d@example.com",
    phone: "555-7890",
    team: "Administrative",
    client: "ABC Corp",
    status: "Active",
  },
];

const teams = [
  "All Teams",
  "Front Desk",
  "Customer Service",
  "Administrative",
  "Support",
];
const clients = [
  "All Clients",
  "ABC Corp",
  "XYZ Inc",
  "123 Industries",
  "Tech Solutions",
];
const statuses = ["All Statuses", "Active", "Inactive"];

const getFilterOptions = (forWho: string) => {
  if (forWho === "internal_team") {
    return {
      primaryFilter: {
        name: "Department",
        options: [
          "All Departments",
          "Front Desk",
          "Customer Service",
          "Administrative",
          "Support",
        ],
      },
      secondaryFilter: {
        name: "Job Seniorities",
        options: [
          "All Seniorities",
          "Executive",
          "Senior",
          "Mid-level",
          "Junior",
          "Intern",
        ],
      },
    };
  } else if (forWho === "external_client") {
    return {
      primaryFilter: {
        name: "Industry",
        options: [
          "All Industries",
          "Technology",
          "Finance",
          "Healthcare",
          "Manufacturing",
          "Retail",
        ],
      },
      secondaryFilter: {
        name: "Segment",
        options: ["All Segments", "Top N", "NextN", "Coverage"],
      },
    };
  } else if (forWho === "channel_partners") {
    return {
      primaryFilter: {
        name: "Status",
        options: ["All Statuses", "Onboarded", "To be Onboarded"],
      },
      secondaryFilter: {
        name: "Relation Intensity",
        options: ["All Relations", "High", "Neutral", "Low"],
      },
    };
  } else if (forWho === "others") {
    return {
      primaryFilter: {
        name: "Status",
        options: ["All Statuses", "Customer", "Prospect"],
      },
      secondaryFilter: {
        name: "Store Visit",
        options: ["All Visits", "Done", "Pending"],
      },
    };
  }

  // Default fallback
  return {
    primaryFilter: {
      name: "Team",
      options: [
        "All Teams",
        "Front Desk",
        "Customer Service",
        "Administrative",
        "Support",
      ],
    },
    secondaryFilter: {
      name: "Client",
      options: [
        "All Clients",
        "ABC Corp",
        "XYZ Inc",
        "123 Industries",
        "Tech Solutions",
      ],
    },
  };
};

// Sample import data
const sampleImportList = [
  {
    id: 101,
    name: "Emily Parker",
    email: "emily.parker@example.com",
    phone: "555-7890",
    department: "Marketing",
    companyName: "Global Tech",
    channelPartnerName: "Partner A",
    status: "Active",
    team: "Front Desk",
    industry: "Technology",
    segment: "Top N",
    seniority: "Senior",
    relationIntensity: "High",
    storeVisit: "Done",
  },
  {
    id: 102,
    name: "Michael Johnson",
    email: "michael.j@example.com",
    phone: "555-4567",
    department: "Sales",
    companyName: "Innovate Inc",
    channelPartnerName: "Partner B",
    status: "Pending",
    team: "Customer Service",
    industry: "Finance",
    segment: "NextN",
    seniority: "Mid-level",
    relationIntensity: "Neutral",
    storeVisit: "Pending",
  },
  {
    id: 103,
    name: "Sarah Williams",
    email: "sarah.w@example.com",
    phone: "555-8901",
    department: "Operations",
    companyName: "Tech Solutions",
    channelPartnerName: "Partner C",
    status: "Active",
    team: "Administrative",
    industry: "Healthcare",
    segment: "Coverage",
    seniority: "Executive",
    relationIntensity: "High",
    storeVisit: "Done",
  },
  {
    id: 104,
    name: "David Brown",
    email: "david.b@example.com",
    phone: "555-2345",
    department: "IT",
    companyName: "Digital Systems",
    channelPartnerName: "Partner D",
    status: "Inactive",
    team: "Support",
    industry: "Manufacturing",
    segment: "Top N",
    seniority: "Junior",
    relationIntensity: "Low",
    storeVisit: "Pending",
  },
  {
    id: 105,
    name: "Jessica Miller",
    email: "jessica.m@example.com",
    phone: "555-6789",
    department: "HR",
    companyName: "Future Corp",
    channelPartnerName: "Partner E",
    status: "Active",
    team: "Front Desk",
    industry: "Retail",
    segment: "NextN",
    seniority: "Intern",
    relationIntensity: "Neutral",
    storeVisit: "Done",
  },
];

export default function ReceptionistManager({
  forWho = "internal_team",
  onChange,
}: {
  forWho?: string;
  onChange?: (selectedIds: number[]) => void;
}) {
  // State for main receptionist list
  const [receptionists, setReceptionists] = useState(sampleReceptionists);
  const [selectedReceptionists, setSelectedReceptionists] = useState<number[]>(
    []
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTeam, setSelectedTeam] = useState("All Teams");
  const [selectedClient, setSelectedClient] = useState("All Clients");
  const [selectedStatus, setSelectedStatus] = useState("All Statuses");
  const [filterOpen, setFilterOpen] = useState(false);

  // State for dialog and tabs
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("individual");

  // State for bulk upload
  const [bulkData, setBulkData] = useState<any[]>([]);
  const [showBulkPreview, setShowBulkPreview] = useState(false);

  // State for import tab
  const [importSearchQuery, setImportSearchQuery] = useState("");
  const [selectedImportIds, setSelectedImportIds] = useState<number[]>([]);
  const [importList] = useState(sampleImportList);
  const [primaryFilterValue, setPrimaryFilterValue] = useState("all");
  const [secondaryFilterValue, setSecondaryFilterValue] = useState("all");

  // Get filter options based on forWho
  const filterOptions = getFilterOptions(forWho);

  // Memoized filtered receptionists
  const filteredReceptionists = useMemo(() => {
    return receptionists.filter((receptionist) => {
      const matchesTeam =
        selectedTeam === "All Teams" || receptionist.team === selectedTeam;
      const matchesClient =
        selectedClient === "All Clients" ||
        receptionist.client === selectedClient;
      const matchesStatus =
        selectedStatus === "All Statuses" ||
        receptionist.status === selectedStatus;
      const matchesSearch =
        receptionist.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        receptionist.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        receptionist.phone.toLowerCase().includes(searchQuery.toLowerCase());

      return matchesTeam && matchesClient && matchesStatus && matchesSearch;
    });
  }, [
    receptionists,
    selectedTeam,
    selectedClient,
    selectedStatus,
    searchQuery,
  ]);

  // Memoized filtered import list
  const filteredImportList = useMemo(() => {
    return importList.filter((item) => {
      // Search filter
      const matchesSearch =
        item.name.toLowerCase().includes(importSearchQuery.toLowerCase()) ||
        item.email.toLowerCase().includes(importSearchQuery.toLowerCase()) ||
        item.phone.toLowerCase().includes(importSearchQuery.toLowerCase());

      // Primary filter
      let matchesPrimaryFilter = true;
      if (primaryFilterValue !== "all") {
        if (forWho === "internal_team") {
          matchesPrimaryFilter = item.department === primaryFilterValue;
        } else if (forWho === "external_client") {
          matchesPrimaryFilter = item.industry === primaryFilterValue;
        } else if (forWho === "channel_partners" || forWho === "others") {
          matchesPrimaryFilter = item.status === primaryFilterValue;
        }
      }

      // Secondary filter
      let matchesSecondaryFilter = true;
      if (secondaryFilterValue !== "all") {
        if (forWho === "internal_team") {
          matchesSecondaryFilter = item.seniority === secondaryFilterValue;
        } else if (forWho === "external_client") {
          matchesSecondaryFilter = item.segment === secondaryFilterValue;
        } else if (forWho === "channel_partners") {
          matchesSecondaryFilter =
            item.relationIntensity === secondaryFilterValue;
        } else if (forWho === "others") {
          matchesSecondaryFilter = item.storeVisit === secondaryFilterValue;
        }
      }

      return matchesSearch && matchesPrimaryFilter && matchesSecondaryFilter;
    });
  }, [
    importList,
    importSearchQuery,
    primaryFilterValue,
    secondaryFilterValue,
    forWho,
  ]);

  // Handler for selecting all receptionists
  const handleSelectAll = useCallback(
    (checked: boolean) => {
      if (checked) {
        const allVisibleIds = filteredReceptionists.map(
          (receptionist) => receptionist.id
        );
        setSelectedReceptionists(allVisibleIds);
        // Call onChange with all visible IDs
        if (onChange) onChange(allVisibleIds);
      } else {
        setSelectedReceptionists([]);
        // Call onChange with empty array
        if (onChange) onChange([]);
      }
    },
    [filteredReceptionists, onChange]
  );

  // Handler for selecting a single receptionist
  const handleSelectReceptionist = useCallback(
    (id: number, checked: boolean) => {
      if (checked) {
        setSelectedReceptionists((prev) => {
          const newSelected = [...prev, id];
          // Call onChange with the updated selection
          if (onChange) onChange(newSelected);
          return newSelected;
        });
      } else {
        setSelectedReceptionists((prev) => {
          const newSelected = prev.filter((recId) => recId !== id);
          // Call onChange with the updated selection
          if (onChange) onChange(newSelected);
          return newSelected;
        });
      }
    },
    [onChange]
  );

  // Handler for file upload
  const handleFileUpload = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) {
        // In a real application, you would parse the Excel file here
        // For this example, we'll simulate parsing with sample data
        const mockParsedData = [
          {
            name: "Mark Wilson",
            email: "mark.w@example.com",
            phone: "555-3456",
            team: "Support",
            client: "Tech Solutions",
            status: "Active",
          },
          {
            name: "Sarah Lee",
            email: "sarah.lee@example.com",
            phone: "555-7890",
            team: "Administrative",
            client: "ABC Corp",
            status: "Active",
          },
          {
            name: "Robert Brown",
            email: "robert.b@example.com",
            phone: "555-2345",
            team: "Front Desk",
            client: "XYZ Inc",
            status: "Inactive",
          },
        ];

        setBulkData(mockParsedData);
        setShowBulkPreview(true);
      }
    },
    []
  );

  // Handler for bulk add
  const handleBulkAdd = useCallback(() => {
    const newReceptionists = bulkData.map((item, index) => ({
      id: receptionists.length + index + 1,
      ...item,
    }));

    setReceptionists((prev) => [...prev, ...newReceptionists]);
    setBulkData([]);
    setShowBulkPreview(false);
    setAddDialogOpen(false);
  }, [bulkData, receptionists.length]);

  // Handler for downloading template
  const handleDownloadTemplate = useCallback(() => {
    const headers = ["Name", "Email", "Phone", "Team", "Client", "Status"];
    const csvContent = [
      headers.join(","),
      "John Doe,john.doe@example.com,555-1234,Front Desk,ABC Corp,Active",
      "Jane Smith,jane.smith@example.com,555-5678,Customer Service,XYZ Inc,Active",
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });

    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", "receptionist_template.csv");
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }, []);

  // Handler for importing selected people
  const handleImport = useCallback(() => {
    const selectedItems = importList.filter((item) =>
      selectedImportIds.includes(item.id)
    );
    const newReceptionists = selectedItems.map((item) => ({
      id: receptionists.length + Math.floor(Math.random() * 1000),
      name: item.name,
      email: item.email,
      phone: item.phone,
      team: item.team || "Unassigned",
      client: item.companyName || item.channelPartnerName || "Unassigned",
      status: item.status || "Active",
    }));

    setReceptionists((prev) => [...prev, ...newReceptionists]);
    setSelectedImportIds([]);
    setAddDialogOpen(false);
  }, [importList, selectedImportIds, receptionists.length]);

  // Handler for clearing filters
  const handleClearFilters = useCallback(() => {
    setSelectedTeam("All Teams");
    setSelectedClient("All Clients");
    setSelectedStatus("All Statuses");
  }, []);

  // Get the title based on forWho
  const getTitle = () => {
    switch (forWho) {
      case "internal_team":
        return "Internal Team";
      case "external_client":
        return "External Clients";
      case "channel_partners":
        return "Channel Partners";
      case "others":
        return "Auto Dealers";
      default:
        return "Receptionists";
    }
  };

  // Check if any filters are applied
  const hasFilters =
    selectedTeam !== "All Teams" ||
    selectedClient !== "All Clients" ||
    selectedStatus !== "All Statuses";

  return (
    <div className="container mx-auto py-6">
      <Card className="shadow-sm border-slate-200">
        <CardHeader className="flex flex-row items-center justify-between bg-white rounded-t-lg border-b pb-6">
          <div>
            <CardTitle className="text-2xl font-bold text-slate-800">
              {getTitle()} Receptionists
            </CardTitle>
            <p className="text-sm text-slate-500 mt-1">
              Manage your {getTitle().toLowerCase()} receptionists and their
              assignments
            </p>
          </div>
          <Dialog open={addDialogOpen} onOpenChange={setAddDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-slate-800 hover:bg-slate-700 shadow-sm transition-all">
                <Plus className="mr-2 h-4 w-4" />
                Add Receptionist
              </Button>
            </DialogTrigger>
            <DialogContent className="md:max-w-[1000px]">
              <DialogHeader>
                <DialogTitle className="text-xl font-semibold">
                  Add Receptionist
                </DialogTitle>
              </DialogHeader>

              <ScrollArea className="h-[500px] pr-4">
                <Tabs
                  defaultValue="individual"
                  value={activeTab}
                  onValueChange={setActiveTab}
                >
                  <TabsList className="grid w-full grid-cols-3 mb-6">
                    <TabsTrigger value="individual">Individual</TabsTrigger>
                    <TabsTrigger value="bulk">Bulk Upload</TabsTrigger>
                    <TabsTrigger value="import">Import from List</TabsTrigger>
                  </TabsList>
                  <TabsContent value="individual">
                    {forWho === "internal_team" && (
                      <InternalEmployees
                        onSubmit={() => setAddDialogOpen(false)}
                      />
                    )}
                    {forWho === "external_client" && (
                      <ExternalClient
                        onSubmit={() => setAddDialogOpen(false)}
                      />
                    )}
                    {forWho === "channel_partners" && (
                      <ChannelPartnerForm
                        onSubmit={() => setAddDialogOpen(false)}
                      />
                    )}
                    {forWho === "others" && (
                      <AutoDealersForm
                        onSubmit={() => setAddDialogOpen(false)}
                      />
                    )}
                  </TabsContent>
                  <TabsContent value="bulk">
                    <div className="space-y-4 py-4">
                      {!showBulkPreview ? (
                        <div className="flex flex-col items-center justify-center space-y-4 rounded-md border border-dashed p-10 bg-slate-50">
                          <FileSpreadsheet className="h-12 w-12 text-slate-400" />
                          <div className="space-y-2 text-center">
                            <h3 className="text-lg font-semibold text-slate-800">
                              Upload Excel File
                            </h3>
                            <p className="text-sm text-slate-500">
                              Upload an Excel file with receptionist details
                            </p>
                          </div>
                          <div className="flex flex-col space-y-2 w-full max-w-md">
                            <Label htmlFor="file-upload" className="sr-only">
                              Choose file
                            </Label>
                            <Input
                              id="file-upload"
                              type="file"
                              accept=".xlsx,.xls,.csv"
                              onChange={handleFileUpload}
                              className="cursor-pointer border-slate-300 hover:border-slate-400 transition-colors"
                            />
                            <Button
                              variant="outline"
                              size="sm"
                              className="mt-2 w-full"
                              onClick={handleDownloadTemplate}
                            >
                              <Download className="mr-2 h-4 w-4" />
                              Download Template
                            </Button>
                          </div>
                        </div>
                      ) : (
                        <div className="space-y-4">
                          <div className="flex items-center justify-between">
                            <h3 className="text-lg font-semibold text-slate-800">
                              Preview Data
                            </h3>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => {
                                setBulkData([]);
                                setShowBulkPreview(false);
                              }}
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                          <div className="rounded-md border shadow-sm">
                            <Table>
                              <TableHeader className="bg-slate-50">
                                <TableRow>
                                  <TableHead className="font-medium">
                                    Name
                                  </TableHead>
                                  <TableHead className="font-medium">
                                    Email
                                  </TableHead>
                                  <TableHead className="font-medium">
                                    Phone
                                  </TableHead>
                                  <TableHead className="font-medium">
                                    Team
                                  </TableHead>
                                  <TableHead className="font-medium">
                                    Client
                                  </TableHead>
                                  <TableHead className="font-medium">
                                    Status
                                  </TableHead>
                                </TableRow>
                              </TableHeader>
                              <TableBody>
                                {bulkData.map((item, index) => (
                                  <TableRow
                                    key={index}
                                    className="hover:bg-slate-50"
                                  >
                                    <TableCell className="font-medium">
                                      {item.name}
                                    </TableCell>
                                    <TableCell>{item.email}</TableCell>
                                    <TableCell>{item.phone}</TableCell>
                                    <TableCell>{item.team}</TableCell>
                                    <TableCell>{item.client}</TableCell>
                                    <TableCell>
                                      <Badge
                                        variant="outline"
                                        className={`${
                                          item.status === "Active"
                                            ? "bg-green-50 text-green-700 border-green-200"
                                            : "bg-slate-50 text-slate-700 border-slate-200"
                                        }`}
                                      >
                                        {item.status}
                                      </Badge>
                                    </TableCell>
                                  </TableRow>
                                ))}
                              </TableBody>
                            </Table>
                          </div>
                          <div className="flex justify-end space-x-2">
                            <Button
                              type="button"
                              variant="outline"
                              onClick={() => setAddDialogOpen(false)}
                            >
                              Cancel
                            </Button>
                            <Button onClick={handleBulkAdd}>
                              Add {bulkData.length} Receptionists
                            </Button>
                          </div>
                        </div>
                      )}
                    </div>
                  </TabsContent>
                  <TabsContent value="import">
                    <div className="space-y-4 py-4">
                      <div className="space-y-4 mb-4">
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                          <h3 className="text-lg font-semibold text-slate-800">
                            Available People
                          </h3>
                          <div className="relative">
                            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-slate-400" />
                            <Input
                              placeholder="Search by name, email or phone..."
                              className="pl-8 w-full md:w-64"
                              onChange={(e) =>
                                setImportSearchQuery(e.target.value)
                              }
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-slate-50 p-4 rounded-lg">
                          <div className="space-y-2">
                            <Label
                              htmlFor="primary-filter"
                              className="text-sm font-medium"
                            >
                              {filterOptions.primaryFilter.name}
                            </Label>
                            <Select
                              value={primaryFilterValue}
                              onValueChange={setPrimaryFilterValue}
                            >
                              <SelectTrigger id="primary-filter">
                                <SelectValue
                                  placeholder={`Select ${filterOptions.primaryFilter.name.toLowerCase()}`}
                                />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="all">
                                  {filterOptions.primaryFilter.options[0]}
                                </SelectItem>
                                {filterOptions.primaryFilter.options
                                  .slice(1)
                                  .map((option) => (
                                    <SelectItem key={option} value={option}>
                                      {option}
                                    </SelectItem>
                                  ))}
                              </SelectContent>
                            </Select>
                          </div>

                          <div className="space-y-2">
                            <Label
                              htmlFor="secondary-filter"
                              className="text-sm font-medium"
                            >
                              {filterOptions.secondaryFilter.name}
                            </Label>
                            <Select
                              value={secondaryFilterValue}
                              onValueChange={setSecondaryFilterValue}
                            >
                              <SelectTrigger id="secondary-filter">
                                <SelectValue
                                  placeholder={`Select ${filterOptions.secondaryFilter.name.toLowerCase()}`}
                                />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="all">
                                  {filterOptions.secondaryFilter.options[0]}
                                </SelectItem>
                                {filterOptions.secondaryFilter.options
                                  .slice(1)
                                  .map((option) => (
                                    <SelectItem key={option} value={option}>
                                      {option}
                                    </SelectItem>
                                  ))}
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                      </div>

                      <div className="rounded-md border shadow-sm">
                        <div className="p-3 bg-slate-50 border-b flex items-center justify-between">
                          <div className="text-sm font-medium text-slate-700">
                            {selectedImportIds.length > 0 ? (
                              <span>
                                {selectedImportIds.length} people selected
                              </span>
                            ) : (
                              <span>Available people</span>
                            )}
                          </div>
                          {selectedImportIds.length > 0 && (
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => setSelectedImportIds([])}
                              className="h-8 px-2 text-xs"
                            >
                              Clear selection
                            </Button>
                          )}
                        </div>
                        <Table>
                          <TableHeader className="bg-slate-50">
                            <TableRow>
                              <TableHead className="w-12">
                                <Checkbox
                                  checked={
                                    selectedImportIds.length ===
                                      filteredImportList.length &&
                                    filteredImportList.length > 0
                                  }
                                  onCheckedChange={(checked) => {
                                    if (checked) {
                                      setSelectedImportIds(
                                        filteredImportList.map(
                                          (item) => item.id
                                        )
                                      );
                                    } else {
                                      setSelectedImportIds([]);
                                    }
                                  }}
                                />
                              </TableHead>
                              <TableHead className="font-medium">
                                Name
                              </TableHead>
                              <TableHead className="font-medium">
                                Email
                              </TableHead>
                              <TableHead className="font-medium">
                                Phone
                              </TableHead>
                              {forWho === "internal_team" && (
                                <TableHead className="font-medium">
                                  Department
                                </TableHead>
                              )}
                              {forWho === "external_client" && (
                                <TableHead className="font-medium">
                                  Company
                                </TableHead>
                              )}
                              {forWho === "channel_partners" && (
                                <TableHead className="font-medium">
                                  Partner
                                </TableHead>
                              )}
                              {forWho === "others" && (
                                <TableHead className="font-medium">
                                  Status
                                </TableHead>
                              )}
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {filteredImportList.length > 0 ? (
                              filteredImportList.map((item) => (
                                <TableRow
                                  key={item.id}
                                  className="hover:bg-slate-50"
                                >
                                  <TableCell>
                                    <Checkbox
                                      checked={selectedImportIds.includes(
                                        item.id
                                      )}
                                      onCheckedChange={(checked) => {
                                        if (checked) {
                                          setSelectedImportIds([
                                            ...selectedImportIds,
                                            item.id,
                                          ]);
                                        } else {
                                          setSelectedImportIds(
                                            selectedImportIds.filter(
                                              (id) => id !== item.id
                                            )
                                          );
                                        }
                                      }}
                                    />
                                  </TableCell>
                                  <TableCell className="font-medium">
                                    {item.name}
                                  </TableCell>
                                  <TableCell>{item.email}</TableCell>
                                  <TableCell>{item.phone}</TableCell>
                                  {forWho === "internal_team" && (
                                    <TableCell>
                                      {item.department || "-"}
                                    </TableCell>
                                  )}
                                  {forWho === "external_client" && (
                                    <TableCell>
                                      {item.companyName || "-"}
                                    </TableCell>
                                  )}
                                  {forWho === "channel_partners" && (
                                    <TableCell>
                                      {item.channelPartnerName || "-"}
                                    </TableCell>
                                  )}
                                  {forWho === "others" && (
                                    <TableCell>{item.status || "-"}</TableCell>
                                  )}
                                </TableRow>
                              ))
                            ) : (
                              <TableRow>
                                <TableCell
                                  colSpan={forWho ? 5 : 4}
                                  className="h-24 text-center"
                                >
                                  No people found matching your criteria.
                                </TableCell>
                              </TableRow>
                            )}
                          </TableBody>
                        </Table>
                      </div>

                      <div className="flex justify-end space-x-2 mt-4">
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => setAddDialogOpen(false)}
                        >
                          Cancel
                        </Button>
                        <Button
                          onClick={handleImport}
                          disabled={selectedImportIds.length === 0}
                        >
                          Import {selectedImportIds.length} People
                        </Button>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </ScrollArea>
            </DialogContent>
          </Dialog>
        </CardHeader>
        <CardContent className="p-6">
          <div className="space-y-6">
            {/* Search and Filter Bar */}
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <Input
                  placeholder="Search by name, email or phone..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9 h-10 border-slate-200"
                />
              </div>

              <div className="flex items-center gap-2">
                {/* Filter badges */}
                <div className="flex flex-wrap gap-2 mr-2">
                  {selectedTeam !== "All Teams" && (
                    <Badge
                      variant="secondary"
                      className="flex items-center gap-1 bg-slate-100 hover:bg-slate-200 transition-colors"
                    >
                      {selectedTeam}
                      <X
                        className="h-3 w-3 cursor-pointer ml-1"
                        onClick={() => setSelectedTeam("All Teams")}
                      />
                    </Badge>
                  )}

                  {selectedClient !== "All Clients" && (
                    <Badge
                      variant="secondary"
                      className="flex items-center gap-1 bg-slate-100 hover:bg-slate-200 transition-colors"
                    >
                      {selectedClient}
                      <X
                        className="h-3 w-3 cursor-pointer ml-1"
                        onClick={() => setSelectedClient("All Clients")}
                      />
                    </Badge>
                  )}

                  {selectedStatus !== "All Statuses" && (
                    <Badge
                      variant="secondary"
                      className="flex items-center gap-1 bg-slate-100 hover:bg-slate-200 transition-colors"
                    >
                      {selectedStatus}
                      <X
                        className="h-3 w-3 cursor-pointer ml-1"
                        onClick={() => setSelectedStatus("All Statuses")}
                      />
                    </Badge>
                  )}
                </div>

                {/* Filter button */}
                <Sheet open={filterOpen} onOpenChange={setFilterOpen}>
                  <SheetTrigger asChild>
                    <Button
                      variant="outline"
                      size="sm"
                      className={`h-10 ${
                        hasFilters ? "border-slate-400 bg-slate-50" : ""
                      }`}
                    >
                      <SlidersHorizontal className="mr-2 h-4 w-4" />
                      {hasFilters ? "Filters Applied" : "Filters"}
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="right" className="w-[320px] sm:w-[400px]">
                    <SheetHeader>
                      <SheetTitle>Filter Receptionists</SheetTitle>
                    </SheetHeader>
                    <div className="py-6 space-y-6">
                      <div className="space-y-3">
                        <Label
                          htmlFor="filter-team"
                          className="text-sm font-medium"
                        >
                          Team
                        </Label>
                        <Select
                          value={selectedTeam}
                          onValueChange={setSelectedTeam}
                        >
                          <SelectTrigger id="filter-team">
                            <SelectValue placeholder="Select team" />
                          </SelectTrigger>
                          <SelectContent>
                            {teams.map((team) => (
                              <SelectItem key={team} value={team}>
                                {team}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-3">
                        <Label
                          htmlFor="filter-client"
                          className="text-sm font-medium"
                        >
                          Client
                        </Label>
                        <Select
                          value={selectedClient}
                          onValueChange={setSelectedClient}
                        >
                          <SelectTrigger id="filter-client">
                            <SelectValue placeholder="Select client" />
                          </SelectTrigger>
                          <SelectContent>
                            {clients.map((client) => (
                              <SelectItem key={client} value={client}>
                                {client}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-3">
                        <Label
                          htmlFor="filter-status"
                          className="text-sm font-medium"
                        >
                          Status
                        </Label>
                        <Select
                          value={selectedStatus}
                          onValueChange={setSelectedStatus}
                        >
                          <SelectTrigger id="filter-status">
                            <SelectValue placeholder="Select status" />
                          </SelectTrigger>
                          <SelectContent>
                            {statuses.map((status) => (
                              <SelectItem key={status} value={status}>
                                {status}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="flex justify-between pt-4">
                        <Button
                          variant="outline"
                          onClick={handleClearFilters}
                          disabled={!hasFilters}
                        >
                          Clear All
                        </Button>
                        <Button onClick={() => setFilterOpen(false)}>
                          Apply Filters
                        </Button>
                      </div>
                    </div>
                  </SheetContent>
                </Sheet>
              </div>
            </div>

            {/* Receptionist Table */}
            <div className="rounded-md border border-slate-200 shadow-sm overflow-hidden">
              <Table>
                <TableHeader className="bg-slate-50">
                  <TableRow>
                    <TableHead className="w-12">
                      <Checkbox
                        checked={
                          filteredReceptionists.length > 0 &&
                          selectedReceptionists.length ===
                            filteredReceptionists.length
                        }
                        onCheckedChange={handleSelectAll}
                      />
                    </TableHead>
                    <TableHead className="font-medium">Name</TableHead>
                    <TableHead className="font-medium">Email</TableHead>
                    <TableHead className="font-medium">Phone</TableHead>
                    <TableHead className="font-medium">Team</TableHead>
                    <TableHead className="font-medium">Client</TableHead>
                    <TableHead className="font-medium">Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredReceptionists.length > 0 ? (
                    filteredReceptionists.map((receptionist) => (
                      <TableRow
                        key={receptionist.id}
                        className="hover:bg-slate-50"
                      >
                        <TableCell>
                          <Checkbox
                            checked={selectedReceptionists.includes(
                              receptionist.id
                            )}
                            onCheckedChange={(checked) =>
                              handleSelectReceptionist(
                                receptionist.id,
                                checked === true
                              )
                            }
                          />
                        </TableCell>
                        <TableCell className="font-medium">
                          {receptionist.name}
                        </TableCell>
                        <TableCell>{receptionist.email}</TableCell>
                        <TableCell>{receptionist.phone}</TableCell>
                        <TableCell>
                          <Badge variant="outline" className="bg-slate-50">
                            {receptionist.team}
                          </Badge>
                        </TableCell>
                        <TableCell>{receptionist.client}</TableCell>
                        <TableCell>
                          <Badge
                            variant="outline"
                            className={`${
                              receptionist.status === "Active"
                                ? "bg-green-50 text-green-700 border-green-200"
                                : "bg-slate-50 text-slate-700 border-slate-200"
                            }`}
                          >
                            {receptionist.status}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={7} className="h-24 text-center">
                        <div className="flex flex-col items-center justify-center text-slate-500">
                          <p>No receptionists found matching your criteria.</p>
                          {searchQuery && (
                            <Button
                              variant="link"
                              onClick={() => setSearchQuery("")}
                              className="mt-2"
                            >
                              Clear search
                            </Button>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </div>
        </CardContent>
        <div className="flex flex-col sm:flex-row items-center justify-between text-sm text-slate-500 p-4 border-t">
          <div>
            Showing {filteredReceptionists.length} of {receptionists.length}
            receptionists
          </div>
        </div>
      </Card>
    </div>
  );
}
