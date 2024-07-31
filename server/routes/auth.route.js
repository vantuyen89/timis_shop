import { Router } from "express";
import { blockUser, curentUser, getUserAdmin, getUserChatShop, logout, pagingUsers, refreshToken, signin, signup, unblockUser, updateUser } from "../controllers/auth.controller.js";
import authentication from "../middlewares/authentication.js";


const routerAuth = Router();
routerAuth.post("/signup", signup)
routerAuth.post("/signin", signin)
routerAuth.post("/logout",logout)
routerAuth.get("/curent-user", authentication, curentUser)
routerAuth.post("/refreshToken", refreshToken)
routerAuth.post("/updateUser", authentication, updateUser)
routerAuth.post("/paging", pagingUsers)
routerAuth.post("/banUser", blockUser)
routerAuth.post("/unBanUser", unblockUser)
routerAuth.get("/userChat", getUserChatShop)
routerAuth.get("/getAdmin",getUserAdmin)
export default routerAuth