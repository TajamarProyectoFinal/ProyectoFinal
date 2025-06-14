import React from "react";
import { Outlet } from "react-router-dom";

const MainLayout: React.FC = () => {
    return (
        <div className="min-h-screen flex flex-col">
            {/* Navbar */}
            <header className="bg-white shadow p-4 flex justify-between items-center">
                <h1 className="text-xl font-bold">Nickymartin</h1>
                <nav className="space-x-4">
                    <a href="/" className="text-blue-600">Inicio</a>
                    <a href="/carrito" className="text-blue-600">Carrito</a>
                </nav>
            </header>

            {/* Contenido */}
            <main className="flex-1 p-6 bg-gray-50">
                <Outlet />
            </main>

            {/* Footer */}
            <footer className="bg-gray-200 text-center p-4 text-sm">
                © 2025 Nickymartin. Todos los derechos reservados.
            </footer>
        </div>
    );
};

export default MainLayout;
