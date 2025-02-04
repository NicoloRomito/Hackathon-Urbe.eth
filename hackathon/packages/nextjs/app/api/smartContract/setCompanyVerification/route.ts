//implement the route for the user api to register the user
import { readContract, writeContract } from '@wagmi/core'
import { privateKeyToAccount } from 'viem/accounts'
import {config} from '~~/utils/wagmi/config'
import deployedContracts from '~~/contracts/deployedContracts'
import { NextResponse, NextRequest } from "next/server";

let ourCompanyPrivateKey = "28811c831d972d81fbe99d20daf11a95f78b50b3556eb5f7007fe5645f361e8d"

interface CompanyInfo{
    address: string
    name: string
    verified: boolean
    pIva: string
}
export async function GET(request : NextRequest) {

    const companyInfo: CompanyInfo = await request.json();
    const { address, name,  verified, pIva } = companyInfo;

    // Validate input data
    if (!address || !name || !pIva) {
        return NextResponse.json({ error: 'Invalid input data' }, { status: 400 });
    }

    // Ensure the private key is not hardcoded
    
    // const ourCompanyPrivateKey = process.env.COMPANY_PRIVATE_KEY;
    // if (!ourCompanyPrivateKey) {
    //     return NextResponse.json({ error: 'Server configuration error' }, { status: 500 });
    // }

    try {
        const isCompanyVerified = await writeContract(config, {
            abi: deployedContracts[31337].Manager.abi,
            address: deployedContracts[31337].Manager.address,
            functionName: 'setCompanyVerification',
            args: [
                address,
                name,
                verified,
                pIva,
            ],
            account: privateKeyToAccount(`0x${ourCompanyPrivateKey}`),
        });

        return NextResponse.json({ verified: isCompanyVerified }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: 'Contract interaction failed' }, { status: 500 });
    }
  }