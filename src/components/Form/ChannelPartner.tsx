import { Button } from "@/components/ui/button";
import { SelectItem } from "@/components/ui/select";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import CustomFormField from "./CustomFormField";
import { FormFieldType } from "@/types/form";
import { Form } from "../ui/form";

const channelPartnerSchema = z.object({
  channelPartnerName: z.string().min(1, "Channel Partner name is required"),
  clientName: z.string().min(1, "Client name is required"),
  email: z.string().email("Invalid email address"),
  mobileNumber: z.string().min(1, "Mobile number is required"),
  additionalDetails: z.string().optional(),
  industry: z.string().min(1, "Industry is required"),
  jobSeniorities: z.string().min(1, "Job seniorities is required"),
  jobTitle: z.string().min(1, "Job title is required"),
  hqLocation: z.string().min(1, "HQ location is required"),
  relationIntensity: z.enum(["High", "Neutral", "Low"]),
  status: z.enum(["Onboarded", "To be Onboarded"]),
  segment: z.enum(["Top N", "NextN", "Coverage"]),
  dateOfOnboarding: z.date(),
  milestone: z.string().optional(),
  milestoneDate: z.date().optional(),
  birthDate: z.date().optional(),
  anniversaryDate: z.date().optional(),
});

type ChannelPartnerFormValues = z.infer<typeof channelPartnerSchema>;

interface ChannelPartnerFormProps {
  onSubmit: (values: ChannelPartnerFormValues) => void;
  defaultValues?: Partial<ChannelPartnerFormValues>;
}

const ChannelPartnerForm = ({
  onSubmit,
  defaultValues,
}: ChannelPartnerFormProps) => {
  const form = useForm<ChannelPartnerFormValues>({
    resolver: zodResolver(channelPartnerSchema),
    defaultValues: {
      channelPartnerName: "",
      clientName: "",
      email: "",
      mobileNumber: "",
      additionalDetails: "",
      industry: "",
      jobSeniorities: "",
      jobTitle: "",
      hqLocation: "",
      relationIntensity: "Neutral",
      status: "To be Onboarded",
      segment: "Coverage",
      ...defaultValues,
    },
  });

  const handleSubmit = (values: ChannelPartnerFormValues) => {
    onSubmit(values);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Channel Partner Information */}
          <CustomFormField
            control={form.control}
            name="channelPartnerName"
            fieldType={FormFieldType.INPUT}
            label="Channel Partner Name"
            placeholder="Enter Channel Partner Name"
          />

          <CustomFormField
            control={form.control}
            name="clientName"
            fieldType={FormFieldType.INPUT}
            label="Client Name"
            placeholder="Enter Client Name"
          />

          <CustomFormField
            control={form.control}
            name="email"
            fieldType={FormFieldType.INPUT}
            label="Email ID"
            placeholder="Enter Email ID"
          />

          <CustomFormField
            control={form.control}
            name="mobileNumber"
            fieldType={FormFieldType.INPUT}
            label="Mobile Number"
            placeholder="Enter Mobile Number"
          />

          {/* Industry and Job Details */}
          <CustomFormField
            control={form.control}
            name="industry"
            fieldType={FormFieldType.SELECT}
            label="Industry"
            placeholder="Select Industry"
          >
            <SelectItem value="Technology">Technology</SelectItem>
            <SelectItem value="Manufacturing">Manufacturing</SelectItem>
            <SelectItem value="Healthcare">Healthcare</SelectItem>
            <SelectItem value="Financial Services">
              Financial Services
            </SelectItem>
            <SelectItem value="Retail">Retail</SelectItem>
          </CustomFormField>

          <CustomFormField
            control={form.control}
            name="jobSeniorities"
            fieldType={FormFieldType.SELECT}
            label="Job Seniorities"
            placeholder="Select Job Seniorities"
          >
            <SelectItem value="Executive">Executive</SelectItem>
            <SelectItem value="Senior Management">Senior Management</SelectItem>
            <SelectItem value="Middle Management">Middle Management</SelectItem>
            <SelectItem value="Junior">Junior</SelectItem>
          </CustomFormField>

          <CustomFormField
            control={form.control}
            name="jobTitle"
            fieldType={FormFieldType.INPUT}
            label="Job Title"
            placeholder="Enter Job Title"
          />

          <CustomFormField
            control={form.control}
            name="hqLocation"
            fieldType={FormFieldType.INPUT}
            label="HQ Location"
            placeholder="Enter HQ Location"
          />

          {/* Relationship Details */}
          <CustomFormField
            control={form.control}
            name="relationIntensity"
            fieldType={FormFieldType.SELECT}
            label="Relation Intensity"
            placeholder="Select Relation Intensity"
          >
            <SelectItem value="High">High</SelectItem>
            <SelectItem value="Neutral">Neutral</SelectItem>
            <SelectItem value="Low">Low</SelectItem>
          </CustomFormField>

          <CustomFormField
            control={form.control}
            name="status"
            fieldType={FormFieldType.SELECT}
            label="Status"
            placeholder="Select Status"
          >
            <SelectItem value="Onboarded">Onboarded</SelectItem>
            <SelectItem value="To be Onboarded">To be Onboarded</SelectItem>
          </CustomFormField>

          <CustomFormField
            control={form.control}
            name="segment"
            fieldType={FormFieldType.SELECT}
            label="Segment"
            placeholder="Select Segment"
          >
            <SelectItem value="Top N">Top N</SelectItem>
            <SelectItem value="NextN">NextN</SelectItem>
            <SelectItem value="Coverage">Coverage</SelectItem>
          </CustomFormField>

          {/* Date Fields */}
          <CustomFormField
            control={form.control}
            name="dateOfOnboarding"
            fieldType={FormFieldType.DATE_PICKER}
            label="Date of Onboarding"
          />

          <CustomFormField
            control={form.control}
            name="milestone"
            fieldType={FormFieldType.INPUT}
            label="Specific Milestone (Optional)"
            placeholder="Enter Milestone"
          />

          <CustomFormField
            control={form.control}
            name="milestoneDate"
            fieldType={FormFieldType.DATE_PICKER}
            label="Milestone Date (Optional)"
          />

          <CustomFormField
            control={form.control}
            name="birthDate"
            fieldType={FormFieldType.DATE_PICKER}
            label="Birth Date (Optional)"
          />

          <CustomFormField
            control={form.control}
            name="anniversaryDate"
            fieldType={FormFieldType.DATE_PICKER}
            label="Anniversary Date (Optional)"
          />
        </div>

        {/* Additional Details */}
        <CustomFormField
          control={form.control}
          name="additionalDetails"
          fieldType={FormFieldType.TEXTAREA}
          label="Other Additional Details (Optional)"
          placeholder="Enter any additional details"
          classNames="col-span-2"
        />

        {/* Form Actions */}
        <div className="flex justify-end gap-4 pt-4">
          <Button type="submit">
            {form.watch("status") === "Onboarded"
              ? "Update Partner"
              : "Onboard Partner"}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default ChannelPartnerForm;
