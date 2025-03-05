/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState, useCallback, useEffect } from 'react';

const { ethereum } = window;

const MESSAGES = {
  DEFAULT: 'Oops... Something went wrong. Please try again',
  ERROR_WALLET_NOT_DETECTED: 'Browser wallet not detected',
  ERROR_WALLET_NOT_CONNECTED: 'Wallet connection request rejected',
};

interface Output {
  isLoading: boolean;
  connectWallet: () => Promise<unknown>;
  currentAccount?: string;
  currentChainId?: number;
  error?: string;
}

type browserWalletHook = () => Output;

const useBrowserWallet: browserWalletHook = () => {
  const [error, setError] = useState<string>();
  const [isLoading, setIsLoading] = useState(false);
  const [currentChainId, setCurrentChainId] = useState<number>();
  const [currentAccount, setCurrentAccount] = useState<string>();

  const ethDetected = () => {
    return !!ethereum;
  };

  const getAccounts = async () => {
    const accounts = await ethereum.request({ method: 'eth_accounts' });
    return accounts;
  };

  const connect = async () => {
    const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
    return accounts;
  };

  const getChainId = async () => {
    const chainId = await ethereum.request({ method: 'eth_chainId' });
    return chainId;
  };

  const onChainChanged = (callback: any) => {
    return ethereum?.on('chainChanged', (chainId: string) => {
      console.log('chainChanged');
      const chainIdHumanized = getChainIdHumanized(chainId);
      callback(chainIdHumanized);
    });
  };

  const onAccountsChanged = (callback: any) => {
    return ethereum?.on('accountsChanged', (accounts: string[]) => {
      console.log('onAccountsChanged');
      const account = accounts[0] || '';
      callback(account);
    });
  };

  const getChainIdHumanized = (chaindId: string) => {
    return Number(Number(chaindId).toString(10));
  };

  // Check wallet
  const checkWallet = useCallback(async () => {
    setError(undefined);

    try {
      // Check if wallet is connected
      const accounts = await getAccounts();
      if (accounts.length !== 0) {
        setCurrentAccount(accounts[0]);
      }
    } catch (error) {
      setError(MESSAGES.DEFAULT);
    }
  }, []);

  // Handle Connect wallet click
  const connectWallet = useCallback(async () => {
    setIsLoading(true);
    setError(undefined);

    try {
      const accounts = await connect();

      setCurrentAccount(accounts[0]);
    } catch (error) {
      setError(MESSAGES.ERROR_WALLET_NOT_CONNECTED);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Handle events
  onChainChanged(setCurrentChainId);
  onAccountsChanged(setCurrentAccount);

  useEffect(() => {
    // Check if wallet is installed
    if (!ethDetected()) {
      setError(MESSAGES.ERROR_WALLET_NOT_DETECTED);
      return;
    }

    const getCurrentChain = async () => {
      const chainId = await getChainId();
      const chainIdHumanized = getChainIdHumanized(chainId);
      setCurrentChainId(chainIdHumanized);
    };

    if (!currentChainId) {
      getCurrentChain();
    } else {
      checkWallet();
    }
  }, [currentAccount, currentChainId, checkWallet]);

  return { currentAccount, currentChainId, error, isLoading, connectWallet };
};

export default useBrowserWallet;
