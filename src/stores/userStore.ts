import type { userSchema } from "@/schemas";
import type { z } from "zod";
import { create } from "zustand";

export const defaultUserState: UserState = {
  name: "",
  email: "",
  phone: "",
  nationality: "",
  gender: null,
  address: "",
  birthdate: 0,
};

export type UserState = z.infer<typeof userSchema>;
type UserActions = {
  setUserState: (userState: UserState) => void;
};
type UserStore = UserState & { actions: UserActions };

export const useUserStore = create<UserStore>((set) => ({
  ...defaultUserState,
  actions: {
    setUserState: (userState) => set(userState),
  },
}));

export const useUserActions = () => useUserStore((state) => state.actions);
