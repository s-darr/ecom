import express from "express";
import auth from "./routes/auth.js";
import products from "./routes/products.js";
import cart from "./routes/cart.js";
import orders from "./routes/order.js";
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const app = express();

// Middleware to parse JSON body
app.use(express.json());

app.use("/api/auth", auth);
app.use("/api/products", products);
app.use("/api/cart", cart);
app.use("/api/orders", orders);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`server running on port ${port}`));
