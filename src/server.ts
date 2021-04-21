require('dotenv').config();
import express, { urlencoded } from 'express';
import './database'; //Já executa o index.ts e sobe a conexão
import routes from './routes';
//TypeScritp funciona com ES6 e necessita de ts-node-dev e @types/express
//ts-node-dev funciona com live reload

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(routes);

app.get('/', (req,res) => {
  res.send('Get route of home working !!!')
})

app.listen(process.env.PORT, () => {
  console.log(`Server running on port: ${process.env.PORT}`)
});