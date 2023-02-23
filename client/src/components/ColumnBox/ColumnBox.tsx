import { ReactNode } from "react";
import styles from "./ColumnBox.module.css";

type ColumnBoxProps = {
  children?: ReactNode;
  className?: string;
};

const ColumnBox = ({ children, className }: ColumnBoxProps) => {
  return (
    <div className={`${styles.container} ${className ? className : ""}`}>
      {children}
    </div>
  );
};

export default ColumnBox;
