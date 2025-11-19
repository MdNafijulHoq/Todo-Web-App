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
import { Checkbox } from "../ui/checkbox";
import { Label } from "../ui/label";
import { useState } from "react";
import { loginSchema } from "@/zodValidation/loginValidation";
import { toast } from "sonner";
import { loginUser } from "@/services/auth/loginUser";
import { useRouter } from "next/navigation";

export function LogInForm({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();

  // Define form.
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // submit handler
  async function onSubmit(values: z.infer<typeof loginSchema>) {
    setIsLoading(true);
    const toastId = toast.loading("Logging user...");
    try {
      const result = await loginUser(values);
      // console.log({ result });

      if (result.success) {
        toast.success(result.message, { id: toastId });
        form.reset();
        router.push("/profile");
      } else if (result.error === "User not found") {
        toast.error(result.message, { id: toastId });
      } else {
        toast.error(result.message, { id: toastId });
      }
    } catch (error: any) {
      console.log({ error });

      toast.error(error.message, { id: toastId });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className={cn("flex flex-col", className)} {...props}>
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-3xl font-bold">Log in to your account</h1>
        <p className="text-muted-foreground text-[16px]">
          Start managing your tasks efficiently
        </p>
      </div>
      <div className="mt-10 grid gap-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-3">
                <Checkbox id="terms" />
                <Label htmlFor="terms">Remember me</Label>
              </div>
              <span className="text-[#5272FF] font-medium text-[14px] cursor-pointer">
                Forgot your password?
              </span>
            </div>
            <Button
              disabled={isLoading}
              type="submit"
              className="w-full bg-[#5272FF] text-white cursor-pointer"
            >
              {isLoading ? "Logging..." : "Log In"}
            </Button>
          </form>
        </Form>
      </div>
      <div className="mt-3 text-center text-[16px] font-normal text-[#4B5563]">
        Don’t have an account?{" "}
        <Link
          href="/signup"
          className="hover:underline hover:underline-offset-4 text-[#5272FF] font-medium"
        >
          Register now
        </Link>
      </div>
    </div>
  );
}
