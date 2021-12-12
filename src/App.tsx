import React from 'react';
import {Route, Routes, Navigate} from "react-router-dom";
import Home from "./pages/Home/Home";
import Registered from "./pages/Registered";

function App() {
    return (
        <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="*" element={<Navigate to="/"/>}/>
            <Route path="/registered" element={<Registered/>}/>
        </Routes>
    );
}

export default App;
