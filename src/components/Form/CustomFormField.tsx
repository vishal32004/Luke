import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Control,
  ControllerRenderProps,
  FieldValues,
  Path,
} from "react-hook-form";
import React, { memo } from "react";
import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Calendar } from "../ui/calendar";
import { CalendarIcon, Check, LucideIcon } from "lucide-react";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { Checkbox } from "../ui/checkbox";
import { Textarea } from "../ui/textarea";
import { format } from "date-fns";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Combobox } from "../ui/combobox";
import { QuantityController } from "../QuantityController";
import { FormFieldType } from "@/types/form";

export type RadioOptionType = {
  label: string;
  value: string;
  icon?: LucideIcon;
};

export type ComboboxOptionType = {
  label: string;
  value: string;
};

export type RadioCardOptionType = {
  value: string;
  content: React.ReactNode;
};

interface BaseFieldProps {
  field: ControllerRenderProps<any, any>;
}

interface InputFieldProps extends BaseFieldProps {
  placeholder?: string;
  inputType?: string;
  classNames?: string;
}

interface SelectFieldProps extends BaseFieldProps {
  placeholder?: string;
  children?: React.ReactNode;
}

interface DatePickerFieldProps extends BaseFieldProps {
  multipleDates?: boolean;
}

interface CheckboxFieldProps extends BaseFieldProps {
  name: string;
  label?: string;
}

interface TextareaFieldProps extends BaseFieldProps {
  placeholder?: string;
  disabled?: boolean;
}

interface RadioFieldProps extends BaseFieldProps {
  radioOptions?: RadioOptionType[];
  radioGridClass?: string;
}

interface ComboboxFieldProps extends BaseFieldProps {
  comboboxOption?: ComboboxOptionType[];
  placeholder?: string;
}

interface QuantityFieldProps extends BaseFieldProps {
  min?: number;
  max?: number;
}
interface RadioCardFieldProps extends BaseFieldProps {
  radioCardoptions?: RadioCardOptionType[];
}

export interface CustomFormFieldProps<T extends FieldValues> {
  control: Control<T>;
  fieldType: FormFieldType;
  name: Path<T>;
  label?: string;
  placeholder?: string;
  iconSrc?: string;
  iconAlt?: string;
  disabled?: boolean;
  dateFormat?: string;
  showTimeSelect?: boolean;
  children?: React.ReactNode;
  radioOptions?: RadioOptionType[];
  radioGridClass?: string;
  comboboxOption?: ComboboxOptionType[];
  min?: number;
  max?: number;
  multipleDates?: boolean;
  inputType?: string;
  classNames?: string;
  radioCardoptions?: RadioCardOptionType[];
}
interface RenderFieldProps<T extends FieldValues> {
  field: ControllerRenderProps<T, Path<T>>;
  props: CustomFormFieldProps<T>;
}

const InputField = memo(
  ({ field, placeholder, inputType, classNames }: InputFieldProps) => (
    <div
      className={cn(
        "flex rounded-md border border-dark-500 bg-dark-400",
        classNames
      )}
    >
      <FormControl>
        <Input
          placeholder={placeholder}
          {...field}
          className="shad-input border-0"
          type={inputType || "text"}
        />
      </FormControl>
    </div>
  )
);

const SelectField = memo(
  ({ field, placeholder, children }: SelectFieldProps) => (
    <FormControl>
      <Select onValueChange={field.onChange} defaultValue={field.value}>
        <FormControl>
          <SelectTrigger className="w-full">
            <SelectValue placeholder={placeholder} />
          </SelectTrigger>
        </FormControl>
        <SelectContent>{children}</SelectContent>
      </Select>
    </FormControl>
  )
);

const DatePickerField = memo(
  ({ field, multipleDates }: DatePickerFieldProps) => (
    <Popover>
      <PopoverTrigger asChild>
        <FormControl>
          <Button
            variant="outline"
            className={cn(
              "w-full pl-3 text-left font-normal",
              !field.value && "text-muted-foreground"
            )}
          >
            {renderDatePickerValue(field.value, multipleDates)}
            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
          </Button>
        </FormControl>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode={multipleDates ? "multiple" : "single"}
          selected={field.value}
          onSelect={field.onChange}
          disabled={(date) =>
            date > new Date() || date < new Date("1900-01-01")
          }
          initialFocus
        />
      </PopoverContent>
    </Popover>
  )
);

const CheckboxField = memo(({ field, name, label }: CheckboxFieldProps) => (
  <FormControl>
    <div className="flex items-center gap-4">
      <Checkbox
        id={name}
        checked={field.value}
        onCheckedChange={field.onChange}
      />
      <label
        htmlFor={name}
        className="md:leading-none cursor-pointer text-sm font-medium text-dark-700 peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
      >
        {label}
      </label>
    </div>
  </FormControl>
));

const TextareaField = memo(
  ({ field, placeholder, disabled }: TextareaFieldProps) => (
    <FormControl>
      <Textarea
        placeholder={placeholder}
        {...field}
        className="bg-dark-400 placeholder:text-dark-600 border-dark-500 focus-visible:ring-0 focus-visible:ring-offset-0"
        disabled={disabled}
      />
    </FormControl>
  )
);

const RadioField = memo(
  ({ field, radioOptions, radioGridClass }: RadioFieldProps) => (
    <FormControl>
      <RadioGroup
        onValueChange={field.onChange}
        defaultValue={field.value}
        className={cn("grid", radioGridClass)}
      >
        {radioOptions?.map((option: RadioOptionType) => (
          <FormItem
            className="flex items-center space-x-3 space-y-0 card-radio"
            key={option.value}
          >
            <FormControl>
              <RadioGroupItem value={option.value} className="hidden" />
            </FormControl>
            <FormLabel className="font-normal text-center text-md h-full p-4 border rounded-lg cursor-pointer hover:bg-gray-100 flex flex-col items-center justify-center w-full">
              {option.icon && <option.icon />}
              {option.label}
            </FormLabel>
          </FormItem>
        ))}
      </RadioGroup>
    </FormControl>
  )
);

const ComboboxField = memo(
  ({ field, comboboxOption, placeholder }: ComboboxFieldProps) => (
    <FormControl>
      <Combobox
        value={field.value}
        onChange={field.onChange}
        options={comboboxOption || []}
        placeholder={placeholder}
        searchPlaceholder="Search"
      />
    </FormControl>
  )
);

const QuantityField = memo(
  ({ field, min = 1, max = 99 }: QuantityFieldProps) => (
    <FormControl>
      <QuantityController
        value={field.value || 1}
        onIncrement={() => field.onChange(Math.min(field.value + 1, max))}
        onDecrement={() => field.onChange(Math.max(field.value - 1, min))}
        onChange={(value) => field.onChange(value)}
        min={min}
        max={max}
      />
    </FormControl>
  )
);

const renderDatePickerValue = (
  value: Date | Date[] | null | undefined,
  multipleDates?: boolean
): React.ReactNode => {
  if (!value) {
    return <span>{multipleDates ? "Pick dates" : "Pick a date"}</span>;
  }

  if (multipleDates && Array.isArray(value)) {
    if (value.length === 0) {
      return <span>Pick dates</span>;
    }
    return value.length === 1
      ? format(value[0], "PPP")
      : `${value.length} dates selected`;
  }

  return format(value as Date, "PPP");
};

const RadioCardField = memo(
  ({ field, radioCardoptions }: RadioCardFieldProps) => (
    <FormControl>
      <RadioGroup
        onValueChange={field.onChange}
        value={field.value}
        className="grid grid-cols-3"
      >
        {radioCardoptions?.map((option) => (
          <div key={option.value} className="relative col-span-1">
            <RadioGroupItem
              value={option.value}
              id={option.value}
              className="peer absolute opacity-0 w-0 h-0"
            />
            <label
              htmlFor={option.value}
              className={cn(
                "cursor-pointer transition-all relative inline-block",
                "peer-checked:border-primary peer-checked:bg-primary/10"
              )}
            >
              <div
                className={cn(
                  "absolute top-[-10px] right-[-5px] text-white rounded-full p-1 z-10 bg-blue-500",
                  field.value === option.value ? "opacity-100" : "opacity-0"
                )}
              >
                <Check className="h-3 w-3" />
              </div>
              {option.content}
            </label>
          </div>
        ))}
      </RadioGroup>
    </FormControl>
  )
);
const fieldComponents = {
  [FormFieldType.INPUT]: InputField,
  [FormFieldType.SELECT]: SelectField,
  [FormFieldType.DATE_PICKER]: DatePickerField,
  [FormFieldType.CHECKBOX]: CheckboxField,
  [FormFieldType.TEXTAREA]: TextareaField,
  [FormFieldType.RADIO]: RadioField,
  [FormFieldType.COMBOBOX]: ComboboxField,
  [FormFieldType.QUANTITY_CONTROLLER]: QuantityField,
  [FormFieldType.RADIO_CARD]: RadioCardField,
};

function RenderField<T extends FieldValues>({
  field,
  props,
}: RenderFieldProps<T>): React.ReactElement | null {
  const FieldComponent =
    fieldComponents[props.fieldType as keyof typeof fieldComponents];
  if (!FieldComponent) return null;

  return <FieldComponent field={field} {...props} />;
}

function CustomFormField<T extends FieldValues>(
  props: CustomFormFieldProps<T>
): React.ReactElement {
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

export default memo(CustomFormField) as typeof CustomFormField;
