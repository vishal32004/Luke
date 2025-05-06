import { useState, useMemo } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
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

// Helper function to get filter options based on forWho
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

interface ImportListProps {
  forWho: string;
  onImport: (selectedItems: any[]) => void;
  onCancel: () => void;
}

export function ImportList({ forWho, onImport, onCancel }: ImportListProps) {
  const [importSearchQuery, setImportSearchQuery] = useState("");
  const [selectedImportIds, setSelectedImportIds] = useState<number[]>([]);
  const [primaryFilterValue, setPrimaryFilterValue] = useState("all");
  const [secondaryFilterValue, setSecondaryFilterValue] = useState("all");
  const [importList] = useState(sampleImportList);

  // Get filter options based on forWho
  const filterOptions = getFilterOptions(forWho);

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

  const handleImport = () => {
    const selectedItems = importList.filter((item) =>
      selectedImportIds.includes(item.id)
    );
    onImport(selectedItems);
  };

  return (
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
              onChange={(e) => setImportSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-slate-50 p-4 rounded-lg">
          <div className="space-y-2">
            <Label htmlFor="primary-filter" className="text-sm font-medium">
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
                {filterOptions.primaryFilter.options.slice(1).map((option) => (
                  <SelectItem key={option} value={option}>
                    {option}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="secondary-filter" className="text-sm font-medium">
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
              <span>{selectedImportIds.length} people selected</span>
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
                    selectedImportIds.length === filteredImportList.length &&
                    filteredImportList.length > 0
                  }
                  onCheckedChange={(checked) => {
                    if (checked) {
                      setSelectedImportIds(
                        filteredImportList.map((item) => item.id)
                      );
                    } else {
                      setSelectedImportIds([]);
                    }
                  }}
                />
              </TableHead>
              <TableHead className="font-medium">Name</TableHead>
              <TableHead className="font-medium">Email</TableHead>
              <TableHead className="font-medium">Phone</TableHead>
              {forWho === "internal_team" && (
                <TableHead className="font-medium">Department</TableHead>
              )}
              {forWho === "external_client" && (
                <TableHead className="font-medium">Company</TableHead>
              )}
              {forWho === "channel_partners" && (
                <TableHead className="font-medium">Partner</TableHead>
              )}
              {forWho === "others" && (
                <TableHead className="font-medium">Status</TableHead>
              )}
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredImportList.length > 0 ? (
              filteredImportList.map((item) => (
                <TableRow key={item.id} className="hover:bg-slate-50">
                  <TableCell>
                    <Checkbox
                      checked={selectedImportIds.includes(item.id)}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          setSelectedImportIds([...selectedImportIds, item.id]);
                        } else {
                          setSelectedImportIds(
                            selectedImportIds.filter((id) => id !== item.id)
                          );
                        }
                      }}
                    />
                  </TableCell>
                  <TableCell className="font-medium">{item.name}</TableCell>
                  <TableCell>{item.email}</TableCell>
                  <TableCell>{item.phone}</TableCell>
                  {forWho === "internal_team" && (
                    <TableCell>{item.department || "-"}</TableCell>
                  )}
                  {forWho === "external_client" && (
                    <TableCell>{item.companyName || "-"}</TableCell>
                  )}
                  {forWho === "channel_partners" && (
                    <TableCell>{item.channelPartnerName || "-"}</TableCell>
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
        <Button type="button" variant="outline" onClick={onCancel}>
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
  );
}
