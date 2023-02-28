import { Provider } from '@wagmi/core'
import { useContext, useEffect, useState } from 'react'

import { useDebounce } from '../../hooks/useDebounce'
import { useValidation } from '../../hooks/useValidation'
import { CheckIcon, CrossIcon } from '../Icons'
import { ContractContext } from './context'
import {
  InputWrapper,
  Label,
  StyledInput,
  ValidationIconWrapper,
} from './styles'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  param: string
  validation?: (
    value: string,
    provider?: Provider
  ) => Promise<boolean> | boolean
}

export function Input({ label, param, validation, ...props }: InputProps) {
  const { inputs, setInputs, state } = useContext(ContractContext)
  const [_value, setValue] = useState('')
  const value = useDebounce(_value, 500)
  const isValid = useValidation(validation, value)

  useEffect(() => {
    setInputs([
      ...inputs.filter((input) => input.param !== param),
      {
        param: param,
        value: value,
        isValid: isValid,
      },
    ])
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value])

  return (
    <InputWrapper>
      {label && <Label htmlFor={param}>{label}</Label>}
      <StyledInput
        disabled={state.status !== 'idle'}
        onChange={(e) => setValue(e.target.value)}
        {...props}
      />

      {isValid !== undefined && (
        <ValidationIconWrapper isValid={isValid}>
          {isValid ? <CheckIcon /> : <CrossIcon />}
        </ValidationIconWrapper>
      )}
    </InputWrapper>
  )
}
