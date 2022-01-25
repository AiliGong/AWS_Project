import React from "react";
import MenuAppBar from "./MenuAppBar";

export default function Layout({children}) {
    return (
        <>
        <MenuAppBar />
        <div style={{marginTop: 65, marginLeft: 72, display: "flex", justifyContent: "center"}}>
               {children}
        </div>
        </>
    )
}