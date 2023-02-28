import { ConnectButton } from '@rainbow-me/rainbowkit'
import Head from 'next/head'
import { useAccount, useEnsName, useNetwork } from 'wagmi'

import { Contract } from '../components/Contract'
import { validateAddress } from '../components/Contract/validations'
import { abi, getReverseRegistrarAddress } from '../contract'
import useIsMounted from '../hooks/useIsMounted'

export default function Home() {
  const { chain } = useNetwork()
  const { address } = useAccount()

  const isMounted = useIsMounted()
  const contractAddress = getReverseRegistrarAddress(chain?.id)

  const { data: ensName } = useEnsName({
    address,
    staleTime: 0,
  })

  return (
    <>
      <Head>
        <title>Web3 Starter</title>
        <meta name="description" content="" />

        <meta property="og:image" content="" />
        <meta property="og:title" content="" />
        <meta property="og:description" content="" />
      </Head>

      <main>
        {isMounted && address && (
          <div style={{ marginBottom: '1rem' }}>
            <ConnectButton showBalance={false} />
            <p style={{ marginTop: '0.25rem' }}>
              Current primary ENS name: {ensName}
            </p>
          </div>
        )}

        <Contract.Root abi={abi} address={contractAddress}>
          <Contract.Input
            param="name"
            label="Name"
            validation={validateAddress}
            placeholder="gregskril.eth"
          />
          <Contract.Button functionName="setName" />
        </Contract.Root>
      </main>
    </>
  )
}
