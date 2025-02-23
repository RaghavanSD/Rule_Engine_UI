import { forwardRef } from "react";
import styles from "./Button.module.css";
import { ButtonProps } from "../../types/button";

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ onClick, className, children, ...rest }, ref) => {
    return (
      <button
        ref={ref}
        className={`${styles.button} ${className}`}
        onClick={onClick}
        {...rest}
      >
        {children}
      </button>
    );
  }
);

export default Button;
