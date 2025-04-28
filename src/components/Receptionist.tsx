import type React from "react";
import { useState } from "react";
import {
  Download,
  FileSpreadsheet,
  Filter,
  Plus,
  Search,
  X,
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import ExternalClient from "./Form/ExternalClient";
import AutoDealersForm from "./Form/AutoDealers";
import ChannelPartnerForm from "./Form/ChannelPartner";
import InternalEmployees from "./Form/InternalEmployees";
import { ScrollArea } from "./ui/scroll-area";

// Sample data for demonstration
const sampleReceptionists = [
  {
    id: 1,
    name: "Jane Smith",
    email: "jane.smith@example.com",
    phone: "555-1234",
    team: "Front Desk",
    client: "ABC Corp",
  },
  {
    id: 2,
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "555-5678",
    team: "Customer Service",
    client: "XYZ Inc",
  },
  {
    id: 3,
    name: "Alice Johnson",
    email: "alice.j@example.com",
    phone: "555-9012",
    team: "Front Desk",
    client: "123 Industries",
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

export default function ReceptionistManager({ forWho }: { forWho: string }) {
  const [receptionists, setReceptionists] = useState(sampleReceptionists);
  const [selectedTeam, setSelectedTeam] = useState("All Teams");
  const [selectedClient, setSelectedClient] = useState("All Clients");
  const [searchQuery, setSearchQuery] = useState("");
  const [bulkData, setBulkData] = useState<any[]>([]);
  const [showBulkPreview, setShowBulkPreview] = useState(false);
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [selectedReceptionists, setSelectedReceptionists] = useState<number[]>(
    []
  );

  const filteredReceptionists = receptionists.filter((receptionist) => {
    const matchesTeam =
      selectedTeam === "All Teams" || receptionist.team === selectedTeam;
    const matchesClient =
      selectedClient === "All Clients" ||
      receptionist.client === selectedClient;
    const matchesSearch =
      receptionist.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      receptionist.email.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesTeam && matchesClient && matchesSearch;
  });

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
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
        },
        {
          name: "Sarah Lee",
          email: "sarah.lee@example.com",
          phone: "555-7890",
          team: "Administrative",
          client: "ABC Corp",
        },
        {
          name: "Robert Brown",
          email: "robert.b@example.com",
          phone: "555-2345",
          team: "Front Desk",
          client: "XYZ Inc",
        },
      ];

      setBulkData(mockParsedData);
      setShowBulkPreview(true);
    }
  };

  // const handleIndividualSubmit = (e: React.FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();
  //   const formData = new FormData(e.currentTarget);

  //   const newReceptionist = {
  //     id: receptionists.length + 1,
  //     name: formData.get("name") as string,
  //     email: formData.get("email") as string,
  //     phone: formData.get("phone") as string,
  //     team: formData.get("team") as string,
  //     client: formData.get("client") as string,
  //   };

  //   setReceptionists([...receptionists, newReceptionist]);
  //   setAddDialogOpen(false);
  // };

  const handleBulkAdd = () => {
    const newReceptionists = bulkData.map((item, index) => ({
      id: receptionists.length + index + 1,
      ...item,
    }));

    setReceptionists([...receptionists, ...newReceptionists]);
    setBulkData([]);
    setShowBulkPreview(false);
    setAddDialogOpen(false);
  };

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      const allVisibleIds = filteredReceptionists.map(
        (receptionist) => receptionist.id
      );
      setSelectedReceptionists(allVisibleIds);
    } else {
      setSelectedReceptionists([]);
    }
  };

  const handleSelectReceptionist = (id: number, checked: boolean) => {
    if (checked) {
      setSelectedReceptionists([...selectedReceptionists, id]);
    } else {
      setSelectedReceptionists(
        selectedReceptionists.filter((recId) => recId !== id)
      );
    }
  };

  const handleDownloadTemplate = () => {
    const headers = ["Name", "Email", "Phone", "Team", "Client"];
    const csvContent = [
      headers.join(","),
      "John Doe,john.doe@example.com,555-1234,Front Desk,ABC Corp",
      "Jane Smith,jane.smith@example.com,555-5678,Customer Service,XYZ Inc",
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
  };

  return (
    <div className="container mx-auto py-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Receptionists</CardTitle>
          <Dialog open={addDialogOpen} onOpenChange={setAddDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Add Receptionist
              </Button>
            </DialogTrigger>
            <DialogContent className="md:max-w-[1000px]">
              <DialogHeader>
                <DialogTitle>Add Receptionist</DialogTitle>
              </DialogHeader>

              <ScrollArea className="h-125">
                <Tabs defaultValue="individual">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="individual">Individual</TabsTrigger>
                    <TabsTrigger value="bulk">Bulk Upload</TabsTrigger>
                  </TabsList>
                  <TabsContent value="individual">
                    {forWho === "internal_team" && (
                      <InternalEmployees
                        onSubmit={() => console.log("external")}
                      />
                    )}
                    {forWho === "external_client" && (
                      <ExternalClient
                        onSubmit={() => console.log("external")}
                      />
                    )}
                    {forWho === "channel_partners" && (
                      <ChannelPartnerForm
                        onSubmit={() => console.log("external")}
                      />
                    )}
                    {forWho === "others" && (
                      <AutoDealersForm
                        onSubmit={() => console.log("external")}
                      />
                    )}
                  </TabsContent>
                  <TabsContent value="bulk">
                    <div className="space-y-4 py-4">
                      {!showBulkPreview ? (
                        <div className="flex flex-col items-center justify-center space-y-4 rounded-md border border-dashed p-10">
                          <FileSpreadsheet className="h-10 w-10 text-muted-foreground" />
                          <div className="space-y-2 text-center">
                            <h3 className="text-lg font-semibold">
                              Upload Excel File
                            </h3>
                            <p className="text-sm text-muted-foreground">
                              Upload an Excel file with receptionist details
                            </p>
                          </div>
                          <div className="flex flex-col space-y-2">
                            <Label htmlFor="file-upload" className="sr-only">
                              Choose file
                            </Label>
                            <Input
                              id="file-upload"
                              type="file"
                              accept=".xlsx,.xls"
                              onChange={handleFileUpload}
                              className="cursor-pointer"
                            />
                            <Button
                              variant="outline"
                              size="sm"
                              className="mt-2"
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
                            <h3 className="text-lg font-semibold">
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
                          <div className="rounded-md border">
                            <Table>
                              <TableHeader>
                                <TableRow>
                                  <TableHead>Name</TableHead>
                                  <TableHead>Email</TableHead>
                                  <TableHead>Phone</TableHead>
                                  <TableHead>Team</TableHead>
                                  <TableHead>Client</TableHead>
                                </TableRow>
                              </TableHeader>
                              <TableBody>
                                {bulkData.map((item, index) => (
                                  <TableRow key={index} className="w-full">
                                    <TableCell>{item.name}</TableCell>
                                    <TableCell>{item.email}</TableCell>
                                    <TableCell>{item.phone}</TableCell>
                                    <TableCell>{item.team}</TableCell>
                                    <TableCell>{item.client}</TableCell>
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
                </Tabs>
              </ScrollArea>
            </DialogContent>
          </Dialog>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div className="flex flex-1 items-center space-x-2">
                <Search className="h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search receptionists..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="max-w-sm"
                />
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm">
                      <Filter className="mr-2 h-4 w-4" />
                      Filter
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-[200px]">
                    <div className="p-2">
                      <div className="space-y-2">
                        <Label htmlFor="filter-team">Team</Label>
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
                      <div className="mt-4 space-y-2">
                        <Label htmlFor="filter-client">Client</Label>
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
                    </div>
                  </DropdownMenuContent>
                </DropdownMenu>

                {selectedTeam !== "All Teams" && (
                  <Badge
                    variant="secondary"
                    className="flex items-center gap-1"
                  >
                    {selectedTeam}
                    <X
                      className="h-3 w-3 cursor-pointer"
                      onClick={() => setSelectedTeam("All Teams")}
                    />
                  </Badge>
                )}

                {selectedClient !== "All Clients" && (
                  <Badge
                    variant="secondary"
                    className="flex items-center gap-1"
                  >
                    {selectedClient}
                    <X
                      className="h-3 w-3 cursor-pointer"
                      onClick={() => setSelectedClient("All Clients")}
                    />
                  </Badge>
                )}
              </div>
            </div>

            <div className="rounded-md border">
              <Table>
                <TableHeader>
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
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Phone</TableHead>
                    <TableHead>Team</TableHead>
                    <TableHead>Client</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredReceptionists.length > 0 ? (
                    filteredReceptionists.map((receptionist) => (
                      <TableRow key={receptionist.id}>
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
                        <TableCell>{receptionist.name}</TableCell>
                        <TableCell>{receptionist.email}</TableCell>
                        <TableCell>{receptionist.phone}</TableCell>
                        <TableCell>{receptionist.team}</TableCell>
                        <TableCell>{receptionist.client}</TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={6} className="h-24 text-center">
                        No receptionists found.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
