import { useScaffoldWriteContract } from "~~/hooks/scaffold-eth";
import { http, publicActions } from 'viem'
import ManagerABI from "~~/contracts/abi/ManagerABI";
import { createWalletClient, createPublicClient} from 'viem'
import { hardhat } from 'viem/chains'
import { privateKeyToAccount } from 'viem/accounts'

let PKClient = "28811c831d972d81fbe99d20daf11a95f78b50b3556eb5f7007fe5645f361e8d"

export const Walletclient = createWalletClient({
  account: privateKeyToAccount(`0x${PKClient}`),
  chain: hardhat,
  transport: http(),
})

export const publicClient = createPublicClient({
  chain: hardhat,
  transport: http()
})
console.log("Wallet chainID:", Walletclient.getChainId())  

export const handleMint = async () => {

  const request = await Walletclient.prepareTransactionRequest({
        account: Walletclient.account,
        //to: '0x5FbDB2315678afecb367f032d93F642f64180aa3',
        to: '0x0000000000000000000000000000000000000000',
        value: 1n,
        chainId:  31337,
      })
    console.log("Request CHAINID:", request.chainId)
    console.log("Request:", request)
    const serializedTransaction = await Walletclient.signTransaction(request)
    const hash = await Walletclient.sendRawTransaction({ serializedTransaction })
    console.log("Hash:", hash)  
    }    

