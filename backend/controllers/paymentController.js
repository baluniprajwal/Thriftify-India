import { stripe } from "../app.js";
import Order from "../models/orderModel.js";

export const createStripeCheckoutSession = async (req, res) => {
    try {
        const { cartItems, shippingAddress, totalAmount, userEmail } = req.body;
        const userId = req.userId;

        const formattedShippingAddress = {
            fullName: shippingAddress.fullName,
            addressLine: shippingAddress.addressLine,
            city: shippingAddress.city,
            postalCode: shippingAddress.postalCode,
        };

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"], // Important: use 'card' to support GPay + UPI
            mode: "payment",
            success_url: `${process.env.FRONTEND_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${process.env.FRONTEND_URL}/cancel`,
            customer_email: userEmail,
            line_items: cartItems.map((item) => ({
                price_data: {
                    currency: "inr",
                    product_data: {
                        name: item.name,
                        images: item.image ? [item.image] : [],
                    },
                    unit_amount: Math.round(item.price * 100),
                },
                quantity: item.quantity,
            })),
            metadata: {
                cartItems: JSON.stringify(cartItems),
                shippingAddress: JSON.stringify(formattedShippingAddress),
                totalAmount: totalAmount.toString(),
                userId: userId.toString(),
            },
        });

        res.status(200).json({ url: session.url });

    } catch (error) {
        console.error("Stripe session error:", error);
        res.status(500).json({ message: "Stripe session creation failed" });
    }
};

export const stripeWebhook = async (req, res) => {
    const sig = req.headers['stripe-signature'];

    let event;
    try {
        event = stripe.webhooks.constructEvent(
            req.body,
            sig,
            process.env.STRIPE_WEBHOOK_SECRET
        );
    } catch (err) {
        console.error("Webhook signature verification failed:", err.message);
        return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    if (event.type === "checkout.session.completed") {
        const session = event.data.object;

        try {
            const cartItems = JSON.parse(session.metadata.cartItems);
            const shippingAddress = JSON.parse(session.metadata.shippingAddress);
            const totalAmount = Number(session.metadata.totalAmount);
            const userId = session.metadata.userId;

            const newOrder = new Order({
                userId,
                orderItems: cartItems.map(item => ({
                    productId: item.productId,
                    name: item.name,
                    quantity: item.quantity,
                    price: item.price,
                    image: item.image,
                })),
                shippingAddress: {
                    fullName: shippingAddress.fullName,
                    addressLine: shippingAddress.addressLine,
                    city: shippingAddress.city,
                    postalCode: shippingAddress.postalCode,
                },
                totalAmount,
                paymentStatus: "paid",
                paymentId: session.payment_intent,
                deliveryStatus: "pending",
            });

            await newOrder.save();
            console.log("Order created successfully after payment");

            return res.status(200).json({ received: true });

        } catch (error) {
            console.error("Error creating order from Stripe session:", error);
            return res.status(500).json({ error: "Server error in webhook" });
        }
    }

    res.status(200).json({ received: true });
};
