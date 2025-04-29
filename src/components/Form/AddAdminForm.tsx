import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

import { SelectItem } from "@/components/ui/select";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { adminFormSchema } from "@/schema/forms";
import { z } from "zod";
import CustomFormField from "./CustomFormField";
import { FormFieldType } from "@/types/form";
import { Form } from "../ui/form";

type AdminFormValues = z.infer<typeof adminFormSchema>;

interface AddAdminFormProps {
  isOpen: boolean;
  onClose: () => void;
}

const AddAdminForm = ({ isOpen, onClose }: AddAdminFormProps) => {
  const form = useForm<AdminFormValues>({
    resolver: zodResolver(adminFormSchema),
    defaultValues: {
      name: "",
      email: "",
      department: "",
      status: "Active",
      password: "",
      giveAccessTo: "",
      confirmPassword: "",
    },
  });

  const handleSubmit = (values: AdminFormValues) => {
    console.log(values);
    form.reset();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New Admin</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-4"
          >
            <CustomFormField
              control={form.control}
              name="name"
              fieldType={FormFieldType.INPUT}
              label="Name"
              placeholder="Enter Name"
            />

            <CustomFormField
              control={form.control}
              name="email"
              fieldType={FormFieldType.INPUT}
              label="Email"
              placeholder="Enter Email"
            />

            <CustomFormField
              control={form.control}
              fieldType={FormFieldType.SELECT}
              name="department"
              label="Select Department"
              placeholder="Select a Department"
            >
              <SelectItem value={"sales"}>Sales</SelectItem>
              <SelectItem value={"Marketing"}>Marketing</SelectItem>
              <SelectItem value={"it"}>IT</SelectItem>
            </CustomFormField>
            <CustomFormField
              control={form.control}
              fieldType={FormFieldType.SELECT}
              name="giveAccessTo"
              label="Give Access To"
              placeholder="Give Access To"
            >
              <SelectItem value={"Internal Employees"}>
                Internal Employees
              </SelectItem>
              <SelectItem value={"External Clients"}>
                External Clients
              </SelectItem>
              <SelectItem value={"Channel Partner"}>Channel Partner</SelectItem>
              <SelectItem value={"Dealers & Distributors"}>
                Dealers & Distributors
              </SelectItem>
            </CustomFormField>
            <CustomFormField
              control={form.control}
              name="password"
              fieldType={FormFieldType.INPUT}
              inputType="password"
              label="Password"
              placeholder="Enter Password"
            />

            <CustomFormField
              control={form.control}
              name="confirmPassword"
              fieldType={FormFieldType.INPUT}
              inputType="password"
              label="Confirm Password"
              placeholder="Enter Confirm Password"
            />

            <CustomFormField
              control={form.control}
              fieldType={FormFieldType.SELECT}
              name="status"
              label="Select Status"
              placeholder="Status"
            >
              <SelectItem value={"active"}>Active</SelectItem>
              <SelectItem value={"inactive"}>Inactive</SelectItem>
            </CustomFormField>

            <DialogFooter className="pt-4">
              <Button type="button" variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button type="submit">Add Admin</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default AddAdminForm;
