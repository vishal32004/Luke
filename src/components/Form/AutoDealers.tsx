import { Button } from "@/components/ui/button";
import { SelectItem } from "@/components/ui/select";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import CustomFormField from "./CustomFormField";
import { FormFieldType } from "@/types/form";
import { Form } from "../ui/form";

const customerFormSchema = z.object({
  customerName: z.string().min(1, "Customer name is required"),
  email: z.string().email("Invalid email address"),
  mobileNumber: z.string().min(1, "Mobile number is required"),
  additionalDetails: z.string().optional(),
  companyName: z.string().min(1, "Company name is required"),
  industry: z.string().min(1, "Industry is required"),
  jobSeniorities: z.string().min(1, "Job seniorities is required"),
  jobTitle: z.string().min(1, "Job title is required"),
  city: z.string().min(1, "City is required"),
  state: z.string().min(1, "State is required"),
  birthDate: z.date().optional(),
  anniversaryDate: z.date().optional(),
  relationIntensity: z.enum(["High", "Neutral", "Low"]),
  status: z.enum(["Customer", "Prospect"]),
  segment: z.enum(["Top N", "NextN", "Coverage"]),
  storeVisit: z.enum(["Done", "Pending"]),
  testDrive: z.enum(["Done", "Pending"]),
  purchase: z.enum(["Done", "Pending"]),
  dateOfPurchase: z.date().optional(),
  serviceDueDate: z.date().optional(),
  insuranceDueDate: z.date().optional(),
});

type CustomerFormValues = z.infer<typeof customerFormSchema>;

interface CustomerFormProps {
  onSubmit: (values: CustomerFormValues) => void;
  defaultValues?: Partial<CustomerFormValues>;
}

const AutoDealersForm = ({ onSubmit, defaultValues }: CustomerFormProps) => {
  const form = useForm<CustomerFormValues>({
    resolver: zodResolver(customerFormSchema),
    defaultValues: {
      customerName: "",
      email: "",
      mobileNumber: "",
      additionalDetails: "",
      companyName: "",
      industry: "",
      jobSeniorities: "",
      jobTitle: "",
      city: "",
      state: "",
      relationIntensity: "Neutral",
      status: "Prospect",
      segment: "Coverage",
      storeVisit: "Pending",
      testDrive: "Pending",
      purchase: "Pending",
      ...defaultValues,
    },
  });

  const handleSubmit = (values: CustomerFormValues) => {
    onSubmit(values);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Customer Basic Information */}
          <CustomFormField
            control={form.control}
            name="customerName"
            fieldType={FormFieldType.INPUT}
            label="Customer Name"
            placeholder="Enter Customer Name"
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

          <CustomFormField
            control={form.control}
            name="companyName"
            fieldType={FormFieldType.INPUT}
            label="Company Name"
            placeholder="Enter Company Name"
          />

          {/* Professional Details */}
          <CustomFormField
            control={form.control}
            name="industry"
            fieldType={FormFieldType.SELECT}
            label="Industry"
            placeholder="Select Industry"
          >
            <SelectItem value="Automotive">Automotive</SelectItem>
            <SelectItem value="Technology">Technology</SelectItem>
            <SelectItem value="Finance">Finance</SelectItem>
            <SelectItem value="Healthcare">Healthcare</SelectItem>
            <SelectItem value="Manufacturing">Manufacturing</SelectItem>
          </CustomFormField>

          <CustomFormField
            control={form.control}
            name="jobSeniorities"
            fieldType={FormFieldType.SELECT}
            label="Job Seniorities"
            placeholder="Select Job Seniorities"
          >
            <SelectItem value="Executive">Executive</SelectItem>
            <SelectItem value="Senior">Senior</SelectItem>
            <SelectItem value="Mid-level">Mid-level</SelectItem>
            <SelectItem value="Junior">Junior</SelectItem>
          </CustomFormField>

          <CustomFormField
            control={form.control}
            name="jobTitle"
            fieldType={FormFieldType.INPUT}
            label="Job Title"
            placeholder="Enter Job Title"
          />

          {/* Location Information */}
          <CustomFormField
            control={form.control}
            name="city"
            fieldType={FormFieldType.INPUT}
            label="City"
            placeholder="Enter City"
          />

          <CustomFormField
            control={form.control}
            name="state"
            fieldType={FormFieldType.INPUT}
            label="State"
            placeholder="Enter State"
          />

          {/* Relationship Management */}
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
            <SelectItem value="Customer">Customer</SelectItem>
            <SelectItem value="Prospect">Prospect</SelectItem>
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

          {/* Sales Process Tracking */}
          <CustomFormField
            control={form.control}
            name="storeVisit"
            fieldType={FormFieldType.SELECT}
            label="Store Visit"
            placeholder="Select Store Visit Status"
          >
            <SelectItem value="Done">Done</SelectItem>
            <SelectItem value="Pending">Pending</SelectItem>
          </CustomFormField>

          <CustomFormField
            control={form.control}
            name="testDrive"
            fieldType={FormFieldType.SELECT}
            label="Test Drive"
            placeholder="Select Test Drive Status"
          >
            <SelectItem value="Done">Done</SelectItem>
            <SelectItem value="Pending">Pending</SelectItem>
          </CustomFormField>

          <CustomFormField
            control={form.control}
            name="purchase"
            fieldType={FormFieldType.SELECT}
            label="Purchase"
            placeholder="Select Purchase Status"
          >
            <SelectItem value="Done">Done</SelectItem>
            <SelectItem value="Pending">Pending</SelectItem>
          </CustomFormField>

          {/* Date Fields */}
          <CustomFormField
            control={form.control}
            name="dateOfPurchase"
            fieldType={FormFieldType.DATE_PICKER}
            label="Date of Purchase"
            disabled={form.watch("purchase") === "Pending"}
          />

          <CustomFormField
            control={form.control}
            name="serviceDueDate"
            fieldType={FormFieldType.DATE_PICKER}
            label="Service Due Date"
          />

          <CustomFormField
            control={form.control}
            name="insuranceDueDate"
            fieldType={FormFieldType.DATE_PICKER}
            label="Insurance Due Date"
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
          <Button type="button" variant="outline" onClick={() => form.reset()}>
            Reset
          </Button>
          <Button type="submit">
            {form.watch("status") === "Customer"
              ? "Update Customer"
              : "Create Prospect"}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default AutoDealersForm;
