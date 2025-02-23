import { forwardRef } from "react";
import styles from "./Input.module.css";
import { InputProps } from "../../types/input";

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ value, onChange, placeholder, className, ...rest }, ref) => {
    return (
      <input
        ref={ref} // Forward the ref to support react-hook-form
        className={`${styles.input} ${className}`}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        autoComplete="off"
        {...rest}
      />
    );
  }
);

export default Input;
