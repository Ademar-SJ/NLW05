import { io } from '../app';
import { Socket } from 'socket.io';
import { ConnectionsService } from '../services/ConnectionsService';
import { MessagesService } from '../services/MessagesService';


io.on('connect', async (socket : Socket) => {

  const connectionsService = new ConnectionsService();
  const messagesService = new MessagesService();
  const allPendingConnections = await connectionsService.findPendingConnections();
  
  //Não usar o socket pois senão apenas o admin que está nessa conexão vai receber
  io.emit('admin_list_all_users', allPendingConnections);

  socket.on('admin_list_messages_by_user',async (user_id,callback) => {

    const allMessages = await messagesService.listByUser(user_id);

    callback(allMessages);  
  });

  socket.on('admin_send_message', async params => {
    const { user_id, text } = params;
    await messagesService.Create({
      text,
      user_id,
      admin_id: socket.id //para ficar mais facil salvar o admin_id = id do socket
    });

    const { socket_id } = await connectionsService.findByUserId(user_id);

    io.to(socket_id).emit('admin_send_to_client',{
      text,
      socket_id: socket.id
    })
  });

  socket.on('admin_user_in_support', async params => {
    const { user_id } = params;
    await connectionsService.updateAdminID(user_id, socket.id);

    const allConnectionsWithoutAdmin = await connectionsService.findPendingConnections();

    io.emit('admin_list_all_users', allConnectionsWithoutAdmin);
  });
})
