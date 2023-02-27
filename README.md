## React Library for Building Smart Contract Frontends

Normally when building a smart contract frontend, you have to:

- create different button states for wallet disconnected, wallet connected, pending transaction, failed transaction, successful transaction
- create different inputs for different data types (string, number, etc.)
- validate data like address, ENS name, bytes32, etc.
- transform data like seconds to years

The goal of this library is to take care of all the above for you.

Note: This repo is just an example project for faster iterations (most relevant code in [src/components/Contract](src/components/Contract)). Will separate it into a package soon.
