import { type FC } from 'react';
import styles from './TestButton.module.css';

type OwnProps = {
  children?: React.ReactNode
};

const TestButton: FC<OwnProps & React.ButtonHTMLAttributes<HTMLButtonElement>> = ({ children, ...props }) => {
  return (
    <button className={styles.root} {...props}>
      {children}
    </button>
  );
};

export default TestButton;
