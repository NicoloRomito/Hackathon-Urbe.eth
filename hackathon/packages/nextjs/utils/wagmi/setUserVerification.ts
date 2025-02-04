
import { writeContract } from '@wagmi/core'
import { privateKeyToAccount } from 'viem/accounts'
import {config} from '~~/utils/wagmi/config'
import deployedContracts from '~~/contracts/deployedContracts'

interface UserInfo {
  address: string
  email: string
  name: string
  lastName: string
  codiceFiscale: string
  verified: boolean
  verifiedBy: string
}

export const setUserVerification = async (userData: UserInfo) => {
  console.log(userData)
  const result = await fetch(`http://localhost:3000/api/smartContract/setUserVerification`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(userData)
  });
  
  if(result.ok) {
    const data = await result.json();
    //extract the data from the nfts
    return data;
  }
  return false;
  // const hash = await writeContract(config, {
  //   abi: deployedContracts[31337].Manager.abi,
  //   address: '0x5FbDB2315678afecb367f032d93F642f64180aa3',
  //   functionName: 'addUserToVerification',
  //   args: [
  //      address,
  //      verifiedBy,
  //   ],
  //   account: privateKeyToAccount(`0x${ourCompanyPrivateKey}`),
  // })
  // console.log("Result:", hash)
}