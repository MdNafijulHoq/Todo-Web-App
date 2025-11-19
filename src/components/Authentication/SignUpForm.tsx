/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { cn } from "@/lib/utils";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "../ui/input";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "../ui/button";
import Link from "next/link";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { signUpSchema } from "@/zodValidation/signupValidation";
import { registerUser } from "@/services/auth/registerUser";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export function SignUpForm({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();

  // Define form.
  const form = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  // submit handler
  async function onSubmit(values: z.infer<typeof signUpSchema>) {
    setIsLoading(true);
    const toastId = toast.loading("Creating account...");
    try {
      const result = await registerUser(values);
      // console.log({ result });

      if (result.success) {
        toast.success(result.message, { id: toastId });
        form.reset();
        router.push("/login");
      } else if (result.error === "User exist") {
        toast.warning(result.message, { id: toastId });
      } else {
        toast.error(result.message, { id: toastId });
      }
    } catch (error: any) {
      toast.error(error.message, { id: toastId });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className={cn("flex flex-col", className)} {...props}>
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-3xl font-bold">Create your account</h1>
        <p className="text-muted-foreground text-[16px]">
          Start managing your tasks efficiently
        </p>
      </div>
      <div className="mt-10 grid gap-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>First Name</FormLabel>
                    <FormControl>
                      <Input placeholder="John" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Last Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Doe" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="john@gmail.com"
                      suppressHydrationWarning
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem className="relative">
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      type={showPassword ? "text" : "password"}
                      placeholder="********"
                      className="pr-10"
                      {...field}
                    />
                  </FormControl>

                  <button
                    type="button"
                    onClick={() => setShowPassword((v) => !v)}
                    aria-label={
                      showPassword ? "Hide password" : "Show password"
                    }
                    className="absolute right-2 top-10 -translate-y-1/2 inline-flex items-center justify-center p-1 text-gray-500 hover:text-gray-700"
                  >
                    {showPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem className="relative">
                  <FormLabel>Confirm Password</FormLabel>
                  <FormControl>
                    <Input
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="********"
                      className="pr-10"
                      {...field}
                    />
                  </FormControl>

                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword((v) => !v)}
                    aria-label={
                      showConfirmPassword
                        ? "Hide confirm password"
                        : "Show confirm password"
                    }
                    className="absolute right-2 top-10 -translate-y-1/2 inline-flex items-center justify-center p-1 text-gray-500 hover:text-gray-700"
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>

                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              disabled={isLoading}
              type="submit"
              className="w-full bg-[#5272FF] text-white cursor-pointer"
            >
              {isLoading ? "Creating Account..." : "Sign Up"}
            </Button>
          </form>
        </Form>
      </div>
      <div className="mt-3 text-center text-[16px] font-normal text-[#4B5563]">
        Already have an account?{" "}
        <Link
          href="/login"
          className="hover:underline hover:underline-offset-4 text-[#5272FF] font-medium"
        >
          Log in
        </Link>
      </div>
    </div>
  );
}
