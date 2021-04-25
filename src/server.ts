import { http } from './app';
import './websockets/client';
import './websockets/admin';

http.listen(process.env.PORT, () => { //Sobe o express e o server http
  console.log(`Server running on port: ${process.env.PORT}`)
});