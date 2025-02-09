import mongoose from "mongoose";


type ConnectionObject = {
    isConnected?:number
}


const connection:ConnectionObject = {}

export default async function dbConnect():Promise<void>{
    if(connection.isConnected){
        console.log("Already Connected to DB")
        return 
    }
    try {
        const db = await mongoose.connect(process.env.MONGODB_URI || '')
        connection.isConnected = db.connections[0].readyState
        console.log("Connected to DB")
    } catch (error) {
        console.log(error)
        process.exit(1)
    }
}