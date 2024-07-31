import { Router } from "express";
import authentication from "../middlewares/authentication.js";
import { getMessage, sendMessage } from "../controllers/message.controller.js";


const routerMessage = Router();

routerMessage.get("/:id",authentication,getMessage)
routerMessage.post("/sendMessage/:id", authentication, sendMessage)

export default routerMessage;