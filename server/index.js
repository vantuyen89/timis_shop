import express from 'express';
import "dotenv/config"
import cors from "cors"
import bodyParser from 'body-parser';
import morgan from "morgan"
import { connectDB } from './configs/db.js';

import routerCate from './routes/category.route.js';
import routerSize from './routes/size.route.js';
import routerColor from './routes/color.route.js';
import routerProduct from './routes/product.route.js';
import routerAuth from './routes/auth.route.js';
import routerCart from './routes/cart.route.js';
import routerOrder from './routes/order.route.js';
import cookieParser from 'cookie-parser';
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
// app.use(morgan("tiny"))
app.use(cors({ origin: "http://localhost:3000", credentials: true, }));
app.use(cookieParser());
connectDB(process.env.HOST);

app.use("/api/v1/category", routerCate)
app.use("/api/v1/size", routerSize)
app.use("/api/v1/color", routerColor)
app.use("/api/v1/product", routerProduct)
app.use("/api/v1/auth", routerAuth)
app.use("/api/v1/cart", routerCart)
app.use("/api/v1/order", routerOrder)
app.listen(process.env.PORT, () => {
    console.log("listen on port " + process.env.PORT);
})