import mongoose, { Schema } from "mongoose";

// mongoose.connect(process.env.MONGODB_URI);
// mongoose.Promise = global.Promise;

const walletSchema = new Schema(
  {
    Wallet: String,
    Address: String,
   
  }
);

export const Wallets = mongoose.models.Wallets || mongoose.model("Wallets", walletSchema);

// module.exports = Wallets;