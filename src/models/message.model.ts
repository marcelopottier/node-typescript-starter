import { Document, Model, Schema, model } from "mongoose";
import { MessageInterface } from "../interfaces/message.interface";

interface MessageModel extends MessageInterface, Document {}

interface MessageStatic extends Model<MessageModel>{
    buscaChat(idUsuarioLogado: string, idUsuarioChat: string)
}

const MessageSchema = new Schema ({

    texto: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    remetente: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true,
    },
    destinatario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true,
    }

});

MessageSchema.statics.buscaChat = function(idUsuarioLogado: string, idUsuarioChat: string) {
    return this.find({
        $or : [
            {$and: [{ remetente: idUsuarioLogado }, {destinatario: idUsuarioChat}]},
            {$and: [{ remetente: idUsuarioChat }, {destinatario: idUsuarioLogado}]}
        ]
    })
}

export default model<MessageModel, MessageStatic>('Mensagem', MessageSchema);