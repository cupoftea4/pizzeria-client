import { type FC, useState } from 'react';
import ReactIcon from '@/icons/ReactIcon';
import styles from './ReactDocs.module.css';
import TestButton from '@/components/TestButton';

type OwnProps = {
  link: string
};

const ReactDocs: FC<OwnProps> = ({ link }) => {
  const [count, setCount] = useState(0);

  return (
    <div className={styles.root}>
      <div>
        <ReactIcon />
      </div>
      <h1>Welcome to React</h1>
      <div className={styles.counter}>
        Count is {count}
        <TestButton onClick={() => setCount((count) => count + 1)}>
          Click me
        </TestButton>
      </div>
      <a href={link}>
        <span className={styles.link}>Here</span> you can find React docs
      </a>
    </div>
  );
};

export default ReactDocs;
