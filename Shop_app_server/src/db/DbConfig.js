import mongoose from 'mongoose'

export const connectDb = async ()=>{
    try {
        await mongoose.connect(process.env.DB_URL)
        console.log("database connection successfully......")
    } catch (error) {
        console.log(error)
        console.log("error in database connections.........")
    }
}