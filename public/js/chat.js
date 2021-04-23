document.querySelector("#start_chat").addEventListener("click", (event) => {
  //
  const chat_help = document.getElementById('chat_help');
  chat_help.style.display = 'none';

  const chat_in_support = document.getElementById('chat_in_support');
  chat_in_support.style.display = 'block';

  const socket = io();
  const msg = document.querySelector('#txt_help').value;
  const email = document.querySelector('#email').value;

  
  socket.on('connect', () => {
    const params = { msg, email };
    socket.emit('client_first_access', params, (call,err)=>{
      if(err){
        console.error(err);
      }else{
        console.log(call);
      }
    })
  })  
});
