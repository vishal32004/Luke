import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Eye, EyeOff } from "lucide-react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useState } from "react";
import { OtpModal } from "@/components/Popup/otp-modal";
import { Link } from "react-router-dom";
import CustomFormField from "@/components/Form/CustomFormField";
import { FormFieldType } from "@/types/Form";
import { signupFormSchema } from "@/schema/auth";

const Signup = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);

  const form = useForm<z.infer<typeof signupFormSchema>>({
    resolver: zodResolver(signupFormSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  function onSubmit(values: z.infer<typeof signupFormSchema>) {
    console.log(values);
    setOpen(true);
  }

  function handleTogglePassword() {
    setShowPassword((prev) => !prev);
  }

  return (
    <div className="py-5 flex justify-center">
      <div className="w-full md:max-w-4xl">
        <div className="flex flex-col gap-6 items-center">
          <img
            src="images/logo.jpeg"
            alt="Lukit gifts"
            height={100}
            width={100}
          />
          <Card className="overflow-hidden w-lg">
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                  <div className="flex flex-col gap-6">
                    <div className="flex flex-col items-center text-center">
                      <h1 className="text-2xl font-bold text-first">
                        Create an Account
                      </h1>
                    </div>
                    <div className="grid gap-2">
                      <CustomFormField
                        control={form.control}
                        name="name"
                        fieldType={FormFieldType.INPUT}
                        label="Name"
                        placeholder="Enter Name"
                      />
                    </div>
                    <div className="grid gap-2">
                      <CustomFormField
                        control={form.control}
                        name="email"
                        fieldType={FormFieldType.INPUT}
                        label="Email"
                        placeholder="Enter Email"
                      />
                    </div>
                    <div className="grid gap-2">
                      <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Password</FormLabel>
                            <div className="relative">
                              {showPassword ? (
                                <Eye
                                  className="absolute right-2 top-[5px] cursor-pointer"
                                  onClick={handleTogglePassword}
                                  color="#ff6b6b"
                                />
                              ) : (
                                <EyeOff
                                  className="absolute right-2 top-[5px] cursor-pointer"
                                  onClick={handleTogglePassword}
                                  color="#ff6b6b"
                                />
                              )}
                              <FormControl>
                                <Input
                                  type={showPassword ? "text" : "password"}
                                  placeholder="Enter Password"
                                  {...field}
                                />
                              </FormControl>
                            </div>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className="grid gap-2">
                      <CustomFormField
                        control={form.control}
                        name="confirmPassword"
                        fieldType={FormFieldType.INPUT}
                        inputType="password"
                        label="Confirm Password"
                        placeholder="Enter Confirm Password"
                      />
                    </div>
                    <Button
                      type="submit"
                      className="w-full cursor-pointer bg-first"
                    >
                      Sign Up
                    </Button>
                    <div className="text-center text-sm">
                      Already have an account?
                      <Link
                        to="/login"
                        className="underline underline-offset-4 ml-2"
                      >
                        Login
                      </Link>
                    </div>
                  </div>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
      </div>
      {open && <OtpModal open={open} setOpen={setOpen} />}
    </div>
  );
};

export default Signup;
