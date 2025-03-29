import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Control, ControllerRenderProps } from "react-hook-form";
import React from "react";
import { Select, SelectContent, SelectTrigger, SelectValue } from "./ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { FormFieldType } from "@/types/Form";
import { Calendar } from "./ui/calendar";
import { CalendarIcon, LucideIcon } from "lucide-react";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import { Checkbox } from "./ui/checkbox";
import { Textarea } from "./ui/textarea";
import { format } from "date-fns";
import { ColorPicker } from "./ui/color-picker";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Combobox } from "./ui/combobox";
import { QuantityController } from "./QuantityController";
type radioOptionType = {
  label: string;
  icon: LucideIcon;
};
interface CustomProps {
  control: Control<any>;
  fieldType: FormFieldType;
  name: string;
  label?: string;
  placeholder?: string;
  iconSrc?: string;
  iconAlt?: string;
  disabled?: boolean;
  dateFormat?: string;
  showTimeSelect?: boolean;
  children?: React.ReactNode;
  radioOptions?: radioOptionType[];
  radioGridClass?: string;
  comboboxOption?: { label: string; value: string }[];
  min?: number;
  max?: number;
}

const RenderField = ({
  field,
  props,
}: {
  field: ControllerRenderProps;
  props: CustomProps;
}) => {
  const { fieldType, placeholder } = props;

  switch (fieldType) {
    case FormFieldType.INPUT:
      return (
        <div className="flex rounded-md border border-dark-500 bg-dark-400">
          <FormControl>
            <Input
              placeholder={placeholder}
              {...field}
              className="shad-input border-0"
            />
          </FormControl>
        </div>
      );

    case FormFieldType.SELECT:
      return (
        <FormControl>
          <Select onValueChange={field.onChange} defaultValue={field.value}>
            <FormControl>
              <SelectTrigger className="w-full">
                <SelectValue placeholder={props.placeholder} />
              </SelectTrigger>
            </FormControl>
            <SelectContent>{props.children}</SelectContent>
          </Select>
        </FormControl>
      );

    case FormFieldType.DATE_PICKER:
      return (
        <Popover>
          <PopoverTrigger asChild>
            <FormControl>
              <Button
                variant={"outline"}
                className={cn(
                  "w-full pl-3 text-left font-normal",
                  !field.value && "text-muted-foreground"
                )}
              >
                {field.value ? (
                  format(field.value, "PPP")
                ) : (
                  <span>Pick a date</span>
                )}
                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
              </Button>
            </FormControl>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              selected={field.value}
              onSelect={field.onChange}
              disabled={(date) =>
                date > new Date() || date < new Date("1900-01-01")
              }
              initialFocus
            />
          </PopoverContent>
        </Popover>
      );

    case FormFieldType.CHECKBOX:
      return (
        <FormControl>
          <div className="flex items-center gap-4">
            <Checkbox
              id={props.name}
              checked={field.value}
              onCheckedChange={field.onChange}
            />
            <label
              htmlFor={props.name}
              className="md:leading-none cursor-pointer text-sm font-medium text-dark-700 peer-disabled:cursor-not-allowed peer-disabled:opacity-70;"
            >
              {props.label}
            </label>
          </div>
        </FormControl>
      );

    case FormFieldType.TEXTAREA:
      return (
        <FormControl>
          <Textarea
            placeholder={placeholder}
            {...field}
            className="bg-dark-400 placeholder:text-dark-600 border-dark-500 focus-visible:ring-0 focus-visible:ring-offset-0"
            disabled={props.disabled}
          />
        </FormControl>
      );

    case FormFieldType.COLOR_PICKER:
      return (
        <FormControl>
          <ColorPicker
            value={field.value}
            onChange={field.onChange}
            placeholder={props.placeholder}
          />
        </FormControl>
      );
    case FormFieldType.RADIO:
      return (
        <FormControl>
          <RadioGroup
            onValueChange={field.onChange}
            defaultValue={field.value}
            className={cn("grid", props.radioGridClass)}
          >
            {props.radioOptions?.map((option: radioOptionType) => (
              <FormItem
                className="flex items-center space-x-3 space-y-0 card-radio"
                key={option.label}
              >
                <FormControl>
                  <RadioGroupItem value={option.label} className="hidden" />
                </FormControl>
                <FormLabel className="font-normal text-center text-md  h-full p-4 border rounded-lg cursor-pointer hover:bg-gray-100 flex flex-col items-center justify-center w-full">
                  <option.icon />
                  {option.label}
                </FormLabel>
              </FormItem>
            ))}
          </RadioGroup>
        </FormControl>
      );
    case FormFieldType.COMBOBOX:
      return (
        <FormControl>
          <Combobox
            value={field.value}
            onChange={field.onChange}
            options={props.comboboxOption as { label: string; value: string }[]}
            placeholder={props.placeholder}
            searchPlaceholder="Search"
          />
        </FormControl>
      );
    case FormFieldType.QUANTITY_CONTROLLER:
      return (
        <FormControl>
          <QuantityController
            value={field.value || 1}
            onIncrement={() => field.onChange(field.value + 1)}
            onDecrement={() => field.onChange(field.value - 1)}
            onChange={(value) => field.onChange(value)}
            min={1}
            max={99}
          />
        </FormControl>
      );
    default:
      break;
  }
};

export default function CustomFormField(props: CustomProps) {
  const { control, fieldType, label, name } = props;
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="flex-1">
          {fieldType !== FormFieldType.CHECKBOX && label && (
            <FormLabel className="mb-1">{label}</FormLabel>
          )}
          <RenderField field={field} props={props} />
          <FormMessage className="text-red-400" />
        </FormItem>
      )}
    />
  );
}
