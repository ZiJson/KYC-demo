import type { fileSchema } from "@/schemas";
import type { z } from "zod";
import { create } from "zustand";

export const defaultFileState: FileState = {
  idCardFront: {} as File,
  idCardBack: {} as File,
  extraDocs: [],
};

export type FileState = z.infer<typeof fileSchema>;
type FileActions = {
  setFileState: (fileState: FileState) => void;
};

type FileStore = FileState & { actions: FileActions };

export const useFileStore = create<FileStore>((set) => ({
  ...defaultFileState,

  actions: {
    setFileState: (fileState) => set(fileState),
  },
}));

export const useFileActions = () => useFileStore((state) => state.actions);

// export const useIdCardF = fileStore((state) => state.idCardFront);
// export const useIdCardB = fileStore((state) => state.idCardBack);
// export const useExtraDocs = fileStore((state) => state.extraDocs);
// export const useFileActions = fileStore((state) => state.actions);
