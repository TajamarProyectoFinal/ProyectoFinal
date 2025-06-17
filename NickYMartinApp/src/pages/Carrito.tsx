import React, { useState, useEffect, useRef } from 'react'; // Removed 'use' import
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import type { Carrito } from '../types/carrito';
import { CarritoDataSource } from '../services/CarritoDataSource';

const CarritoView = () => {
    const [carrito, setCarrito] = useState<Carrito | undefined>(undefined);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const { user } = useAuth();
    const userId = user?.id;

    const navigate = useNavigate();

    // Use useRef to ensure carritoDataSource instance is stable across renders
    const carritoDataSourceRef = useRef(new CarritoDataSource("https://localhost:7153/api/Carrito"));
    const carritoDataSource = carritoDataSourceRef.current; // Access the current instance

    useEffect(() => {
        // Redirect if user is not logged in
        if (!user) {
            navigate('/login');
            return;
        }

        const fetchCarrito = () => {
            // Early exit if userId is not available (though covered by !user check)
            if (!userId) {
                setError("ID de usuario no disponible. Por favor, intente iniciar sesión de nuevo.");
                setLoading(false);
                return;
            }

            setLoading(true);
            setError(null); // Clear previous errors

            carritoDataSource.getUserCarrito(userId, (data, err) => {
                if (err) {
                    let errorMessage = "Error desconocido al cargar el carrito.";
                    // Attempt to extract more specific error messages from Axios error structure
                    if (err.response && err.response.data && err.response.data.message) {
                        errorMessage = `Error del servidor: ${err.response.data.message}`;
                    } else if (err.message) {
                        errorMessage = `Error de red: ${err.message}`;
                    } else if (typeof err === 'string') { // Fallback for simple string errors
                        errorMessage = err;
                    }
                    setError(errorMessage);
                    setCarrito(undefined); // Ensure carrito is reset on error
                } else if (data) {
                    // *** CRITICAL FIX FOR "map is not a function" ***
                    // Ensure that itemsCarrito is always an array, even if the API returns null or undefined
                    const processedCarrito: Carrito = {
                        ...data,
                        itemsCarrito: Array.isArray(data.itemsCarrito) ? data.itemsCarrito : []
                    };
                    setCarrito(processedCarrito);
                } else {
                    // Handle cases where data is null/undefined but no specific error was thrown
                    setError("No se encontraron datos del carrito o el formato es inesperado.");
                    setCarrito(undefined); // Ensure carrito is reset
                }
                setLoading(false);
            });
        };

        fetchCarrito();
    }, [userId, navigate]); // Depend on userId and navigate. carritoDataSource is stable via useRef.

    // --- Loading State ---
    if (loading) {
        return (
            <div className="container text-center my-5">
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Cargando carrito...</span>
                </div>
                <p className="mt-2">Cargando carrito...</p>
            </div>
        );
    }

    // --- Error State ---
    if (error) {
        return (
            <div className="container my-5">
                <div className="alert alert-danger" role="alert">
                    <h4 className="alert-heading">¡Error!</h4>
                    <p>{error}</p>
                    <button className="btn btn-primary" onClick={() => navigate('/')}>Volver a la tienda</button>
                </div>
            </div>
        );
    }

    // --- Empty Cart State ---
    // Now that itemsCarrito is guaranteed to be an array, we only need to check its length.
    if (!carrito || (carrito.itemsCarrito && carrito.itemsCarrito.length === 0)) {
        return (
            <div className="container my-5">
                <div className="alert alert-info" role="alert">
                    <h4 className="alert-heading">¡Tu carrito está vacío!</h4>
                    <p>Parece que aún no has añadido ningún producto a tu carrito de compras.</p>
                    <a href="/" className="btn btn-primary">Volver a la tienda</a>
                </div>
            </div>
        );
    }

    // --- Render Cart Data ---
    if(carrito.itemsCarrito)
    return (
        <div className="container my-5">
            <h2 className="mb-4 text-center">Tu Carrito de Compras</h2>
            <div className="table-responsive">
                <table className="table table-striped table-bordered table-hover align-middle">
                    <thead>
                        <tr>
                            <th>Producto</th>
                            <th>Precio Unitario</th>
                            <th>Cantidad</th>
                            <th>Subtotal</th>
                            {/* Optional: Actions column */}
                            {/* <th>Acciones</th> */}
                        </tr>
                    </thead>
                    <tbody>
                        {/* Now it's safe to map over carrito.itemsCarrito */}
                        {carrito.itemsCarrito.map((item) => (
                            <tr key={item.idItemCarrito}>
                                <td>
                                    <div className="d-flex align-items-center">
                                        <img
                                            // Prioritize item.mainImageUrl, then item.producto?.mainImagenUrl, then placeholder
                                            src={item.mainImageUrl || item.producto?.mainImagenUrl || 'https://via.placeholder.com/60'}
                                            alt={item.producto?.nombre || 'Producto'}
                                            className="rounded me-3"
                                            style={{ width: '60px', height: '60px', objectFit: 'cover' }}
                                        />
                                        <div>
                                            <strong>{item.producto?.nombre || 'Producto desconocido'}</strong>
                                            <br />
                                            <small className="text-muted">{item.producto?.descripcion?.substring(0, 50)}...</small>
                                        </div>
                                    </div>
                                </td>
                                <td>${item.precioUnitario.toFixed(2)}</td>
                                <td>{item.cantidad}</td>
                                <td>${item.subtotal.toFixed(2)}</td>
                                {/* Optional: Action buttons */}
                                {/* <td>
                                     <button className="btn btn-danger btn-sm me-2">Eliminar</button>
                                     <button className="btn btn-info btn-sm">Actualizar</button>
                                 </td> */}
                            </tr>
                        ))}
                    </tbody>
                    <tfoot>
                        <tr>
                            <td colSpan={3} className="text-end"><strong>Total:</strong></td>
                            <td><strong>${carrito.total.toFixed(2)}</strong></td>
                        </tr>
                    </tfoot>
                </table>
            </div>
            <div className="row justify-content-end mt-4">
                <div className="col-auto">
                    <button className="btn btn-success btn-lg">Confirmar Pedido</button>
                </div>
            </div>
        </div>
    );
};

export default CarritoView;