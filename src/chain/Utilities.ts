/* eslint-disable @typescript-eslint/no-explicit-any */
import { Chains } from './Chains'
import { IChainData } from './IChainData'

export const getAllChains = (): IChainData[] => {
  return Chains
}

export const getChain = (chainId: number): IChainData => {
  const chain = Chains.find((x: any) => x.chainId === chainId)
  if (typeof chain === 'undefined') {
    throw new Error(`No chain found matching chainId: ${chainId}`)
  }
  return chain
}

export const getChainByChainId = (chainId: number): IChainData => {
  const chain = getChain(chainId)
  return chain
}
