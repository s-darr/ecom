import { addCartItem, getUserCart, removeItemCart } from "../models/Cart.js";

export const addToCart = async (req, res) => {
  const { productId, quantity } = req.body;
  const userId = req.user.id;

  if (!productId || !quantity) {
    return res
      .status(400)
      .json({ message: "Please provide productId and quantity" });
  }

  try {
    const newCartItem = await addCartItem(userId, productId, quantity);
    res
      .status(201)
      .json({ message: "Product added to cart", cartItem: newCartItem });
  } catch (error) {
    console.error("Error adding to cart:", error.message);
    res.status(500).json({ error: "Server error while adding to cart" });
  }
};

export const getCart = async (req, res) => {
  const buyerId = req.user.id;
  try {
    const userCart = await getUserCart(buyerId);
    return res.status(200).json(userCart);
  } catch (error) {
    res.status(500).json({ error: "Server error while getting cart" });
  }
};

export const removeFromCart = async (req, res) => {
  const userId = req.user.id;
  const productId = req.body.product_id;
  if (!userId || !productId)
    return res.status(400).json({ error: "One or more ID's missing" });
  try {
    const removedItem = await removeItemCart(productId, userId);

    if (removedItem.success) {
      return res.status(200).json({ message: removedItem.message });
    } else {
      return res.status(404).json({ message: removedItem.message });
    }
  } catch (error) {
    res.status(500).json({ error: "Server error removing item from cart" });
  }
};
