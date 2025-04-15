import mongoose from 'mongoose';

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    condition: {
      type: String,
      enum: ['New', 'Gently Used', 'Like New', 'Used', 'Vintage'],
    },
    category: {
      type: String,
      enum: ['clothing', 'shoes', 'accessories', 'other'],
    },
    material: {
      type: String,
    },
    careInstructions: [String],
    shippingInfo: {
      type: String,
    },
    imageUrls: [String],
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model('Product', productSchema);
export default Product;
