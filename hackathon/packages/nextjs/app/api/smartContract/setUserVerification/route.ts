//implement the route for the user api to register the user
import { readContract, writeContract } from '@wagmi/core'
import { privateKeyToAccount } from 'viem/accounts'
import {config} from '~~/utils/wagmi/config'
import deployedContracts from '~~/contracts/deployedContracts'

let ourCompanyPrivateKey = "28811c831d972d81fbe99d20daf11a95f78b50b3556eb5f7007fe5645f361e8d"

import { NextResponse, NextRequest } from "next/server";
interface UserInfo {
    address: string
    email: string
    name: string
    lastName: string
    codiceFiscale: string
    verified: boolean
    verifiedBy: string
  }
export async function POST(request : NextRequest) {
    console.log("POST")
    const userInfo: UserInfo = await request.json();
    console.log(userInfo)
    const { email, name, lastName, codiceFiscale, verified, verifiedBy, address } = userInfo;

    // Validate input data
    if (!email || !name || !lastName || !codiceFiscale || !verifiedBy || !address) {
        return NextResponse.json({ error: 'Invalid input data' }, { status: 400 });
    }

    // Ensure the private key is not hardcoded
    // const ourCompanyPrivateKey = process.env.COMPANY_PRIVATE_KEY;
    // if (!ourCompanyPrivateKey) {
    //     return NextResponse.json({ error: 'Server configuration error' }, { status: 500 });
    // }

    try {
        const isUserVerified = await writeContract(config, {
            abi: deployedContracts[31337].Manager.abi,
            address: deployedContracts[31337].Manager.address,
            functionName: 'setUserVerification',
            args: [
                address,
                verifiedBy,
                verified,
                name,
                lastName,
                codiceFiscale,
                email,
            ],
            account: privateKeyToAccount(`0x${ourCompanyPrivateKey}`),
        });

        return NextResponse.json({ verified: isUserVerified }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: 'Contract interaction failed' }, { status: 500 });
    }
  }