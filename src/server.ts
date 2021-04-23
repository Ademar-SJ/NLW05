import { http } from './app';
import './websockets/client';

http.listen(process.env.PORT, () => { //Sobe o express e o server http
  console.log(`Server running on port: ${process.env.PORT}`)
});