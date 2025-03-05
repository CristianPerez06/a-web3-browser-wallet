import { Header, Main, Error } from '@/components';
import { useBrowserWallet } from '@/hooks';
import { getChainByChainId } from '@/utils';

import './App.scss';

type AppComponent = () => React.ReactNode;

const App: AppComponent = () => {
  const { currentAccount, currentChainId, error, isLoading, connectWallet } = useBrowserWallet();

  const handleClick = () => {
    connectWallet();
  };

  const getChainName = (chainId: number) => {
    try {
      const chain = getChainByChainId(chainId);
      return chain.name;
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error: unknown) {
      return 'Unknown network';
    }
  };

  let chainName = undefined;
  if (currentChainId) {
    chainName = getChainName(currentChainId);
  }

  return (
    <div className="app">
      <Header
        handleButtonClick={handleClick}
        userAddress={currentAccount}
        chainName={chainName}
        isDisabled={isLoading || !currentChainId || !!currentAccount}
      />
      <Main userIsConnected={!!currentAccount} />
      {error && <Error text={error} />}
    </div>
  );
};

export default App;
