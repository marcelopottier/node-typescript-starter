import { Request, Response} from 'express';
import userModel from '../models/user.model';
import messageModel from '../models/message.model';
import MessageService from '../services/message.service';
import messageService from '../services/message.service';

class UsuarioController {

    public async cadastrar(req: Request, res: Response): Promise<Response> {

        //O método '.create' vem do mongoose
        const usuario = await userModel.create(req.body);
        const resposta = {
            message: 'Usuário cadastrado com sucesso!',
            _id: usuario._id,
            nome: usuario.nome,
            avatar: usuario.avatar,
        };
        return res.json(resposta);
    }

    public async auth(req:Request, res: Response): Promise<Response> {
        
        const {nome, senha} = req.body;
        const usuario = await userModel.findOne({nome});

        if(!usuario) {
            return res.status(400).send({message: 'Usuario não encontrado.'})
        }

        const senhaValida = await usuario.comparaSenha(senha);
        if(!senhaValida){
            return res.status(400).send({message: 'Senha Incorreta!'});
        }
        return res.json({
            usuario,
            token: usuario.gerarToken()
        });
    }

    public getById(req: Request, res: Response){
        return res.json(req.usuarioChat);
    }

    public async listar(req: Request, res: Response): Promise<Response>{
        const idUsuarioLogado = req.usuario._id;

        const usuarios = await userModel.find({ _id: { $ne: idUsuarioLogado }});
        
        const usuariosMensagem = await Promise.all(usuarios.map(usuario => {
            return messageModel.buscaChat(idUsuarioLogado, usuario.id)
                    .sort('-createdAt')
                    .limit('1')
                    .transform(mensagens => MessageService.getResultadoMensagem(mensagens, usuario));
        }));

        const mensagensOrdenadas = messageService.mensagemOrdenadas(usuariosMensagem);

        return res.json(usuariosMensagem);
    }

}

export default new UsuarioController();