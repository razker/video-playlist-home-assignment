import { ReactNode } from "react";
import styles from "./FBox.module.css";

type FBoxProps = {
  children?: ReactNode;
  className?: string;
  onClick?: () => void;
};

const FBox = ({ children, className, onClick }: FBoxProps) => {
  return (
    <div
      className={`${styles.container} ${className ? className : ""}`}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

export default FBox;
