import pool from "../config/db.js";

export const getAllProducts = async () => {
  try {
    const result = await pool.query("SELECT * FROM products");
    return result.rows[0];
  } catch (error) {
    console.log(error);
  }
};

export const findSellerByUserId = async (userId) => {
  const query = "SELECT * FROM Sellers WHERE user_id = $1";
  const result = await pool.query(query, [userId]);
  return result.rows[0];
};

export const addProductForSeller = async (
  sellerId,
  name,
  description,
  quantity,
  price
) => {
  const insertProductQuery = `
    INSERT INTO Products (seller_id, name, description, quantity, price, created_at, updated_at)
    VALUES ($1, $2, $3, $4, $5, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
    RETURNING *;
  `;
  const productValues = [sellerId, name, description, quantity, price];
  const result = await pool.query(insertProductQuery, productValues);
  return result.rows[0];
};
