import React from "react";
import { useAuth } from "../context/AuthContext";
import { Navigate } from "react-router-dom";

const Usuario: React.FC = () => {
    const { user } = useAuth();

    // Si no est� logueado, redirige
    if (!user) return <Navigate to="/login" replace />;

    return (
        <div className="container mt-5" style={{ maxWidth: "600px" }}>
            <h2 className="mb-4 text-center">Informaci�n de usuario</h2>
            <div className="card shadow-sm">
                <div className="card-body">
                    <p><strong>Nombre:</strong> {user.name}</p>
                    <p><strong>Correo:</strong> {user.email}</p>
                    {/* Aqu� puedes mostrar m�s campos cuando los tengas */}
                </div>
            </div>
        </div>
    );
};

export default Usuario;
