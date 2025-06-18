// src/pages/NotFoundPage.tsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

const NotFoundPage: React.FC = () => {
    const navigate = useNavigate();

    return (
        <div className="d-flex align-items-center justify-content-center vh-100 bg-light">
            <div className="text-center">
                <h1 className="display-1 fw-bold text-primary">404</h1>
                <p className="fs-3"> <span className="text-danger">¡Vaya!</span> Página no encontrada.</p>
                <p className="lead">
                    La página que estás buscando no existe.
                </p>
                <button
                    className="btn btn-primary mt-3"
                    onClick={() => navigate('/')}
                >
                    Ir a la página de inicio
                </button>
            </div>
        </div>
    );
};

export default NotFoundPage;