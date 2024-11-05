import React from "react";
import { Route, Router, Routes } from "react-router-dom";

import Home from "./Pages/Inicio";
import Login from "./Pages/Login"

const Routes = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
            </Routes>
        </Router>
    )
}

export default Routes;