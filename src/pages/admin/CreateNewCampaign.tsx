import { useForm } from "react-hook-form";
import { WizardForm } from "@/components/wizard-form";
import { WizardStep } from "@/components/ui/wizard";
import { SelectItem } from "@/components/ui/select";
import CustomFormField from "@/components/CustomFormField";
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
  Scale,
  Search,
  Settings,
  ShoppingCart,
  UserCircle,
  UserPlus,
  Users,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const formSchema = z
  .object({
    campaignName: z.string().min(2, {
      message: "Campaign name is required",
    }),
    description: z.string().min(2, {
      message: "Description must be at least 2 characters.",
    }),
    forWho: z.string().min(2, { message: "Please Select at least one Option" }),
    EventMainCategory: z
      .string()
      .min(2, { message: "Please Select at least one Option" }),
    event: z.string().min(2, { message: "Please Select at least one Option" }),
    distributionType: z
      .string()
      .min(2, { message: "Please Select at least one Option" }),
    recipients: z
      .string()
      .min(2, { message: "Please Select at least one Option" }),
    bulkBuyingQty: z
      .string()
      .min(1, { message: "Please Enter A valid Quantity" }),
    rewardType: z
      .string()
      .min(2, { message: "Please Select at least one Option" }),
    points: z.string().min(1, { message: "Please Enter A Valid Option" }),
    valueCodes: z.string().min(2, { message: "Please Enter A Valid Option" }),
    quantity: z.number().min(1, { message: "Please Enter the Quantity" }),
    link: z.string().min(2, {
      message: "A valid Link",
    }),
    scheduledDate: z.date(),
    personalMessage: z.string().min(2, {
      message: "Too Small",
    }),
    eventAddress: z.string().min(2, {
      message: "Please Add A Valid Address",
    }),
    eventDate: z.date(),
    startDate: z.date(),
    endDate: z.date(),
    sendReminderAfterInitialGift: z.boolean(),
    sendReminderBeforeExpiration: z.boolean(),
  })
  .refine(
    (data) => {
      if (data.distributionType === "Bulk Order") {
        return !!data.bulkBuyingQty;
      }
      return true;
    },
    {
      message: "Bulk Buying Quantity is required",
      path: ["bulkBuyingQty"],
    }
  )
  .refine(
    (data) => {
      if (data.distributionType === "Online Gift Distribution") {
        return !!data.recipients;
      }
      return true;
    },
    {
      message: "Recipients are required",
      path: ["recipients"],
    }
  )
  .refine(
    (data) => {
      if (data.rewardType === "Value of Points") {
        return !!data.points;
      }
      return true;
    },
    {
      message: "Points are required",
      path: ["points"],
    }
  )
  .refine(
    (data) => {
      if (data.rewardType === "Bulk Order at Registered office / Event Place") {
        return !!data.eventAddress && !!data.eventDate;
      }
      return true;
    },
    {
      message: "Event Address & Date are required",
      path: ["eventAddress", "eventDate"],
    }
  );

const defaultValues = {
  campaignName: "",
  description: "",
  forWho: "",
  EventMainCategory: "",
  event: "",
  distributionType: "",
  recipients: "",
  bulkBuyingQty: "",
  rewardType: "",
  points: "",
  valueCodes: "",
  quantity: 0,
  link: "",
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

  const [distributionType, rewardType] = form.watch([
    "distributionType",
    "rewardType",
  ]);

  const onSubmit = () => {
    console.log("Form submitted successfully:");
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
    const fields = ["rewardType"];
    if (rewardType === "Value Of Points") fields.push("points");
    if (rewardType === "Value Of Code") fields.push("valueCodes");
    if (rewardType === "Create Reward Link") fields.push("link");
    if (distributionType === "Bulk Order") {
      fields.push("eventAddress", "eventDate");
    }
    return fields;
  })();

  console.log(stepFields[6], "hellow world");
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
            <h2 className="text-xl font-semibold">For Who</h2>
            <CustomFormField
              control={form.control}
              name="forWho"
              fieldType={FormFieldType.RADIO}
              label="For"
              radioGridClass="grid-cols-4"
              radioOptions={[
                {
                  label: "Internal Team",
                  icon: UserCircle,
                },
                {
                  label: "External Client",
                  icon: Briefcase,
                },
                {
                  label: "Channel Partners",
                  icon: Handshake,
                },
                {
                  label: "Others",
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
            <h2 className="text-xl font-semibold">Event Type</h2>
            <CustomFormField
              control={form.control}
              name="EventMainCategory"
              fieldType={FormFieldType.RADIO}
              label="Event Type"
              radioGridClass="grid-cols-3"
              radioOptions={[
                {
                  label: "HR (Human Resources)",
                  icon: UserCircle,
                },
                {
                  label: "L&D (Learning and Development)",
                  icon: BookOpen,
                },
                {
                  label: "Sales",
                  icon: Briefcase,
                },
                {
                  label: "Marketing",
                  icon: Megaphone,
                },
                {
                  label: "IT (Information Technology)",
                  icon: Cpu,
                },
                {
                  label: "Finance",
                  icon: DollarSign,
                },
                {
                  label: "Operations",
                  icon: Settings,
                },
                {
                  label: "Customer Support",
                  icon: Headphones,
                },
                {
                  label: "R&D (Research and Development)",
                  icon: FlaskConical,
                },
                {
                  label: "Administration",
                  icon: Clipboard,
                },
                {
                  label: "Legal and Compliance",
                  icon: Scale,
                },
                {
                  label: "Corporate Social Responsibility (CSR)",
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
            <h2 className="text-xl font-semibold">Event</h2>
            <CustomFormField
              control={form.control}
              name="event"
              fieldType={FormFieldType.RADIO}
              label="Event"
              radioGridClass="grid-cols-3"
              radioOptions={[
                {
                  label: "Recruitment Drive",
                  icon: Users,
                },
                {
                  label: "New Hire Onboarding Session",
                  icon: UserPlus,
                },
                {
                  label: "Employee Town Hall",
                  icon: Mic,
                },
                {
                  label: "Team-Building Retreat",
                  icon: Users,
                },
                {
                  label: "Diversity and Inclusion Workshop",
                  icon: Globe,
                },
                {
                  label: "Leadership Development Program",
                  icon: Award,
                },
                {
                  label: "Employee Wellness Fair",
                  icon: Heart,
                },
                {
                  label: "Performance Review Kickoff Meeting",
                  icon: BarChart,
                },
              ]}
            />
          </div>
        </WizardStep>

        <WizardStep
          step={4}
          validator={() => validateStep(stepFields[4])}
          fieldNames={stepFields[4]}
        >
          <div className="space-y-6">
            <h2 className="text-xl font-semibold">Distribution Type</h2>
            <CustomFormField
              control={form.control}
              name="distributionType"
              fieldType={FormFieldType.RADIO}
              label="Distribution Type"
              radioGridClass="grid-cols-2"
              radioOptions={[
                {
                  label: "Online Gift Distribution",
                  icon: Link,
                },
                {
                  label: "Bulk Order",
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
            <h2 className="text-xl font-semibold">Receipients</h2>

            {distributionType !== "Bulk Order" ? (
              <>
                <CustomFormField
                  control={form.control}
                  name="recipients"
                  fieldType={FormFieldType.COMBOBOX}
                  label="Select / Add Recipients (Qty)"
                  placeholder="Select an option"
                  comboboxOption={[{ label: "Vishal", value: "vishal" }]}
                />

                <div>
                  <h2>Email</h2>
                  <p>vishal@gmail.com</p>
                </div>

                <div>
                  <h2>Designation</h2>
                  <p>Driver</p>
                </div>
                <div>
                  <h2>Phone</h2>
                  <p>1234567890</p>
                </div>

                <div>
                  <h2>Email</h2>
                  <p>vishal@gmail.com</p>
                </div>
              </>
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
            <h2 className="text-xl font-semibold">Reward Type</h2>
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
                      icon: Code,
                    },
                    {
                      label: "Value Of Points",
                      icon: Hash,
                    },
                    {
                      label: "Create Reward Link",
                      icon: Link2Icon,
                    },
                  ]}
                />

                {rewardType === "Value Of Points" && (
                  <>
                    <CustomFormField
                      control={form.control}
                      name="points"
                      fieldType={FormFieldType.INPUT}
                      label="Points"
                      placeholder="Enter Value Of Points"
                    />
                    <p>note; 1 Reward Points = INR 1.00</p>

                    <p>
                      total <span>{600}</span>
                    </p>
                  </>
                )}

                {rewardType === "Value Of Code" && (
                  <>
                    <CustomFormField
                      control={form.control}
                      name="valueCodes"
                      fieldType={FormFieldType.INPUT}
                      label="Codes"
                      placeholder="Enter Value Of Code"
                    />

                    <CustomFormField
                      control={form.control}
                      name="quantity"
                      label="Quantity"
                      fieldType={FormFieldType.QUANTITY_CONTROLLER}
                      min={1}
                      max={10}
                    />
                  </>
                )}

                {rewardType === "Create Reward Link" && (
                  <>
                    <CustomFormField
                      control={form.control}
                      name="link"
                      fieldType={FormFieldType.INPUT}
                      label="Link"
                      placeholder="Link"
                    />
                    <Button>Regernate</Button>
                  </>
                )}
                <p>show advaned details</p>

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
                  label="personal Message"
                  placeholder="Enter description"
                />
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
                <h2 className="text-xl font-semibold">Customization</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                      label="from"
                      placeholder="from price range (e.g., 10-100)"
                    />

                    <CustomFormField
                      control={form.control}
                      name="priceRange"
                      fieldType={FormFieldType.INPUT}
                      label="to"
                      placeholder="to price range (e.g., 10-100)"
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
                </div>
              </div>
            </WizardStep>

            <WizardStep step={8}>
              <div className="space-y-6">
                <h2 className="text-xl font-semibold">Customization</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                </div>
              </div>
            </WizardStep>

            <WizardStep step={9}>
              <div className="space-y-6">
                <h2 className="text-xl font-semibold">Customization</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                </div>
              </div>
            </WizardStep>

            <WizardStep step={10}>
              <div className="space-y-6">
                <h2 className="text-xl font-semibold">Customization</h2>
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
                </div>
              </div>
            </WizardStep>
          </>
        )}
      </WizardForm>
    </section>
  );
};

export default CreateNewCampaign;
