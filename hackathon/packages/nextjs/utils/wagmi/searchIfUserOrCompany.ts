import { readContract, writeContract } from '@wagmi/core'
import { privateKeyToAccount } from 'viem/accounts'
import {config} from '~~/utils/wagmi/config'
import deployedContracts from '~~/contracts/deployedContracts'

let ourCompanyPrivateKey = "28811c831d972d81fbe99d20daf11a95f78b50b3556eb5f7007fe5645f361e8d"

export const searchIfUserOrCompany = async (address: string) =>  {
    //return true if user is a user, false if user is a company
    const result = await fetch(`http://localhost:3000/api/auth/userOrCompany?address=${address}`);
    if(result.ok) {
        const data = await result.json();
        return data.isUser;
    }
    throw new Error("Failed to check if user/company is verified");
}