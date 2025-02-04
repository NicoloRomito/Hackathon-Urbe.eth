//implement the route for the user api to register the user
import { readContract, writeContract } from '@wagmi/core'
import { privateKeyToAccount } from 'viem/accounts'
import {config} from '~~/utils/wagmi/config'
import deployedContracts from '~~/contracts/deployedContracts'

let ourCompanyPrivateKey = "28811c831d972d81fbe99d20daf11a95f78b50b3556eb5f7007fe5645f361e8d"

import { NextResponse, NextRequest } from "next/server";

export async function GET(request : NextRequest) {

    //get user info from smart contract
    const { searchParams } = new URL(request.url);
    const address = searchParams.get('address');
    if (!address) {
        return NextResponse.json({ error: "Address is required" }, { status: 400 });
    }
    const result = await readContract(config, {
        abi: deployedContracts[31337].Manager.abi,
        address: deployedContracts[31337].Manager.address,
        functionName: 'getCompanyVerificationData',
        args: [
           address
        ],
        account: privateKeyToAccount(`0x${ourCompanyPrivateKey}`),
      })
      return NextResponse.json({companyData : result}, { status: 200 });
  }