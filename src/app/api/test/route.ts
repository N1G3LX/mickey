import { NextResponse } from "next/server";
export function GET() {
    try {
     
  
      return NextResponse.json({ msg: 'API works' }, { status: 200 });
    } catch (err) {
      console.log(err);
      return NextResponse.json({ message: "Error", err }, { status: 500 });
    }
  }