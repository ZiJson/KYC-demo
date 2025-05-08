import type { userSchema } from "@/schemas";
import type { z } from "zod";
import { create } from "zustand";

type UserState = z.infer<typeof userSchema>;
type UserActions = {
  setName: (name: string) => void;
  setEmail: (email: string) => void;
  setPhone: (phone: string) => void;
  setNationality: (nationality: string) => void;
  setGender: (gender: UserState["gender"]) => void;
  setAddress: (address: string) => void;
  setBirthdate: (birthdate: Date) => void;
};
type UserStore = UserState & { actions: UserActions };

const userStore = create<UserStore>((set) => ({
  name: "",
  email: "",
  phone: "",
  nationality: "",
  gender: null,
  address: "",
  birthdate: new Date(),

  actions: {
    setName: (name) => set({ name }),
    setEmail: (email) => set({ email }),
    setPhone: (phone) => set({ phone }),
    setNationality: (nationality) => set({ nationality }),
    setGender: (gender) => set({ gender }),
    setAddress: (address) => set({ address }),
    setBirthdate: (birthdate) => set({ birthdate }),
  },
}));

export const useUserName = userStore((state) => state.name);
export const useUserEmail = userStore((state) => state.email);
export const useUserPhone = userStore((state) => state.phone);
export const useUserNationality = userStore((state) => state.nationality);
export const useUserGender = userStore((state) => state.gender);
export const useUserAddress = userStore((state) => state.address);
export const useUserBirthdate = userStore((state) => state.birthdate);
export const useUserActions = userStore((state) => state.actions);
