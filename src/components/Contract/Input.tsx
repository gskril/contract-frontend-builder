import { useContext, useEffect, useState } from 'react'

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
  const { inputs, setInputs } = useContext(ContractContext)
  const [value, setValue] = useState('')

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
      <StyledInput {...props} onChange={(e) => setValue(e.target.value)} />

      {isValid !== undefined && (
        <ValidationIconWrapper isValid={isValid}>
          {isValid ? <CheckIcon /> : <CrossIcon />}
        </ValidationIconWrapper>
      )}
    </InputWrapper>
  )
}
