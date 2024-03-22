import mongoose, { mongo } from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

// let cached = global.mongoose;

// if (!cached) {
//   cached = global.mongoose = { conn: null, promise: null };
// }

const connectDB = async () => {
  try {
    await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    console.log('connection sucessful')
  } catch (error) {
    throw new Error('Error connecting to db')
  }
  // if (cached.conn) {
  //   console.log("🚀 Using cached connection");
  //   return cached.conn;
  // }
  // if (!cached.promise) {
  //   const opts = {
  //     bufferCommands: false,
  //     useNewUrlParser: true,
  //     useUnifiedTopology: true,
  //   };

  //   cached.promise = mongoose
  //     .connect(MONGODB_URI, opts)
  //     .then((mongoose) => {
  //       console.log("✅ New connection established");
  //       return mongoose;
  //     })
  //     .catch((error) => {
  //       console.error("❌ Connection to database failed");
  //       throw error;
  //     });
  // }

  // try {
  //   cached.conn = await cached.promise;
  // } catch (e) {
  //   cached.promise = null;
  //   throw e;
  // }

  // return cached.conn;
};

export default connectDB;