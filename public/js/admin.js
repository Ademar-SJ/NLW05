
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
      const createDiv = document.createElement("div");

      if (message.admin_id === null) {
        createDiv.className = "admin_message_client";

        createDiv.innerHTML = `<span>${connection.user.email} </span>`;
        createDiv.innerHTML += `<span>${message.text}</span>`;
        createDiv.innerHTML += `<span class="admin_date">${dayjs(
          message.created_at
        ).format("DD/MM/YYYY HH:mm:ss")}</span>`;
      } else {
        createDiv.className = "admin_message_admin";

        createDiv.innerHTML = `Atendente: <span>${message.text}</span>`;
        createDiv.innerHTML += `<span class="admin_date>${dayjs(
          message.created_at
        ).format("DD/MM/YYYY HH:mm:ss")}`;
      }

      divMessages.appendChild(createDiv);
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

  const createDiv = document.createElement("div");
  createDiv.className = "admin_message_admin";
  createDiv.innerHTML = `Atendente: <span>${params.text}</span>`;
  createDiv.innerHTML += `<span class="admin_date>${dayjs().format(
    "DD/MM/YYYY HH:mm:ss"
  )}`;

  divMessages.appendChild(createDiv);

  text.value = "";
}

socket.on("admin_receive_message", (data) => {
  
  console.log('Recebi a mensagem');
  console.log(data);
  console.log('Valro do connection vai ser mostrado abaixo');
  const connection = connectionInSupport.find(
    (connec) => (connec.socket_id === data.socket_id_client)
    );
    
    console.log('Valro do connection', connection);

    
  const divMessages = document.getElementById(
    `allMessages${connection.user_id}`
    );
      
  const createDiv = document.createElement("div");

  createDiv.className = "admin_message_client";
  createDiv.innerHTML = `<span>${connection.user.email} </span>`;
  createDiv.innerHTML += `<span>${data.message.text}</span>`;
  createDiv.innerHTML += `<span class="admin_date">${dayjs(
    data.message.created_at
  ).format("DD/MM/YYYY HH:mm:ss")}</span>`;

  divMessages.appendChild(createDiv);
});