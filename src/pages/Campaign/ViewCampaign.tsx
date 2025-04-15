import { DataTable } from "@/components/Table/data-table";
import { getColumns, Action } from "@/components/Table/getColumn";

type Campaign = {
  id: string;
  name: string;
  status: "Active" | "Inactive" | "Finished";
  startDate: string;
  endDate: string;
};

// Sample campaign data
const campaignData: Campaign[] = [
  {
    id: "cmp001",
    name: "Spring Launch",
    status: "Active",
    startDate: "2025-04-01",
    endDate: "2025-06-30",
  },
  {
    id: "cmp002",
    name: "Summer Sale",
    status: "Inactive",
    startDate: "2025-07-01",
    endDate: "2025-08-31",
  },
  {
    id: "cmp003",
    name: "Black Friday Blitz",
    status: "Finished",
    startDate: "2024-11-01",
    endDate: "2024-11-30",
  },
];

// Action handlers
const handleEdit = (row: Campaign) => {
  console.log("Editing campaign:", row);
};

const handleDuplicate = (row: Campaign) => {
  console.log("Duplicating campaign:", row);
};

const handleDelete = (row: Campaign) => {
  console.log("Deleting campaign:", row);
};

// Actions list
const campaignActions: Action<Campaign>[] = [
  {
    label: "Edit",
    onClick: handleEdit,
  },
  {
    label: "Duplicate",
    onClick: handleDuplicate,
  },
  {
    label: "Delete",
    onClick: handleDelete,
  },
];

// Define columns for the campaign table
const columns = getColumns<Campaign>(
  [
    { accessorKey: "name", header: "Campaign Name" },
    { accessorKey: "status", header: "Status" },
    { accessorKey: "startDate", header: "Start Date" },
    { accessorKey: "endDate", header: "End Date" },
  ],
  campaignActions
);

const Campaigns = () => {
  return (
    <div className="flex flex-col py-4 px-5">
      <h1 className="mb-5 text-3xl">All Campaigns</h1>
      <DataTable columns={columns} data={campaignData} />
    </div>
  );
};

export default Campaigns;
