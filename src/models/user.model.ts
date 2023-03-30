import { Document, Schema, model } from "mongoose";
import { UserInterface } from "../interfaces/user.interface";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

interface UserModel extends UserInterface, Document {
    comparaSenha(senha: string): Promise<boolean>;
    gerarToken(): string;
}

const UsuarioSchema = new Schema({
    nome: {
        type: String,
        required: true,
    },
    senha: {
        type: String,
        required: true,
    },
    avatar: {
        type: String,
        required: false,
    }
});

UsuarioSchema.pre<UserModel>('save', async function criptografaSenha(){
    this.senha = await bcrypt.hash(this.senha, 8);
});

UsuarioSchema.methods.comparaSenha = function(senha: string): Promise<boolean>{
    return bcrypt.compare(senha, this.senha);
}

UsuarioSchema.methods.gerarToken = function(): string {
    const decodedToken = {
        _id: String(this._id),
        nome: this.nome,
        avatar: this.avatar
    };

    return jwt.sign(decodedToken, 'SECRET', {
        expiresIn: '1d'
    });
}

export default model<UserModel>('Usuario', UsuarioSchema);