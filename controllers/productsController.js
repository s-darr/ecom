import {
  findSellerByUserId,
  addProductForSeller,
  getAllProducts,
} from "../models/Product.js";

export const getProducts = async (req, res) => {
  try {
    const products = await getAllProducts();
    return res.status(200).json(products);
  } catch (error) {
    console.log(error);
  }
};

export const addProduct = async (req, res) => {
  const { name, description, quantity, price } = req.body;
  const sellerId = req.user.id;

  if (!name || !quantity || !price) {
    return res.status(400).json({
      message: "Please provide all required fields: name, quantity, and price",
    });
  }

  try {
    const seller = await findSellerByUserId(sellerId);

    if (!seller) {
      return res
        .status(403)
        .json({ message: "Only registered sellers can add products" });
    }

    const newProduct = await addProductForSeller(
      seller.id,
      name,
      description,
      quantity,
      price
    );

    res.status(201).json({
      message: "Product successfully added",
      product: newProduct,
    });
  } catch (error) {
    console.error("Error adding product:", error.message);
    res.status(500).json({ error: "Server error while adding product" });
  }
};

export const buyProduct = async (req, res) => {
  try {
  } catch (error) {}
};
