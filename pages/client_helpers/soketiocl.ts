
import io, { Socket } from "socket.io-client";


let socket:Socket;


const socketInitializer = async (): Promise<Socket> => {
   
    
    socket = io();
  
    socket.on('connect', () => {
      console.log('connected');
    });
  
    

    return socket
  };