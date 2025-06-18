import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import type { Carrito } from '../types/carrito';
import type { Direccion } from '../types/Direccion';
import { CarritoDataSource } from '../services/CarritoDataSource';
import { DireccionDataSource } from '../services/DireccionDataSource';
import Direcciones from '../components/Direcciones'; // Este es el componente para añadir/gestionar direcciones
import { PedidosDataSource } from '../services/PedidosDataSource';

const CarritoView = () => {
    const [carrito, setCarrito] = useState<Carrito | undefined>(undefined);
    const [loading, setLoading] = useState<boolean>(true);
    const [direccionesUsuario, setDireccionesUsuario] = useState<Direccion[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [direccionSeleccionada, setDireccionSeleccionada] = useState<string | undefined>(undefined); // Estado para la dirección seleccionada

    const { user } = useAuth();
    // userId puede ser string | undefined aquí inicialmente
    const userId = user?.id;

    const navigate = useNavigate();

    const pedidosDataSourceRef = useRef(new PedidosDataSource("https://localhost:7153/api/Pedidos"));
    const direccionesDataSourceRef = useRef(new DireccionDataSource("https://localhost:7153/api/Users"));
    const carritoDataSourceRef = useRef(new CarritoDataSource("https://localhost:7153/api/Carrito"));
    const carritoDataSource = carritoDataSourceRef.current;
    const direccionDataSource = direccionesDataSourceRef.current;
    const pedidosDataSource = pedidosDataSourceRef.current;

    // Función para recargar las direcciones después de añadir/eliminar una nueva
    // Esta función se pasa como callback a Direcciones
    const handleDireccionCambio = async () => {
        if (userId) { // Aseguramos que userId exista antes de usarlo
            try {
                const data = await direccionDataSource.obtenerDirecciones(userId);
                setDireccionesUsuario(data);
                if (data.length > 0) {
                    const principal = data.find(dir => dir.principal);
                    setDireccionSeleccionada(principal ? principal.idDireccion : data[0].idDireccion);
                } else {
                    setDireccionSeleccionada(undefined);
                }
            } catch (err) {
                console.error("Error recargando direcciones después de un cambio:", err);
                setError("No se pudieron actualizar las direcciones.");
            }
        }
    };

    const handleCreatePedido = () => {
        if (!direccionSeleccionada) {
            setError("Por favor, selecciona una dirección para el envío.");
            return;
        }
        // Lógica para crear el pedido con la dirección seleccionada
        console.log("Creando pedido con la dirección:", direccionSeleccionada);
        if (userId) {
            setLoading(true);
            pedidosDataSource.AddPedido(userId, direccionSeleccionada,
                (data, err) => {
                    if (err) {
                        setError(err);
                        setLoading(false);
                    } else if (data) {
                        setLoading(false);
                        const idpedido = data.idPedido;
                        if (idpedido) {
                            navigate(`/pedido/${idpedido}`);
                        }
                    }
                }
            )

        }

        setError(null);
    };

    useEffect(() => {
        if (!user) {
            navigate('/login');
            return;
        }

        // Si userId está disponible, carga direcciones y carrito
        // La ejecución de esta lógica se asegura de que userId sea un string.
        if (userId) {
            const cargarInicial = async () => {
                setLoading(true);
                setError(null);

                try {
                    // Cargar direcciones
                    const direccionesData = await direccionDataSource.obtenerDirecciones(userId);
                    setDireccionesUsuario(direccionesData);
                    if (direccionesData.length > 0) {
                        const principal = direccionesData.find(dir => dir.principal);
                        setDireccionSeleccionada(principal ? principal.idDireccion : direccionesData[0].idDireccion);
                    } else {
                        setDireccionSeleccionada(undefined);
                    }

                    // Cargar carrito (adaptado para usar Promesas o async/await si tu getUserCarrito lo soporta)
                    const carritoData = await new Promise<Carrito | undefined>((resolve, reject) => {
                        carritoDataSource.getUserCarrito(userId, (data, err) => {
                            if (err) {
                                reject(err);
                            } else {
                                resolve(data!);
                            }
                        });
                    });

                    if (carritoData) {
                        const processedCarrito: Carrito = {
                            ...carritoData,
                            itemsCarrito: Array.isArray(carritoData.itemsCarrito) ? carritoData.itemsCarrito : []
                        };
                        setCarrito(processedCarrito);
                    } else {
                        setCarrito(undefined);
                    }

                } catch (err: any) {
                    let errorMessage = "Error desconocido al cargar los datos.";
                    if (err.response && err.response.data && err.response.data.message) {
                        errorMessage = `Error del servidor: ${err.response.data.message}`;
                    } else if (err.message) {
                        errorMessage = `Error de red: ${err.message}`;
                    } else if (typeof err === 'string') {
                        errorMessage = err;
                    }
                    setError(errorMessage);
                    setCarrito(undefined);
                } finally {
                    setLoading(false);
                }
            };

            cargarInicial();
        }

    }, [userId, navigate, direccionDataSource, carritoDataSource]);

    const handleDireccionChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setDireccionSeleccionada(event.target.value === "" ? undefined : event.target.value);
    };

    // --- Loading State ---
    if (loading) {
        return (
            <div className="container text-center my-5">
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Cargando...</span>
                </div>
                <p className="mt-2">Cargando carrito y direcciones...</p>
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

    // ****** IMPORTANTE: Asegurar que userId es string aquí ******
    // Si userId es undefined en este punto, significa que el useEffect de arriba no redirigió por alguna razón
    // o que el 'user' de useAuth sigue siendo null/undefined.
    // Esto es una "guardia de tipo" para asegurar que 'userId' sea 'string' cuando se usa en JSX.
    if (userId === undefined) {
        return (
            <div className="container my-5">
                <div className="alert alert-warning" role="alert">
                    No se pudo obtener el ID de usuario. Por favor, recarga la página o inicia sesión de nuevo.
                </div>
            </div>
        );
    }

    // --- Render Cart Data ---
    if(carrito.itemsCarrito && carrito.itemsCarrito.length > 0)
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
                        </tr>
                    </thead>
                    <tbody>
                        {carrito.itemsCarrito.map((item) => (
                            <tr key={item.idItemCarrito}>
                                <td>
                                    <div className="d-flex align-items-center">
                                        <img
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

            <hr className="my-5" />
            <h3>Dirección de Envío</h3>
            {direccionesUsuario.length > 0 ? (
                <div className="mb-4">
                    <label htmlFor="direccionEnvio" className="form-label">Selecciona una dirección existente:</label>
                    <select
                        id="direccionEnvio"
                        className="form-select"
                        value={direccionSeleccionada || ''}
                        onChange={handleDireccionChange}
                    >
                        <option value="">-- Seleccionar una dirección --</option> {/* Opción para deseleccionar */}
                        {direccionesUsuario.map((direccion) => (
                            <option key={direccion.idDireccion} value={direccion.idDireccion}>
                                {`${direccion.domicilio}, ${direccion.ciudad}, ${direccion.codigoPostal}, ${direccion.pais}`}
                                {direccion.principal && ' (Principal)'}
                            </option>
                        ))}
                    </select>
                </div>
            ) : (
                <div className="alert alert-info" role="alert">
                    No tienes direcciones registradas. Por favor, añade una dirección de envío.
                    {/* El userId aquí ya es string gracias a la guardia superior */}
                    {/* onAddressAdded es el nombre de la prop en Direcciones */}
                    <Direcciones  onAddressAdded={handleDireccionCambio} />
                </div>
            )}

            <div className="row justify-content-end mt-4">
                <div className="col-auto">
                    <button
                        className="btn btn-success btn-lg"
                        onClick={handleCreatePedido}
                        // Deshabilitar si no hay dirección seleccionada O el carrito está vacío
                        disabled={!direccionSeleccionada || (carrito.itemsCarrito && carrito.itemsCarrito.length === 0)}
                    >
                        Confirmar Pedido
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CarritoView;