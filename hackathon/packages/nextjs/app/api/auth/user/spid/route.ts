//implement the route for the user api to register the user

import { NextResponse, NextRequest } from "next/server";

export async function POST(request : NextRequest) {

    let x = request.body;

    console.log(x);

    // Do whatever you want
    return NextResponse.json({ message: "Hello World" }, { status: 200 });
  }