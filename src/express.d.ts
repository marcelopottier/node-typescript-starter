import { UserInterface } from "./interfaces/user.interface";

declare global {
    namespace Express {
        interface Request {
            usuario?: UserInterface;
            usuarioChat?: UserInterface;
        }
    }
}