import { Server } from "socket.io";
//import type { NextApiRequest, NextApiResponse } from "next";


export default function SocketHandler(req: any, res: any) {
  // It means that socket server was already initialised
  if (res.socket?.server?.io) {
    console.log("Already set up");
    res.end();
    return;
  }

  const io = new Server(res.socket.server, {
    path: "/api/socket",
    addTrailingSlash: false
  });
  res.socket.server.io = io;

  const onConnection = (socket: any) => {
    messageHandler(io, socket);
  };

  // Define actions inside
  io.on("connection", onConnection);

  console.log("Setting up socket");
  res.end();
}

const messageHandler = (io: any, socket: any) => {
  const createdMessage = (msg: any) => {
    socket.emit("newIncomingMessage", msg);
  };

  socket.on("createdMessage", createdMessage);
};
