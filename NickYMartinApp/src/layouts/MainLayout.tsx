// src/MainLayout.tsx
import React from "react";
// Ya no necesitas importar BrowserRouter aquí
import { Route, Routes, Link } from "react-router-dom"; // Sigue importando Route, Routes, Link
import Productos from "../pages/Productos"; // Asegúrate de que la ruta sea correcta

const MainLayout: React.FC = () => {
    return (
        <div className="d-flex flex-column min-vh-100">
            {/* Navbar */}
            <header>
                <nav className="navbar navbar-expand-lg navbar-light bg-light shadow-sm">
                    <div className="container-fluid">
                        {/* Estos Links ahora están dentro del BrowserRouter global */}
                        <Link className="navbar-brand fw-bold" to="/">Nickymartin</Link>
                        <button
                            className="navbar-toggler"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#navbarNav"
                            aria-controls="navbarNav"
                            aria-expanded="false"
                            aria-label="Toggle navigation"
                        >
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarNav">
                            <ul className="navbar-nav ms-auto">
                                <li className="nav-item">
                                    <Link className="nav-link" to="/">Inicio</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/carrito">Carrito</Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
            </header>

            {/* Contenido */}
            <main className="flex-grow-1 py-4 bg-light">
                {/* Routes y Route deben estar dentro del BrowserRouter global */}
                <Routes>
                    <Route path="/" element={<Productos />} />
                    {/* Agrega más rutas aquí si es necesario */}
                    {/* <Route path="/carrito" element={<Carrito />} /> */}
                </Routes>
            </main>

            {/* Footer */}
            <footer className="bg-light text-center py-3 text-muted border-top">
                © 2025 Nickymartin. Todos los derechos reservados.
            </footer>
        </div>
    );
};

export default MainLayout;