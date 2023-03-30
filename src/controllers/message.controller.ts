import { Request, Response } from 'express';
import messageModel from '../models/message.model';

class MessageController {

    public async enviar(req: Request, res: Response): Promise<Response>{
        const mensagem = await messageModel.create({
            texto: req.body.texto,
            remetente: req.usuario._id,
            destinatario: req.usuarioChat._id
        });
        return res.json(mensagem);
    }

    public async listar(req: Request, res: Response){
        const idUsuarioLogado = req.usuario._id;
        const idUsuarioChat = req.usuarioChat._id;

        const mensagens = await messageModel.buscaChat(idUsuarioLogado, idUsuarioChat).sort('createdAt');

        const mensagensChat = mensagens.map(mensagem => {
            return {
                texto: mensagem.texto,
                createdAt: mensagem.createdAt,
                isRemetente: mensagem.remetente == String(idUsuarioLogado)
            }
        });

        return res.json(mensagensChat);
    }

}

export default new MessageController;