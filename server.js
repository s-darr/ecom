import express from "express";
import auth from "./routes/auth.js";
import products from "./routes/products.js";
const app = express();

// Middleware to parse JSON body
app.use(express.json());

app.use("/api/auth", auth);
app.use("/api/products", products);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`server running on port ${port}`));
