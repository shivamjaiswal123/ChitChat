import { WebSocketServer, WebSocket } from 'ws';

const onlineUsers = new Map<string, WebSocket>();

const broadcastOnlineUsers = () => {
  const onlineUserId = Array.from(onlineUsers.keys());

  for (const [_, socket] of onlineUsers) {
    socket.send(
      JSON.stringify({
        type: 'online-users',
        payload: {
          userIds: onlineUserId,
        },
      })
    );
  }
};

export const startWebSocketServer = (http: any) => {
  const wss = new WebSocketServer({ server: http });

  console.log('Websocket server started...');

  wss.on('connection', function connection(ws) {
    console.log('New client connected...');

    ws.on('error', console.error);

    ws.on('message', function message(data) {
      const { type, payload } = JSON.parse(data.toString());

      if (!type || !payload) {
        console.warn('Invalid message format');
        return;
      }

      if (type == 'join') {
        if (!payload.userId) {
          console.warn('User ID is missing');
          return;
        }

        onlineUsers.set(payload.userId, ws);

        broadcastOnlineUsers();
      } else {
        const { senderId, receiverId, content } = payload;

        const receiverSocket = onlineUsers.get(receiverId);

        if (receiverSocket && receiverSocket.readyState === WebSocket.OPEN) {
          receiverSocket.send(
            JSON.stringify({
              type: 'message',
              payload: {
                senderId,
                receiverId,
                content,
              },
            })
          );
        }
      }
    });

    ws.on('close', () => {
      // Remove disconnected user
      for (const [userId, socket] of onlineUsers) {
        if (socket === ws) {
          onlineUsers.delete(userId);
          break;
        }
      }
    });
  });
};
