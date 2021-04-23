require('dotenv').config();
import './database'; //Já executa o index.ts e sobe a conexão
import express, { Request, Response } from 'express';
import routes from './routes';
import { createServer } from 'http';
import { Server, Socket } from 'socket.io';
import path  from 'path';
//TypeScritp funciona com ES6 e necessita de ts-node-dev e @types/express
//ts-node-dev funciona com live reload

const app = express();
const http = createServer(app);
const io = new Server(http);

io.on('connection', (socket : Socket) => {
  console.log('Se conectou ao socker com id: ', socket.id);
});

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(routes);

const pathStatic = path.resolve(__dirname,'..','public');
app.use(express.static(pathStatic));
app.set('views',pathStatic);
app.engine('html',require('ejs').renderFile);
app.set('engine','html');

app.get('/', (req : Request,res : Response) => {
  return res.render("html/client.html");
});

export { http, io }