import { readContract, writeContract } from '@wagmi/core'
import { privateKeyToAccount } from 'viem/accounts'
import {config} from '~~/utils/wagmi/config'
import deployedContracts from '~~/contracts/deployedContracts'


export const searchIfUserOrCompany = async (address: string) =>  {
    //return true if user is a user, false if user is a company
    console.log("Address in search if user or company:", address);
    const result = await fetch(`http://localhost:3000/api/smartContract/isUserOrCompany?address=${address}`);
    if(result.ok) {
        const data = await result.json();
        return data.isUserOrCompany;
    }
    throw new Error("Failed to check if user/company is verified");
}