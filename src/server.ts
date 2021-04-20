require('dotenv').config();
import express from 'express';
//TypeScritp funciona com ES6 e necessita de ts-node-dev e @types/express
//ts-node-dev funciona com live reload

const app = express();

app.get('/', (req,res) => {
  res.send('Get route of home working !!!')
})

app.listen(process.env.PORT, () => {
  console.log(`Server running on port: ${process.env.PORT}`)
});