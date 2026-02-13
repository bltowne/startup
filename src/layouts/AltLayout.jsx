import React from 'react';
import { HeaderAlt } from "../components/HeaderAlt";
import { Outlet } from "react-router-dom";
import { Footer } from '../components/Footer';

export function AltLayout() {
    return (
        <>
            <HeaderAlt />
            <main>
                <Outlet />
            </main>
            <Footer />
        </>
    );
}