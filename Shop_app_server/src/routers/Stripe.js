import express from 'express';
import Stripe from 'stripe'
const router = express.Router();

const stripe = Stripe("sk_test_51N95AXSARt03c6c9ZxzE47HlnONBrXnsyKaiHADxONZ048sFjtK6g7OXpHU6Bi4Q2iWvGzPioNPvubtA1ZPvUo3N00xCkTxrnW")

router.post('/create-checkout-session', async (req, res) => {
    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price_data: {
            currency: 'inr',
            product_data: {
              name: 'Premium Blogs Subscription',
            },
            unit_amount: 50000,
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: "http://localhost:3000/checkout-success",
      cancel_url: "http://localhost:3000"
    });
  console.log('stripe response', session)
    res.send({url: session.url});
  });

  export default router;