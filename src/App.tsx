import React, { useState } from "react";
import "./App.scss";

import Header from "./components/header/Header";
import Main from "./components/main/Main";

type Component = () => JSX.Element;

const App: Component = () => {
  const [isConnected, setIsConnected] = useState(false);

  const handleClick = () => {
    setIsConnected((prev) => !prev);
  };

  return (
    <div className="app">
      <Header handleButtonClick={handleClick} userIsConnected={isConnected} />
      <Main userIsConnected={isConnected} />
    </div>
  );
};

export default App;
