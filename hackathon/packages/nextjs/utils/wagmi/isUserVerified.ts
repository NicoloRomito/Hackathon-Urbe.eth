

export const isUserVerified = async (address: string) =>  {

  const result = await fetch(`http://localhost:3000/api/auth/user/isUserVerified?address=${address}`);
    if(result.ok) {
        const data = await result.json();
        //extract the data from the nfts
        return data;
  }
  throw new Error("Failed to retrieve data");

//import { readContract, writeContract } from '@wagmi/core'
//import { privateKeyToAccount } from 'viem/accounts'
//import {config} from '~~/utils/wagmi/config'
//import deployedContracts from '~~/contracts/deployedContracts'
//
//let ourCompanyPrivateKey = "28811c831d972d81fbe99d20daf11a95f78b50b3556eb5f7007fe5645f361e8d"
//const isUserVerified = await readContract(config, {
//   abi: deployedContracts[31337].Manager.abi,
//   address: '0x5FbDB2315678afecb367f032d93F642f64180aa3',
//   functionName: 'isUserVerified',
//   args: [
//      address
//   ],
//   account: privateKeyToAccount(`0x${ourCompanyPrivateKey}`),
// })
// return isUserVerified;
}