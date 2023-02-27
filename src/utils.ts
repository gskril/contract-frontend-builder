import { SendTransactionResult } from '@wagmi/core'
import { Address, Chain } from 'wagmi'

export const getEtherscanLink = (hash: string, chain: Chain | undefined) => {
  return `https://${chain?.id === 5 ? 'goerli.' : ''}etherscan.io/tx/${hash}`
}
