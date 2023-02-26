import { useContext, useEffect, useState } from 'react'

import { ContractContext } from './context'

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
    <>
      <div className="container">
        {label && <label htmlFor={param}>{label}</label>}
        <input {...props} onChange={(e) => setValue(e.target.value)} />
      </div>

      <style jsx>{`
        .container {
          display: flex;
          flex-direction: column;
          gap: 0.125rem;
        }
      `}</style>
    </>
  )
}
