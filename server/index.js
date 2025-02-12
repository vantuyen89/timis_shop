import express from 'express';

import cors from "cors"
import bodyParser from 'body-parser';
import { connectDB } from './configs/db.js';
import routerCate from './routes/category.route.js';
import routerSize from './routes/size.route.js';
import routerColor from './routes/color.route.js';
import routerProduct from './routes/product.route.js';
import routerAuth from './routes/auth.route.js';
import routerCart from './routes/cart.route.js';
import routerOrder from './routes/order.route.js';
import cookieParser from 'cookie-parser';
import routerMessage from './routes/message.route.js';
import routerStatistic from './routes/statistic.route.js';
import { app, server } from './socket/socket.js';
import dotenv from 'dotenv'
import routerComment from './routes/comment.route.js';
import routerProductComing from './routes/productComing.js';
dotenv.config()
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
// app.use(morgan("tiny"))
console.log(process.env.HOST_CLIENT);
const corsOptions = {
    origin: process.env.HOST_CLIENT,
    credentials: true,
    methods: "GET, POST, OPTIONS, PUT, PATCH, DELETE",
    allowedHeaders: ["X-Requested-With", "Content-Type", "Authorization"],
};

app.use(cors(corsOptions));
// Middleware CORS để thêm tiêu đề vào mọi phản hồi
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", process.env.HOST_CLIENT);
    res.setHeader("Access-Control-Allow-Methods", corsOptions.methods);
    res.setHeader(
        "Access-Control-Allow-Headers",
        corsOptions.allowedHeaders.join(", ")
    );
    res.setHeader("Access-Control-Allow-Credentials", true);
    next();
});
app.use(cookieParser());
connectDB(process.env.HOST);

app.use("/api/v1/category", routerCate)
app.use("/api/v1/size", routerSize)
app.use("/api/v1/color", routerColor)
app.use("/api/v1/product", routerProduct)
app.use("/api/v1/auth", routerAuth)
app.use("/api/v1/cart", routerCart)
app.use("/api/v1/order", routerOrder)
app.use("/api/v1/message", routerMessage)
app.use("/api/v1/comment", routerComment)
app.use("/api/v1/statistic", routerStatistic)
app.use("/api/v1/productComing",routerProductComing)
server.listen(process.env.PORT, () => {
    console.log("listen on port " + process.env.PORT);
})