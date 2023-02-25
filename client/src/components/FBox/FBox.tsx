import { ReactNode } from "react";
import styles from "./FBox.module.css";

type FBoxProps = {
  children?: ReactNode;
  className?: string;
  onClick?: () => void;
  dataTestId?: string;
};

const FBox = ({ children, className, onClick, dataTestId }: FBoxProps) => {
  return (
    <div
      data-testid={dataTestId}
      className={`${styles.container} ${className ? className : ""}`}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

export default FBox;
