import mongoose from "mongoose";

async function dbConnection(){
    try {
        await mongoose.connect(process.env.DB_URL)
        console.log("database connection successfuly .....")
    } catch (error) {
        console.log(error)
        console.log("error in database connection.........")
    }
}

export default dbConnection;