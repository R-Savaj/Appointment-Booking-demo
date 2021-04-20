import { FieldProps } from "formik";
import React from "react";
import Select from "react-select";

export const CustomSelect = ({
  className,
  placeholder,
  field,
  form,
  options
}) => {
  const onChange = (option) => {
    form.setFieldValue(
      field.name,
       (option).value
    );
  };

  const getValue = () => {
    if (options) {
      return options.find(option => option.value === field.value);
    } else {
      return  ("");
    }
  };

  return (
    <Select
      className={className}
      name={field.name}
      value={getValue()}
      onChange={onChange}
      placeholder={placeholder}
      options={options}
    />
  );
};

export default CustomSelect;
