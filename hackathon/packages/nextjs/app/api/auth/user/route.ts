//implement the route for the user api to register the user

import { NextResponse, NextRequest } from "next/server";

export async function GET(request : NextRequest) {

    //get user info from smart contract

    // Do whatever you want
    return NextResponse.json({ message: "Hello World" }, { status: 200 });
  }