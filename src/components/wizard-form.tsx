import * as React from "react";
import type { UseFormReturn, FieldValues, Path } from "react-hook-form";
import type { z } from "zod";

import { Form } from "@/components/ui/form";
import {
  Wizard,
  WizardProgress,
  WizardButtons,
  useWizard,
} from "@/components/ui/wizard";
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
  form,
  stepFields = {},
}: WizardFormProps<T>) {
  return (
    <Form {...form}>
      <form onSubmit={(e) => e.preventDefault()}>
        <Wizard totalSteps={React.Children.count(children)}>
          <WizardFormContent
            onSubmit={onSubmit}
            form={form}
            stepFields={stepFields}
          >
            <WizardProgress className="mb-8" />
            {children}
          </WizardFormContent>
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

function WizardFormContent<T extends FieldValues>({
  onSubmit,
  form,
  stepFields,
  children,
}: WizardFormContentProps<T>) {
  const {
    setSubmittedData,
    // ,
    // currentStep
  } = useWizard();

  // Handle form completion with visible steps
  const handleComplete = (visibleSteps: number[]) => {
    // Only validate fields from visible steps
    const fieldsToValidate = visibleSteps.flatMap(
      (step) => stepFields[step] || []
    );

    // Custom submit handler that only validates visible fields
    const customSubmit = async () => {
      try {
        console.log("Submitting form with visible steps:", visibleSteps);
        console.log("Fields to validate:", fieldsToValidate);

        // If there are fields to validate, trigger validation
        if (fieldsToValidate.length > 0) {
          const isValid = await form.trigger(fieldsToValidate as Path<T>[]);
          console.log("Validation result:", isValid);

          if (!isValid) {
            toast("Validation Error", {
              description: "Please check your inputs and try again.",
            });
            return;
          }
        }

        // Get the form values and submit
        const values = form.getValues();
        console.log("Form values:", values);

        // Store the submitted data in the wizard context
        setSubmittedData(values);

        // Call the onSubmit function directly
        onSubmit(values);

        // Show a success toast
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
  };

  return (
    <>
      {children}
      <WizardButtons onComplete={handleComplete} />
    </>
  );
}
