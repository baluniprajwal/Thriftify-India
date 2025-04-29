import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  orderItems: [
    {
      productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
      name: String,
      quantity: Number,
      price: Number,
      image: String,
    },
  ],
  shippingAddress: {
    fullName: { type: String, required: true },
    addressLine: { type: String, required: true },
    city: { type: String, required: true },
    postalCode: { type: String, required: true },
  },
  totalAmount: {
    type: Number,
    required: true,
  },
  paymentStatus: {
    type: String,
    enum: ["pending", "paid", "failed"],
    default: "pending",
  },
  paymentId: {
    type: String,
  },
  deliveryStatus: {
    type: String,
    enum: ["pending", "shipped", "delivered"],
    default: "pending",
  },
},{ timestamps: true });

const Order = mongoose.model("Order", orderSchema);

export default Order;
