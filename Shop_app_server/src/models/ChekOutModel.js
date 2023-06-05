import mongoose from "mongoose";

const checkOutSchema = new mongoose.Schema({
    fname: { type: String, required: true },
    lname: { type: String, required: true },
    country: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: Number, required: true },
    state: { type: String, required: true },
    pincode: { type: Number },
    orderNotes: { type: String },
    cuponCode: { type: String },
    address: { type: String, required: true },
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"user"
    }
})

const CheckOutModel = new mongoose.model('checkout', checkOutSchema)

export default CheckOutModel

