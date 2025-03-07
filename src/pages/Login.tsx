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
import { OtpModal } from "@/components/otp-modal";

const loginFormSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters long.",
  }),
});

const Login = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);

  const form = useForm<z.infer<typeof loginFormSchema>>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  function onSubmit(values: z.infer<typeof loginFormSchema>) {
    console.log(values);
    setOpen(true);
  }

  function handleTogglePassword() {
    setShowPassword((el) => !el);
  }

  return (
    <div className="flex min-h-svh flex-col items-center justify-center bg-muted">
      <div className="w-full md:max-w-4xl">
        <div className="flex flex-col gap-6">
          <Card className="overflow-hidden">
            <CardContent className="grid p-0 md:grid-cols-2">
              <Form {...form}>
                <form
                  className="p-6 md:p-8"
                  onSubmit={form.handleSubmit(onSubmit)}
                >
                  <div className="flex flex-col gap-6">
                    <div className="flex flex-col items-center text-center">
                      <h1 className="text-2xl font-bold">Welcome back</h1>
                      <p className="text-balance text-muted-foreground">
                        Login to your XOXO account
                      </p>
                    </div>
                    <div className="grid gap-2">
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                              <Input
                                type="email"
                                placeholder="Enter Email"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className="grid gap-2">
                      <div className="flex items-center">
                        <a
                          href="#"
                          className="ml-auto text-sm underline-offset-2 hover:underline"
                        ></a>
                      </div>
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
                                />
                              ) : (
                                <EyeOff
                                  className="absolute right-2 top-[5px] cursor-pointer"
                                  onClick={handleTogglePassword}
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
                    <Button type="submit" className="w-full cursor-pointer">
                      Login
                    </Button>
                    <div className="text-center text-sm">
                      Don&apos;t have an account?
                      <a href="#" className="underline underline-offset-4 ml-2">
                        Sign up
                      </a>
                    </div>
                  </div>
                </form>
              </Form>
              <div className="relative hidden bg-muted md:block">
                <img
                  src="images/login.jpg"
                  alt="Image"
                  className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
                />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      {open && <OtpModal open={open} setOpen={setOpen} />}
    </div>
  );
};

export default Login;
