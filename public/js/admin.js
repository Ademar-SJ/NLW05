
const socket = io();

let pendingConnections = [];
let connectionInSupport = [];

socket.on('admin_list_all_users', (connections) => {
  pendingConnections = connections;
  document.getElementById('list_users').innerHTML = '';
  const template = document.getElementById('template').innerHTML;

  connections.forEach( connection => {
    const rendered = Mustache.render(template, {
      email: connection.user.email,
      id: connection.socket_id
    });
    document.getElementById('list_users').innerHTML = rendered;

  })
});

function call(id){
  const connection = pendingConnections.find(connection => connection.socket_id === id);

  const template = document.getElementById('admin_template').innerHTML;
  
  connectionInSupport.push(connection);
  const rendered = Mustache.render(template, {
    email: connection.user.email,
    id: connection.user_id
  });
  
  document.getElementById('supports').innerHTML += rendered;

  socket.emit('admin_list_messages_by_user', connection.user_id, messages => {
    const divMessages = document.getElementById(
      `allMessages${connection.user_id}`
    );

    messages.forEach((message) => {

      let div;
      if (message.admin_id === null) {
        div = createAdminMsgClient(connection.user.email,message.text,message.created_at);
      } else {
        div = createAdminMsgAdmin(message.text,message.created_at);        
      }

      divMessages.appendChild(div);
    });

  });
}


function sendMessage(id) {
  const text = document.getElementById(`send_message_${id}`);

  const params = {
    text: text.value,
    user_id: id,
  };

  socket.emit("admin_send_message", params);
  const divMessages = document.getElementById(`allMessages${id}`);
  const div = createAdminMsgAdmin(params.text);

  divMessages.appendChild(div);

  text.value = "";
}

socket.on("admin_receive_message", ({ message, socket_id_client } ) => {
  const { user_id,user } = connectionInSupport.find(
    (connec) => (connec.socket_id === socket_id_client)
    );
  
  const divMessages = document.getElementById(`allMessages${user_id}`);
      
  const msgAdminClient = createAdminMsgClient(
      user.email,message.text,message.created_at);

  divMessages.appendChild(msgAdminClient);
});


function createAdminMsgClient(email,text,date = new Date()){
  const div = document.createElement("div");

  div.className = "admin_message_client";
  div.innerHTML = `<span>${email} </span>`;
  div.innerHTML += `<span>${text}</span>`;
  div.innerHTML += `<span class="client_date">${dayjs(
    date
  ).format("DD/MM/YYYY HH:mm:ss")}</span>`;

  return div;
}

function createAdminMsgAdmin(text,date = new Date()){
  const div = document.createElement("div");

  div.className = "admin_message_admin";

  console.log(date);
  div.innerHTML = `Atendente: <span>${text}</span>`;
  div.innerHTML += `<span class="admin_date">${dayjs(
    date
  ).format("DD/MM/YYYY HH:mm:ss")}<span/>`;

  return div;
}