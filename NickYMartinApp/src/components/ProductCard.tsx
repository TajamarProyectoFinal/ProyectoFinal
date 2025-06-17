// src/components/ProductCard.tsx
import React, { use, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import type { Producto } from '../types/product';
import { CarritoDataSource } from '../services/CarritoDataSource';
import { useAuth } from '../context/AuthContext';

interface ProductCardProps {
    producto: Producto;
    mainImage: string;
    onDelete?: (id: string) => void;
}

const carritoDataSource = new CarritoDataSource("https://localhost:7153/api/Carrito")

const ProductCard: React.FC<ProductCardProps> = ({ producto, mainImage, onDelete }) => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<any>(null);
    const { user } = useAuth(); 

    const handleCardClick = () => {
        navigate(`/productos/${producto.idProducto}`);
    };

    const handleAddCarritoItemClick = () => {
        if (user) {
            carritoDataSource.CreateOrAddItemToCarrito(user?.id, producto.idProducto, 1, mainImage, (data, err) => {
                if (err) {
                    setError(err);
                } else if (data) {
                    console.log("Item agregado al carrito")
                }
                setLoading(false);
            }
            );
        }
    }

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
                        handleAddCarritoItemClick();
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
