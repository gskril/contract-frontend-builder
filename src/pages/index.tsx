import Head from 'next/head'

import { Contract } from '../components/Contract'
import { abi, contractAddress } from '../contract'

export default function Home() {
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
        <Contract.Root address={contractAddress} abi={abi}>
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
