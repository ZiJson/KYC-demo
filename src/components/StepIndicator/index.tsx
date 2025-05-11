import { useBeforeNext, useCurrentStep, useStepActions } from "@/stores";
import { Children, isValidElement, useEffect } from "react";
import Button from "@/components/Button";

interface StepIndicatorProps {
  children: React.ReactNode;
}

const StepIndicator = ({ children }: StepIndicatorProps) => {
  const currentStep = useCurrentStep();
  const beforeNext = useBeforeNext();
  const { setTotalSteps, onPrev } = useStepActions();

  const stepElements = Children.toArray(children).filter(
    (child) => isValidElement(child) && child.type === Step,
  );
  const isLastStep = currentStep === stepElements.length - 1;

  useEffect(() => {
    setTotalSteps(stepElements.length);
  }, [stepElements, setTotalSteps]);

  const handleNext = () => {
    beforeNext?.();
  };

  return (
    <div className="relative flex size-full justify-center gap-5">
      <div className="absolute -top-5 right-0 left-0 flex h-1 items-center gap-2">
        <ProgressBar
          currentStep={currentStep}
          totalSteps={stepElements.length}
        />
      </div>
      <div className="w-full">{stepElements[currentStep]}</div>
      <div className="absolute right-0 bottom-0 left-0 flex w-full justify-between gap-2">
        {currentStep > 0 && (
          <Button variant="secondary" onClick={onPrev}>
            Back
          </Button>
        )}
        <div></div>
        <Button variant="primary" onClick={handleNext}>
          {isLastStep ? "Submit" : "Next"}
        </Button>
      </div>
    </div>
  );
};

interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
}

const ProgressBar = ({ currentStep, totalSteps }: ProgressBarProps) => {
  return (
    <div className="relative h-1 w-full overflow-hidden rounded-full bg-gray-200">
      <div
        className="bg-primary absolute inset-0 rounded-full transition-all duration-500"
        style={{ width: `${(currentStep / (totalSteps - 1)) * 100}%` }}
      />
    </div>
  );
};

interface StepProps {
  title: string;
  children: React.ReactNode;
}
const Step = ({ children, title }: StepProps) => {
  return (
    <div className="flex size-full flex-col items-center gap-2">
      <h3 className="text-lg font-bold text-gray-800">{title}</h3>
      {children}
    </div>
  );
};

StepIndicator.Step = Step;

export default StepIndicator;
