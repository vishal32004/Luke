import { useState, useMemo } from "react";
import { DataTable } from "@/components/Table/data-table";
import { getColumns } from "@/components/Table/getColumn";
import { Button } from "@/components/ui/button";

export type Campaign = {
  id: string;
  campaignName: string;
  event: string;
  startDate: string;
  status: "Active" | "Finished";
};

const campaigns: Campaign[] = [
  {
    id: "1",
    campaignName: "Summer Sale",
    event: "Launch Event",
    startDate: "2025-05-01",
    status: "Active",
  },
  {
    id: "2",
    campaignName: "Winter Giveaway",
    event: "Holiday Special",
    startDate: "2025-01-15",
    status: "Finished",
  },
  {
    id: "3",
    campaignName: "Spring Sale",
    event: "Online Event",
    startDate: "2025-03-20",
    status: "Active",
  },
];

export default function CampaignTable() {
  const [filter, setFilter] = useState<"all" | "active" | "finished" | "top">(
    "all"
  );

  const filteredData = useMemo(() => {
    if (filter === "active") {
      return campaigns.filter((c) => c.status === "Active");
    }
    if (filter === "finished") {
      return campaigns.filter((c) => c.status === "Finished");
    }
    if (filter === "top") {
      return [...campaigns].sort(
        (a, b) =>
          new Date(b.startDate).getTime() - new Date(a.startDate).getTime()
      );
    }
    return campaigns;
  }, [filter]);

  const columns = getColumns<Campaign>(
    [
      {
        accessorKey: "campaignName",
        header: "Campaign Name",
      },
      {
        accessorKey: "event",
        header: "Event",
      },
      {
        accessorKey: "startDate",
        header: "Event Date",
      },
      {
        accessorKey: "status",
        header: "Status",
      },
    ],
    (row) => {
      console.log("Selected campaign: ", row);
    }
  );

  return (
    <section className="my-5 px-6">
      <div className="flex space-x-2 mb-4">
        <Button
          variant={filter === "all" ? "default" : "outline"}
          onClick={() => setFilter("all")}
        >
          All
        </Button>
        <Button
          variant={filter === "active" ? "default" : "outline"}
          onClick={() => setFilter("active")}
        >
          Active
        </Button>
        <Button
          variant={filter === "finished" ? "default" : "outline"}
          onClick={() => setFilter("finished")}
        >
          Finished
        </Button>
        <Button
          variant={filter === "top" ? "default" : "outline"}
          onClick={() => setFilter("top")}
        >
          Top Campaign
        </Button>
      </div>
      <DataTable columns={columns} data={filteredData} />
    </section>
  );
}
