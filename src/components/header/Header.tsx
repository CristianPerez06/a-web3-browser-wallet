import { useState, useEffect } from "react";
import cn from "classnames";

import Button from "../shared/button/Button";

import styles from "./Header.module.scss";

export interface HeaderProps {
  userIsConnected?: boolean;
  handleButtonClick: () => void;
}

type Comp = (props: HeaderProps) => JSX.Element;

const Header: Comp = (props) => {
  const { userIsConnected = false, handleButtonClick } = props;

  const [isConnected, setIsConnected] = useState(false);

  const handleClick = () => {
    handleButtonClick();
  };

  useEffect(() => {
    setIsConnected(userIsConnected);
  }, [userIsConnected]);

  return (
    <header
      className={cn(styles["header"], isConnected && styles["connected"])}
    >
      <div className={styles["info-container"]}>Info here</div>
      <div className={styles["button-container"]}>
        <Button
          content={isConnected ? "Connected" : "Connect"}
          onClick={handleClick}
        />
      </div>
    </header>
  );
};

export default Header;
