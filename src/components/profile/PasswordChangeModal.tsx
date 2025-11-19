/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Eye, EyeOff, Loader, X } from "lucide-react";
import { useState } from "react";
import { Button } from "../ui/button";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { changePassSchema } from "@/zodValidation/changePasswordValidation";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { changePassword } from "@/services/profile/changePassword";
import { checkRequiredField } from "@/utils/validateField";

const PasswordChangeModal = ({ onClose }: { onClose: () => void }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const form = useForm<z.infer<typeof changePassSchema>>({
    resolver: zodResolver(changePassSchema),
    defaultValues: {
      oldpass: "",
      newpass: "",
    },
  });

  // submit handler
  async function onSubmit(values: z.infer<typeof changePassSchema>) {
    setIsLoading(true);
    const toastId = toast.loading("Changing password...");
    if (!checkRequiredField(values.oldpass, "Old Password")) return;
    if (!checkRequiredField(values.newpass, "New Password")) return;
    try {
      //   console.log({ values });
      const result = await changePassword(values);
    //   console.log({ result });

      if (result.success) {
        toast.success(result.message, { id: toastId });
        form.reset();
        onClose();
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
    <div className="bg-white rounded-lg shadow-lg max-w-xl w-full p-6 space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between text-black">
        <h3 className="text-xl font-semibold">Change Password</h3>
        <button onClick={onClose} type="button" className="cursor-pointer">
          <X />
        </button>
      </div>
      <div className="mt-10 grid gap-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="oldpass"
              render={({ field }) => (
                <FormItem className="relative">
                  <FormLabel>Old Password</FormLabel>
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
              name="newpass"
              render={({ field }) => (
                <FormItem className="relative">
                  <FormLabel>New Password</FormLabel>
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
                      showPassword ? "Hide password" : "Show password"
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
            <div className="mt-5 flex justify-center gap-x-3">
              <Button
                disabled={isLoading}
                type="submit"
                size="lg"
                className="w-36 cursor-pointer bg-[#5272FF] hover:bg-[#4356ab]"
              >
                {isLoading ? (
                  <Loader className="animate-spin size-6" />
                ) : (
                  "Submit"
                )}
              </Button>
              <Button
                onClick={onClose}
                type="button"
                size="lg"
                className="bg-[#EE0039] w-36 hover:bg-red-500 cursor-pointer rounded-lg"
              >
                Cancel
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default PasswordChangeModal;
