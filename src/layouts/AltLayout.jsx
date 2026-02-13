import React from 'react';
import { HeaderAlt } from "../components/HeaderAlt";
import { Outlet } from "react-router-dom";

export function AltLayout() {
    return (
        <>
            <HeaderAlt />
            <Outlet />
        </>
    );
}