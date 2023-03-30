import { Router } from "express";
import userController from "../controllers/user.controller";
import authMiddleware from "../middlewares/auth.middleware";

const router = Router();

router.post('/cadastro', userController.cadastrar);
router.post('/login', userController.auth);
router.get('/:id',  authMiddleware.autorizaByParams, authMiddleware.autorizaUsuarioByToken, userController.getById);
router.get('/', authMiddleware.autorizaUsuarioByToken, userController.listar);

export default router;