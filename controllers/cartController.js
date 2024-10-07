import {
  addCartItem,
  getUserCart,
  removeItemCart,
  updateCartItemQuantity,
} from "../models/Cart.js";

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

export const updateCartItem = async (req, res) => {
  const { productId, quantity } = req.body;
  const buyerId = req.user.id;

  if (!productId || quantity == null) {
    return res
      .status(400)
      .json({ message: "Please provide productId and quantity" });
  }

  try {
    const updatedCartItem = await updateCartItemQuantity(
      buyerId,
      productId,
      quantity
    );

    if (!updatedCartItem) {
      return res.status(404).json({ message: "Cart item not found" });
    }

    res.status(200).json({
      message: "Cart item updated successfully",
      cartItem: updatedCartItem,
    });
  } catch (error) {
    console.log("Error updating cart item:", error.message);
    res.status(500).json({ error: "Server error while updating cart item" });
  }
};

export const removeFromCart = async (req, res) => {
  const { productId } = req.body;
  const userId = req.user.id;

  if (!productId) {
    return res.status(400).json({ message: "Please provide a productId" });
  }

  try {
    const result = await removeItemCart(productId, userId);

    if (result.success) {
      return res.status(200).json({ message: result.message });
    } else {
      return res.status(404).json({ message: result.message });
    }
  } catch (error) {
    console.error("Error removing item from cart:", error.message);
    return res
      .status(500)
      .json({ error: "Server error while removing item from cart" });
  }
};
