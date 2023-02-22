import styles from "./Template.module.css";

type TemplateProps = {
  message: string;
};

const Template = ({ message }: TemplateProps) => {
  //TODO: Add some logic here

  return <div className={styles.template}>{message}</div>;
};

export default Template;
