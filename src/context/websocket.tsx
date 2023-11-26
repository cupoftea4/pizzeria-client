/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';
import SockJS from 'sockjs-client';
import { type Client, over } from 'stompjs';

// WebSocket Context
export const WebSocketContext = createContext<Client | null>(null);

export const useWebSocket = () => useContext(WebSocketContext);

// WebSocket Provider
export const WebSocketProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [stompClient, setStompClient] = useState<Client | null>(null);

  useEffect(() => {
    const socket = new SockJS('http://localhost:8080/websocket');
    const client = over(socket);

    console.log('CONNECTING');
    client.connect({}, () => {
      console.log('CONNECTED');
      console.log('Connected to WebSocket');
      setStompClient(client);
    });

    return () => {
      if (client?.connected) {
        console.log('DISCONNECTING');
        client.disconnect(() => console.log('Disconnected from WebSocket'));
      }
    };
  }, []);

  return <WebSocketContext.Provider value={stompClient}>{children}</WebSocketContext.Provider>;
};

export const useSend = <T,>() => {
  const stompClient = useWebSocket();

  const send = (destination: string, body: T) => {
    if (stompClient?.connected) {
      stompClient.send(destination, {}, JSON.stringify(body));
    }
  };

  return send;
};

export function useSubscribe<T>(topic: string, callback: (message: T) => void) {
  const stompClient = useWebSocket();

  const subscribe = useCallback(() => {
    if (stompClient?.connected) {
      stompClient.subscribe(topic, (message) => {
        const parsedMessage = JSON.parse(message.body) as T;
        callback(parsedMessage);
      });
    }
  }, [stompClient, topic, callback]);

  const unsubscribe = useCallback(() => {
    if (stompClient?.connected) {
      stompClient.unsubscribe(topic);
    }
  }, [stompClient, topic]);

  return { subscribe, unsubscribe };
}
