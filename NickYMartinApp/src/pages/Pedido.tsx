import React, { useEffect, useState, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // Still useful for general user context if needed
import type { Pedido, DetallesPedidos } from '../types/pedido';
import { PedidosDataSource } from '../services/PedidosDataSource';
import type { RedsysPaymentDataDto } from '../types/RedsysPaymentDataDto';
import { PaymentDataSource } from '../services/PaymentDataSource';

type ApiCallback<T> = (data: T | null, error?: any) => void;

const PedidoView: React.FC = () => {
    const [pedido, setPedido] = useState<Pedido | undefined>(undefined);
    const [redsysPaymentData, setRedsysPaymentData] = useState<RedsysPaymentDataDto | undefined>(undefined);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const navigate = useNavigate();
    const { id: idPedido } = useParams<{ id: string }>();
    // user is not directly needed for Redsys data generation anymore,
    // but might be useful for other parts of the view or context validation.
    // const { user } = useAuth(); 

    const pedidoDataSourceRef = useRef(new PedidosDataSource("https://localhost:7153/api/Pedidos"));
    const paymentDataSourceRef = useRef(new PaymentDataSource("https://localhost:7153/api/Payment"));
    const pedidoDataSource = pedidoDataSourceRef.current;
    const paymentDataSource = paymentDataSourceRef.current;

    useEffect(() => {
        if (!idPedido) {
            setError("ID de pedido no proporcionado en la URL.");
            setLoading(false);
            return;
        }

        setLoading(true);
        setError(null);
        setPedido(undefined);
        setRedsysPaymentData(undefined);

        const handleRedsysData: ApiCallback<RedsysPaymentDataDto> = (data, err) => {
            if (err) {
                console.error("Error al preparar los datos para el pago:", err);
                const errorMessage = err.response?.data?.message || err.message || "Error desconocido al preparar el pago.";
                setError(errorMessage);
                // No setLoading(false) here, as PedidoDetalles callback will handle it
            } else if (data) {
                setRedsysPaymentData(data);
                // No setLoading(false) here, as PedidoDetalles callback will handle it
            } else {
                setError("No se recibieron datos de pago de Redsys.");
                // No setLoading(false) here, as PedidoDetalles callback will handle it
            }
        };

        const handlePedidoData: ApiCallback<Pedido> = (data, err) => {
            if (err) {
                console.error("Error al cargar el pedido:", err);
                const errorMessage = err.response?.data?.message || err.message || "Error desconocido al cargar el pedido.";
                setError(errorMessage);
            } else if (data) {
                setPedido(data);
            } else {
                setError("No se encontraron datos del pedido o el formato es inesperado.");
            }
            setLoading(false); // Set loading to false once *both* primary fetches are done (or one fails)
        };

        // Call both data sources in parallel as they no longer have direct dependencies here
        paymentDataSource.generateRedsysData(idPedido, handleRedsysData);
        pedidoDataSource.PedidoDetalles(idPedido, handlePedidoData);

    }, [idPedido, pedidoDataSource, paymentDataSource, navigate]); // No longer dependent on user?.id

    if (loading) {
        return (
            <div className="container text-center my-5">
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Cargando pedido...</span>
                </div>
                <p className="mt-2">Cargando detalles del pedido y preparando pago...</p>
            </div>
        );
    }

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

    if (!pedido) {
        return (
            <div className="container my-5">
                <div className="alert alert-info" role="alert">
                    <h4 className="alert-heading">¡Pedido no encontrado!</h4>
                    <p>No pudimos encontrar los detalles del pedido con ID: {idPedido}.</p>
                    <a href="/" className="btn btn-primary">Volver a la tienda</a>
                </div>
            </div>
        );
    }

    const formattedDate = new Date(pedido.fechaCreacion).toLocaleDateString('es-ES', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });

    return (
        <div className="container my-5">
            <h2 className="mb-4 text-center">Detalles del Pedido #{pedido.numero}</h2>

            <div className="card mb-4 shadow-sm">
                <div className="card-header bg-primary text-white">
                    <h4 className="my-0 font-weight-normal">Información General del Pedido</h4>
                </div>
                <div className="card-body">
                    <p><strong>ID de Pedido:</strong> {pedido.idPedido}</p>
                    <p><strong>Número de Pedido:</strong> {pedido.numero}</p>
                    <p><strong>Fecha de Creación:</strong> {formattedDate}</p>
                    <p><strong>Estado:</strong> <span className="badge bg-info text-dark">{pedido.estado || 'Pendiente'}</span></p>
                    <p><strong>Total del Pedido:</strong> <span className="fw-bold fs-5">${pedido.total.toFixed(2)}</span></p>
                    <p><strong>ID de Dirección de Envío:</strong> {pedido.idDireccion}</p>
                </div>
            </div>

            <h3 className="mb-3">Productos del Pedido</h3>
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
                                <td colSpan={3} className="text-end"><strong>Total de Productos:</strong></td>
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

            {/* Redsys Form - Now with a visible "Comprar" button for manual redirection */}
            {redsysPaymentData && (
                <div className="card p-3 my-4">
                    <p className="lead text-center">Haz clic en "Comprar" para proceder al pago seguro con Redsys.</p>
                    <form
                        name="redsysForm"
                        action={redsysPaymentData.redsysTpvsUrl}
                        method="POST"
                        className="d-grid gap-2"
                    >
                        <input type="hidden" name="Ds_SignatureVersion" value={redsysPaymentData.ds_SignatureVersion} />
                        <input type="hidden" name="Ds_MerchantParameters" value={redsysPaymentData.ds_MerchantParameters || ''} />
                        <input type="hidden" name="Ds_Signature" value={redsysPaymentData.ds_Signature || ''} />
                        <div className="text-center">
                        </div>
                        <button className="btn btn-warning btn-lg" type="submit"> Comprar </button>
                    </form>
                </div>
            )}

            {redsysPaymentData == null || redsysPaymentData == undefined && (
                <div className="alert alert-warning text-center my-4">
                    Esperando datos para la pasarela de pago...
                </div>
            )}

            <div className="text-center mt-5">
                <button
                    className="btn btn-secondary"
                    onClick={() => navigate(-1)}
                >
                    Volver
                </button>
            </div>
        </div>
    );
};

export default PedidoView;