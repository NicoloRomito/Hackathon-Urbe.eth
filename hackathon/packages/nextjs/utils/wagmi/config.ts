//  export const Walletclient = createWalletClient({
//    account: privateKeyToAccount(`0x${PKClient}`),
//    chain: hardhat,
//    transport: http(),
//  })

// export const publicClient = createPublicClient({
//   chain: hardhat,
//   transport: http()
// })
// console.log("Wallet chainID:", Walletclient.getChainId())  

// export const handleMint = async () => {

//   const request = await Walletclient.prepareTransactionRequest({
//         account: Walletclient.account,
//         //to: '0x5FbDB2315678afecb367f032d93F642f64180aa3',
//         to: '0x0000000000000000000000000000000000000000',
//         value: 1n,
//         chainId:  31337,
//       })
//     console.log("Request CHAINID:", request.chainId)
//     console.log("Request:", request)
//     const serializedTransaction = await Walletclient.signTransaction(request)
//     const hash = await Walletclient.sendRawTransaction({ serializedTransaction })
//     console.log("Hash:", hash)  
//     }    


import { http, createConfig } from '@wagmi/core'
import {hardhat } from '@wagmi/core/chains'

export const config = createConfig({
  chains: [hardhat],
  transports: {
    [hardhat.id]: http(),
  },
})


