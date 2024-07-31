import { Server } from 'socket.io';
import http from 'http';

import express from 'express';
const app = express();

const server = http.createServer(app);
const socketUser = {}

const io = new Server(server, { cors: { origin: 'http://localhost:3000' } });


export const getReceived = (receiveId) => {
  return socketUser[receiveId]
}

io.on('connection', (socket) => {
  console.log('a user connected', socket.id);
  const userId = socket.handshake.query.userId;
  console.log('userId conecttion socket', userId);
  if(userId != undefined) socketUser[userId] = socket.id

  socket.on('disconnect', () => {
    console.log('user disconnected', socket.id);
    delete socketUser[userId]
  });
})
console.log(socketUser);
export { app, io, server }