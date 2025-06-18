import React, { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { PedidosDataSource } from '../services/PedidosDataSource';
import type { Pedido, DetallesPedidos } from '../types/pedido';

const PagoExitoView: React.FC = () => {
    const [pedido, setPedido] = useState<Pedido | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const { idPedido } = useParams<{ idPedido: string }>(); // Obtiene el ID del pedido de la URL
    const navigate = useNavigate();

    const pedidosDataSourceRef = useRef(new PedidosDataSource("https://localhost:7153/api/Pedidos"));
    const pedidosDataSource = pedidosDataSourceRef.current;

    useEffect(() => {
        if (!idPedido) {
            setError("No se proporcionó el ID del pedido. No se puede cargar la información de éxito.");
            setLoading(false);
            return;
        }

        setLoading(true);
        setError(null);

        pedidosDataSource.PedidoDetalles(idPedido, (data, err) => {
            if (err) {
                console.error("Error al cargar los detalles del pedido:", err);
                const errorMessage = err.response?.data?.message || err.message || "Error desconocido al cargar los detalles del pedido.";
                setError(errorMessage);
                setPedido(null);
            } else if (data) {
                setPedido(data);
            } else {
                setError("No se encontraron detalles para este pedido.");
                setPedido(null);
            }
            setLoading(false);
        });

    }, [idPedido, pedidosDataSource]);

    if (loading) {
        return (
            <div className="container text-center my-5">
                <div className="spinner-border text-success" role="status">
                    <span className="visually-hidden">Cargando confirmación...</span>
                </div>
                <p className="mt-2">Cargando los detalles de tu pedido...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="container my-5">
                <div className="alert alert-danger text-center" role="alert">
                    <h4 className="alert-heading">¡Error al confirmar tu pedido!</h4>
                    <p>{error}</p>
                    <p className="mb-0">Por favor, inténtalo de nuevo o contacta con soporte si el problema persiste.</p>
                    <button className="btn btn-primary mt-3" onClick={() => navigate('/')}>Volver a la tienda</button>
                </div>
            </div>
        );
    }

    if (!pedido) {
        return (
            <div className="container my-5">
                <div className="alert alert-warning text-center" role="alert">
                    <h4 className="alert-heading">Pedido no encontrado</h4>
                    <p>No pudimos cargar los detalles del pedido. El ID proporcionado podría ser incorrecto o el pedido no existe.</p>
                    <button className="btn btn-primary mt-3" onClick={() => navigate('/')}>Volver a la tienda</button>
                </div>
            </div>
        );
    }

    // Formatear la fecha para una mejor visualización
    const formattedDate = new Date(pedido.fechaCreacion).toLocaleDateString('es-ES', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });

    return (
        <div className="container my-5">
            <div className="alert alert-success text-center py-4" role="alert">
                <h1 className="alert-heading mb-3">¡Pago Exitoso y Pedido Confirmado!</h1>
                <p className="lead">Tu pedido ha sido procesado con éxito. ¡Gracias por tu compra!</p>
                <i className="bi bi-check-circle-fill text-success" style={{ fontSize: '3rem' }}></i> {/* Icono de éxito */}
            </div>

            <h2 className="mb-4 text-center">Resumen de tu Pedido #{pedido.numero}</h2>

            <div className="card mb-4 shadow-sm">
                <div className="card-header bg-success text-white">
                    <h4 className="my-0 font-weight-normal">Detalles del Pedido</h4>
                </div>
                <div className="card-body">
                    <p><strong>ID de Pedido:</strong> {pedido.idPedido}</p>
                    <p><strong>Número de Pedido:</strong> {pedido.numero}</p>
                    <p><strong>Fecha de Creación:</strong> {formattedDate}</p>
                    <p><strong>Estado:</strong> <span className="badge bg-success text-white">{pedido.estado || 'Confirmado'}</span></p>
                    <p><strong>Total Pagado:</strong> <span className="fw-bold fs-4">${pedido.total.toFixed(2)}</span></p>
                    <p><strong>Dirección de Envío ID:</strong> {pedido.idDireccion}</p>
                    {/* Aquí podrías cargar y mostrar la dirección completa si tu backend lo permite o si tienes un servicio de direcciones */}
                </div>
            </div>

            <h3 className="mb-3">Productos Incluidos</h3>
            {pedido.detallesPedidos && pedido.detallesPedidos.length > 0 ? (
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
                            {pedido.detallesPedidos.map((detalle: DetallesPedidos) => (
                                <tr key={detalle.idDetalle}>
                                    <td>
                                        <div className="d-flex align-items-center">
                                            <img
                                                src={detalle.producto?.mainImagenUrl || 'https://via.placeholder.com/60'}
                                                alt={detalle.producto?.nombre || 'Producto'}
                                                className="rounded me-3"
                                                style={{ width: '60px', height: '60px', objectFit: 'cover' }}
                                            />
                                            <div>
                                                <strong>{detalle.producto?.nombre || 'Producto desconocido'}</strong>
                                                <br />
                                                <small className="text-muted">{detalle.producto?.descripcion?.substring(0, 50)}...</small>
                                            </div>
                                        </div>
                                    </td>
                                    <td>${detalle.precioUnitario.toFixed(2)}</td>
                                    <td>{detalle.cantidad}</td>
                                    <td>${detalle.subtotal.toFixed(2)}</td>
                                </tr>
                            ))}
                        </tbody>
                        <tfoot>
                            <tr>
                                <td colSpan={3} className="text-end"><strong>Total del Pedido:</strong></td>
                                <td><strong>${pedido.total.toFixed(2)}</strong></td>
                            </tr>
                        </tfoot>
                    </table>
                </div>
            ) : (
                <div className="alert alert-info" role="alert">
                    Este pedido no tiene detalles de productos.
                </div>
            )}

            <div className="text-center mt-5">
                <button
                    className="btn btn-primary btn-lg"
                    onClick={() => navigate('/mis-pedidos')} // Puedes redirigir a una página de historial de pedidos
                >
                    Ver mis Pedidos
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

export default PagoExitoView;