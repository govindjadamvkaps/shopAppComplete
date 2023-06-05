import CartModel from "../models/CartModel.js";
import { StatusCodes } from "http-status-codes";
import { ProductModel } from '../models/ProductModel.js'

export async function saveCart(req, res) {
   

    try {
        // console.log("cart body", req.body)
        var user = await CartModel.findOne({ userId: req.body.userId })
        // console.log("useerr", user)

        // if(!user){
        const cartData = CartModel(req.body)
        const savedCart = await cartData.save()

        res.status(StatusCodes.CREATED).json({ data: savedCart, message: "cart saved successfully", success: true })
        // }
        // else{

        //    console.log("else block")
        //     user.productId.push(req.body.productId)
        //     const cart = await user.save()
        //     console.log("carrrr", cart)
        //     res.status(StatusCodes.CREATED).json({data:cart, message:"duplicatecart saved"})
        // }


    } catch (error) {
        console.log("error in saving cart", error)
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: "error in add to cart" })
    }

}



export async function fetchAllCart(req, res) {
    try {
        const cart = await CartModel.find().populate('productId')
        console.log("cart", cart)
        res.status(StatusCodes.OK).json({ data: cart, message: "find all cart", success: true })
    } catch (error) {
        console.log("error in fetching all cart", error)
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: "error in fetching all cart", success: false })
    }
}


// export async function deleteCart(req,res){
//     try {
//         const cartEntry = await CartModel.findById(req.params.id);
//         if (!cartEntry) {
//           return { message: "Cart entry not found", status: 404 };
//         }

//         // Find the index of the productId in the productId array
//         const index = cartEntry.productId.findIndex((prodId) => prodId.equals(productId));
//         if (index !== -1) {
//           // Remove the productId from the array
//           cartEntry.productId.splice(index, 1);
//           await cartEntry.save();
//           res.status(StatusCodes.OK).json({data:cartEntry, message:"cart deleted successfully"})
//         //   return { data: cartEntry, message: "Success", status: 200 };

//         } else {
//             res.status(StatusCodes.BAD_REQUEST).json({message:"Product not found in cart"})
//         //   return { message: "Product not found in cart", status: 404 };
//         }
//         // const  cart = await CartModel.findByIdAndUpdate(req.params.id)


//     } catch (error) {
//         console.log("error in deleting cart ", error)
//         res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message:"error in deleting cart ", success:false})
//     }

// }

export async function fetchCartByUserId(req, res) {
    try {
        // console.log(req.params.id)
        const cart = await CartModel.findOne({ userId: req.params.id }).populate('productId.pid')

        // console.log(cart)

        res.status(StatusCodes.OK).json({ data: cart, message: "cart find successfully", message: true })
    } catch (error) {
        console.log("error in fetching cart by userId", error)
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: "error in fetching cart using user id " })

    }

}


export async function deleteCart(req, res) {
    try {
        // console.log(req.params.id)
        const cart = await CartModel.findByIdAndDelete(req.params.id)
        res.status(StatusCodes.OK).json({ message: "cart delete successfully" })
    } catch (error) {
        console.log("error in delete cart", error)
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: "error in deletind cart" })
    }
}



export async function addToCart(req, res) {

    try {
        console.log("Body : => ", req.body)
        const cart = await CartModel.findOne({ userId: req.body.userId }).populate('productId')
        // console.log("Cart data : ", cart);
        if (!cart) {
            let { userId, productId, totalPrice, quantity } = req.body;
            // productId = new mongoose.Types.ObjectId(productId);
            const saveCart = CartModel({ userId, productId: { pid: productId, qty: quantity }, totalPrice, quantity })

            const resp = await saveCart.save()
            return res.status(StatusCodes.CREATED).json({ data: resp, message: "cart saved successfully", success: true })
        }
        else {
            const { userId, productId, totalPrice, quantity } = req.body;
            const products = cart.productId;
            // console.log(products)

            let existingQty = 0;
            let isProductExist = false;
            for (let product of products) {
                if (product.pid == productId) {
                    isProductExist = true;
                    product.qty += quantity;
                }
            }

            console.log(isProductExist)
            if (isProductExist != true) {

                cart.productId.push({ pid: productId, qty: quantity });
            }

            cart.totalPrice += totalPrice;
            cart.quantity += quantity;

            await cart.save();

            return res.status(StatusCodes.CREATED).json({
                data: cart,
                success: true,
                message: "Product added to cart successfully"
            })
        }
    } catch (error) {
        console.log("Error while add to cart : ", error);
        return res.status(400).json({
            success: false,
            error: error.message
        })
    }
}

export async function deleteAddToCart(req, res) {
    try {
        const userId = req.params.userId
        const pid = req.params.pid
        // console.log('userId', userId)
        // console.log("pid", pid)
        const cart = await CartModel.findOne({ userId: userId })
        // console.log("carrrt", cart)

        if (!cart) {
            return res.status(StatusCodes.OK).json({ message: "cart not found for deleting", success: false })
        }
        // console.log("cart.productid", cart.productId[0].pid)
        // console.log("pid=> pid", pid)
        const itemIndex = cart.productId.findIndex(item => item.pid == pid);
        // console.log("item index", itemIndex)
        if (itemIndex !== -1) {
            // Remove the item from the cart array

            const product = await ProductModel.findById(pid);
            const productPrice = product.pPrice * cart.productId[itemIndex].qty;
            // console.log("Prodcut cprice : ", productPrice)
            cart.totalPrice = cart.totalPrice - productPrice;
            cart.quantity -= cart.productId[itemIndex].qty;
            cart.productId.splice(itemIndex, 1);
            await cart.save()
            return res.status(StatusCodes.NO_CONTENT).json({ message: "cart item delete successfully" });
        } else {
            return res.status(StatusCodes.NOT_FOUND).json({ message: "cart not found for delete", success: false });
        }

    } catch (error) {
        console.log("error in deleting cart data", error)

        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: "error in deleting cart data", success: false })
    }
}

