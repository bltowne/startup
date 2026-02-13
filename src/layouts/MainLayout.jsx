import React from 'react';
import { HeaderMain } from "../components/HeaderMain";
import { Outlet } from "react-router-dom";

export function MainLayout() {
    return (
        <>
            <HeaderMain />
            <Outlet />
        </>
    );
}