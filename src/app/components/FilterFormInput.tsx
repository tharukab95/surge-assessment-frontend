import { HTMLInputTypeAttribute } from "react";

type props = {
  register: any;
  type: HTMLInputTypeAttribute;
  id: string;
  label: string;
};

const FilterFormInput = ({
  register,
  type,
  id,
  label,
  ...inputProps
}: props) => {
  return (
    <div>
      <label htmlFor={id} className="block text-sm text-gray-700">
        {label}
      </label>
      <div className="mt-1">
        <input
          {...register(`${id}`)}
          id={id}
          {...inputProps}
          type={type}
          className="form-control m-0 block w-full rounded border border-solid border-gray-300 
          bg-white bg-clip-padding px-3 py-1.5 text-base font-normal text-gray-700 transition
           ease-in-out focus:border-secondary-500 focus:bg-white focus:text-gray-700 focus:outline-none"
        />
      </div>
    </div>
  );
};

export default FilterFormInput;
