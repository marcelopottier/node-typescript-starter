import { Router } from "express";
import messageController from "../controllers/message.controller";
import authMiddleware from "../middlewares/auth.middleware";

const messageRouter = Router();

messageRouter.post('/:id', authMiddleware.autorizaUsuarioByToken, authMiddleware.autorizaByParams, messageController.enviar);
messageRouter.get('/:id', authMiddleware.autorizaUsuarioByToken, authMiddleware.autorizaByParams, messageController.listar);

export default messageRouter;