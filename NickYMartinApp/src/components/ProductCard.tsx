// src/components/ProductCard.tsx
import React from 'react';
import type { Producto } from '../types/product';

interface ProductCardProps {
    producto: Producto;
    mainImage: string;
    onDelete?: (id: string) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ producto, mainImage, onDelete }) => {
    return (
        <div className="card h-100">
            {mainImage && (
                <img src={mainImage} className="card-img-top" alt={producto.nombre} style={{ maxHeight: '200px', objectFit: 'cover' }} />
            )}
            <div className="card-body d-flex flex-column">
                <h5 className="card-title">{producto.nombre}</h5>
                {producto.descripcion && (
                    <p className="card-text">{producto.descripcion}...</p>
                )}
                <p className="card-text mt-auto">
                    <strong>Precio: {producto.precio.toFixed(2)}€</strong>
                </p>
                <button className="btn btn-primary mt-2">Añadir al carrito</button>

                {onDelete && (
                    <button
                        className="btn btn-danger mt-2"
                        onClick={() => {
                            if (confirm("¿Estás seguro de que quieres borrar este producto?")) {
                                console.log(producto.idProducto);
                                onDelete(producto.idProducto);
                            }
                        }}
                    >
                        Borrar
                    </button>
                )}
            </div>
        </div>
    );
};

export default ProductCard;
