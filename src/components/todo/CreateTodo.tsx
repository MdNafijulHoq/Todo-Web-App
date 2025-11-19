/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { CalendarDays, Loader, Trash, X } from "lucide-react";
import LabelWithInput from "../shared/LabelWithInput";
import { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import PriorityOption from "../shared/PriorityOption";
import { Textarea } from "../ui/textarea";
import { createTodo } from "@/services/todo/createTodo";
import { toast } from "sonner";
import { getTodo } from "@/services/todo/getTodo";
import { ICreateTodo } from "@/types/interfaces";
import { checkRequiredField } from "@/utils/validateField";

const CreateTodo = ({ closeModal, setTodos }: ICreateTodo) => {
  const [title, setTitle] = useState<string>("");
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [formattedDate, setFormattedDate] = useState<string>("");
  const [priority, setPriority] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleDateSelect = (selectedDate: Date | undefined) => {
    setDate(selectedDate);

    if (selectedDate) {
      const year = selectedDate.getFullYear();
      const month = String(selectedDate.getMonth() + 1).padStart(2, "0");
      const day = String(selectedDate.getDate()).padStart(2, "0");
      const formatted = `${year}-${month}-${day}`;

      setFormattedDate(formatted);
    } else {
      setFormattedDate("");
    }

    setOpen(false);
  };

  const handleClose = () => {
    setTitle("");
    setFormattedDate("");
    setPriority("");
    setDescription("");
    closeModal();
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!checkRequiredField(title, "Title")) return;
    if (!checkRequiredField(formattedDate, "Date")) return;
    if (!checkRequiredField(priority, "Priority")) return;
    if (!checkRequiredField(description, "Description")) return;
    setLoading(true);
    const toastId = toast.loading("Creating Todo...");
    try {
      const values = {
        title,
        formattedDate,
        priority,
        description,
      };
      const result = await createTodo(values);
      //   console.log("result from client site", result);
      if (result.success) {
        toast.success(result.message, { id: toastId });
        const fetchLatestData = await getTodo();
        setTodos(fetchLatestData);
        setTitle("");
        setFormattedDate("");
        setPriority("");
        setDescription("");
        closeModal();
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
        <h3 className="text-xl font-semibold">Add New Task</h3>
        <button onClick={handleClose} type="button" className="cursor-pointer">
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
            value={title}
            onChange={(e) => setTitle(e.target.value)}
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
                  {formattedDate || date
                    ? date?.toLocaleDateString() || formattedDate
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
                priority={priority}
                onChange={setPriority}
              />
              <PriorityOption
                value="moderate"
                label="Moderate"
                color="bg-yellow-500"
                priority={priority}
                onChange={setPriority}
              />
              <PriorityOption
                value="low"
                label="Low"
                color="bg-green-500"
                priority={priority}
                onChange={setPriority}
              />
            </div>
          </div>
          <div className="grid w-full gap-3 mt-4">
            <Label className="font-semibold text-[16px] text-black">
              Description
            </Label>
            <Textarea
              className="px-3.5 py-2.5 bg-white placeholder:text-[#717680] min-h-[150px]"
              placeholder="Start writing here..."
              name="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div className="mt-5 flex justify-between gap-x-3">
            <Button
              disabled={loading}
              type="submit"
              size="lg"
              className="w-36 cursor-pointer bg-[#5272FF] hover:bg-[#4356ab]"
            >
              {loading ? <Loader className="animate-spin size-6" /> : "Done"}
            </Button>
            <Button
              onClick={handleClose}
              type="button"
              size="lg"
              className="bg-[#EE0039] hover:bg-red-500 cursor-pointer rounded-lg"
            >
              <Trash color="white" />
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateTodo;
