import { ConnectButton } from '@rainbow-me/rainbowkit'
import Head from 'next/head'
import { useAccount, useEnsName, useNetwork } from 'wagmi'

import { Contract } from '../components/Contract'
import { abi, getReverseRegistrarAddress } from '../contract'

export default function Home() {
  const { chain } = useNetwork()
  const { address } = useAccount()
  const { data: ensName } = useEnsName({
    address,
    staleTime: 0,
  })
  const contractAddress = getReverseRegistrarAddress(chain?.id)

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
        <ConnectButton showBalance={false} />

        {ensName && <p>Current primary ENS name: {ensName}</p>}

        <Contract.Root
          abi={abi}
          address={contractAddress}
          style={{ marginTop: '1rem' }}
        >
          <Contract.Input
            param="name"
            placeholder="gregskril.eth"
            label="Name to set as Primary ENS Name"
          />
          <Contract.Button functionName="setName" />
        </Contract.Root>
      </main>
    </>
  )
}
