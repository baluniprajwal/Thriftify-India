import Product from '../models/productModel.js';


export const createProduct = async (req, res) => {
  const {
    name,
    description,
    price,
    condition,
    category,
    material,
    careInstructions,
    shippingInfo,
    imageUrls,
  } = req.body;

  try {
    const product = new Product({
      name,
      description,
      price,
      condition,
      category,
      material,
      careInstructions,
      shippingInfo,
      imageUrls,
    });

    await product.save();
    return res.status(201).json(product);
  } catch (error) {
    return res.status(500).json({ message: 'Error saving product', error: error.message });
  }
};

export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    return res.status(200).json(products);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    return res.status(200).json(product);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};


export const updateProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    return res.status(200).json(product);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};


export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    return res.status(200).json({ message: 'Product deleted successfully' });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};


export const searchProducts = async (req, res) => {
  try {
    const { name, category, condition, minPrice, maxPrice } = req.query;

    let query = {};

    if (name) {
      query.name = new RegExp(name, 'i');
    }
    if (category) {
      query.category = category;
    }
    if (condition) {
      query.condition = condition;
    }
    if (minPrice || maxPrice) {
        query.price = {};
        if (minPrice) query.price.$gte = Number(minPrice);
        if (maxPrice) query.price.$lte = Number(maxPrice);
    }      

    const products = await Product.find(query);
    return res.status(200).json(products);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};
