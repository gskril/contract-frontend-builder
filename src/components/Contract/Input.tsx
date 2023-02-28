import { useContext, useEffect, useState } from 'react'

import { useDebounce } from '../../hooks/useDebounce'
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
  validation?: (value: string) => boolean
}

export function Input({ label, param, validation, ...props }: InputProps) {
  const { inputs, setInputs, state } = useContext(ContractContext)
  const [_value, setValue] = useState('')
  const value = useDebounce(_value, 500)

  const isValid = validation && value ? validation(value) : undefined

  useEffect(() => {
    setInputs([
      ...inputs.filter((input) => input.param !== param),
      {
        param: param,
        value: value,
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
