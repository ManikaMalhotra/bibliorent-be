import mongoose from "mongoose";

export default async function connect() {
    const mongoUri = process.env.MONGO_DB_URI || 'mongodb://127.0.0.1:27017/bibliorent';
    try {
        await mongoose.connect(mongoUri);
        console.log('Connected to MongoDB');
    } catch (err) {
        console.log(err);
    }
}