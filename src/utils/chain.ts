import { Chains } from '@/enums';
import { Chain } from '@/types';

export const getAllChains = (): Chain[] => {
  return Chains;
};

export const getChain = (chainId: number): Chain => {
  const chain = Chains.find((chain: Chain) => chain.chainId === chainId);
  if (typeof chain === 'undefined') {
    throw new Error(`No chain found matching chainId: ${chainId}`);
  }
  return chain;
};

export const getChainByChainId = (chainId: number): Chain => {
  const chain = getChain(chainId);
  return chain;
};
