import { ReactNode } from "react";
import styles from "./ColumnBox.module.css";

type ColumnBoxProps = {
  children?: ReactNode;
  className?: string;
  padding?: string;
  alignItems?: "center" | "flex-start" | "flex-end";
  maxHeight?: boolean;
};

const ColumnBox = ({
  children,
  className,
  padding,
  alignItems,
  maxHeight,
}: ColumnBoxProps) => {
  return (
    <div
      style={{
        padding: padding,
        alignItems: alignItems,
        height: maxHeight ? "100%" : "",
      }}
      className={`${styles.container} ${className ? className : ""}`}
    >
      {children}
    </div>
  );
};

export default ColumnBox;
