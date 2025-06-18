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
import NotFoundPage from "./pages/NotFoundPage";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                {/*
                  IMPORTANT: Keep the Redsys callback route (e.g., /pago-resultado)
                  OUTSIDE of the MainLayout route if it doesn't need the layout,
                  or ensure it's handled distinctly.

                  In most Redsys integrations, the callback URL is directly hit by Redsys,
                  and it often doesn't need the full application layout.
                  Making it a top-level route prevents it from being confused with
                  any nested routes.
                */}
                <Route path="/payment-status/pago-exito" element={<PagoResultado />} />
                <Route path="/payment-status/pago-error" element={<PagoResultado />} />

                {/* All other routes that require the MainLayout go here */}
                <Route element={<MainLayout />}>
                    <Route path="/" element={<Productos />} />
                    <Route path="login" element={<Login />} />
                    <Route path="register" element={<Register />} />
                    <Route path="usuario" element={<Usuario />} />
                    <Route path="productos/:id" element={<ProductoDetalle />} />
                    <Route path="carrito" element={<CarritoView />} />
                    <Route path="pedido/:id" element={<PedidoView />} />
                </Route>

                <Route path="*" element={<NotFoundPage />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;