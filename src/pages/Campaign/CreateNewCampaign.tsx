import { useForm } from "react-hook-form";
import { WizardForm } from "@/components/Form/wizard-form";
import { WizardStep } from "@/components/ui/wizard";
import CustomFormField from "@/components/Form/CustomFormField";
import { FormFieldType } from "@/types/form";
import { Code, Hash, Link, Link2Icon, ShoppingCart } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import type { z } from "zod";
import { calculateTotal } from "@/lib/helper";
import Payment from "@/components/Payment";
import { templates } from "@/data/email-templates";
import { formSchema } from "@/schema/forms";
import { useMemo, useState } from "react";
import { useCampaignFormStore } from "@/store/store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { useDebounce } from "@/hooks/use-debouse";
import ReceptionistDialog from "@/components/Receptionist/receptioinst-dialog";
import { useQuery } from "@tanstack/react-query";

interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  popularity: number;
  imageUrl: string;
}

interface Filters {
  category: string;
  minPrice: number;
  maxPrice: number;
  sortBy: "priceLowToHigh" | "priceHighToLow" | "popularity";
}

const products: Product[] = [
  {
    id: "1",
    name: "Laptop",
    category: "electronics",
    price: 1200,
    popularity: 5,
    imageUrl:
      "https://img.freepik.com/free-photo/still-life-books-versus-technology_23-2150062920.jpg?t=st=1742568012~exp=1742571612~hmac=6d20e5bb59d50c502685f480643660188df0ef703ca09f50392f9fb43e7ff6c5&w=996",
  },
  {
    id: "2",
    name: "T-Shirt",
    category: "apparel",
    price: 20,
    popularity: 3,
    imageUrl:
      "https://img.freepik.com/free-vector/monocolor-midnight-madness-marathon-t-shirt-design_742173-5733.jpg?t=st=1742568042~exp=1742571642~hmac=d960d96b464fe9121bb9f7e10cb37e770dab0cbc2ace16d42104d05dc3dfe22e&w=740",
  },
  {
    id: "3",
    name: "Coffee",
    category: "food",
    price: 5,
    popularity: 4,
    imageUrl:
      "https://img.freepik.com/free-photo/chicken-fajita-chicken-fillet-fried-with-bell-pepper-lavash-with-bread-slices-white-plate_114579-174.jpg?t=st=1742568063~exp=1742571663~hmac=8cd62727de8dc3775fba07cc8469e104f361448bd9c5250e781868fd0c6d5fe8&w=740",
  },
  {
    id: "4",
    name: "Smartphone",
    category: "electronics",
    price: 800,
    popularity: 5,
    imageUrl:
      "https://img.freepik.com/free-photo/creative-reels-composition_23-2149711507.jpg?t=st=1742565716~exp=1742569316~hmac=b3990d16fd131ee05c2416e8d86dc94514a25826544c2f064372f5484941b979&w=996",
  },
  {
    id: "5",
    name: "Jeans",
    category: "apparel",
    price: 50,
    popularity: 4,
    imageUrl:
      "https://img.freepik.com/free-photo/she-has-great-street-style_329181-4716.jpg?t=st=1742568104~exp=1742571704~hmac=a1ea2a1009ea87f53b7b71a6a5a451bce8d6a603478cfe8e351da12db64c722f&w=740",
  },
  {
    id: "6",
    name: "Chocolate",
    category: "food",
    price: 10,
    popularity: 4,
    imageUrl:
      "https://img.freepik.com/free-psd/chocolate-shop-instagram-stories-template_23-2148669321.jpg?t=st=1742568139~exp=1742571739~hmac=d979e6e1a8036b1918a999aa7a8e9464b21d5cc208a94b4b5d128998deb3e9af&w=900",
  },
  {
    id: "7",
    name: "Headphones",
    category: "electronics",
    price: 150,
    popularity: 4,
    imageUrl:
      "https://img.freepik.com/free-photo/black-headphones-digital-device_53876-97302.jpg?t=st=1742568162~exp=1742571762~hmac=b6cc92216cfaa23fb812f368490c2c716584490408d205f206432fd1f88f0875&w=740",
  },
  {
    id: "8",
    name: "Sneakers",
    category: "apparel",
    price: 90,
    popularity: 5,
    imageUrl:
      "https://img.freepik.com/premium-vector/cool-sneaker-with-orange-background_755096-85.jpg?w=740",
  },
];

type Recipient = {
  id: number;
  name: string;
  email: string;
  phone: string;
  department: string;
};

const recipients: Recipient[] = [
  {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    phone: "1234567890",
    department: "Marketing",
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane@example.com",
    phone: "9876543210",
    department: "Sales",
  },
  {
    id: 3,
    name: "Robert Johnson",
    email: "robert@example.com",
    phone: "5551234567",
    department: "IT",
  },
  {
    id: 4,
    name: "Emily Davis",
    email: "emily@example.com",
    phone: "4445556666",
    department: "HR",
  },
];

const defaultValues = {
  campaignName: "",
  description: "",
  forWho: 0,
  EventMainCategory: "",
  event: "",
  customEvent: "",
  distributionType: "",
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
  selectedReceptionists: [] as number[],
  catalogSelectionData: "",
  catalogSelectedProducts: [] as string[],
  searchRecipients: "",
  catalogFilters: {
    category: "",
    minPrice: 0,
    maxPrice: 1000,
    sortBy: "priceLowToHigh" as
      | "priceLowToHigh"
      | "priceHighToLow"
      | "popularity",
  },
};

const CreateNewCampaign = () => {
  const { loadEvents, events } = useCampaignFormStore();

  const [filteredProducts, setFilteredProducts] = useState<Product[]>(products);
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  const watchedValues = form.watch([
    "distributionType",
    "rewardType",
    "advanedDetails",
    "points",
    "sendReminderAfterInitialGift",
    "sendReminderBeforeExpiration",
    "forWho",
    "searchRecipients",
  ]);
  const [
    distributionType,
    rewardType,
    showAdvancedDetails,
    points,
    sendReminderAfterInitialGift,
    sendReminderBeforeExpiration,
    forWho,
    searchRecipients,
  ] = watchedValues;

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    console.log(
      {
        ...data,
        catalogData: {
          selectedProducts: selectedProducts,
          filters: form.watch("catalogFilters"),
          selectedProductDetails: products.filter((p) =>
            selectedProducts.includes(p.id)
          ),
        },
      },
      "Complete form data with catalog selections"
    );
    console.log("Selected Receptionists:", data.selectedReceptionists);
  };

  const validateStep = async (stepFields: string[]) => {
    const result = await form.trigger(
      stepFields as (keyof z.infer<typeof formSchema>)[]
    );
    return result;
  };

  const handleFilter = (filters: Filters) => {
    const { category, minPrice, maxPrice, sortBy } = filters;

    const filtered = products.filter((product) => {
      return (
        (category === "all" || category === ""
          ? true
          : product.category === category) &&
        product.price >= minPrice &&
        product.price <= maxPrice
      );
    });

    if (sortBy === "priceLowToHigh") {
      filtered.sort((a, b) => a.price - b.price);
    } else if (sortBy === "priceHighToLow") {
      filtered.sort((a, b) => b.price - a.price);
    } else if (sortBy === "popularity") {
      filtered.sort((a, b) => b.popularity - a.popularity);
    }

    setFilteredProducts(filtered);
    form.setValue("catalogFilters", filters);
  };

  const toggleSelectProduct = (productId: string) => {
    setSelectedProducts((prevSelected) => {
      const newSelection = prevSelected.includes(productId)
        ? prevSelected.filter((id) => id !== productId)
        : [...prevSelected, productId];

      form.setValue("catalogSelectedProducts", newSelection);
      return newSelection;
    });
  };

  const stepFields = useMemo(
    () => ({
      0: ["campaignName"],
      1: ["forWho"],
      2: ["EventMainCategory"],
      3: ["distributionType"],
      4: [
        distributionType === "bulk_order"
          ? "bulkBuyingQty"
          : "selectedReceptionists",
      ],
      5: (() => {
        const fields = [];
        if (distributionType === "bulk_order") {
          return ["eventAddress", "eventDate"];
        }
        fields.push("rewardType");
        if (rewardType === "value_of_points") fields.push("points");
        if (rewardType === "value_of_code") fields.push("valueCodes");
        return fields;
      })(),
      8: ["emailTemplate"],
      10: [
        "startDate",
        "endDate",
        "sendReminderAfterInitialGift",
        "sendReminderBeforeExpiration",
      ],
    }),
    [distributionType, rewardType]
  );

  const debouncedSearchTerm = useDebounce(searchRecipients, 300);

  const filteredRecipients = useMemo(() => {
    const term = debouncedSearchTerm.trim().toLowerCase();
    if (!term) return recipients;

    return recipients.filter((r) => {
      return (
        r.name.toLowerCase().includes(term) ||
        r.email.toLowerCase().includes(term) ||
        r.phone.includes(term) ||
        r.department.toLowerCase().includes(term)
      );
    });
  }, [debouncedSearchTerm]);

  const { isLoading, isError } = useQuery({
    queryKey: ["events", forWho],
    queryFn: () => loadEvents(forWho),
    enabled: !!forWho,
    staleTime: 5 * 60 * 1000,
  });

  return (
    <section className="flex justify-center my-7 flex-col gap-y-5 items-center">
      <div className="md:max-w-[80%] w-full"></div>
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
          <h2 className="my-4 text-center text-3xl">Create New Campaign</h2>
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
          <h2 className="my-4 text-center text-3xl">Select Recipient Type</h2>

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
                  value: 1,
                },
                {
                  label: "External Client",
                  value: 2,
                },
                {
                  label: "Channel Partners",
                  value: 3,
                },
                {
                  label: "Auto Dealers",
                  value: 4,
                },
                {
                  label: "Real Estate",
                  value: 5,
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
          {isLoading ? (
            <div>Loading...</div>
          ) : (
            <>
              <h2 className="my-4 text-center text-3xl">Select Event Type</h2>
              <div className="space-y-6">
                <CustomFormField
                  control={form.control}
                  name="EventMainCategory"
                  fieldType={FormFieldType.RADIO}
                  label="Event Type"
                  radioGridClass="grid-cols-3"
                  radioOptions={events}
                />
              </div>
              <div className="mt-5">
                <CustomFormField
                  control={form.control}
                  name="otherEvent"
                  fieldType={FormFieldType.INPUT}
                  label="Other Event"
                  placeholder="Enter campaign name"
                />
              </div>
            </>
          )}
        </WizardStep>

        <WizardStep
          step={3}
          validator={() => validateStep(stepFields[3])}
          fieldNames={stepFields[3]}
        >
          <h2 className="my-4 text-center text-3xl">
            Select Distribution Type
          </h2>

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
          step={4}
          validator={() => validateStep(stepFields[4])}
          fieldNames={stepFields[4]}
        >
          <h2 className="my-4 text-center text-3xl">Add the Recipients</h2>
          <div className="space-y-6">
            {distributionType !== "bulk_order" ? (
              <>
                <div className="flex flex-col gap-4">
                  <CustomFormField
                    control={form.control}
                    name="searchRecipients"
                    fieldType={FormFieldType.INPUT}
                    label="Search Recipients"
                    placeholder="Search by name, email, phone or department"
                  />

                  {/* Recipients Table */}
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Select
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Name
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Email
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Phone
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Department
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {filteredRecipients.length > 0 ? (
                          filteredRecipients.map((person) => (
                            <tr key={person.id}>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <CustomFormField
                                  control={form.control}
                                  name="selectedReceptionists"
                                  fieldType={FormFieldType.CHECKBOX}
                                  checkboxValue={person.id}
                                  label={person.name}
                                />
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                {person.name}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                {person.email}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                {person.phone}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                {person.department}
                              </td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td
                              colSpan={5}
                              className="px-6 py-4 text-center text-sm text-gray-500"
                            >
                              No recipients found matching your search
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
                <ReceptionistDialog forWho={forWho} />
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
          step={5}
          validator={() => validateStep(stepFields[5])}
          fieldNames={stepFields[5]}
        >
          <h2 className="my-4 text-center text-3xl">Select Reward Type</h2>

          <div className="space-y-6">
            {distributionType !== "bulk_order" ? (
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

        {distributionType !== "bulk_order" && (
          <>
            <WizardStep step={6}>
              <h2 className="my-4 text-center text-3xl">Customize Catalogue</h2>

              <div className="space-y-6">
                <div className="grid grid-cols-5 gap-3">
                  <Select
                    value={form.watch("catalogFilters.category")}
                    onValueChange={(value) => {
                      const newFilters = {
                        ...form.watch("catalogFilters"),
                        category: value,
                      };
                      handleFilter(newFilters);
                    }}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="All Categories" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Categories</SelectItem>
                      <SelectItem value="electronics">Electronics</SelectItem>
                      <SelectItem value="apparel">Apparel</SelectItem>
                      <SelectItem value="food">Food</SelectItem>
                    </SelectContent>
                  </Select>

                  <Input
                    type="number"
                    placeholder="Min Price"
                    value={form.watch("catalogFilters.minPrice")}
                    onChange={(e) => {
                      const newFilters = {
                        ...form.watch("catalogFilters"),
                        minPrice: Number(e.target.value),
                      };
                      handleFilter(newFilters);
                    }}
                  />
                  <Input
                    type="number"
                    placeholder="Max Price"
                    value={form.watch("catalogFilters.maxPrice")}
                    onChange={(e) => {
                      const newFilters = {
                        ...form.watch("catalogFilters"),
                        maxPrice: Number(e.target.value),
                      };
                      handleFilter(newFilters);
                    }}
                  />

                  <Select
                    value={form.watch("catalogFilters.sortBy")}
                    onValueChange={(value) => {
                      const newFilters = {
                        ...form.watch("catalogFilters"),
                        sortBy: value as Filters["sortBy"],
                      };
                      handleFilter(newFilters);
                    }}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Sort By" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="priceLowToHigh">
                        Price: Low to High
                      </SelectItem>
                      <SelectItem value="priceHighToLow">
                        Price: High to Low
                      </SelectItem>
                      <SelectItem value="popularity">Popularity</SelectItem>
                    </SelectContent>
                  </Select>

                  <Button
                    onClick={() => handleFilter(form.watch("catalogFilters"))}
                  >
                    Apply Filters
                  </Button>
                </div>

                {/* Product List */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {filteredProducts.map((product) => {
                    const isSelected = selectedProducts.includes(product.id);
                    return (
                      <Card
                        key={product.id}
                        className={`hover:shadow-lg transition-shadow relative ${
                          isSelected ? "border-2 border-blue-500" : ""
                        }`}
                      >
                        <CardContent className="p-4">
                          <img
                            src={product.imageUrl || "/placeholder.svg"}
                            alt={product.name}
                            className="w-full h-48 object-cover rounded-md"
                          />
                          <h3 className="text-lg font-semibold mt-2">
                            {product.name}
                          </h3>
                          <p className="text-sm text-gray-600">
                            {product.category}
                          </p>
                          <p className="text-lg font-bold text-gray-800">
                            ${product.price}
                          </p>
                        </CardContent>
                        <CardFooter className="flex justify-between items-center">
                          <Button
                            variant="outline"
                            onClick={() => toggleSelectProduct(product.id)}
                          >
                            {isSelected ? "Deselect" : "Select"}
                          </Button>
                          {isSelected && (
                            <input
                              type="checkbox"
                              checked={true}
                              readOnly
                              className="w-5 h-5 text-blue-600"
                            />
                          )}
                        </CardFooter>
                      </Card>
                    );
                  })}
                </div>

                {/* Hidden form fields to store catalog data */}
                <CustomFormField
                  control={form.control}
                  name="catalogSelectedProducts"
                  fieldType={FormFieldType.INPUT}
                  label=""
                  placeholder=""
                  inputType="hidden"
                  classNames="invisible"
                />
                <CustomFormField
                  control={form.control}
                  name="catalogFilters"
                  fieldType={FormFieldType.INPUT}
                  label=""
                  placeholder=""
                  inputType="hidden"
                  classNames="invisible"
                />
              </div>
            </WizardStep>

            <WizardStep step={7}>
              <h2 className="my-4 text-center text-3xl">
                Select Landing Page Template
              </h2>

              <div className="space-y-6">
                <CustomFormField
                  control={form.control}
                  name="landingPageTemplate"
                  fieldType={FormFieldType.RADIO_CARD}
                  radioCardoptions={templates.slice(0, 6).map((template) => ({
                    value: template.id,
                    content: (
                      <div className="bg-white rounded-lg overflow-hidden shadow-sm group relative">
                        <div className="relative h-40">
                          <img
                            src={template.imageUrl || "/placeholder.svg"}
                            alt={template.title}
                            className="object-cover w-full max-h-full"
                          />
                        </div>
                        <div className="p-2 text-center">
                          <h3 className="text-sm">{template.title}</h3>
                          <p className="text-xs text-gray-500">
                            {template.subCategory}
                          </p>
                        </div>
                      </div>
                    ),
                  }))}
                />
              </div>
            </WizardStep>

            <WizardStep step={8} validator={() => validateStep(stepFields[8])}>
              <h2 className="my-4 text-center text-3xl">
                Select Email Template
              </h2>
              <div className="space-y-6">
                <CustomFormField
                  control={form.control}
                  name="emailTemplate"
                  fieldType={FormFieldType.RADIO_CARD}
                  radioCardoptions={templates.slice(0, 6).map((template) => ({
                    value: template.id,
                    content: (
                      <div className="bg-white rounded-lg overflow-hidden shadow-sm group relative">
                        <div className="relative h-40">
                          <img
                            src={template.imageUrl || "/placeholder.svg"}
                            alt={template.title}
                            className="object-cover w-full max-h-full"
                          />
                        </div>
                        <div className="p-2 text-center">
                          <h3 className="text-sm">{template.title}</h3>
                          <p className="text-xs text-gray-500">
                            {template.subCategory}
                          </p>
                        </div>
                      </div>
                    ),
                  }))}
                />
              </div>
            </WizardStep>

            <WizardStep step={9}>
              <h2 className="my-4 text-center text-3xl">Enter SMS Content</h2>
              <div className="space-y-6">
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

            <WizardStep step={10}>
              <h2 className="my-4 text-center text-3xl">
                Schedule Communication
              </h2>
              <div className="space-y-6">
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
                    name="sendReminderBeforeExpiration"
                    fieldType={FormFieldType.CHECKBOX}
                    label="Send a Reminder Before Expiration"
                  />
                  <CustomFormField
                    control={form.control}
                    name="sendReminderAfterInitialGift"
                    fieldType={FormFieldType.CHECKBOX}
                    label="Send a Reminder After Initial Gift Invite"
                  />

                  {sendReminderBeforeExpiration && (
                    <CustomFormField
                      control={form.control}
                      name="datesInitial"
                      fieldType={FormFieldType.DATE_PICKER}
                      label="Start Date"
                      placeholder="Select start dates"
                      multipleDates={true}
                    />
                  )}
                  {sendReminderAfterInitialGift && (
                    <CustomFormField
                      control={form.control}
                      name="datesAfter"
                      fieldType={FormFieldType.DATE_PICKER}
                      label="End Date"
                      placeholder="Select After dates"
                      multipleDates={true}
                    />
                  )}
                </div>
              </div>
            </WizardStep>
            <WizardStep step={11}>
              <Payment />
            </WizardStep>
          </>
        )}
      </WizardForm>
    </section>
  );
};

export default CreateNewCampaign;
