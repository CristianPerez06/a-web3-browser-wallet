import styles from './Error.module.scss';

export interface ErrorProps {
  text?: string;
}

type Comp = (props: ErrorProps) => React.ReactNode;

const Error: Comp = (props) => {
  const { text = 'Oops... Something went wrong' } = props;

  return (
    <div className={styles['container']}>
      <span className={styles['text']}>{text}</span>
    </div>
  );
};

export default Error;
