(function() {
  const options = {
    accessTokenFactory: getToken
  }; 

  function getToken() {
    const xhr = new XMLHttpRequest();
    return new Promise((resolve, reject) => {
      xhr.onreadystatechange = function() {
        if(this.readyState !==4) return;
        if(this.status == 200) {
          resolve(this.responseText);
        } else {
          reject(this.statusText);
        }
      };
      xhr.open("GET", "/api/token");
      xhr.send();
    });
  }
  

  const messageForm = document.getElementById('message-form');
  const messageBox = document.getElementById('message-box');
  const messages = document.getElementById('messages');
  const connection = new signalR.HubConnectionBuilder()
      .withUrl('/chat', options)
      .configureLogging(signalR.LogLevel.Information)
      .build();
  connection.on('newMessage', (sender, messageText) => {
    console.log(`${sender} : ${messageText}`);
    const newMessage = document.createElement('li');
    newMessage.appendChild(
      document.createTextNode(`${sender} : ${messageText}`)
    );
    messages.appendChild(newMessage);
  });
  connection.start()
      .then(() => console.log('connected!'))
      .catch(console.error);
  messageForm.addEventListener('submit', e => {
    e.preventDefault();
    const message = messageBox.value;
    connection.invoke('SendMessage', message);
    messageBox.value = '';
  });
})();