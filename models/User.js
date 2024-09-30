import pool from "../config/db.js";
import bcrypt from "bcrypt";
import { addSeller } from "./Seller.js";
export const getUserByUsername = async (username) => {
  try {
    const result = await pool.query("SELECT * FROM users WHERE username = $1", [
      username,
    ]);

    if (result.rows.length === 0) {
      return undefined;
    }
    return result.rows[0];
  } catch (error) {
    throw error;
  }
};

export const createUser = async (username, email, password, role) => {
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const query = `
      INSERT INTO users (username, email, password, role)
      VALUES ($1, $2, $3, $4)
      RETURNING *;
    `;
    const values = [username, email, hashedPassword, role];
    const result = await pool.query(query, values);

    const newUser = {
      id: result.rows[0].id,
      username: result.rows[0].username,
      email: result.rows[0].email,
      role: result.rows[0].role,
      created_at: result.rows[0].created_at,
    };
    if (role === "seller") {
      await addSeller(newUser.id, `${username}'s Store`, "");
    }
    return newUser;
  } catch (error) {
    throw error;
  }
};
