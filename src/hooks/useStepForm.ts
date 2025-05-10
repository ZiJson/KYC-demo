import { useStepActions } from "@/stores";
import { useEffect } from "react";
import {
  useForm,
  type DefaultValues,
  type FieldValues,
  type Resolver,
} from "react-hook-form";

interface UseStepFormProps<T extends FieldValues> {
  onValid: (data: T) => void;
  resolver: Resolver<T>;
  defaultValues: DefaultValues<T>;
}

// 封装 useForm 和 useStepActions 的逻辑
// 让 formSubmit 可以注册在 StepIndicator 的 next Button 上
export const useStepForm = <T extends FieldValues>({
  onValid,
  resolver,
  defaultValues,
}: UseStepFormProps<T>) => {
  const { setBeforeNext, onNext } = useStepActions();
  const { handleSubmit, control } = useForm<T>({
    resolver,
    mode: "onBlur",
    defaultValues,
  });

  const handleValidSubmit = (data: T) => {
    onValid(data);
    onNext();
  };

  useEffect(() => {
    setBeforeNext(handleSubmit(handleValidSubmit));
    return () => setBeforeNext(null);
  }, []);

  return { control };
};
