"use client";

import { Controller, SubmitHandler, useForm } from "react-hook-form";
import Select from "react-select";
import FilterFormInput from "./FilterFormInput";
import { useRouter } from "next/navigation";

interface IFormInput {
  gender: string;
  birth: string;
  death: string;
  category: string;
}

const gender = [
  { value: "null", label: "--" },
  { value: "female", label: "Female" },
  { value: "male", label: "Male" },
  { value: "other", label: "Other" },
];

const nobelPrizeCategories = [
  { value: "null", label: "--" },
  { value: "che", label: "Chemistry" },
  { value: "eco", label: "Economics" },
  { value: "lit", label: "Literature" },
  { value: "pea", label: "Peace" },
  { value: "phy", label: "Physics" },
  { value: "med", label: "Medicine" },
];

const selectCustomStyles = {
  option: (provided: any, state: any) => ({
    ...provided,
    backgroundColor: state.isSelected ? "#EFE6E6" : null,
    color: "#4a5568",
  }),
  control: (base: any, state: any) => ({
    ...base,
    borderColor: state.isSelected ? "#FFC132" : "#a0aec0",
    boxShadow: "none",
    "&:hover": {
      borderColor: "#a0aec0",
    },
  }),
};

const FilterBar = () => {
  const router = useRouter();
  const { register, control, handleSubmit } = useForm<IFormInput>();

  const onSubmit: SubmitHandler<IFormInput> = async ({
    gender,
    birth,
    death,
    category,
  }: IFormInput) => {
    console.log(`${gender} ${birth} ${death} ${category}`);

    router.push(
      `?gender=${gender !== "null" ? gender : ""}${
        birth ? "&birthDate=" + birth : ""
      }${death ? "&deathDate=" + death : ""}${
        category !== "null" ? "&nobelPrizeCategory=" + category : ""
      }`
    );
  };

  return (
    <form
      className="flex flex-wrap gap-6 px-16 py-8 items-end"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="w-[120px]">
        <label htmlFor="task" className="block text-sm text-gray-700">
          Gender
        </label>
        <div className="mt-1">
          <Controller
            control={control}
            defaultValue={gender.length > 0 ? gender[0].value : ""}
            name="gender"
            render={({ field: { onChange, value, ref } }) => (
              <Select
                instanceId="gender"
                ref={ref}
                value={gender.filter((c) => value.includes(c.value))}
                onChange={(data) => onChange(data?.value)}
                options={gender}
                styles={selectCustomStyles}
              />
            )}
          />
        </div>
      </div>
      <FilterFormInput
        register={register}
        type="text"
        id="birth"
        label="Birth year"
      />
      <FilterFormInput
        register={register}
        type="text"
        id="death"
        label="Death year"
      />
      <div className="w-[160px]">
        <label htmlFor="task" className="block text-sm text-gray-700">
          Category
        </label>
        <div className="mt-1">
          <Controller
            control={control}
            defaultValue={
              nobelPrizeCategories.length > 0
                ? nobelPrizeCategories[0].value
                : ""
            }
            name="category"
            render={({ field: { onChange, value, ref } }) => (
              <Select
                instanceId="category"
                ref={ref}
                value={nobelPrizeCategories.filter((c) =>
                  value.includes(c.value)
                )}
                onChange={(data) => onChange(data?.value)}
                options={nobelPrizeCategories}
                styles={selectCustomStyles}
              />
            )}
          />
        </div>
      </div>
      <button
        type="submit"
        className="w-[120px] h-[40px] rounded bg-orange-500/80 px-6 py-2 text-sm font-medium uppercase
            leading-tight text-white shadow-md transition duration-150 ease-in-out hover:bg-orange-500/90
          active:bg-orange-500 active:shadow-lg"
      >
        Filter
      </button>
    </form>
  );
};

export default FilterBar;
