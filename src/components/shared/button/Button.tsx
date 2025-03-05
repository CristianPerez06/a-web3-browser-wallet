import cn from 'classnames';

import styles from './Button.module.scss';

export interface ButtonProps {
  content: string | React.ReactNode;
  isDisabled?: boolean;
  onClick?: () => void;
  className?: string;
}

type Comp = (props: ButtonProps) => React.ReactNode;

const Button: Comp = (props) => {
  const { content, isDisabled = false, onClick, className } = props;

  return (
    <button data-testid="button" className={cn(styles['button'], className)} disabled={isDisabled} onClick={onClick}>
      {content}
    </button>
  );
};

export default Button;
