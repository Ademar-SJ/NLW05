import { io } from '../app';
import { Socket } from 'socket.io';
import { ConnectionsService } from '../services/ConnectionsService';
import { UsersService } from '../services/UsersSevice';
import { MessagesService } from '../services/MessagesService';


io.on('connect', (socket : Socket) => {
  const connectionsService = new ConnectionsService();
  const usersService = new UsersService();
  const messageService = new MessagesService();

  socket.on('client_first_access', async (params) => {
    const { email , msg } = params;

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

    await messageService.Create({user_id, text: msg});

    //Trazer as mensagens anteriores para o chat
    const allMessages = await messageService.listByUser(user_id);

    socket.emit('client_list_allmessages', allMessages);

    const allUsers = await connectionsService.findPendingConnections();
    io.emit('admin_list_all_users', allUsers);

  })

  socket.on('client_send_to_admin', async (params) => {    

    const { text, socket_id_admin } = params;
    const socket_id_client  = socket.id;
    const { user_id } = await connectionsService.findBySocketId(socket_id_client);

    const message = await messageService.Create({
      text,
      user_id,
    });

    io.to(socket_id_admin).emit('admin_receive_message',{
      message,
      socket_id_client
    });
  })

});