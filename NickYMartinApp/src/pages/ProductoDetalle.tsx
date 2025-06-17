import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ProductosDataSource } from "../services/ProductosDataSource";
import type { ProductoDTO } from "../types/productoDTO";
import { ActionTypes } from "../types/ActionTypes";
import AgregarProductoForm from "../components/AgregarProductoForm";
import { motion } from "framer-motion";

const productosApi = new ProductosDataSource("https://localhost:7153/api/Productos");

const ProductoDetalle: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [detalle, setDetalle] = useState<ProductoDTO | null>(null);
    const [loading, setLoading] = useState(true);
    const [modalVisible, setModalVisible] = useState(false);

    useEffect(() => {
        if (id) {
            fetchProducto();
        }
    }, [id]);

    const fetchProducto = () => {
        if (!id) return;

        productosApi.GetProductoById(id, ActionTypes.List, (data, err) => {
            if (err || !data) {
                console.error("Error al cargar el producto");
                setDetalle(null);
            } else {
                setDetalle(data);
            }
            setLoading(false);
        });
    };

    if (loading) return <div className="text-center mt-5">Cargando...</div>;
    if (!detalle) return <div className="alert alert-danger">Producto no encontrado</div>;

    const { producto, categorias, multimediasProducto, categoriasIds } = detalle;

    return (
        <motion.div
            className="container mt-5"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
        >
            <Link to="/" className="btn btn-outline-secondary mb-4">← Volver</Link>
            <div className="row">
                <motion.div
                    className="col-md-6"
                    initial={{ opacity: 0, x: -15 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3 }}
                >
                    {multimediasProducto && multimediasProducto.length > 0 ? (
                        <img
                            src={multimediasProducto[0].url}
                            alt={producto.nombre}
                            className="img-fluid rounded shadow-sm"
                            style={{ maxHeight: '400px', objectFit: 'cover' }}
                        />
                    ) : (
                        <div className="bg-secondary text-white text-center p-5 rounded shadow-sm">Sin imagen</div>
                    )}
                </motion.div>

                <motion.div
                    className="col-md-6"
                    initial={{ opacity: 0, x: 15 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3 }}
                >
                    <h2 className="text-primary mb-3">{producto.nombre}</h2>
                    <p><strong>Precio:</strong> {producto.precio.toFixed(2)}€</p>
                    <p><strong>Stock:</strong> {producto.stock}</p>
                    <p className="text-muted">{producto.descripcion}</p>

                    {categorias && (
                        <div className="mt-3">
                            <strong className="d-block mb-2">Categorías:</strong>
                            <div className="d-flex flex-wrap gap-2">
                                {categorias.map(cat => (
                                    <span key={cat.idCategoria} className="badge bg-light text-dark border px-3 py-2 rounded-pill">
                                        {cat.nombre}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}

                    <div className="mt-4 d-flex gap-2">
                        <button className="btn btn-primary">Añadir al carrito</button>
                        <button className="btn btn-warning" onClick={() => setModalVisible(true)}>
                            Editar producto
                        </button>
                    </div>
                </motion.div>
            </div>

            {modalVisible && (
                <div className="modal fade show d-block" tabIndex={-1} style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
                    <div className="modal-dialog modal-lg">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Editando {producto.nombre}</h5>
                                <button type="button" className="btn-close" onClick={() => setModalVisible(false)}></button>
                            </div>
                            <div className="modal-body">
                                <AgregarProductoForm
                                    onClose={() => setModalVisible(false)}
                                    onProductoGuardado={() => {
                                        setModalVisible(false);
                                        fetchProducto(); // recargar los datos tras editar
                                    }}
                                    modoEdicion={true}
                                    productoInicial={producto}
                                    productoId={producto.idProducto}
                                    categoriasIniciales={categoriasIds ?? []}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </motion.div>
    );
};

export default ProductoDetalle;
