import { create } from "zustand";

type StepState = {
  currentStep: number;
  totalSteps: number;
  beforeNext?: (() => Promise<void>) | null;
};

type StepActions = {
  onNext: () => void;
  onPrev: () => void;
  setTotalSteps: (totalSteps: number) => void;
  setBeforeNext: (beforeNext: (() => Promise<void>) | null) => void;
};

type StepStore = StepState & { actions: StepActions };

export const useStepStore = create<StepStore>((set) => ({
  currentStep: 0,
  totalSteps: 0,
  beforeNext: null,

  actions: {
    onNext: () =>
      set((state) => {
        return {
          currentStep: Math.min(state.currentStep + 1, state.totalSteps - 1),
        };
      }),
    onPrev: () =>
      set((state) => ({ currentStep: Math.max(state.currentStep - 1, 0) })),
    setTotalSteps: (totalSteps) => set({ totalSteps }),
    setBeforeNext: (beforeNext) => set({ beforeNext }),
  },
}));

export const useCurrentStep = () => useStepStore((state) => state.currentStep);
export const useBeforeNext = () => useStepStore((state) => state.beforeNext);
export const useStepActions = () => useStepStore((state) => state.actions);
