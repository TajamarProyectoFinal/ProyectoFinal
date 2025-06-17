import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ProductosDataSource } from "../services/ProductosDataSource";
import type { ProductoDTO } from "../types/productoDTO";
import { ActionTypes } from "../types/ActionTypes";

const productosApi = new ProductosDataSource("https://localhost:7153/api/Productos");

const ProductoDetalle: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [detalle, setDetalle] = useState<ProductoDTO | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (id) {
            productosApi.GetProductoById(id, ActionTypes.List, (data, err) => {
                console.log("data", data)
                if (err || !data) {
                    console.error("Error al cargar el producto");
                    setDetalle(null);
                } else {
                    setDetalle(data);
                }
                setLoading(false);
            });
        }
    }, [id]);

    if (loading) return <div className="text-center mt-5">Cargando...</div>;
    if (!detalle) return <div className="alert alert-danger">Producto no encontrado</div>;

    const { producto, categorias, multimediasProducto } = detalle;

    return (
        <div className="container mt-5">
            <Link to="/" className="btn btn-outline-secondary mb-4">← Volver</Link>
            <div className="row">
                <div className="col-md-6">
                    {multimediasProducto && multimediasProducto.length > 0 ? (
                        <img
                            src={multimediasProducto[0].url}
                            alt={producto.nombre}
                            className="img-fluid"
                            style={{ maxHeight: '400px', objectFit: 'cover' }}
                        />
                    ) : (
                        <div className="bg-secondary text-white text-center p-5">Sin imagen</div>
                    )}
                </div>
                <div className="col-md-6">
                    <h2>{producto.nombre}</h2>
                    <p><strong>Precio:</strong> {producto.precio.toFixed(2)}€</p>
                    <p><strong>Stock:</strong> {producto.stock}</p>
                    <p>{producto.descripcion}</p>

                    {categorias && (
                        <div className="mt-3">
                            <strong>Categorías:</strong>
                            <ul>
                                {categorias.map(cat => (
                                    <li key={cat.idCategoria}>{cat.nombre}</li>
                                ))}
                            </ul>
                        </div>
                    )}

                    <button className="btn btn-primary mt-3">Añadir al carrito</button>
                </div>
            </div>
        </div>
    );
};

export default ProductoDetalle;
