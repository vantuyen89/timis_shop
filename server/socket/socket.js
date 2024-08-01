import { Server } from 'socket.io';
import http from 'http';
import dotenv from 'dotenv'
dotenv.config()
import express from 'express';
const app = express();

const server = http.createServer(app);
const socketUser = {}

const io = new Server(server, { cors: { origin: process.env.HOST_CLIENT } });


export const getReceived = (receiveId) => {
  return socketUser[receiveId]
}

io.on('connection', (socket) => {
  console.log('a user connected', socket.id);
  const userId = socket.handshake.query.userId;
  console.log('userId conecttion socket', userId);
  if (userId != undefined) socketUser[userId] = socket.id

  socket.on('disconnect', () => {
    console.log('user disconnected', socket.id);
    delete socketUser[userId]
  });
})
export { app, io, server }