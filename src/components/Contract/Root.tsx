import { useConnectModal } from '@rainbow-me/rainbowkit'
import { Abi } from 'abitype'
import { useState } from 'react'
import styled from 'styled-components'
import { useAccount, useContractWrite, usePrepareContractWrite } from 'wagmi'

import { ContractContext, InputValue, State } from './context'

const Container = styled.form`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  width: 100%;

  /* temporary styles for dev */
  padding: 1rem;
  background-color: #fafcff;
  border: 1px solid #cbcbcb;
  box-shadow: 1px 4px 26px rgba(78, 162, 240, 0.25);
  border-radius: 8px;
`

interface RootProps extends React.HTMLAttributes<HTMLDivElement> {
  abi: Abi
  address: `0x${string}`
  children: React.ReactNode
}

export function Root({ abi, address, children }: RootProps) {
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
  })

  // @ts-ignore (wagmi types throw error even though it works)
  const tx = useContractWrite(prepareTx.config)

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
      <Container onSubmit={handleSubmit}>{children}</Container>
    </ContractContext.Provider>
  )
}
