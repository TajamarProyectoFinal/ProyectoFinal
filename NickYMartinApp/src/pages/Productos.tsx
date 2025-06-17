import React, { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import { ProductosDataSource } from "../services/ProductosDataSource";
import type { ProductosCategorias } from "../types/product";
import { SearchTypes } from "../types/SearchTypes";
import AgregarProductoForm from "../components/AgregarProductoForm";

const productosApi = new ProductosDataSource("https://localhost:7153/api/Productos");

const Productos: React.FC = () => {
    const [productos, setProductos] = useState<ProductosCategorias[]>([]);
    const [page, setPage] = useState(1);
    const [total, setTotal] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<any>(null);
    const [modalVisible, setModalVisible] = useState(false);

    const fetchProductos = () => {
        setLoading(true);
        setError(null);

        productosApi.GetData(
            page,
            6,
            {},
            SearchTypes.List,
            (data, err) => {
                if (err) {
                    setError(err);
                    setProductos([]);
                    setTotal(0);
                } else if (data) {
                    setProductos(data.productos || []);
                    setTotal(data.totalResults);
                }
                setLoading(false);
            }
        );
    };

    const handleDeleteProducto = (id: string) => {
        productosApi.DeleteProducto(id, (data, err) => {
            if (err) {
                alert("Error al borrar el producto.");
                console.error(err);
            } else {
                alert("Producto eliminado.");
                fetchProductos();
            }
        });
    };

    useEffect(() => {
        fetchProductos();
    }, [page]);

    const totalPages = Math.ceil(total / 6);

    return (
        <>
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h1>Catálogo de productos</h1>
                <button className="btn btn-add" onClick={() => setModalVisible(true)}>
                    + Agregar producto
                </button>
            </div>

            {modalVisible && (
                <div className="modal fade show d-block" tabIndex={-1} style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
                    <div className="modal-dialog modal-dialog-centered modal-lg">
                        <div className="modal-content">
                            <div className="modal-header">
                                <button type="button" className="btn-close ms-auto" onClick={() => setModalVisible(false)}></button>
                            </div>
                            <div className="modal-body">
                                <AgregarProductoForm
                                    onClose={() => setModalVisible(false)}
                                    onProductoGuardado={() => {
                                        fetchProductos();
                                        setModalVisible(false);
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {loading ? (
                <div className="text-center mt-5">
                    <div className="spinner-border text-primary" />
                    <p className="mt-2">Cargando productos...</p>
                </div>
            ) : error ? (
                <div className="alert alert-danger text-center">Error al cargar productos</div>
            ) : productos.length > 0 ? (
                <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4">
                    {productos.map((producto) => (
                        <div key={producto.producto.idProducto} className="col">
                            <ProductCard
                                producto={producto.producto}
                                mainImage={producto.mainImageUrl}
                                onDelete={() => handleDeleteProducto(producto.producto.idProducto)}
                            />
                        </div>
                    ))}
                </div>
            ) : (
                <div className="alert alert-info text-center">No hay productos disponibles.</div>
            )}

            {totalPages > 1 && (
                <nav className="mt-4 d-flex justify-content-center">
                    <ul className="pagination">
                        <li className={`page-item ${page === 1 ? 'disabled' : ''}`}>
                            <button className="page-link" onClick={() => setPage(page - 1)} disabled={page === 1}>
                                Anterior
                            </button>
                        </li>
                        {Array.from({ length: totalPages }).map((_, i) => (
                            <li key={i} className={`page-item ${page === i + 1 ? 'active' : ''}`}>
                                <button className="page-link" onClick={() => setPage(i + 1)}>{i + 1}</button>
                            </li>
                        ))}
                        <li className={`page-item ${page === totalPages ? 'disabled' : ''}`}>
                            <button className="page-link" onClick={() => setPage(page + 1)} disabled={page === totalPages}>
                                Siguiente
                            </button>
                        </li>
                    </ul>
                </nav>
            )}
        </>
    );
};

export default Productos;
