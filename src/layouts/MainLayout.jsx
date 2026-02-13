import React from 'react';
import { HeaderMain } from "../components/HeaderMain";
import { Outlet } from "react-router-dom";
import { Footer } from '../components/Footer';

export function MainLayout() {
    return (
        <>
            <HeaderMain />
            <main>
                <Outlet />
            </main>
            <Footer />
        </>
    );
}