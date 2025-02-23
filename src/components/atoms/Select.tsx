import  { forwardRef } from "react";
import styles from "./Select.module.css";
import { SelectProps } from "../../types/select";

const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ value = "", onChange, options = [], className = "", placeholder, ...rest }, ref) => {
    return (
      <select
        ref={ref} // Ensure react-hook-form can track it
        className={`${styles.select} ${className}`}
        value={value}
        onChange={onChange}
        autoComplete="off"
        {...rest} // Spread rest to allow `register` props
      >
        {placeholder && <option disabled value="">{placeholder}</option>}
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    );
  }
);

export default Select;
