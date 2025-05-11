import Input from "@/components/Input";
import { type UserState, useUserActions, useUserStore } from "@/stores";
import { Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { GENDER, userSchema } from "@/schemas";
import Select from "@/components/Select";
import DatePicker from "@/components/DatePicker";
import { useStepForm } from "@/hooks/useStepForm";

const Step1 = () => {
  const { setUserState } = useUserActions();
  const stateValue = useUserStore();

  const onValidSubmit = async (data: UserState) => {
    setUserState(data);
  };
  const { control } = useStepForm<UserState>({
    onValid: onValidSubmit,
    resolver: zodResolver(userSchema),
    defaultValues: stateValue,
  });

  return (
    <div className="size-full">
      <form className="flex flex-col items-center justify-center gap-5">
        <Controller
          name="name"
          control={control}
          render={({ field, fieldState: { error } }) => {
            return (
              <Input
                label="Name"
                type="text"
                required
                placeholder="Please enter your name"
                errorMessage={error?.message}
                {...field}
              />
            );
          }}
        />
        <Controller
          name="email"
          control={control}
          render={({ field, fieldState: { error } }) => {
            return (
              <Input
                label="Email"
                type="email"
                required
                placeholder="Please enter your email"
                errorMessage={error?.message}
                {...field}
              />
            );
          }}
        />
        <Controller
          name="phone"
          control={control}
          render={({ field, fieldState: { error } }) => {
            return (
              <Input
                label="Phone"
                type="phone"
                required
                placeholder="Please enter your phone"
                errorMessage={error?.message}
                {...field}
              />
            );
          }}
        />
        <Controller
          name="nationality"
          control={control}
          render={({ field, fieldState: { error } }) => {
            return (
              <Select
                label="Nation"
                required
                options={nationalityOptions}
                errorMessage={error?.message}
                {...field}
              />
            );
          }}
        />
        <Controller
          name="gender"
          control={control}
          render={({ field, fieldState: { error } }) => {
            return (
              <Select
                label="Gender"
                options={genderOtions}
                errorMessage={error?.message}
                {...field}
              />
            );
          }}
        />
        <Controller
          name="address"
          control={control}
          render={({ field, fieldState: { error } }) => {
            return (
              <Input
                label="Address"
                type="text"
                placeholder="Please enter your address"
                errorMessage={error?.message}
                {...field}
              />
            );
          }}
        />
        <Controller
          name="birthdate"
          control={control}
          render={({ field, fieldState: { error } }) => {
            return (
              <DatePicker
                label="Birthdate"
                required
                position="top"
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

export default Step1;

const nationalityOptions = [
  { value: "China", label: "China" },
  { value: "USA", label: "USA" },
  { value: "UK", label: "UK" },
  { value: "Other", label: "Other" },
];

const genderOtions = GENDER.map((g) => ({ value: g, label: g }));
