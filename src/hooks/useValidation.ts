import { Provider } from '@wagmi/core'
import { useEffect, useState } from 'react'
import { useProvider } from 'wagmi'

export function useValidation(
  validation:
    | ((value: string, provider?: Provider) => Promise<boolean> | boolean)
    | undefined,
  value: string
): boolean | undefined {
  const [valid, setValid] = useState<boolean | undefined>(undefined)
  const mainnetProvider = useProvider({ chainId: 1 })

  useEffect(() => {
    async function validate() {
      if (!validation) {
        return
      }

      const isValid = await validation(value, mainnetProvider)
      setValid(isValid)
    }

    if (value) {
      validate()
    } else {
      setValid(undefined)
    }
  }, [value, mainnetProvider, validation])

  return valid
}
