import { StatusCodes } from "http-status-codes";
import PaymentModel from "../models/PaymentModel.js";
import Stripe from "stripe";

const stripe = Stripe("sk_test_51N95AXSARt03c6c9ZxzE47HlnONBrXnsyKaiHADxONZ048sFjtK6g7OXpHU6Bi4Q2iWvGzPioNPvubtA1ZPvUo3N00xCkTxrnW")

export async function postPayment(req, res) {
    try {
        const session = await stripe.checkout.sessions.create({
            line_items: [
              {
                price_data: {
                  currency: 'inr',
                  product_data: {
                    name: 'Premium Blogs Subscription',
                  },
                  unit_amount: req.body.amount*100,
                },
                quantity: 1,
              },
            ],
            mode: 'payment',
            success_url: "http://localhost:3000/checkout-success",
            cancel_url: "http://localhost:3000"
          });
        console.log('stripe response', session)
        console.log("response url", session.url)

          // store payment details in database

          const { amount , userId} = req.body

          const payment = PaymentModel({amount, userId, transactionId:session.id})

          const savedPaymentDetails = await payment.save()
          console.log("payment details", savedPaymentDetails)

          res.send({url: session.url});
        
      
    } catch (error) {
        console.log("error in post payment", error)
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message:"error in post payment"})
    }
}
   
        
