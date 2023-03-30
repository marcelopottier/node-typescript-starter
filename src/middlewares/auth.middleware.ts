import { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken';
import userModel from '../models/user.model';
import { UserInterface } from "../interfaces/user.interface";

class AuthMiddleware {

    public async autorizaUsuarioByToken(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
        const token = req.query.token || req.headers['x-access-token'];
        if(!token){
            return res.status(401).send({message: 'Acesso Negado!'})
        }
        try {
            const usuarioToken = jwt.verify(token, 'SECRET');
            const usuario = await userModel.findById(usuarioToken._id);
            if(!usuario){
                return res.status(400).send({message: 'Usuário não existe.'});
            }

            req.usuario = usuario;

            return next();

        } catch (error) {
            
            return res.status(401).send({message: 'Token Inválido'});
        
        }
    }
    public async autorizaByParams(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
       
        try {

            const usuario = await userModel.findById(req.params.id);
            
            if(!usuario){
                return res.status(400).send({message: 'Usuário não existe.'});
            }

            req.usuarioChat = usuario;

            return next();

        } catch (error) {
            
            return res.status(401).send({message: 'Usuário Inválido!'});
        
        }
    }
}

export default new AuthMiddleware;