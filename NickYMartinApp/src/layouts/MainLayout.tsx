import { Outlet, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const MainLayout: React.FC = () => {
    const { user, logout } = useAuth();

    return (
        <div className="d-flex flex-column min-vh-100">
            <header className="bg-white shadow-sm">
                <nav className="navbar navbar-expand-lg navbar-light container-fluid">
                    <div className="container">
                        <Link className="navbar-brand fw-bold me-4" to="/">Nickymartin</Link>
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
                            <ul className="navbar-nav">
                                <li className="nav-item">
                                    <Link className="nav-link" to="/">Inicio</Link>
                                </li>
                            </ul>

                            <ul className="navbar-nav">
                                <li className="nav-item">
                                    <Link className="nav-link" to="/carrito">Carrito</Link>
                                </li>
                                {!user ? (
                                    <>
                                        <li className="nav-item">
                                            <Link className="nav-link" to="/login">Iniciar sesión</Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link className="nav-link" to="/register">Registrarse</Link>
                                        </li>
                                    </>
                                ) : (
                                    <li className="nav-item dropdown">
                                        <a
                                            className="nav-link dropdown-toggle"
                                            href="#"
                                            id="userDropdown"
                                            role="button"
                                                data-bs-toggle="dropdown"
                                                aria-expanded="true"
                                        >
                                            Hola, {user.name}
                                        </a>
                                        <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="userDropdown">
                                            <li><Link className="dropdown-item" to="/usuario">Información de usuario</Link></li>
                                            <li><hr className="dropdown-divider" /></li>
                                            <li><button className="dropdown-item" onClick={logout}>Cerrar sesión</button></li>
                                        </ul>
                                    </li>
                                )}
                            </ul>
                        </div>
                    </div>
                </nav>
            </header>

            <main className="flex-grow-1 py-4">
                <div className="container">
                    <Outlet />
                </div>
            </main>

            <footer className="bg-light text-center py-3 text-muted border-top mt-auto">
                <div className="container">
                    © 2025 Nickymartin. Todos los derechos reservados.
                </div>
            </footer>
        </div>
    );
};

export default MainLayout;
