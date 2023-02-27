import { useContext, useEffect, useState } from 'react'

import { ContractContext } from './context'
import { InputWrapper, Label, StyledInput } from './styles'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  param: string
}

export function Input({ label, param, ...props }: InputProps) {
  const { inputs, setInputs } = useContext(ContractContext)
  const [value, setValue] = useState('')

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
    </InputWrapper>
  )
}
