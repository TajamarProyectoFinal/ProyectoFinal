import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const PagoErrorView: React.FC = () => {
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const navigate = useNavigate();
    const location = useLocation(); // Hook para acceder a la URL y sus parámetros

    useEffect(() => {
        // Intentar obtener un mensaje de error de los parámetros de consulta de la URL
        const params = new URLSearchParams(location.search);
        const msg = params.get('mensaje'); // Por ejemplo: /pago-error?mensaje=fondos_insuficientes
        if (msg) {
            setErrorMessage(decodeURIComponent(msg)); // Decodificar el mensaje si viene codificado en la URL
        } else {
            setErrorMessage("Ha ocurrido un error al procesar tu pago. Por favor, inténtalo de nuevo.");
        }
    }, [location.search]); // Depende de la parte de búsqueda de la URL

    return (
        <div className="container my-5">
            <div className="alert alert-danger text-center py-4" role="alert">
                <h1 className="alert-heading mb-3">¡Error en el Pago!</h1>
                <p className="lead">{errorMessage}</p>
                <i className="bi bi-x-circle-fill text-danger" style={{ fontSize: '3rem' }}></i> {/* Icono de error */}
            </div>

            <div className="card shadow-sm p-4 mb-4">
                <h3 className="card-title text-center mb-3">¿Qué puedes hacer ahora?</h3>
                <ul className="list-unstyled text-center">
                    <li className="mb-2">
                        <p><strong>Verifica los detalles de tu tarjeta:</strong> Asegúrate de que los datos introducidos son correctos.</p>
                    </li>
                    <li className="mb-2">
                        <p><strong>Contacta con tu banco:</strong> Podría haber un problema con tu entidad bancaria o límites de gasto.</p>
                    </li>
                    <li className="mb-2">
                        <p><strong>Intenta con otro método de pago:</strong> Si tienes otra tarjeta o método de pago disponible, puedes probar con él.</p>
                    </li>
                    <li>
                        <p><strong>Contacta con nuestro soporte:</strong> Si el problema persiste, no dudes en contactarnos para que podamos ayudarte.</p>
                        <p className="small text-muted">Menciona el momento del error y cualquier mensaje que hayas recibido.</p>
                    </li>
                </ul>
            </div>

            <div className="text-center mt-5">
                <button
                    className="btn btn-primary btn-lg"
                    onClick={() => navigate('/carrito')} // Redirige de nuevo al carrito para reintentar el pago
                >
                    Volver al Carrito para Reintentar
                </button>
                <button
                    className="btn btn-secondary btn-lg ms-3"
                    onClick={() => navigate('/')}
                >
                    Volver a la Tienda
                </button>
            </div>
        </div>
    );
};

export default PagoErrorView;