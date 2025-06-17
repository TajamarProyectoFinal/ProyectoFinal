// src/components/ProductCard.tsx
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import type { Producto } from '../types/product';

interface ProductCardProps {
    producto: Producto;
    mainImage: string;
    onDelete?: (id: string) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ producto, mainImage, onDelete }) => {
    const navigate = useNavigate();

    const handleCardClick = () => {
        navigate(`/productos/${producto.idProducto}`);
    };

    return (
        <div className="card h-100" style={{ cursor: 'pointer' }} onClick={handleCardClick}>
            {mainImage && (
                <img
                    src={mainImage}
                    className="card-img-top"
                    alt={producto.nombre}
                    style={{ maxHeight: '200px', objectFit: 'cover' }}
                />
            )}
            <div className="card-body d-flex flex-column">
                <h5 className="card-title">{producto.nombre}</h5>
                {producto.descripcion && (
                    <p className="card-text">{producto.descripcion}...</p>
                )}
                <p className="card-text mt-auto">
                    <strong>Precio: {producto.precio.toFixed(2)}€</strong>
                </p>

                <button
                    className="btn btn-primary mt-2"
                    onClick={(e) => {
                        e.stopPropagation();
                        e.preventDefault();
                        // TODO: lógica para añadir al carrito
                        alert("Producto añadido al carrito");
                    }}
                >
                    Añadir al carrito
                </button>

                {onDelete && (
                    <button
                        className="btn btn-danger mt-2"
                        onClick={(e) => {
                            e.stopPropagation();
                            e.preventDefault();
                            if (confirm("¿Estás seguro de que quieres borrar este producto?")) {
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
