// src/components/ProductCard.tsx
import React from "react";

// Define el tipo del producto
export interface Producto {
    id: number;
    nombre: string;
    descripcion: string;
    precio: number;
    imagen?: string;
}

interface Props {
    producto: Producto;
}

const ProductCard: React.FC<Props> = ({ producto }) => {
    return (
        <div className="border rounded-xl shadow-md overflow-hidden p-4 flex flex-col hover:shadow-lg transition">
            <img
                src={producto.imagen || "https://via.placeholder.com/150"}
                alt={producto.nombre}
                className="w-full h-40 object-cover mb-4 rounded"
            />
            <h2 className="text-lg font-semibold">{producto.nombre}</h2>
            <p className="text-gray-700 text-sm flex-grow">{producto.descripcion}</p>
            <p className="text-xl font-bold mt-2">{producto.precio} €</p>
            <button className="mt-3 bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition">
                Añadir al carrito
            </button>
        </div>
    );
};

export default ProductCard;
