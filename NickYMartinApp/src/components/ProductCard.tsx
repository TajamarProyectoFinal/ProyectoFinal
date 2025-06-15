// src/components/ProductCard.tsx
import React from 'react';
import type { Producto } from '../types/product';

interface ProductCardProps {
    producto: Producto;
}

const ProductCard: React.FC<ProductCardProps> = ({ producto }) => {
    return (
        <div className="card h-100"> 
            {producto.mainImagenUrl && (
                <img src={producto.mainImagenUrl} className="card-img-top" alt={producto.nombre} style={{ maxHeight: '200px', objectFit: 'cover' }} />
            )}
            <div className="card-body d-flex flex-column">
                <h5 className="card-title">{producto.nombre}</h5>
                {producto.descripcion && (
                    <p className="card-text">{producto.descripcion}...</p>
                )}
                <p className="card-text mt-auto">
                    <strong>Precio: {producto.precio.toFixed(2)}€</strong>
                </p>
                <button className="btn btn-primary mt-2">
                    Añadir al carrito
                </button>
            </div>
        </div>
    );
};

export default ProductCard;