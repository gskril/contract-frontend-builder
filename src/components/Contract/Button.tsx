import { useContext, useEffect } from 'react'
import { useAccount, useNetwork } from 'wagmi'

import useIsMounted from '../../hooks/useIsMounted'
import { getEtherscanLink } from '../../utils'
import { ContractContext } from './context'
import { StyledButton } from './styles'

// TODO: ensure `functionName` is valid from parent ABI
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLElement> {
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
  const { setFunctionName, state } = useContext(ContractContext)

  const { chain } = useNetwork()
  const { isConnected } = useAccount()

  useEffect(() => {
    setFunctionName(functionName)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (!isConnected || !isMounted) {
    return (
      <StyledButton variant="secondary" type="submit" {...props}>
        Connect Wallet
      </StyledButton>
    )
  }

  if (state.status === 'wallet-connect') {
    return (
      <StyledButton type="submit" {...props}>
        Confirm in Wallet...
      </StyledButton>
    )
  }

  if (state.status === 'error') {
    return (
      <StyledButton variant="error" type="submit" {...props}>
        {state.message}
      </StyledButton>
    )
  }

  if (state.status === 'pending') {
    return (
      <StyledButton
        as="a"
        href={getEtherscanLink(state.message!, chain)}
        target="_blank"
        rel="noopener noreferrer"
        {...props}
      >
        Transaction Processing...
      </StyledButton>
    )
  }

  if (state.status === 'success') {
    return (
      <StyledButton
        as="a"
        variant="success"
        href={getEtherscanLink(state.message!, chain)}
        target="_blank"
        rel="noopener noreferrer"
        {...props}
      >
        Transaction Successful
      </StyledButton>
    )
  }

  return (
    <StyledButton type="submit" {...props}>
      {children ? children : 'Send Transaction'}
    </StyledButton>
  )
}
