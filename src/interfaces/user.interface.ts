export interface UserInterface{
    _id: any | string,
    nome?: string;
    senha?: string;
    avatar?: string;
}

export interface MessageUser extends UserInterface{

    ultimaMensagem: string;
    dataUltimaMensagem: Date;

}