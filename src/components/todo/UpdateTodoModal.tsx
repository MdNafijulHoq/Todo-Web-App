/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { CalendarDays, Loader, X } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import LabelWithInput from "../shared/LabelWithInput";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { Calendar } from "../ui/calendar";
import PriorityOption from "../shared/PriorityOption";
import { Textarea } from "../ui/textarea";
import { useState } from "react";
import { IUpdateTodo, TodoFormState } from "@/types/interfaces";
import { Checkbox } from "../ui/checkbox";
import { updateTodo } from "@/services/todo/updateTodo";
import { toast } from "sonner";
import { getTodo } from "@/services/todo/getTodo";

const UpdateTodoModal = ({
  closeUpdateModal,
  singleTodo,
  onTodoUpdate,
}: IUpdateTodo) => {
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [formData, setFormData] = useState<TodoFormState>(() => ({
    title: singleTodo?.title || "",
    formattedDate: singleTodo?.todo_date || "",
    priority: singleTodo?.priority || "",
    description: singleTodo?.description || "",
    is_completed: singleTodo?.is_completed || false,
  }));
  const [loading, setLoading] = useState<boolean>(false);

  const handleDateSelect = (selectedDate: Date | undefined) => {
    setDate(selectedDate);
    if (selectedDate) {
      const year = selectedDate.getFullYear();
      const month = String(selectedDate.getMonth() + 1).padStart(2, "0");
      const day = String(selectedDate.getDate()).padStart(2, "0");
      const formatted = `${year}-${month}-${day}`;

      setFormData((prev) => ({ ...prev, formattedDate: formatted }));
    } else {
      setFormData((prev) => ({ ...prev, formattedDate: "" }));
    }
    setOpen(false);
  };

  const handleInputChange = (
    field: keyof TodoFormState,
    value: string | boolean
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const toastId = toast.loading("Updating Todo...");
    try {
      // console.log({ formData });
      const result = await updateTodo(formData, singleTodo?.id as number);
      // console.log("result from client", result);
      if (result.success) {
        toast.success(result.message, { id: toastId });
        const fetchLatestData = await getTodo();
        onTodoUpdate(fetchLatestData);
        closeUpdateModal();
      } else if (result.error === "Format missmatched") {
        toast.error(result.message, { id: toastId });
      } else {
        toast.error(result.message, { id: toastId });
      }
    } catch (error: any) {
      console.log({ error });
      toast.error(error.message, { id: toastId });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg max-w-xl w-full p-6 space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between text-black">
        <h3 className="text-xl font-semibold">Update Todo</h3>
        <button
          onClick={closeUpdateModal}
          type="button"
          className="cursor-pointer"
        >
          <X />
        </button>
      </div>
      <div className="mt-2 flex flex-col w-full grow overflow-y-auto">
        <form onSubmit={handleFormSubmit} className="space-y-3">
          {/* Title */}
          <LabelWithInput
            label="Title"
            placeHolder="Enter title"
            name="title"
            value={formData.title}
            onChange={(e) => handleInputChange("title", e.target.value)}
          />
          {/* Date */}
          <div className="flex flex-col gap-3">
            <Label htmlFor="date" className="px-1">
              Date
            </Label>
            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  id="date"
                  className="w-full h-11 justify-between font-normal cursor-pointer"
                >
                  {formData.formattedDate || date
                    ? date?.toLocaleDateString() || formData.formattedDate
                    : "Select date"}
                  <CalendarDays />
                </Button>
              </PopoverTrigger>
              <PopoverContent
                className="w-auto overflow-hidden p-0"
                align="start"
              >
                <Calendar
                  mode="single"
                  selected={date}
                  captionLayout="dropdown"
                  onSelect={handleDateSelect}
                />
              </PopoverContent>
            </Popover>
          </div>
          {/* Priority Selection */}
          <div className="flex flex-col gap-3">
            <Label className="px-1">Priority</Label>
            <div className="flex gap-6">
              <PriorityOption
                value="extreme"
                label="Extreme"
                color="bg-red-500"
                priority={formData.priority}
                onChange={(value) => handleInputChange("priority", value)}
              />
              <PriorityOption
                value="moderate"
                label="Moderate"
                color="bg-yellow-500"
                priority={formData.priority}
                onChange={(value) => handleInputChange("priority", value)}
              />
              <PriorityOption
                value="low"
                label="Low"
                color="bg-green-500"
                priority={formData.priority}
                onChange={(value) => handleInputChange("priority", value)}
              />
            </div>
          </div>
          {/* Description */}
          <div className="grid w-full gap-3 mt-4">
            <Label className="font-semibold text-[16px] text-black">
              Description
            </Label>
            <Textarea
              className="px-3.5 py-2.5 bg-white placeholder:text-[#717680] min-h-[150px]"
              placeholder="Start writing here..."
              name="description"
              value={formData.description}
              onChange={(e) => handleInputChange("description", e.target.value)}
            />
          </div>
          {/* isCompleted */}
          <div className="flex items-center gap-3">
            <Checkbox
              className="cursor-pointer"
              id="is_completed"
              checked={formData.is_completed}
              onCheckedChange={(checked) =>
                handleInputChange("is_completed", checked === true)
              }
            />
            <Label htmlFor="is_completed" className="cursor-pointer">
              Mark as complete
            </Label>
          </div>
          <div className="mt-5 flex justify-between gap-x-3">
            <Button
              disabled={loading}
              type="submit"
              size="lg"
              className="w-36 cursor-pointer bg-[#5272FF] hover:bg-[#4356ab]"
            >
              {loading ? (
                <Loader className="animate-spin size-6" />
              ) : (
                "Update Todo"
              )}
            </Button>
            <Button
              type="button"
              onClick={closeUpdateModal}
              size="lg"
              className="bg-[#EE0039] hover:bg-red-500 cursor-pointer rounded-lg"
            >
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateTodoModal;
