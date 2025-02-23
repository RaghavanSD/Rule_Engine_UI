import React from "react";
import styles from "./Toaster.module.css"; // Add styles as needed

interface ToasterProps {
  message: string;
  visible: boolean;
}

const Toaster: React.FC<ToasterProps> = ({ message, visible }) => {
  return visible ? <div className={styles.toaster}>{message}</div> : null;
};

export default Toaster;
