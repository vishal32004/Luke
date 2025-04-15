import { useForm } from "react-hook-form";
import { WizardForm } from "@/components/Form/wizard-form";
import { WizardStep } from "@/components/ui/wizard";
import CustomFormField from "@/components/Form/CustomFormField";
import { FormFieldType } from "@/types/Form";
import {
  Award,
  BarChart,
  BookOpen,
  Briefcase,
  Clipboard,
  Code,
  Cpu,
  DollarSign,
  Eye,
  FlaskConical,
  Globe,
  Handshake,
  Hash,
  Headphones,
  Heart,
  Link,
  Link2Icon,
  Megaphone,
  Mic,
  PlusCircle,
  Scale,
  Search,
  Settings,
  ShoppingCart,
  UserCircle,
  UserPlus,
  Users,
} from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { calculateTotal } from "@/lib/helper";
import { CatalogSection } from "@/components/ProductFilter";
import Payment from "@/components/Payment";
import { Button } from "@/components/ui/button";
import { templates } from "@/data/email-templates";
import ReceptionistManager from "@/components/Receptionist";
import { formSchema } from "@/schema/campaign-form";

const defaultValues = {
  campaignName: "",
  description: "",
  forWho: "",
  EventMainCategory: "",
  event: "",
  customEvent: "",
  distributionType: "",
  recipients: "",
  bulkBuyingQty: "",
  rewardType: "",
  points: "",
  valueCodes: "",
  quantity: 1,
  link: "",
  AdvanedDetails: false,
  scheduledDate: new Date(),
  personalMessage: "",
  eventAddress: "",
  eventDate: new Date(),
  startDate: new Date(),
  endDate: new Date(),
  sendReminderAfterInitialGift: false,
  sendReminderBeforeExpiration: false,
};

const CreateNewCampaign = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  const [
    distributionType,
    rewardType,
    showAdvancedDetails,
    points,
    sendReminderAfterInitialGift,
    sendReminderBeforeExpiration,
  ] = form.watch([
    "distributionType",
    "rewardType",
    "advanedDetails",
    "points",
    "sendReminderAfterInitialGift",
    "sendReminderBeforeExpiration",
  ]);

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    console.log(data, "testing data");
  };

  const validateStep = async (stepFields: string[]) => {
    const result = await form.trigger(
      stepFields as (keyof z.infer<typeof formSchema>)[]
    );
    return result;
  };

  const stepFields = {
    0: ["campaignName", "description"],
    1: ["forWho"],
    2: ["EventMainCategory"],
    3: ["event"],
    4: ["distributionType"],
    5: [distributionType === "Bulk Order" ? "bulkBuyingQty" : "recipients"],
    6: [] as string[],
    11: [
      "startDate",
      "endDate",
      "sendReminderAfterInitialGift",
      "sendReminderBeforeExpiration",
    ],
  };

  stepFields[6] = (() => {
    const fields = [];

    if (distributionType === "Bulk Order") {
      fields.push("eventAddress", "eventDate");
      return fields;
    } else {
      fields.push("rewardType");
    }

    if (rewardType === "value_of_points") fields.push("points");
    if (rewardType === "value_of_code") fields.push("valueCodes");
    return fields;
  })();

  return (
    <section className="flex justify-center my-7 flex-col gap-y-5 items-center ">
      <div className="md:max-w-[80%] w-full">
        <h1 className="text-3xl text-center">Create New Campaign</h1>
      </div>
      <WizardForm
        onSubmit={onSubmit}
        className="md:max-w-[90%] w-full bg-white py-10 px-5 rounded-2xl shadow-1"
        form={form}
        stepFields={stepFields}
      >
        <WizardStep
          step={0}
          validator={() => validateStep(stepFields[0])}
          fieldNames={stepFields[0]}
        >
          <div className="space-y-6">
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
              fieldType={FormFieldType.TEXTAREA}
              label="Description"
              placeholder="Enter description"
            />
          </div>
        </WizardStep>

        <WizardStep
          step={1}
          validator={() => validateStep(stepFields[1])}
          fieldNames={stepFields[1]}
        >
          <div className="space-y-6">
            <CustomFormField
              control={form.control}
              name="forWho"
              fieldType={FormFieldType.RADIO}
              label="For"
              radioGridClass="grid-cols-4"
              radioOptions={[
                {
                  label: "Internal Team",
                  value: "internal_team",
                  icon: UserCircle,
                },
                {
                  label: "External Client",
                  value: "external_client",
                  icon: Briefcase,
                },
                {
                  label: "Channel Partners",
                  value: "channel_partners",
                  icon: Handshake,
                },
                {
                  label: "Others",
                  value: "others",
                  icon: Search,
                },
              ]}
            />
          </div>
        </WizardStep>

        <WizardStep
          step={2}
          validator={() => validateStep(stepFields[2])}
          fieldNames={stepFields[2]}
        >
          <div className="space-y-6">
            <CustomFormField
              control={form.control}
              name="EventMainCategory"
              fieldType={FormFieldType.RADIO}
              label="Event Type"
              radioGridClass="grid-cols-3"
              radioOptions={[
                {
                  label: "HR (Human Resources)",
                  value: "hr",
                  icon: UserCircle,
                },
                {
                  label: "L&D (Learning and Development)",
                  value: "learning_development",
                  icon: BookOpen,
                },
                {
                  label: "Sales",
                  value: "sales",
                  icon: Briefcase,
                },
                {
                  label: "Marketing",
                  value: "marketing",
                  icon: Megaphone,
                },
                {
                  label: "IT (Information Technology)",
                  value: "it",
                  icon: Cpu,
                },
                {
                  label: "Finance",
                  value: "finance",
                  icon: DollarSign,
                },
                {
                  label: "Operations",
                  value: "operations",
                  icon: Settings,
                },
                {
                  label: "Customer Support",
                  value: "customer_support",
                  icon: Headphones,
                },
                {
                  label: "R&D (Research and Development)",
                  value: "rnd",
                  icon: FlaskConical,
                },
                {
                  label: "Administration",
                  value: "administration",
                  icon: Clipboard,
                },
                {
                  label: "Legal and Compliance",
                  value: "legal_compliance",
                  icon: Scale,
                },
                {
                  label: "Corporate Social Responsibility (CSR)",
                  value: "csr",
                  icon: Heart,
                },
              ]}
            />
          </div>
        </WizardStep>

        <WizardStep
          step={3}
          validator={() => validateStep(stepFields[3])}
          fieldNames={stepFields[3]}
        >
          <div className="space-y-6">
            <CustomFormField
              control={form.control}
              name="event"
              fieldType={FormFieldType.RADIO}
              label="Event"
              radioGridClass="grid-cols-3"
              radioOptions={[
                {
                  label: "Recruitment Drive",
                  value: "recruitment_drive",
                  icon: Users,
                },
                {
                  label: "New Hire Onboarding Session",
                  value: "new_hire_onboarding",
                  icon: UserPlus,
                },
                {
                  label: "Employee Town Hall",
                  value: "employee_town_hall",
                  icon: Mic,
                },
                {
                  label: "Team-Building Retreat",
                  value: "team_building_retreat",
                  icon: Users,
                },
                {
                  label: "Diversity and Inclusion Workshop",
                  value: "diversity_inclusion_workshop",
                  icon: Globe,
                },
                {
                  label: "Leadership Development Program",
                  value: "leadership_development",
                  icon: Award,
                },
                {
                  label: "Employee Wellness Fair",
                  value: "employee_wellness_fair",
                  icon: Heart,
                },
                {
                  label: "Performance Review Kickoff Meeting",
                  value: "performance_review_kickoff",
                  icon: BarChart,
                },
                {
                  label: "Other",
                  value: "other",
                  icon: PlusCircle,
                },
              ]}
            />
            {form.watch("event") === "Other" && (
              <CustomFormField
                control={form.control}
                name="customEvent"
                fieldType={FormFieldType.INPUT}
                label="Custom Event Name"
                placeholder="Enter your custom event name"
              />
            )}
          </div>
        </WizardStep>

        <WizardStep
          step={4}
          validator={() => validateStep(stepFields[4])}
          fieldNames={stepFields[4]}
        >
          <div className="space-y-6">
            <CustomFormField
              control={form.control}
              name="distributionType"
              fieldType={FormFieldType.RADIO}
              label="Distribution Type"
              radioGridClass="grid-cols-2"
              radioOptions={[
                {
                  label: "Online Gift Distribution",
                  value: "online_gift_distribution",
                  icon: Link,
                },
                {
                  label: "Bulk Order",
                  value: "bulk_order",
                  icon: ShoppingCart,
                },
              ]}
            />
          </div>
        </WizardStep>

        <WizardStep
          step={5}
          validator={() => validateStep(stepFields[5])}
          fieldNames={stepFields[5]}
        >
          <div className="space-y-6">
            {distributionType !== "Bulk Order" ? (
              <ReceptionistManager />
            ) : (
              <CustomFormField
                control={form.control}
                name="bulkBuyingQty"
                fieldType={FormFieldType.INPUT}
                label="Bulk Quantity"
                placeholder="Enter Bulk Quantity"
              />
            )}
          </div>
        </WizardStep>

        <WizardStep
          step={6}
          validator={() => validateStep(stepFields[6])}
          fieldNames={stepFields[6]}
        >
          <div className="space-y-6">
            {distributionType !== "Bulk Order" ? (
              <>
                <CustomFormField
                  control={form.control}
                  name="rewardType"
                  fieldType={FormFieldType.RADIO}
                  label="Reward Type"
                  radioGridClass="grid-cols-3"
                  radioOptions={[
                    {
                      label: "Value Of Code",
                      value: "value_of_code",
                      icon: Code,
                    },
                    {
                      label: "Value Of Points",
                      value: "value_of_points",
                      icon: Hash,
                    },
                    {
                      label: "Create Reward Link",
                      value: "create_reward_link",
                      icon: Link2Icon,
                    },
                  ]}
                />

                {rewardType === "value_of_code" && (
                  <div className="grid grid-cols-3 gap-5">
                    <div className="col-span-2">
                      <CustomFormField
                        control={form.control}
                        name="valueCodes"
                        fieldType={FormFieldType.INPUT}
                        label="Value Of Code"
                        placeholder="Enter Value Of Code (In Ruppee)"
                      />
                    </div>

                    <CustomFormField
                      control={form.control}
                      name="quantity"
                      label="Quantity"
                      fieldType={FormFieldType.QUANTITY_CONTROLLER}
                      min={1}
                      max={10}
                    />
                  </div>
                )}

                {rewardType === "value_of_points" && (
                  <>
                    <div className="grid grid-cols-3 items-end gap-2">
                      <div className="flex flex-col col-span-2">
                        <CustomFormField
                          control={form.control}
                          name="points"
                          fieldType={FormFieldType.INPUT}
                          label="Points"
                          placeholder="Enter Value Of Points"
                        />
                      </div>
                      <p className="w-full text-center bg-first text-white rounded-md px-3 py-2">
                        Total: <span>{calculateTotal(+points)}</span>
                      </p>
                    </div>
                    <p className="mt-5">Note: 1 Reward Points = INR 1.00</p>
                  </>
                )}
                <CustomFormField
                  control={form.control}
                  name="advanedDetails"
                  fieldType={FormFieldType.CHECKBOX}
                  label="Show Advanced Details"
                />
                {showAdvancedDetails && (
                  <>
                    <CustomFormField
                      control={form.control}
                      name="scheduledDate"
                      fieldType={FormFieldType.DATE_PICKER}
                      label="Scheduled Date"
                      placeholder="Scheduled Date"
                    />
                    <p>Reward amount will be deducted on scheduled date.</p>

                    <CustomFormField
                      control={form.control}
                      name="personalMessage"
                      fieldType={FormFieldType.TEXTAREA}
                      label="Personal Message"
                      placeholder="Enter description"
                    />
                  </>
                )}
              </>
            ) : (
              <>
                <CustomFormField
                  control={form.control}
                  name="eventAddress"
                  fieldType={FormFieldType.TEXTAREA}
                  label="Event address"
                  placeholder="Event address"
                />
                <CustomFormField
                  control={form.control}
                  name="eventDate"
                  fieldType={FormFieldType.DATE_PICKER}
                  label="Event Date"
                  placeholder="Event Date"
                />
              </>
            )}
          </div>
        </WizardStep>

        {distributionType !== "Bulk Order" && (
          <>
            <WizardStep step={7}>
              <div className="space-y-6">
                <CatalogSection />
              </div>
            </WizardStep>

            <WizardStep step={8}>
              <div className="space-y-6">
                <h2 className="font-bold">Landing Page</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="col-span-2 space-y-4">
                    Landing Page content
                  </div>
                </div>
              </div>
            </WizardStep>

            <WizardStep step={9}>
              <div className="space-y-6">
                <h2 className="font-bold">Email Customization</h2>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  {templates.slice(0, 6).map((template) => (
                    <div className="bg-white rounded-lg overflow-hidden shadow-sm group relative">
                      <div className="relative h-40">
                        <img
                          src={template.imageUrl || "/placeholder.svg"}
                          alt={template.title}
                          className="object-cover w-full max-h-full"
                        />
                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <Button
                            variant="secondary"
                            size="sm"
                            className="flex items-center gap-1"
                          >
                            <Eye className="h-4 w-4" />
                            Preview
                          </Button>
                        </div>
                      </div>
                      <div className="p-2 text-center">
                        <h3 className="text-sm">{template.title}</h3>
                        <p className="text-xs text-gray-500">
                          {template.subCategory}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </WizardStep>

            <WizardStep step={10}>
              <div className="space-y-6">
                <h2 className="font-bold">SMS Content Customization</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                </div>
              </div>
            </WizardStep>

            <WizardStep step={11}>
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

                  {sendReminderBeforeExpiration && (
                    <CustomFormField
                      control={form.control}
                      name="datesInitial"
                      fieldType={FormFieldType.DATE_PICKER}
                      label="Start Date"
                      placeholder="Select start date"
                      multipleDates={true}
                    />
                  )}
                  {sendReminderAfterInitialGift && (
                    <CustomFormField
                      control={form.control}
                      name="datesAfter"
                      fieldType={FormFieldType.DATE_PICKER}
                      label="Start Date"
                      placeholder="Select start date"
                      multipleDates={true}
                    />
                  )}
                </div>
              </div>
            </WizardStep>
            <WizardStep step={12}>
              <Payment />
            </WizardStep>
          </>
        )}
      </WizardForm>
    </section>
  );
};

export default CreateNewCampaign;
