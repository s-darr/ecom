import pg from "pg";
const { Pool } = pg;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

pool.connect((err) => {
  if (err) {
    console.error("Error connecting to database:", err.stack);
  } else {
    console.log("Connected to database");
  }
});

export default pool;
