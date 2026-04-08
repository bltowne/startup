import React, { createContext, useContext, useEffect, useRef, useState } from 'react';

const WebSocketContext = createContext(null);

export function WebSocketProvider({ children }) {
    const socketRef = useRef(null);
    const [lastMessage, setLastMessage] = useState(null);
    const [connected, setConnected] = useState(false);

    useEffect(() => {
        const protocol = window.location.protocol === 'https:' ? 'wss' : 'ws';
        const host = window.location.host;
        const wsUrl = `${protocol}://${host}/ws`;
        const socket = new WebSocket(wsUrl);
        socketRef.current = socket;

        socket.onopen = () => {
            console.log('WS connected');
            setConnected(true);
        };
        socket.onmessage = (event) => {
            const msg = JSON.parse(event.data);
            console.log('WS message: ', msg);
            setLastMessage(msg);
        };
        socket.onclose = () => {
            console.log('WS closed');
            setConnected(false);
        };
        return () => socket.close();
    }, []);
    const send = (msg) => {
        if (socketRef.current?.readyState === WebSocket.OPEN) {
            socketRef.current.send(JSON.stringify(msg));
        }
    };

    return (
        <WebSocketContext.Provider
            value={{
                socket: socketRef.current,
                send,
                lastMessage,
                connected,
            }}
        >
            {children}
        </WebSocketContext.Provider>
    );
}

export function useWS() {
    return useContext(WebSocketContext);
}