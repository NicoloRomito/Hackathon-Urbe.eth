//implement the route for the company api to register the company
import { NextResponse, NextRequest } from "next/server";

export async function POST(request : NextRequest) {
    // Do whatever you want
    return NextResponse.json({ message: "Hello World" }, { status: 200 });
  }