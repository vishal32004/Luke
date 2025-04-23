import { Button } from "@/components/ui/button";
import { SelectItem } from "@/components/ui/select";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import CustomFormField from "./CustomFormField";
import { FormFieldType } from "@/types/form";
import { Form } from "../ui/form";

const employeeFormSchema = z.object({
  companyName: z.string().min(1, "Company name is required"),
  department: z.string().min(1, "Department is required"),
  employeeName: z.string().min(1, "Employee name is required"),
  email: z.string().email("Invalid email address"),
  mobileNumber: z.string().min(1, "Mobile number is required"),
  additionalDetails: z.string().optional(),
  jobSeniorities: z.string().min(1, "Job seniorities is required"),
  jobTitle: z.string().min(1, "Job title is required"),
  location: z.string().min(1, "Location is required"),
  workforceType: z.enum(["Full Time", "Part-Time", "Contract"]),
  jobMode: z.enum(["In-Office", "Remote", "Hybrid"]),
  dateOfJoining: z.date(),
  milestone: z.string().optional(),
  milestoneDate: z.date().optional(),
  birthDate: z.date().optional(),
  anniversaryDate: z.date().optional(),
  retirementDate: z.date().optional(),
});

type EmployeeFormValues = z.infer<typeof employeeFormSchema>;

interface EmployeeFormProps {
  onSubmit: (values: EmployeeFormValues) => void;
  defaultValues?: Partial<EmployeeFormValues>;
}

const InternalEmployees = ({ onSubmit, defaultValues }: EmployeeFormProps) => {
  const form = useForm<EmployeeFormValues>({
    resolver: zodResolver(employeeFormSchema),
    defaultValues: {
      companyName: "",
      department: "",
      employeeName: "",
      email: "",
      mobileNumber: "",
      additionalDetails: "",
      jobSeniorities: "",
      jobTitle: "",
      location: "",
      workforceType: "Full Time",
      jobMode: "In-Office",
      ...defaultValues,
    },
  });

  const handleSubmit = (values: EmployeeFormValues) => {
    onSubmit(values);
    form.reset();
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <CustomFormField
            control={form.control}
            name="companyName"
            fieldType={FormFieldType.INPUT}
            label="Company Name"
            placeholder="Enter Company Name"
          />

          <CustomFormField
            control={form.control}
            name="department"
            fieldType={FormFieldType.INPUT}
            label="Department"
            placeholder="Enter Department"
          />

          <CustomFormField
            control={form.control}
            name="employeeName"
            fieldType={FormFieldType.INPUT}
            label="Employee Name"
            placeholder="Enter Employee Name"
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
            name="jobSeniorities"
            fieldType={FormFieldType.SELECT}
            label="Job Seniorities"
            placeholder="Select Job Seniorities"
          >
            <SelectItem value="Executive">Executive</SelectItem>
            <SelectItem value="Senior">Senior</SelectItem>
            <SelectItem value="Mid-level">Mid-level</SelectItem>
            <SelectItem value="Junior">Junior</SelectItem>
            <SelectItem value="Intern">Intern</SelectItem>
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
            name="location"
            fieldType={FormFieldType.INPUT}
            label="Location"
            placeholder="Enter Location"
          />

          <CustomFormField
            control={form.control}
            name="workforceType"
            fieldType={FormFieldType.SELECT}
            label="Workforce Type"
            placeholder="Select Workforce Type"
          >
            <SelectItem value="Full Time">Full Time</SelectItem>
            <SelectItem value="Part-Time">Part-Time</SelectItem>
            <SelectItem value="Contract">Contract</SelectItem>
          </CustomFormField>

          <CustomFormField
            control={form.control}
            name="jobMode"
            fieldType={FormFieldType.SELECT}
            label="Job Mode"
            placeholder="Select Job Mode"
          >
            <SelectItem value="In-Office">In-Office</SelectItem>
            <SelectItem value="Remote">Remote</SelectItem>
            <SelectItem value="Hybrid">Hybrid</SelectItem>
          </CustomFormField>

          <CustomFormField
            control={form.control}
            name="dateOfJoining"
            fieldType={FormFieldType.DATE_PICKER}
            label="Date of Joining"
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

          <CustomFormField
            control={form.control}
            name="retirementDate"
            fieldType={FormFieldType.DATE_PICKER}
            label="Retirement Date (Optional)"
          />
        </div>

        <CustomFormField
          control={form.control}
          name="additionalDetails"
          fieldType={FormFieldType.TEXTAREA}
          label="Other Additional Details (Optional)"
          placeholder="Enter any additional details"
        />

        <div className="flex justify-end gap-4 pt-4">
          <Button type="submit">Submit</Button>
        </div>
      </form>
    </Form>
  );
};

export default InternalEmployees;
