import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
    productId: [{
        pid: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'product'
        },
        qty:{ type:Number}

    }],
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    totalPrice: {
        type: Number
    },
    quantity: {
        type: Number
    }

}, {
    timestamps: true
});

const CartModel = mongoose.model("cart", cartSchema);

export default CartModel