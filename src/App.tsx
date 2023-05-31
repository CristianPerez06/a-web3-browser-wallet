import React from 'react'

import Header from './components/header/Header'
import Main from './components/main/Main'
import Error from './components/error/Error'

import useEthereum from './hooks/useBrowserWallet'

import { getChainByChainId } from './chain/Utilities'

import './App.scss'

type Component = () => JSX.Element

const App: Component = () => {
  const [currentAccount, currentChainId, error, connectWallet] = useEthereum()

  const handleClick = () => {
    connectWallet()
  }

  const getChainName = (chainId: number) => {
    try {
      const chain = getChainByChainId(chainId)
      return chain.name
    } catch (ex: any) {
      return 'Unknown network'
    }
  }

  let chainName = undefined
  if (currentChainId) {
    chainName = getChainName(currentChainId)
  }

  return (
    <div className="app">
      <Header
        handleButtonClick={handleClick}
        userAddress={currentAccount}
        chainName={chainName}
        isDisabled={!currentChainId}
      />
      <Main userIsConnected={!!currentAccount} />
      {error && <Error text={error} />}
    </div>
  )
}

export default App
