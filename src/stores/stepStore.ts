import { create } from "zustand";

type StepState = {
  currentStep: number;
};

type StepActions = {
  setCurrentStep: (step: number) => void;
};

type StepStore = StepState & { actions: StepActions };

const stepStore = create<StepStore>((set) => ({
  currentStep: 0,

  actions: {
    setCurrentStep: (step) => set({ currentStep: step }),
  },
}));

export const useCurrentStep = stepStore((state) => state.currentStep);
export const useStepActions = stepStore((state) => state.actions);
