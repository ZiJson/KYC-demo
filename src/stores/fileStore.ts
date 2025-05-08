import type { fileSchema } from "@/schemas";
import type { z } from "zod";
import { create } from "zustand";

type FileState = z.infer<typeof fileSchema>;
type FileActions = {
  setFront: (file: File) => void;
  setBack: (file: File) => void;
  addExtraDoc: (file: File) => void;
  removeExtraDoc: (index: number) => void;
};

type FileStore = FileState & { actions: FileActions };

const fileStore = create<FileStore>((set) => ({
  idCardFront: null,
  idCardBack: null,
  extraDocs: [],

  actions: {
    setFront: (file) => set({ idCardFront: file }),
    setBack: (file) => set({ idCardBack: file }),
    addExtraDoc: (file) =>
      set((state) => ({ extraDocs: [...state.extraDocs, file] })),
    removeExtraDoc: (index) =>
      set((state) => ({
        extraDocs: state.extraDocs.filter((_, i) => i !== index),
      })),
  },
}));

export const useIdCardF = fileStore((state) => state.idCardFront);
export const useIdCardB = fileStore((state) => state.idCardBack);
export const useExtraDocs = fileStore((state) => state.extraDocs);
export const useFileActions = fileStore((state) => state.actions);
