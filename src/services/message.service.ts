import { MessageInterface } from "../interfaces/message.interface";
import { MessageUser, UserInterface } from "../interfaces/user.interface";

class MessageService {

    public getResultadoMensagem(mensagens: MessageInterface[], usuario: UserInterface): MessageUser{
        return {
            _id: usuario._id,
            nome: usuario.nome,
            avatar: usuario.avatar,
            ultimaMensagem: mensagens[0]?.texto || null,
            dataUltimaMensagem: mensagens[0]?.createdAt || null
        }
    }

    public mensagemOrdenadas(usuariosMensagem: MessageUser[]): MessageUser[]{
        return usuariosMensagem.sort((a, b) => {
            return (a.dataUltimaMensagem ? 0 : 1) - (b.dataUltimaMensagem ? 0 : 1) 
                || -(a.dataUltimaMensagem > b.dataUltimaMensagem) 
                || +(a.dataUltimaMensagem > b.dataUltimaMensagem)
        });
    }

}

export default new MessageService();