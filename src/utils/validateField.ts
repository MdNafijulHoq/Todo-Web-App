import { toast } from "sonner";

export const checkRequiredField = (
  inputName: string,
  placeholderName: string
): boolean => {
  if (!inputName || inputName.trim() === "") {
    toast.warning(`${placeholderName} is required`);
    return false;
  }
  return true;
};
