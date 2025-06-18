// src/App.tsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import MainLayout from "./layouts/MainLayout";
import Productos from "./pages/Productos";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Usuario from "./pages/Usuario";
import ProductoDetalle from "./pages/ProductoDetalle";
import CarritoView from "./pages/Carrito";
import PagoResultado from "./pages/PagoResultado";
import PedidoView from "./pages/Pedido";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<MainLayout />}>
                    <Route index element={<Productos />} />
                    <Route path="login" element={<Login />} />
                    <Route path="register" element={<Register />} />
                    <Route path="usuario" element={<Usuario />} />
                    <Route path="productos/:id" element={<ProductoDetalle />} />
                    <Route path="carrito" element={<CarritoView />} />
                    <Route path="pago-resultado" element={<PagoResultado />} />
                    <Route path="pedido/:id" element={<PedidoView />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
