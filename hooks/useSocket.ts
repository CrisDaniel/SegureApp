// lib/useSocket.js
'use client';

import { useEffect, useRef } from 'react';
import { io, Socket } from 'socket.io-client';

export const useSocket = () => {
    const socketRef = useRef<Socket | null>(null);
    
  useEffect(() => {
    // Nos conectamos al backend
    socketRef.current = io('http://localhost:3001'); // Puerto del backend

    socketRef.current.on('connect', () => {
      console.log('✅ Conectado al socket:', socketRef.current?.id);
    });

    socketRef.current.on('disconnect', () => {
      console.log('❌ Desconectado del socket');
    });

    // Cleanup al desmontar
    return () => {
      socketRef.current?.disconnect();
    };
  }, []);

  return socketRef;
};
