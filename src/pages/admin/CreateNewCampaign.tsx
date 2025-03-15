import { z } from "zod";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { WizardForm } from "@/components/wizard-form";
import { WizardStep } from "@/components/ui/wizard";
import { SelectItem } from "@/components/ui/select";
import CustomFormField from "@/components/CustomFormField";
import { campaignSchema, FormFieldType } from "@/types/Form";

// Define the default values for the form
const defaultValues = {
  campaignName: "",
  description: "",
  for: "internal team" as const,
  selectEvent: "birthday" as const,
  addEvent: "",
  onlineOrBulk: "Bulk" as const,
  recipients: "0",
  recipientsQty: "0",
  bulkBuyingQty: 0,
  rewardType: "code" as const,
  bulkOrderAddress: "",
  eventDate: new Date(),
  selectProduct: "",
  customizeCatalog: false,
  customizeLandingPageTemplate: false,
  customizeEmailTemplate: false,
  customizeSmsTemplate: false,
  startDate: new Date(),
  endDate: new Date(),
  sendReminderAfterInitialGift: false,
  sendReminderBeforeExpiration: false,
  fundUtilization: "",
};

const CreateNewCampaign = () => {
  const form = useForm<z.infer<typeof campaignSchema>>({
    resolver: zodResolver(campaignSchema),
    defaultValues,
    mode: "onChange",
  });

  const event = useWatch({ control: form.control, name: "selectEvent" });
  const recipients = useWatch({ control: form.control, name: "recipients" });
  const isBulk = useWatch({ control: form.control, name: "onlineOrBulk" });

  const onSubmit = (values: z.infer<typeof campaignSchema>) => {
    console.log("Form submitted successfully:", values);
  };

  const validateStep = async (stepFields: string[]) => {
    const result = await form.trigger(
      stepFields as (keyof z.infer<typeof campaignSchema>)[]
    );
    return result;
  };

  const stepFields = {
    0: [
      "campaignName",
      "description",
      "for",
      "selectEvent",
      event === "other" ? "addEvent" : "",
    ],
    1: [
      "onlineOrBulk",
      isBulk === "Online" ? "recipients" : "",
      recipients === "Other" ? "recipientsQty" : "",
      isBulk === "Bulk" ? "bulkBuyingQty" : "",
      "rewardType",
    ],
    2: ["bulkOrderAddress", "eventDate", "selectProduct"],
    3: [
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
      "fundUtilization",
    ],
  };

  return (
    <section className="flex justify-center mt-5 flex-col gap-y-5 items-center">
      <div className="md:max-w-[80%] w-full">
        <h1 className="text-3xl">Create New Campaign</h1>
      </div>
      <WizardForm
        onSubmit={onSubmit}
        className="md:max-w-[80%] w-full bg-white py-5 px-7 rounded-2xl"
        form={form}
        stepFields={stepFields}
      >
        <WizardStep
          step={0}
          validator={() => validateStep(stepFields[0])}
          fieldNames={stepFields[0]}
        >
          <div className="space-y-6">
            <h2 className="text-xl font-semibold">Campaign Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                <SelectItem value="channel partners">
                  Channel Partners
                </SelectItem>
                <SelectItem value="others">Others</SelectItem>
              </CustomFormField>
              <CustomFormField
                control={form.control}
                name="selectEvent"
                fieldType={FormFieldType.SELECT}
                label="Select Event"
                placeholder="Select an Event"
              >
                <SelectItem value="birthday">Birthday</SelectItem>
                <SelectItem value="annual-event">Annual Event</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </CustomFormField>
              {event === "other" && (
                <CustomFormField
                  control={form.control}
                  name="addEvent"
                  fieldType={FormFieldType.INPUT}
                  label="Add Event"
                  placeholder="Enter event name"
                />
              )}
            </div>
          </div>
        </WizardStep>

        {/* Step 2: Distribution & Rewards */}
        <WizardStep
          step={1}
          validator={() => validateStep(stepFields[1])}
          fieldNames={stepFields[1]}
        >
          <div className="space-y-6">
            <h2 className="text-xl font-semibold">Distribution & Rewards</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
              {isBulk === "Online" && (
                <>
                  <CustomFormField
                    control={form.control}
                    name="recipients"
                    fieldType={FormFieldType.SELECT}
                    label="Select / Add Recipients (Qty)"
                    placeholder="Select an option"
                  >
                    <SelectItem value="vishal">Vishal</SelectItem>
                    <SelectItem value="Other">Enter Quantity</SelectItem>
                  </CustomFormField>
                  {recipients === "Other" && (
                    <CustomFormField
                      control={form.control}
                      name="recipientsQty"
                      fieldType={FormFieldType.INPUT}
                      label="Recipients Quantity"
                      placeholder="Enter Quantity"
                    />
                  )}
                </>
              )}
              {isBulk === "Bulk" && (
                <CustomFormField
                  control={form.control}
                  name="bulkBuyingQty"
                  fieldType={FormFieldType.INPUT}
                  label="Bulk Quantity"
                  placeholder="Enter Bulk Quantity"
                />
              )}
              <CustomFormField
                control={form.control}
                name="rewardType"
                fieldType={FormFieldType.SELECT}
                label="Reward Type"
                placeholder="Select an option"
              >
                {isBulk === "Online" ? (
                  <>
                    <SelectItem value="code">Value Of A Code</SelectItem>
                    <SelectItem value="points">Value Of Points</SelectItem>
                    <SelectItem value="link">Create Reward Link</SelectItem>
                  </>
                ) : (
                  <SelectItem value="bulk-order-place">
                    Bulk Order at Registered office / Event Place
                  </SelectItem>
                )}
              </CustomFormField>
            </div>
          </div>
        </WizardStep>

        {/* Step 3: Bulk Order Details */}
        {isBulk === "Online" && (
          <WizardStep
            step={3}
            validator={() => validateStep(stepFields[3])}
            fieldNames={stepFields[3]}
          >
            <div className="space-y-6">
              <h2 className="text-xl font-semibold">Customization</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Customize Catalog - Filters */}
                <CustomFormField
                  control={form.control}
                  name="customizeCatalog"
                  fieldType={FormFieldType.CHECKBOX}
                  label="Customize Catalog"
                />
                {form.watch("customizeCatalog") && (
                  <div className="col-span-2 space-y-4">
                    <CustomFormField
                      control={form.control}
                      name="catalogCategory"
                      fieldType={FormFieldType.SELECT}
                      label="Category"
                      placeholder="Select category"
                    >
                      <SelectItem value="electronics">Electronics</SelectItem>
                      <SelectItem value="apparel">Apparel</SelectItem>
                      <SelectItem value="food">Food</SelectItem>
                    </CustomFormField>
                    <CustomFormField
                      control={form.control}
                      name="priceRange"
                      fieldType={FormFieldType.INPUT}
                      label="Price Range"
                      placeholder="Enter price range (e.g., 10-100)"
                    />
                    <CustomFormField
                      control={form.control}
                      name="sortBy"
                      fieldType={FormFieldType.SELECT}
                      label="Sort By"
                      placeholder="Select sorting option"
                    >
                      <SelectItem value="priceLowToHigh">
                        Price: Low to High
                      </SelectItem>
                      <SelectItem value="priceHighToLow">
                        Price: High to Low
                      </SelectItem>
                      <SelectItem value="popularity">Popularity</SelectItem>
                    </CustomFormField>
                  </div>
                )}

                {/* Customize Landing Page Template */}
                <CustomFormField
                  control={form.control}
                  name="customizeLandingPageTemplate"
                  fieldType={FormFieldType.CHECKBOX}
                  label="Customize Landing Page Template"
                />
                {form.watch("customizeLandingPageTemplate") && (
                  <div className="col-span-2 space-y-4">
                    <CustomFormField
                      control={form.control}
                      name="landingPageHeader"
                      fieldType={FormFieldType.INPUT}
                      label="Header Text"
                      placeholder="Enter header text"
                    />
                    <CustomFormField
                      control={form.control}
                      name="landingPageBackground"
                      fieldType={FormFieldType.COLOR_PICKER}
                      label="Background Color"
                    />
                    <CustomFormField
                      control={form.control}
                      name="landingPageButtonText"
                      fieldType={FormFieldType.INPUT}
                      label="Button Text"
                      placeholder="Enter button text"
                    />
                  </div>
                )}

                {/* Customize Email Template */}
                <CustomFormField
                  control={form.control}
                  name="customizeEmailTemplate"
                  fieldType={FormFieldType.CHECKBOX}
                  label="Customize Email Template"
                />
                {form.watch("customizeEmailTemplate") && (
                  <div className="col-span-2 space-y-4">
                    <CustomFormField
                      control={form.control}
                      name="emailSubject"
                      fieldType={FormFieldType.INPUT}
                      label="Subject Line"
                      placeholder="Enter subject line"
                    />
                    <CustomFormField
                      control={form.control}
                      name="emailBody"
                      fieldType={FormFieldType.TEXTAREA}
                      label="Body Content"
                      placeholder="Enter email content"
                    />
                    <CustomFormField
                      control={form.control}
                      name="emailFooter"
                      fieldType={FormFieldType.INPUT}
                      label="Footer Text"
                      placeholder="Enter footer text"
                    />
                  </div>
                )}

                {/* Customize SMS Template */}
                <CustomFormField
                  control={form.control}
                  name="customizeSmsTemplate"
                  fieldType={FormFieldType.CHECKBOX}
                  label="Customize SMS Template"
                />
                {form.watch("customizeSmsTemplate") && (
                  <div className="col-span-2 space-y-4">
                    <CustomFormField
                      control={form.control}
                      name="smsContent"
                      fieldType={FormFieldType.TEXTAREA}
                      label="SMS Content"
                      placeholder="Enter SMS content"
                    />
                    <CustomFormField
                      control={form.control}
                      name="smsCallToAction"
                      fieldType={FormFieldType.INPUT}
                      label="Call-to-Action"
                      placeholder="Enter call-to-action text"
                    />
                  </div>
                )}
              </div>
            </div>
          </WizardStep>
        )}

        {/* Step 4: Schedule & Funds */}
        <WizardStep
          step={4}
          validator={() => validateStep(stepFields[4])}
          fieldNames={stepFields[4]}
        >
          <div className="space-y-6">
            <h2 className="text-xl font-semibold">Schedule & Funds</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <CustomFormField
                control={form.control}
                name="startDate"
                fieldType={FormFieldType.DATE_PICKER}
                label="Start Date"
                placeholder="Select start date"
              />
              <CustomFormField
                control={form.control}
                name="endDate"
                fieldType={FormFieldType.DATE_PICKER}
                label="End Date"
                placeholder="Select end date"
              />
              {isBulk === "Online" && (
                <>
                  <CustomFormField
                    control={form.control}
                    name="sendReminderAfterInitialGift"
                    fieldType={FormFieldType.CHECKBOX}
                    label="Send a Reminder After Initial Gift Invite"
                  />
                  <CustomFormField
                    control={form.control}
                    name="sendReminderBeforeExpiration"
                    fieldType={FormFieldType.CHECKBOX}
                    label="Send a Reminder Before Expiration"
                  />
                </>
              )}
              <CustomFormField
                control={form.control}
                name="fundUtilization"
                fieldType={FormFieldType.TEXTAREA}
                label="Fund Utilization / Add Funds"
                placeholder="Add funds details"
              />
            </div>
          </div>
        </WizardStep>
      </WizardForm>
    </section>
  );
};

export default CreateNewCampaign;
