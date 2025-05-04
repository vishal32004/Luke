import * as React from "react";
import type { UseFormReturn, FieldValues, Path } from "react-hook-form";
import type { z } from "zod";

import { Form } from "@/components/ui/form";
import { Wizard, WizardButtons, useWizard } from "@/components/ui/wizard";
import { toast } from "sonner";

interface WizardFormProps<T extends z.ZodType> {
  onSubmit: (values: z.infer<T>) => void;
  children: React.ReactNode;
  className?: string;
  form: UseFormReturn<z.infer<T>>;
  stepFields?: { [key: number]: string[] };
}

export function WizardForm<T extends z.ZodType>({
  onSubmit,
  children,
  className,
  form,
  stepFields = {},
}: WizardFormProps<T>) {
  return (
    <Form {...form}>
      <form onSubmit={(e) => e.preventDefault()} className={className}>
        <Wizard totalSteps={React.Children.count(children)}>
          <MemoizedWizardFormContent
            onSubmit={onSubmit}
            form={form}
            stepFields={stepFields}
          >
            {children}
          </MemoizedWizardFormContent>
        </Wizard>
      </form>
    </Form>
  );
}
interface WizardFormContentProps<T extends FieldValues> {
  onSubmit: (values: T) => void;
  form: UseFormReturn<T>;
  stepFields: { [key: number]: string[] };
  children: React.ReactNode;
}

const MemoizedWizardFormContent = React.memo(function WizardFormContent<
  T extends FieldValues
>({ onSubmit, form, stepFields, children }: WizardFormContentProps<T>) {
  const { setSubmittedData } = useWizard();

  const handleComplete = React.useCallback(
    (visibleSteps: number[]) => {
      const fieldsToValidate = visibleSteps.flatMap(
        (step) => stepFields[step] || []
      );

      const customSubmit = async () => {
        try {
          console.log("Submitting form with visible steps:", visibleSteps);
          console.log("Fields to validate:", fieldsToValidate);
          if (fieldsToValidate.length > 0) {
            const isValid = await form.trigger(fieldsToValidate as Path<T>[]);
            console.log("Validation result:", isValid);

            if (!isValid) {
              console.log("validation error");
              return;
            }
          }

          const values = form.getValues();
          console.log("Form values:", values);

          setSubmittedData(values);

          onSubmit(values);

          toast("Form submitted!", {
            description: "Thank you for completing the wizard form.",
          });
        } catch (error) {
          console.error("Form submission error:", error);
          toast("Error", {
            description: "There was a problem submitting the form.",
          });
        }
      };

      customSubmit();
    },
    [form, setSubmittedData, onSubmit, stepFields]
  );

  return (
    <>
      {children}
      <WizardButtons onComplete={handleComplete} />
    </>
  );
});
