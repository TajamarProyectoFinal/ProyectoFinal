import React from "react";
import { useAuth } from "../context/AuthContext";
import { Navigate } from "react-router-dom";
import { motion } from "framer-motion";
import Direcciones from "../components/Direcciones";

const Usuario: React.FC = () => {
    const { user, logout } = useAuth();

    if (!user) return <Navigate to="/login" replace />;

    return (
        <motion.div
            className="container mt-5"
            style={{ maxWidth: "600px" }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
        >
            <h2 className="mb-4 text-center text-primary">Perfil de usuario</h2>

            <div className="card shadow-sm border-0">
                <div className="card-body">
                    <p className="mb-2"><strong>ID:</strong> {user.id}</p>
                    <p className="mb-2"><strong>Nombre:</strong> {user.name}</p>
                    <p className="mb-2"><strong>Correo:</strong> {user.email}</p>
                    <p className="mb-3"><strong>Teléfono:</strong> {user.phone}</p>
                    <p className="mb-3"><strong>Rol:</strong> {user.role}</p>

                    <button className="btn btn-logout" onClick={logout}>
                        Cerrar sesión
                    </button>
                </div>
            </div>
            <Direcciones />
        </motion.div>

    );
};

export default Usuario;
