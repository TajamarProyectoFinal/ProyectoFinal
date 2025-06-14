// src/pages/Productos.tsx
import React, { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import { ProductosDataSource } from "../services/ProductosDataSource";
import type { ProductosCategorias } from "../types/product";

const productosApi = new ProductosDataSource("https://localhost:7153/api/Productos");

const Productos: React.FC = () => {
    const [productos, setProductos] = useState<ProductosCategorias[]>([]);
    const [page, setPage] = useState(1);
    const [total, setTotal] = useState(0);

    useEffect(() => {
        productosApi.GetData(page, 6, (data) => {
            console.log("Data: ", data)
            if (data) {
                setProductos(data.productos || []);
                setTotal(data.totalResults);
            }
        });
    }, [page]);

    return (
        <div className="p-8">
            <h1 className="text-2xl font-bold mb-6">Catálogo de productos</h1>
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {productos.map((producto) => (
                    <ProductCard key={producto.producto.idProducto} producto={producto.producto} />
                ))}
            </div>

            {/* Paginación */}
            <div className="flex justify-center mt-8">
                {Array.from({ length: Math.ceil(total / 6) }).map((_, i) => (
                    <button
                        key={i}
                        onClick={() => setPage(i + 1)}
                        className={`mx-1 px-3 py-1 border ${page === i + 1 ? "bg-blue-600 text-white" : ""
                            }`}
                    >
                        {i + 1}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default Productos;
