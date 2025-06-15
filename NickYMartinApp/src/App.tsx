// src/App.tsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import Productos from "./pages/Productos";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Usuario from "./pages/Usuario";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<MainLayout />}>
                    <Route index element={<Productos />} />
                    <Route path="login" element={<Login />} />
                    <Route path="register" element={<Register />} />
                    <Route path="usuario" element={<Usuario />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
