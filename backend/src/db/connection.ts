import mongoose, { Connection } from "mongoose";

let cached: {
  conn: Connection | null;
  promise: Promise<Connection> | null;
} = {
  conn: null,
  promise: null,
};

async function connectTodb() {
  const DB_URI = process.env.MONGODB_URI;

  if (!DB_URI) {
    throw new Error("please check the db uri string");
  }

  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    cached.promise = mongoose.connect(DB_URI).then(() => mongoose.connection);
  }

  try {
    cached.conn = await cached.promise;
  } catch (err) {
    cached.promise = null;
    throw err;
  }

  return cached.conn;
}

export default connectTodb;
