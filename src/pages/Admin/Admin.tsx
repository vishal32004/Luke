import { DataTable } from "@/components/Table/data-table";
import { getColumns } from "@/components/Table/getColumn";
type Admin = {
  id: string;
  name: string;
  email: string;
  status: "Active" | "Inactive";
};

const admin: Admin[] = [
  {
    id: "admin001",
    name: "Alice Johnson",
    email: "alice.johnson@example.com",
    status: "Active",
  },
  {
    id: "admin002",
    name: "Bob Smith",
    email: "bob.smith@example.com",
    status: "Inactive",
  },
  {
    id: "admin003",
    name: "Charlie Davis",
    email: "charlie.davis@example.com",
    status: "Active",
  },
  {
    id: "admin004",
    name: "Dana Lee",
    email: "dana.lee@example.com",
    status: "Inactive",
  },
  {
    id: "admin005",
    name: "Evan Williams",
    email: "evan.williams@example.com",
    status: "Active",
  },
];

const columns = getColumns<Admin>(
  [
    {
      accessorKey: "name",
      header: "Name",
    },
    {
      accessorKey: "email",
      header: "Email",
    },
    {
      accessorKey: "status",
      header: "Status",
    },
  ],
  (row) => {
    console.log("Selected admin: ", row);
  }
);

const Admin = () => {
  return (
    <div className="flex flex-col py-4 px-5">
      <h1 className="mb-5 text-3xl">All Admins</h1>
      <DataTable columns={columns} data={admin} />
    </div>
  );
};

export default Admin;
