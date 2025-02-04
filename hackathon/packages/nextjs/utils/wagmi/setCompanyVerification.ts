
import { writeContract } from '@wagmi/core'
import { privateKeyToAccount } from 'viem/accounts'
import {config} from '~~/utils/wagmi/config'
import deployedContracts from '~~/contracts/deployedContracts'


interface CompanyInfo{
  address: string
  name: string
  verified: boolean
  pIva: string
}

export const setCompanyVerification = async (companyData: CompanyInfo) => {
  console.log(companyData)
  const result = await fetch(`http://localhost:3000/api/smartContract/setCompanyVerification`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(companyData)
  });
  
  if(result.ok) {
    const data = await result.json();
    return data;
  }
  throw new Error("Failed to retrieve data");
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