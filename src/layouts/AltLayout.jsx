import React from 'react';
import { HeaderAlt } from "../components/HeaderAlt";
import { Outlet } from "react-router-dom";
import { Footer } from '../components/Footer';
import { useWS } from '../ws/WebSocketContext';

export function AltLayout( { user , gameCode } ) {
    const { send } = useWS();
    const handleLogout = () => {
        send({ type: 'logout' });
    }

    return (
        <>
            <HeaderAlt user={user} gameCode={gameCode} onLogout={handleLogout} />
            <main>
                <Outlet />
            </main>
            <Footer />
        </>
    );
}