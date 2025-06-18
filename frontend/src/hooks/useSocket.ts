import { useEffect, useRef } from 'react';
import { authStore } from '../store/authStore';
import { socketStore } from '../store/socketStore';

interface SendMessageType {
  type: string;
  payload: {
    senderId: string;
    receiverId: string;
    content: string;
  };
}

export const useSocket = () => {
  const currUser = authStore((state) => state.currUser);
  const socketRef = useRef<WebSocket | null>(null);
  const setOnlineUsers = socketStore((state) => state.setOnlineUsers);
  const setContent = socketStore((state) => state.setContent);

  useEffect(() => {
    if (!currUser?._id) return;

    const socket = new WebSocket('ws://localhost:3000');
    socketRef.current = socket;

    socket.onopen = () => {
      if (socket.readyState === WebSocket.OPEN) {
        socket.send(
          JSON.stringify({
            type: 'join',
            payload: {
              userId: currUser._id,
            },
          })
        );
      }
    };

    socket.onmessage = (data) => {
      const parsedData = JSON.parse(data.data);
      switch (parsedData.type) {
        case 'message':
          setContent(parsedData.payload);
          break;
        case 'online-users':
          setOnlineUsers(parsedData.payload.userIds);
          break;
        default:
          console.warn('Unknown message type:', parsedData.type);
      }
    };

    return () => {
      console.log('Cleaning up socket...');
      socket.close();
    };
  }, [currUser]);

  const sendMessage = (data: SendMessageType) => {
    if (socketRef.current?.readyState === WebSocket.OPEN) {
      socketRef.current.send(JSON.stringify(data));
    }
  };

  return { sendMessage };
};
