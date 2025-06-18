import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import type { ProductoDTO } from '../types/productoDTO';
import { CarritoDataSource } from '../services/CarritoDataSource';
import { ProductosDataSource } from '../services/ProductosDataSource';
import { useAuth } from '../context/AuthContext';
import { useCarritoContext } from '../context/CarritoContext';
import AgregarProductoForm from './AgregarProductoForm';
import { motion } from 'framer-motion';
import { ActionTypes } from '../types/ActionTypes';
import type { Producto } from '../types/product';
import { FiEdit, FiShoppingCart, FiTrash2 } from 'react-icons/fi';

interface ProductCardProps {
    producto: Producto;
    mainImage: string;
    onDelete?: (id: string) => void;
}

const carritoDataSource = new CarritoDataSource("https://localhost:7153/api/Carrito");
const productosApi = new ProductosDataSource("https://localhost:7153/api/Productos");

const ProductCard: React.FC<ProductCardProps> = ({ producto, mainImage, onDelete }) => {
    const navigate = useNavigate();
    const { user } = useAuth();
    const { refreshCarrito } = useCarritoContext();
    const isAdmin = user?.role === "Admin";

    const [modalVisible, setModalVisible] = useState(false);
    const [productoDTO, setProductoDTO] = useState<ProductoDTO | null>(null);

    const handleNavigate = () => navigate(`/productos/${producto.idProducto}`);

    const handleAddCarrito = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (!user) {
            navigate('/login');
            return;
        }

        carritoDataSource.CreateOrAddItemToCarrito(
            user.id,
            producto.idProducto,
            1,
            mainImage,
            () => {
                refreshCarrito();
            }
        );
    };

    const handleDelete = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (confirm("¿Seguro que deseas eliminar este producto?")) {
            onDelete?.(producto.idProducto);
        }
    };

    const handleEditClick = async (e: React.MouseEvent) => {
        e.stopPropagation();
        productosApi.GetProductoById(producto.idProducto, ActionTypes.List, (data, err) => {
            if (!err && data) {
                setProductoDTO(data);
                setModalVisible(true);
            } else {
                console.error("No se pudo cargar el producto para editar");
            }
        });
    };

    return (
        <>
            <motion.div
                className="card h-100 product-card shadow-sm"
                onClick={handleNavigate}
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
                style={{ cursor: 'pointer' }}
            >
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
                        <p className="card-text text-muted">{producto.descripcion}...</p>
                    )}
                    <p className="card-text mt-auto">
                        <strong>Precio: {producto.precio.toFixed(2)}€</strong>
                    </p>

                    <div className="mt-3 d-flex flex-wrap gap-2">
                        <button className="btn btn-cart" onClick={handleAddCarrito}>
                            <FiShoppingCart size={16} />
                            Añadir
                        </button>

                        {isAdmin && (
                            <>
                                <button className="btn btn-edit" onClick={handleEditClick}>
                                    <FiEdit size={16} />
                                    Editar
                                </button>
                                {onDelete && (
                                    <button className="btn btn-delete" onClick={handleDelete}>
                                        <FiTrash2 size={16} />
                                        Borrar
                                    </button>
                                )}
                            </>
                        )}
                    </div>
                </div>
            </motion.div>

            {modalVisible && productoDTO && (
                <div className="modal fade show d-block" tabIndex={-1} style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
                    <div className="modal-dialog modal-lg">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Editando {productoDTO.producto.nombre}</h5>
                                <button type="button" className="btn-close" onClick={() => setModalVisible(false)}></button>
                            </div>
                            <div className="modal-body">
                                <AgregarProductoForm
                                    onClose={() => setModalVisible(false)}
                                    onProductoGuardado={() => setModalVisible(false)}
                                    modoEdicion={true}
                                    productoInicial={productoDTO.producto}
                                    productoId={productoDTO.producto.idProducto}
                                    categoriasIniciales={productoDTO.categoriasIds ?? []}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default ProductCard;
