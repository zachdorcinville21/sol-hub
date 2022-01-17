import React, { useState, useEffect, createContext } from 'react';
import { io, Socket } from 'socket.io-client';

interface SCProviderProps {
    children: React.ReactNode;
}

interface SocketData {
    socket: Socket | null;
}

const scDefault: SocketData = { socket: null };
export const SocketContext = createContext<SocketData>(scDefault);

function SocketProvider({ children }: SCProviderProps) {
    const [socket, setSocket] = useState<Socket | null>(null);

    useEffect(() => {
        setSocket(io('https://solhub.app/', { path: '/api' })); 
    }, []);

    const sd: SocketData = { socket };

    return (
        <SocketContext.Provider value={sd}>
            {children}
        </SocketContext.Provider>
    );
}


export default SocketProvider;

