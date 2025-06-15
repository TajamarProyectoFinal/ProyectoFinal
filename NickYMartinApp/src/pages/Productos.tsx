// src/pages/Productos.tsx
import React, { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import { ProductosDataSource } from "../services/ProductosDataSource";
import type { ProductosCategorias, ProductosViewModel } from "../types/product";
import { SearchTypes } from "../types/SearchTypes";

const productosApi = new ProductosDataSource("https://localhost:7153/api/Productos");

const Productos: React.FC = () => {
    const [productos, setProductos] = useState<ProductosCategorias[]>([]);
    const [page, setPage] = useState(1);
    const [total, setTotal] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<any>(null);

    useEffect(() => {
        setLoading(true);
        setError(null);

        const handleApiResponse = (data: ProductosViewModel | null, err?: any) => {
            if (err) {
                console.error("Error al cargar productos:", err);
                setError(err);
                setProductos([]);
                setTotal(0);
            } else if (data) {
                console.log("Datos recibidos:", data);
                setProductos(data.productos || []);
                setTotal(data.totalResults);
            }
            setLoading(false);
        };

        productosApi.GetData(
            page,
            6,
            {},
            SearchTypes.List,
            handleApiResponse
        );
    }, [page]);

    // Calcular el número total de páginas
    const totalPages = Math.ceil(total / 6);

    if (loading) {
        return (
            <div className="container mt-5 text-center">
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Cargando productos...</span>
                </div>
                <p className="mt-2">Cargando productos...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="container mt-5 text-center alert alert-danger" role="alert">
                Error al cargar productos: {error.message || "Ha ocurrido un error desconocido."}
            </div>
        );
    }

    return (
        <div className="container mt-4"> {/* Bootstrap container para el padding */}
            <h1 className="mb-4 text-center">Catálogo de productos</h1> {/* mb-4 para margen inferior */}

            {productos.length > 0 ? (
                <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4"> {/* g-4 para el espacio entre columnas y filas */}
                    {productos.map((producto) => (
                        <div key={producto.producto.idProducto} className="col">
                            <ProductCard producto={producto.producto} />
                        </div>
                    ))}
                </div>
            ) : (
                <div className="alert alert-info text-center" role="alert">
                    No hay productos disponibles.
                </div>
            )}

            {/* Paginación con Bootstrap */}
            {totalPages > 1 && (
                <nav aria-label="Page navigation" className="mt-4 d-flex justify-content-center">
                    <ul className="pagination">
                        <li className={`page-item ${page === 1 ? 'disabled' : ''}`}>
                            <button className="page-link" onClick={() => setPage(page - 1)} disabled={page === 1}>
                                Anterior
                            </button>
                        </li>
                        {Array.from({ length: totalPages }).map((_, i) => (
                            <li key={i} className={`page-item ${page === i + 1 ? 'active' : ''}`}>
                                <button
                                    className="page-link"
                                    onClick={() => setPage(i + 1)}
                                >
                                    {i + 1}
                                </button>
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
        </div>
    );
};

export default Productos;