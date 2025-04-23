import { useState } from "react";
import { DataTable } from "@/components/Table/data-table";
import { getColumns, type Action } from "@/components/Table/getColumn";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import AddAdminForm from "@/components/Form/AddAdminForm";

type Admin = {
  id: string;
  name: string;
  email: string;
  status: "Active" | "Inactive";
};

const adminData: Admin[] = [
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

const AdminPage = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  // const [admins, setAdmins] = useState<Admin[]>(adminData);

  const adminActions: Action<Admin>[] = [
    {
      label: "Edit",
      onClick: (row) => console.log("Edit admin:", row),
    },
    {
      label: "Deactivate",
      onClick: (row) => console.log("Deactivate admin:", row),
    },
  ];

  const columns = getColumns<Admin>(
    [
      { accessorKey: "name", header: "Name" },
      { accessorKey: "email", header: "Email" },
      { accessorKey: "status", header: "Status" },
    ],
    adminActions
  );

  return (
    <div className="flex flex-col py-4 px-5">
      <div className="flex justify-between items-center mb-5">
        <h1 className="text-3xl">All Admins</h1>
        <Button onClick={() => setIsFormOpen(true)}>
          <PlusCircle className="mr-2 h-4 w-4" />
          Add Admin
        </Button>
      </div>

      <DataTable columns={columns} data={adminData} />

      <AddAdminForm isOpen={isFormOpen} onClose={() => setIsFormOpen(false)} />
    </div>
  );
};

export default AdminPage;
