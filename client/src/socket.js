import { io } from 'socket.io-client';

let socket;

export const getSocket = () => {
  if (!socket) {
    socket = io(import.meta.env.VITE_BACKEND_URL, {
      transports: ['websocket'],
    });
  }
  return socket;
};
