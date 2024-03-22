import { connectDB } from "@/config/db";
import { NextResponse } from "next/server";
import { Wallets } from "@/models/Wallets";

export async function GET() {
    try {
        await connectDB();
        const wallets = await Wallets.find();
        
        return NextResponse.json({ wallets }, { 
            status: 200,
            headers: {
                "Cache-Control": "no-store, max-age=0" // Disables caching
            }
        });
    } catch (err) {
        console.log(err);
        return NextResponse.json({ message: "Error", err }, { status: 500 });
    }
}