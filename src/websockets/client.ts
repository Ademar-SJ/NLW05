import { io } from '../app';
import { Socket } from 'socket.io';


io.on('connect', (socket : Socket) => {
  socket.on('client_first_access', (params) => {
    //
  })
});