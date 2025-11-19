import { Trash2 } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { IDeleteProps } from "@/types/interfaces";

export default function DeleteConfirmation({
  children,
  onConfirm,
}: IDeleteProps) {
  const handleConfirm = () => {
    onConfirm();
  };
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          variant="ghost"
          className="hover:bg-transparent hover:text-current p-0 h-auto"
        >
          {children}
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="flex flex-col gap-6">
        <div className="flex flex-col gap-4 max-sm:items-center sm:flex-row sm:gap-4">
          <div
            className="flex size-9 shrink-0 items-center justify-center rounded-full border-4 border-[#21AAE233]"
            aria-hidden="true"
          >
            <Trash2 className="opacity-80" size={16} color="red" />
          </div>
          <AlertDialogHeader className="space-y-2">
            <AlertDialogTitle>Delete Todo?</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this Todo? This action cannot be
              undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
        </div>
        <AlertDialogFooter>
          <AlertDialogCancel className="cursor-pointer">
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            className="cursor-pointer bg-[#922B21] hover:bg-[#922B21] border border-[#922B21]"
            onClick={handleConfirm}
          >
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
