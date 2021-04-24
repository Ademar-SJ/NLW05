import { io } from '../app';
import { Socket } from 'socket.io';
import { ConnectionsService } from '../services/ConnectionsService';
import { UsersService } from '../services/UsersSevice';
import { MessagesService } from '../services/MessagesService';


io.on('connect', (socket : Socket) => {
  socket.on('client_first_access', async (params) => {
    
    const { email , msg } = params;
    const connectionsService = new ConnectionsService();
    const usersService = new UsersService();
    const messageService = new MessagesService();

    let user_id;
    const userExists = await usersService.FindByEmail({email});

    if (userExists){
      user_id = userExists;
    }else{
      user_id = await usersService.Create({email});
    }

    const connection = await connectionsService.findByUserId(user_id);

    if (connection) {
      connection.socket_id = socket.id;
      await connectionsService.create(connection);
    }else{
      await connectionsService.create({
      user_id,
      socket_id: socket.id
      });
    }

    await messageService.Create({admin_id: '',user_id, text: msg});
  })
});