import { create } from "zustand";
import { UserState } from "@/types/interfaces";

export const useUserStore = create<UserState>((set) => ({
  user: null,
  setUser: (data) => set({ user: data }),
}));
