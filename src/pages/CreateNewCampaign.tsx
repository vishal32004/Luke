import { z } from "zod";
import {
  useForm,
  // , useWatch
} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { WizardForm } from "@/components/wizard-form";
import { WizardStep } from "@/components/ui/wizard";

// import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
// import { Checkbox } from "@/components/ui/checkbox";
import { SelectItem } from "@/components/ui/select";
import CustomFormField from "@/components/CustomFormField";
import { FormFieldType } from "@/types/Form";
// import { useEffect } from "react";
// import { toast } from "sonner";

// Define the campaign form schema with Zod
const campaignSchema = z.object({
  campaignName: z
    .string()
    .min(3, { message: "Campaign name must be at least 3 characters." }),
  description: z.string().optional(),
  for: z.enum(
    ["internal team", "external client", "channel partners", "others"],
    {
      required_error: "Please select a target group for the campaign.",
    }
  ),

  selectEvent: z
    .enum(["birthday", "annual event"], {
      required_error: "Please select an event.",
    })
    .optional(),
  addEvent: z
    .string()
    .min(2, { message: "Event name must be at least 2 characters." })
    .optional(),

  onlineOrBulk: z.enum(["Online", "Bulk"], {
    required_error: "Please select an option.",
  }),
  recipientsQty: z
    .string()
    .min(1, { message: "Please select at least one recipient." })
    .optional(),
  bulkBuyingQty: z.number().optional(),
  rewardType: z
    .enum(["code", "points", "link", "location"], {
      required_error: "Please select a reward type.",
    })
    .optional(),
  selectProduct: z.string().optional(),
  customizeCatalog: z.boolean().optional(),
  customizeLandingPageTemplate: z.boolean().optional(),
  customizeEmailTemplate: z.boolean().optional(),
  customizeSmsTemplate: z.boolean().optional(),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
  sendReminderAfterInitialGift: z.boolean().optional(),
  sendReminderBeforeExpiration: z.boolean().optional(),
  fundUtilization: z.boolean(),
});

// Define the default values for the form
const defaultValues = {
  campaignName: "",
  description: "",
  for: "internal team" as const,
  selectEvent: "birthday" as const,
  addEvent: "",
  onlineOrBulk: "Bulk" as const,
  recipientsQty: "0",
  bulkBuyingQty: 0,
  rewardType: "code" as const,
  createRewardLink: false,
  bulkOrderDetails: {
    registeredOfficeOrEventPlace: "",
    eventDate: "",
  },
  selectProduct: "",
  customizeCatalog: false,
  customizeLandingPageTemplate: false,
  customizeEmailTemplate: false,
  customizeSmsTemplate: false,
  startDate: "",
  endDate: "",
  sendReminderAfterInitialGift: false,
  sendReminderBeforeExpiration: false,
  fundUtilization: false,
};

// Define the steps (based on the form fields)
const stepFields = {
  0: ["campaignName", "description", "for"],
  1: ["eventDetails.selectEvent", "eventDetails.addEvent", "onlineOrBulk"],
  2: ["recipientsQty", "bulkBuyingQty", "rewardType"],
  3: [
    "selectProduct",
    "customizeCatalog",
    "customizeLandingPageTemplate",
    "customizeEmailTemplate",
    "customizeSmsTemplate",
  ],
  4: [
    "startDate",
    "endDate",
    "sendReminderAfterInitialGift",
    "sendReminderBeforeExpiration",
  ],
  5: ["fundUtilization"],
};

const CreateNewCampaign = () => {
  const form = useForm<z.infer<typeof campaignSchema>>({
    resolver: zodResolver(campaignSchema),
    defaultValues,
    mode: "onChange",
  });

  // const projectType = useWatch({
  //   control: form.control,
  //   name: "projectDetails.projectType",
  //   defaultValue: "personal",
  // });

  const onSubmit = (values: z.infer<typeof campaignSchema>) => {
    console.log("Form submitted successfully:", values);
  };
  const validateStep = async (stepFields: string[]) => {
    const result = await form.trigger(
      stepFields as (keyof z.infer<typeof campaignSchema>)[]
    );

    return result;
  };
  return (
    <main className="container mx-auto py-10">
      <WizardForm
        title="Project Setup Wizard"
        description="Complete the following steps to set up your new project."
        schema={campaignSchema}
        defaultValues={defaultValues}
        onSubmit={onSubmit}
        className="max-w-2xl mx-auto"
        form={form}
        stepFields={stepFields}
        persistenceKey="project-setup-wizard"
        persistForm={true}
      >
        <WizardStep
          step={0}
          validator={() => validateStep(stepFields[0])}
          fieldNames={stepFields[0]}
        >
          <div className="space-y-6">
            <h2 className="text-xl font-semibold">Campaign Information</h2>
            <CustomFormField
              control={form.control}
              name="campaignName"
              fieldType={FormFieldType.INPUT}
              label="Campaign Name"
              placeholder="Enter campaign name"
            />
            <CustomFormField
              control={form.control}
              name="description"
              fieldType={FormFieldType.INPUT}
              label="Description"
              placeholder="Enter description"
            />
            <CustomFormField
              control={form.control}
              name="for"
              fieldType={FormFieldType.SELECT}
              label="For"
              placeholder="Select an option"
            >
              <SelectItem value="internal team">Internal Team</SelectItem>
              <SelectItem value="external client">External Client</SelectItem>
              <SelectItem value="channel partners">Channel Partners</SelectItem>
              <SelectItem value="others">Others</SelectItem>
            </CustomFormField>
          </div>
        </WizardStep>

        <WizardStep
          step={1}
          validator={() => validateStep(stepFields[1])}
          fieldNames={stepFields[1]}
        >
          <div className="space-y-6">
            <h2 className="text-xl font-semibold">Event Information</h2>
            <CustomFormField
              control={form.control}
              name="selectEvent"
              fieldType={FormFieldType.SELECT}
              label="Select Event"
              placeholder="Select an event"
            >
              <SelectItem value="Birthday">Birthday</SelectItem>
              <SelectItem value="Diwali">Diwali</SelectItem>
            </CustomFormField>
            <CustomFormField
              control={form.control}
              name="addEvent"
              fieldType={FormFieldType.INPUT}
              label="Add Event"
              placeholder="Enter event name"
            />
            <CustomFormField
              control={form.control}
              name="onlineOrBulk"
              fieldType={FormFieldType.SELECT}
              label="Online Gift Distribution / Bulk Order"
              placeholder="Select an option"
            >
              <SelectItem value="Online">Online</SelectItem>
              <SelectItem value="Bulk">Bulk Order</SelectItem>
            </CustomFormField>
          </div>
        </WizardStep>

        <WizardStep
          step={2}
          validator={() => validateStep(stepFields[2])}
          fieldNames={stepFields[2]}
        >
          <CustomFormField
            control={form.control}
            name="recipientsQty"
            fieldType={FormFieldType.SELECT}
            label="Select / Add Recepients (Qty) "
            placeholder="Select an option"
          >
            <SelectItem value="vishal">Vishal</SelectItem>
            <SelectItem value="Other">Other</SelectItem>
          </CustomFormField>
          <CustomFormField
            control={form.control}
            name="bulkBuyingQty"
            fieldType={FormFieldType.INPUT}
            label="Bulk Quantity"
            placeholder="Enter Bulk Quantity"
          />

          <CustomFormField
            control={form.control}
            name="rewardType"
            fieldType={FormFieldType.SELECT}
            label="Reward Type "
            placeholder="Select an option"
          >
            <SelectItem value="code">Value Of A Code</SelectItem>
            <SelectItem value="points">Value Of A Pints</SelectItem>
            <SelectItem value="link">Create Reward Link </SelectItem>
            <SelectItem value="bulk-order-place">
              Bulk Order at Registered office / Event Place
            </SelectItem>
          </CustomFormField>
        </WizardStep>

        <WizardStep
          step={3}
          validator={() => validateStep(stepFields[3])}
          fieldNames={stepFields[3]}
        >
          <CustomFormField
            control={form.control}
            name="selectProduct"
            fieldType={FormFieldType.SELECT}
            label="Reward Type "
            placeholder="Select an option"
          >
            <SelectItem value="code">Product 1</SelectItem>
          </CustomFormField>

          <CustomFormField
            control={form.control}
            name="customizeLandingPageTemplate"
            fieldType={FormFieldType.SELECT}
            label="Reward Type "
            placeholder="Select an option"
          >
            <SelectItem value="Yes">Yes</SelectItem>
            <SelectItem value="No">No</SelectItem>
          </CustomFormField>

          <CustomFormField
            control={form.control}
            name="customizeEmailTemplate"
            fieldType={FormFieldType.SELECT}
            label="Reward Type "
            placeholder="Select an option"
          >
            <SelectItem value="Yes">Yes</SelectItem>
          </CustomFormField>
          <CustomFormField
            control={form.control}
            name="customizeSmsTemplate"
            fieldType={FormFieldType.SELECT}
            label="Reward Type "
            placeholder="Select an option"
          >
            <SelectItem value="No">No</SelectItem>
          </CustomFormField>
        </WizardStep>

        <WizardStep
          step={4}
          validator={() => validateStep(stepFields[4])}
          fieldNames={stepFields[4]}
        >
          <CustomFormField
            control={form.control}
            name="startDate"
            fieldType={FormFieldType.DATE_PICKER}
            label="Campaign Name"
            placeholder="Enter campaign name"
          />
          <CustomFormField
            control={form.control}
            name="endDate"
            fieldType={FormFieldType.DATE_PICKER}
            label="Campaign Name"
            placeholder="Enter campaign name"
          />

          <CustomFormField
            fieldType={FormFieldType.CHECKBOX}
            control={form.control}
            name="sendReminderAfterInitialGift"
            label="I Consent To The Treatment"
          />

          <CustomFormField
            fieldType={FormFieldType.CHECKBOX}
            control={form.control}
            name="sendReminderBeforeExpiration"
            label="I Consent To The Treatment"
          />
        </WizardStep>

        <WizardStep
          step={5}
          validator={() => validateStep(stepFields[5])}
          fieldNames={stepFields[5]}
        >
          <CustomFormField
            fieldType={FormFieldType.TEXTAREA}
            control={form.control}
            name="fundUtilization"
            label="Past Medical History"
            placeholder="Mother Had Brain Cancer"
          />
        </WizardStep>
      </WizardForm>
    </main>
  );
};

export default CreateNewCampaign;
