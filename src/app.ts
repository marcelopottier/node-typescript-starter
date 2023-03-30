import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import router from './routes/user.route';
import messageRouter from './routes/message.route';

export class App{
    private express: express.Application;
    private porta = 8000;

    constructor() {
        this.express = express();
        this.database();
        this.middlewares();
        this.routes()

        this.listen();
    }

    private listen(): void{
        this.express.listen(this.porta, () => {
            console.log('Servidor Iniciado na porta ' + this.porta);
        })
    }

    private middlewares(): void {
        this.express.use(express.json());
        this.express.use(cors());
    }

    public getApp(): express.Application {
        return this.express;
    }

    private database(): void {
        mongoose.connect('mongodb+srv://admin:kqc0vmixZxsrugis@cluster0.os0l5pv.mongodb.net/?retryWrites=true&w=majority');
    }

    private routes(): void {
        this.express.use('/usuarios', router);
        this.express.use('/mensagens', messageRouter);
    }

}