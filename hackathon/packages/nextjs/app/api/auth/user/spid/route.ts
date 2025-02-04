//implement the route for the user api to register the user

import { NextResponse, NextRequest } from "next/server";

export async function POST(request: NextRequest) {

    let x = await request.json();

  //SIMULATE CALL TO SPID API
  //RECEIVE DATA FROM SPID API

  //CHECK THEM AGAINST THE DATA FROM THE FORM
  

  // Do whatever you want
  return NextResponse.json({ message: "Hello World" }, { status: 200 });
  }