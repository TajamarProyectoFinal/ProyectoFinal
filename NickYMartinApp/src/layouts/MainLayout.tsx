// src/layouts/MainLayout.tsx
import { Outlet, Link, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useCarritoContext } from "../context/CarritoContext";
import { motion } from "framer-motion";

const MainLayout: React.FC = () => {
    const { user } = useAuth();
    const location = useLocation();
    const { totalItems } = useCarritoContext();

    return (
        <div className="d-flex flex-column min-vh-100">
            {/* Header */}
            <motion.header
                className="bg-white shadow-sm"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
            >
                <nav className="navbar navbar-expand-lg container">
                    <Link className="navbar-brand fw-bold text-primary" to="/">
                        Nickymartin
                    </Link>

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

                    <div className="collapse navbar-collapse justify-content-between" id="navbarNav">
                        <ul className="navbar-nav gap-2">
                            <li className="nav-item">
                                <Link
                                    className={`nav-link custom-nav-link ${location.pathname === "/" ? "active" : ""}`}
                                    to="/"
                                >
                                    Inicio
                                </Link>
                            </li>
                        </ul>

                        <ul className="navbar-nav gap-2">
                            <li className="nav-item position-relative">
                                <Link
                                    className={`nav-link custom-nav-link ${location.pathname === "/carrito" ? "active" : ""}`}
                                    to="/carrito"
                                >
                                    Carrito
                                    {totalItems > 0 && (
                                        <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                                            {totalItems}
                                        </span>
                                    )}
                                </Link>
                            </li>

                            {!user ? (
                                <>
                                    <li className="nav-item">
                                        <Link className="nav-link custom-nav-link" to="/login">
                                            Iniciar sesión
                                        </Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="nav-link custom-nav-link" to="/register">
                                            Registrarse
                                        </Link>
                                    </li>
                                </>
                            ) : (
                                <li className="nav-item">
                                    <Link className="nav-link custom-nav-link fw-semibold" to="/usuario">
                                        Hola, {user.name}
                                    </Link>
                                </li>
                            )}
                        </ul>
                    </div>
                </nav>
            </motion.header>

            {/* Main */}
            <main className="flex-grow-1 py-4">
                <motion.div
                    className="container"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                >
                    <Outlet />
                </motion.div>
            </main>

            {/* Footer */}
            <motion.footer
                className="bg-light text-center py-3 text-muted border-top mt-auto"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
            >
                <div className="container">
                    © 2025 Nickymartin. Todos los derechos reservados.
                </div>
            </motion.footer>
        </div>
    );
};

export default MainLayout;
