import { ReactNode } from "react";
import styles from "./ColumnBox.module.css";

type ColumnBoxProps = {
  children?: ReactNode;
  className?: string;
  dataTestId?: string;
};

const ColumnBox = ({ children, className, dataTestId }: ColumnBoxProps) => {
  return (
    <div
      data-testid={dataTestId}
      className={`${styles.container} ${className ? className : ""}`}
    >
      {children}
    </div>
  );
};

export default ColumnBox;
