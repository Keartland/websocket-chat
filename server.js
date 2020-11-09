const WebSocket = require('ws');

// starts the server on port 8080 
const serv = new WebSocket.Server({ port: 8080 });

messages = []

// waits for connection with a client when connected do
serv.on('connection', (ws) => {
    console.log("connection")
    for(i=0;i<messages.length;i++){
        ws.send(messages[i])
    }
    // when a message is recieved send it to all clients
    ws.on('message', (data) => {
        messages.push(data)
        console.log('received: %s', data);

        serv.clients.forEach((client) => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(data);
            }
        });
    });
});
