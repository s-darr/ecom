import pool from "../config/db.js";

export const createOrder = async (buyerId, items) => {
  try {
    await pool.query("BEGIN");

    const orderQuery = `
      INSERT INTO Orders (buyer_id, order_status, created_at, updated_at)
      VALUES ($1, $2, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
      RETURNING *;
    `;
    const orderResult = await pool.query(orderQuery, [buyerId, "Pending"]);
    const orderId = orderResult.rows[0].id;

    for (const item of items) {
      const { product_id, quantity } = item;

      const orderDetailsQuery = ` 
        INSERT INTO OrderDetails (order_id, product_id, quantity, price)
        SELECT $1, $2, $3, price FROM Products WHERE id = $2
      `;
      await pool.query(orderDetailsQuery, [orderId, product_id, quantity]);

      const updateProductQuery = `
        UPDATE Products
        SET quantity = quantity - $1
        WHERE id = $2 AND quantity >= $1
      `;
      await pool.query(updateProductQuery, [quantity, product_id]);
    }

    //Delete where buyer_id matches and product_id is present in productIds
    const clearCartQuery = `
      DELETE FROM Cart
      WHERE buyer_id = $1 AND product_id = ANY($2::int[]) 
    `;
    const productIds = items.map((item) => item.product_id);
    await pool.query(clearCartQuery, [buyerId, productIds]);

    await pool.query("COMMIT");

    return orderResult.rows[0];
  } catch (error) {
    await pool.query("ROLLBACK");
    throw error;
  }
};
