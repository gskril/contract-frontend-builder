import { useContext, useEffect } from 'react'
import { useAccount } from 'wagmi'

import useIsMounted from '../../hooks/useIsMounted'
import { ContractContext } from './context'

// TODO: ensure `functionName` is valid from parent ABI
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: string
  functionName: string
  isLoading?: boolean
}

export function Button({
  children,
  functionName,
  isLoading,
  ...props
}: ButtonProps) {
  const isMounted = useIsMounted()
  const { isConnected } = useAccount()
  const { setFunctionName, state } = useContext(ContractContext)

  useEffect(() => {
    setFunctionName(functionName)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (state.status === 'wallet-connect') {
    return (
      <button type="submit" {...props}>
        Confirm in Wallet...
      </button>
    )
  }

  if (!isConnected || !isMounted) {
    return (
      <button type="submit" {...props}>
        Connect Wallet
      </button>
    )
  }

  return (
    <button type="submit" {...props}>
      {children ? children : 'Submit'}
    </button>
  )
}
