import mongoose from "mongoose";
import dns from "node:dns/promises";

export const connDB = async () => {
    //DNS resolver
    dns.setServers(["1.1.1.1"]);
    try {
        const uri = process.env.MONGODB_URI;
        console.log(uri)
        if (!uri) {
            throw new Error("MongoDB_URI  is not defined in .env");
        }
        await mongoose.connect(uri);
        console.log("MongoDB connected sucessfully");
    } catch (error) {
        console.error("Connection error:", error);
        process.exit(1);
    }
};
