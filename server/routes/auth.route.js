import { Router } from "express";
import { curentUser, logout, refreshToken, signin, signup } from "../controllers/auth.controller.js";
import authentication from "../middlewares/authentication.js";


const routerAuth = Router();
routerAuth.post("/signup", signup)
routerAuth.post("/signin", signin)
routerAuth.post("/logout",logout)
routerAuth.get("/curent-user", authentication, curentUser)
routerAuth.post("/refreshToken",refreshToken)
export default routerAuth