import React, { useState, useEffect } from 'react';
import type { Producto } from '../types/product';
import type { Categoria } from '../types/category';
import { CategoriasDataSource } from '../services/CategoriasDataSource';
import { ProductosDataSource } from '../services/ProductosDataSource';
import { ActionTypes } from '../types/ActionTypes';

interface Props {
    onClose: () => void;
    onProductoGuardado?: () => void;
    modoEdicion?: boolean;
    productoInicial?: Partial<Producto>;
    categoriasIniciales?: string[];
    productoId?: string;
}

const AgregarProductoForm: React.FC<Props> = ({
    onClose,
    onProductoGuardado,
    modoEdicion = false,
    productoInicial,
    categoriasIniciales = [],
    productoId
}) => {
    const [form, setForm] = useState<Partial<Producto>>(productoInicial || {
        nombre: '',
        descripcion: '',
        precio: 0,
        stock: 0,
    });

    const [categorias, setCategorias] = useState<Categoria[]>([]);
    const [selectedCategorias, setSelectedCategorias] = useState<string[]>(categoriasIniciales);
    const [imagenes, setImagenes] = useState<File[]>([]);

    useEffect(() => {
        const categoriasApi = new CategoriasDataSource(`https://localhost:7153/api/Categorias`);
        categoriasApi.GetCategorias((data, err) => {
            if (err || !data) {
                console.error("Error cargando categorías", err);
                setCategorias([]);
            } else {
                setCategorias(data);
            }
        });
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setForm(prev => ({
            ...prev,
            [name]: name === "precio" || name === "stock" ? Number(value) : value
        }));
    };

    const handleCategoriaToggle = (id: string) => {
        setSelectedCategorias(prev =>
            prev.includes(id)
                ? prev.filter(cid => cid !== id)
                : [...prev, id]
        );
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setImagenes(Array.from(e.target.files));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const productosApi = new ProductosDataSource('https://localhost:7153/api/Productos');

        try {
            if (modoEdicion && productoId) {
                await productosApi.UpdateProducto(productoId, form, selectedCategorias, imagenes, (data, err) => {
                    if (err) throw err;
                });
                alert("Producto actualizado correctamente");
            } else {
                await productosApi.AddProducto(form, selectedCategorias, imagenes, (data, err) => {
                    if (err) throw err;
                });
                alert("Producto creado correctamente");
            }

            if (onProductoGuardado) onProductoGuardado();
            onClose();
        } catch (error) {
            console.error("Error al guardar producto:", error);
            alert("Error al guardar producto");
        }
    };

    return (
        <form onSubmit={handleSubmit} encType="multipart/form-data">
            <h5 className="mb-3">
                {/*{modoEdicion ? `Editando: ${form.nombre}` : 'Agregar nuevo producto'}*/}
            </h5>

            <div className="mb-3">
                <label className="form-label">Nombre</label>
                <input type="text" className="form-control" name="nombre" value={form.nombre} onChange={handleChange} required />
            </div>

            <div className="mb-3">
                <label className="form-label">Descripción</label>
                <textarea className="form-control" name="descripcion" value={form.descripcion} onChange={handleChange} />
            </div>

            <div className="mb-3">
                <label className="form-label">Precio (€)</label>
                <input type="number" className="form-control" name="precio" value={form.precio} onChange={handleChange} required />
            </div>

            <div className="mb-3">
                <label className="form-label">Stock</label>
                <input type="number" className="form-control" name="stock" value={form.stock} onChange={handleChange} required />
            </div>

            <div className="mb-3">
                <label className="form-label">Imágenes</label>
                <input type="file" multiple className="form-control" onChange={handleFileChange} />
            </div>

            <div className="mb-3">
                <label className="form-label">Categorías</label>
                <div className="d-flex flex-wrap">
                    {categorias.map(cat => (
                        <div key={cat.idCategoria} className="form-check me-3">
                            <input
                                className="form-check-input"
                                type="checkbox"
                                id={cat.idCategoria}
                                checked={selectedCategorias.includes(cat.idCategoria)}
                                onChange={() => handleCategoriaToggle(cat.idCategoria)}
                            />
                            <label className="form-check-label" htmlFor={cat.idCategoria}>
                                {cat.nombre}
                            </label>
                        </div>
                    ))}
                </div>
            </div>

            <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={onClose}>Cancelar</button>
                <button type="submit" className="btn btn-success">
                    {modoEdicion ? 'Actualizar producto' : 'Crear producto'}
                </button>
            </div>
        </form>
    );
};

export default AgregarProductoForm;
