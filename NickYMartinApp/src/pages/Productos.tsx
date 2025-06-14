// src/pages/Productos.tsx
import React, { useEffect, useState } from "react";
import productService from "../services/productService";
import type { Producto } from "../components/ProductCard";
import ProductCard from "../components/ProductCard";

const Productos: React.FC = () => {
    const [productos, setProductos] = useState<Producto[]>([]);

    useEffect(() => {
        productService.GetProducts((data: Producto[] | null, error: any) => {
            if (error) {
                console.error("Error al cargar productos", error);
            } else if (data) {
                setProductos(data);
            }
        });
    }, []);

    return (
        <div className="p-8">
            <h1 className="text-2xl font-bold mb-6">Catálogo de productos</h1>
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {productos.map((producto) => (
                    <ProductCard key={producto.id} producto={producto} />
                ))}
            </div>
        </div>
    );
};

export default Productos;
