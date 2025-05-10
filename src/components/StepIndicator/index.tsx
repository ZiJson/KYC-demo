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

  useEffect(() => {
    setTotalSteps(stepElements.length);
  }, [stepElements, setTotalSteps]);

  const handleNext = () => {
    beforeNext?.();
  };

  return (
    <div className="flex size-full flex-col items-center justify-center gap-5">
      <div className="w-full grow">{stepElements[currentStep]}</div>
      <div className="flex w-full justify-between gap-2">
        {currentStep > 0 && (
          <Button variant="secondary" onClick={onPrev}>
            Back
          </Button>
        )}
        <div></div>
        <Button variant="primary" onClick={handleNext}>
          Next
        </Button>
      </div>
    </div>
  );
};

interface StepProps {
  title: string;
  children: React.ReactNode;
}
const Step = ({ children }: StepProps) => {
  return <div className="flex flex-col items-center gap-2">{children}</div>;
};

StepIndicator.Step = Step;

export default StepIndicator;
