import { createContext } from 'react'

export interface State {
  status: 'idle' | 'wallet-connect' | 'pending' | 'success' | 'error'
  message?: string
}

export interface InputValue {
  param: string
  value: string
}

interface ContextContextType {
  inputs: InputValue[]
  setInputs: React.Dispatch<React.SetStateAction<InputValue[]>>
  setFunctionName: React.Dispatch<React.SetStateAction<string>>
  state: State
}

export const ContractContext = createContext<ContextContextType>({
  inputs: [],
  setInputs: () => {},
  setFunctionName: () => {},
  state: { status: 'idle' },
})
