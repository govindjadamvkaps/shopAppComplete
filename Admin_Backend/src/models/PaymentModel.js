import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user'
    },
    transectionId:{
        type:String
    },
    amount:{
        type: Number
    }
})

const PaymentModel = new mongoose.model('PaymentDetail', paymentSchema)

export default PaymentModel ;