import connectDB from "@/config/db";
import { NextResponse } from "next/server";
import { Wallets } from "@/models/Wallets";
import {parse} from "csv-parse"; // Assuming Node.js environment
import { CSVToJSON } from "../../../../utils/helper";




export async function POST(req) {
    try {
        await connectDB();

        const body = await req.json();
        
if (!body || !body.body) {
    return NextResponse.json({ message: "Invalid CSV data format" }, { status: 400 });
  }

  const csvData = CSVToJSON(body.body)

  const newWallets = [];
  for (const row of csvData) {
    const wallet = row["Wallet"]?.trim(); // Remove leading/trailing whitespace from wallet name
    const address = row["Address"]?.trim(); // Remove leading/trailing whitespace from address
    // Check if required fields are present
    if (!wallet || !address) {
      console.warn("Skipping row due to missing data:", row);
      continue; // Skip rows with missing data
    }

    // Check if address already exists in the database
    const existingWallet = await Wallets.findOne({ Address: address });
    if (!existingWallet) {
      const newWallet = await new Wallets({ Wallet: wallet, Address: address }).save();
      newWallets.push(newWallet);
    }
  }

  if (newWallets.length > 0) {
    // await Wallets.insertMany(newWallets);
    return NextResponse.json({ message: 'Data Added Successfully' }, { status: 201 });
  } else {
    return NextResponse.json({ message: "No new wallets to add" }, { status: 200 });
  }
    } catch (err) {
        console.error(err);
        return NextResponse.json({ message: "Error Met", err }, { status: 500 });
    }
}
