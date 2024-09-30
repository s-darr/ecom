import pool from "../config/db.js";

export const addSeller = async (userId, storeName, storeDescription) => {
  const query = `
    INSERT INTO Sellers (user_id, store_name, store_description, created_at, updated_at)
    VALUES ($1, $2, $3, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
    RETURNING *;
  `;
  const values = [userId, storeName, storeDescription];

  const result = await pool.query(query, values);
  return result.rows[0];
};
