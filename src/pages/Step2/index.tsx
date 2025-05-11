import { type FileState, useFileActions, useFileStore } from "@/stores";
import { Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { fileSchema } from "@/schemas";
import FileUpload from "@/components/FileUpload";
import { useStepForm } from "@/hooks/useStepForm";

const Step2 = () => {
  const { setFileState } = useFileActions();
  const stateValue = useFileStore();

  const onValidSubmit = async (data: FileState) => {
    setFileState(data);
  };
  const { control } = useStepForm<FileState>({
    onValid: onValidSubmit,
    resolver: zodResolver(fileSchema),
    defaultValues: stateValue,
  });
  return (
    <div className="size-full overflow-auto py-1">
      <form className="flex flex-col items-center justify-center gap-5">
        <Controller
          name="idCardFront"
          control={control}
          render={({
            field: { onChange, value, ...rest },
            fieldState: { error },
          }) => {
            return (
              <FileUpload
                label="ID Card Front"
                required
                errorMessage={error?.message}
                onChange={(value) => {
                  onChange(value && value?.length > 0 ? value[0] : value);
                }}
                value={value && [value]}
                {...rest}
              />
            );
          }}
        />
        <Controller
          name="idCardBack"
          control={control}
          render={({
            field: { onChange, value, ...rest },
            fieldState: { error },
          }) => {
            return (
              <FileUpload
                label="ID Card Back"
                required
                errorMessage={error?.message}
                onChange={(value) => {
                  onChange(value && value?.length > 0 ? value[0] : value);
                }}
                value={value ? [value] : []}
                {...rest}
              />
            );
          }}
        />
        <Controller
          name="extraDocs"
          control={control}
          render={({ field, fieldState: { error } }) => {
            return (
              <FileUpload
                label="Additional Documents"
                multiple
                errorMessage={error?.message}
                {...field}
              />
            );
          }}
        />
      </form>
    </div>
  );
};

export default Step2;
