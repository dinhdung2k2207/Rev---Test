import mongoose from "mongoose";

export async function connectToDatabase(dbURL: string): Promise<void> {
    await mongoose.connect(dbURL);
}
