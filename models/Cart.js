import pool from "../config/db.js";

export const addCartItem = async (userId, productId, quantity) => {
  const query = `
    INSERT INTO Cart (buyer_id, product_id, quantity)
    VALUES ($1, $2, $3)
    ON CONFLICT (buyer_id, product_id)
    DO UPDATE SET quantity = Cart.quantity + $3
    RETURNING *;
  `;
  const values = [userId, productId, quantity];

  const result = await pool.query(query, values);
  return result.rows[0];
};

export const getUserCart = async (buyerId) => {
  const query = `
    SELECT c.id AS cart_item_id, c.quantity, p.id AS product_id, p.name, p.description, p.price
    FROM Cart c
    INNER JOIN Products p ON c.product_id = p.id
    WHERE c.buyer_id = $1;
  `;
  const values = [buyerId];

  const result = await pool.query(query, values);
  return result.rows;
};

export const removeItemCart = async (productId, userId) => {
  const query = "DELETE FROM Cart WHERE product_id = $1 AND buyer_id = $2";
  const values = [productId, userId];

  const result = await pool.query(query, values);

  if (result.rowCount === 0) {
    return { success: false, message: "Item not found in cart" };
  }
  return { success: true, message: "Item successfully removed from cart" };
};

export const updateCartItemQuantity = async (buyerId, productId, quantity) => {
  if (quantity <= 0) {
    return await removeItemCart(productId, buyerId);
  }

  const query = `
    UPDATE Cart
    SET quantity = $3
    WHERE buyer_id = $1 AND product_id = $2
    RETURNING *;
  `;
  const values = [buyerId, productId, quantity];

  const result = await pool.query(query, values);
  return result.rows[0];
};
