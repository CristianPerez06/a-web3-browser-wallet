import cn from 'classnames';
import { Button } from '@/components';

import styles from './Header.module.scss';

export interface HeaderProps {
  userAddress?: string;
  chainName?: string;
  handleButtonClick: () => void;
  isDisabled?: boolean;
}

type Comp = (props: HeaderProps) => React.ReactNode;

const Header: Comp = (props) => {
  const { userAddress, chainName, handleButtonClick, isDisabled = false } = props;

  const truncateAddress = (input: string) => {
    return input.substring(0, 5) + '...' + input.substring(38);
  };

  const handleClick = () => {
    handleButtonClick();
  };

  return (
    <header className={cn(styles['header'], userAddress && styles['connected'])}>
      {userAddress && (
        <div className={styles['info-container']}>
          <span className={styles['user-address']}>{truncateAddress(userAddress)}</span>
          <div className={styles['chain-name']}>
            <span>{chainName}</span>
          </div>
        </div>
      )}
      <div className={styles['button-container']}>
        <Button
          content={userAddress ? 'Connected' : 'Connect'}
          onClick={!userAddress ? handleClick : undefined}
          isDisabled={isDisabled}
        />
      </div>
    </header>
  );
};

export default Header;
