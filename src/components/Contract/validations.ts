import { Provider } from '@wagmi/core'
import { isAddress } from 'ethers/lib/utils.js'

export function validateAddress(address: string): boolean {
  const isValidAddress = isAddress(address)

  if (!isValidAddress) {
    // check if it's a valid ENS name
  }

  return isValidAddress
}

export async function validateEnsName(
  name: string,
  provider?: Provider
): Promise<boolean> {
  const address = provider ? await provider.resolveName(name) : null

  if (!address) {
    return false
  }

  return true
}
