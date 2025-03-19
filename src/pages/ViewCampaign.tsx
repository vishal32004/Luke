// import { campaign } from "@/components/columns";
import { DataTable } from "@/components/data-table";
import { getColumns } from "@/components/getColumn";

export type Campaign = {
  id: string;
  campaignName: string;
  event: string;
  startDate: string;
  status: "Active" | "Finished";
};

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

const data: Campaign[] = [
  {
    id: "1",
    campaignName: "Holiday Gift Campaign 2023",
    event: "Birthday",
    startDate: "12 March, 2025",
    status: "Active",
  },
];
const ViewCampaign = () => {
  return (
    <div>
      <div className="flex flex-col py-4 px-5">
        <h1 className="mb-5 text-3xl">All Campaigns</h1>
        <DataTable columns={columns} data={data} />
      </div>
    </div>
  );
};

export default ViewCampaign;
