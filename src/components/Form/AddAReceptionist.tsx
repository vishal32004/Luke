import { receptionistFormSchema } from "@/schema/forms";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form } from "@/components/ui/form";
import CustomFormField from "./CustomFormField";
import { FormFieldType } from "@/types/form";
import { SelectItem } from "../ui/select";
import { Button } from "../ui/button";

interface AddAReceptionistProps {
  teams: string[];
  clients: string[];
}

const AddAReceptionist = ({ teams, clients }: AddAReceptionistProps) => {
  const form = useForm<z.infer<typeof receptionistFormSchema>>({
    resolver: zodResolver(receptionistFormSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      team: "Front Desk",
      client: "ABC Corp",
    },
  });

  function onSubmit(values: z.infer<typeof receptionistFormSchema>) {
    console.log(values);
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 py-4">
        <CustomFormField
          control={form.control}
          name="name"
          fieldType={FormFieldType.INPUT}
          label="Name"
          placeholder="Name"
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
          name="phone"
          fieldType={FormFieldType.INPUT}
          label="Phone Number"
          placeholder="Enter Phone Number"
        />
        <CustomFormField
          control={form.control}
          fieldType={FormFieldType.SELECT}
          name="team"
          label="Select Team"
          placeholder="Select a Team"
        >
          {teams.map((team, i) => (
            <SelectItem key={team + i} value={team}>
              {team}
            </SelectItem>
          ))}
        </CustomFormField>

        <CustomFormField
          control={form.control}
          fieldType={FormFieldType.SELECT}
          name="client"
          label="Select Client"
          placeholder="Select a Client"
        >
          {clients.map((client, i) => (
            <SelectItem key={client + i} value={client}>
              {client}
            </SelectItem>
          ))}
        </CustomFormField>

        <Button>Submit</Button>
      </form>
    </Form>
  );
};

export default AddAReceptionist;
