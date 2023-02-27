import { useConnectModal } from '@rainbow-me/rainbowkit'
import { Abi } from 'abitype'
import { useEffect, useState } from 'react'
import {
  useAccount,
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction,
} from 'wagmi'

import { ContractContext, InputValue, State } from './context'
import { Container } from './styles'

interface RootProps extends React.HTMLAttributes<HTMLFormElement> {
  abi: Abi
  address: `0x${string}`
  children: React.ReactNode
}

export function Root({ abi, address, children, ...props }: RootProps) {
  const { isConnected } = useAccount()
  const { openConnectModal } = useConnectModal()

  const [functionName, setFunctionName] = useState<string>('')
  const [inputs, setInputs] = useState<InputValue[]>([])
  const [state, setState] = useState<State>({ status: 'idle' })

  // TODO: support multiple inputs
  const input = inputs[0]

  const prepareTx = usePrepareContractWrite({
    address,
    abi,
    functionName,
    args: [input?.value],
    onError: (error) => {
      setState({ status: 'error', message: error.message })
    },
  })

  // @ts-ignore (wagmi types throw error even though it works)
  const tx = useContractWrite(prepareTx.config)

  // Handle state from tx
  useEffect(() => {
    if (tx?.data?.hash) {
      setState({ status: 'pending', message: tx.data.hash })
    } else if (tx.isError) {
      setState({ status: 'error', message: tx.error?.message })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tx?.data?.hash, tx.isError])

  const txReceipt = useWaitForTransaction({
    hash: tx?.data?.hash,
    onSuccess: () => {
      setState({ status: 'success' })
    },
    onError: (error) => {
      setState({ status: 'error', message: error.message })
    },
  })

  // Handle state from txReceipt
  useEffect(() => {
    if (txReceipt.isSuccess) {
      setState({ status: 'success', message: tx.data?.hash })
    } else if (txReceipt.isError) {
      setState({ status: 'error', message: txReceipt.error?.message })
    } else if (txReceipt.isLoading) {
      setState({ status: 'pending', message: tx.data?.hash })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    txReceipt.error?.message,
    txReceipt.isError,
    txReceipt.isLoading,
    txReceipt.isSuccess,
  ])

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!isConnected) {
      openConnectModal?.()
    } else {
      tx.write?.()
      setState({ status: 'wallet-connect' })
    }
  }

  return (
    <ContractContext.Provider
      value={{ inputs, setInputs, setFunctionName, state }}
    >
      <Container onSubmit={handleSubmit} {...props}>
        {children}
      </Container>
    </ContractContext.Provider>
  )
}
