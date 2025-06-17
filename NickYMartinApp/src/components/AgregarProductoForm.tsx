import React, { useState, useEffect } from 'react';
import type { Producto } from '../types/product';
import type { Categoria } from '../types/category';
import { CategoriasDataSource } from '../services/CategoriasDataSource';
import { ProductosDataSource } from '../services/ProductosDataSource';
import { motion } from 'framer-motion';

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
        <motion.form
            onSubmit={handleSubmit}
            encType="multipart/form-data"
            className="animated-form"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
        >
            <h5 className="form-title mb-4">
                {modoEdicion ? `Editando: ${form.nombre}` : 'Agregar nuevo producto'}
            </h5>

            <div className="mb-3">
                <label className="form-label">Nombre</label>
                <input type="text" className="form-control custom-input" name="nombre" value={form.nombre} onChange={handleChange} required />
            </div>

            <div className="mb-3">
                <label className="form-label">Descripción</label>
                <textarea className="form-control custom-input" name="descripcion" value={form.descripcion} onChange={handleChange} />
            </div>

            <div className="mb-3">
                <label className="form-label">Precio (€)</label>
                <input type="number" className="form-control custom-input" name="precio" value={form.precio} onChange={handleChange} required />
            </div>

            <div className="mb-3">
                <label className="form-label">Stock</label>
                <input type="number" className="form-control custom-input" name="stock" value={form.stock} onChange={handleChange} required />
            </div>

            <div className="mb-3">
                <label className="form-label">Imágenes</label>
                <input type="file" multiple className="form-control" onChange={handleFileChange} />
            </div>

            <div className="mb-3">
                <label className="form-label">Categorías</label>
                <select
                    multiple
                    className="form-control custom-select"
                    value={selectedCategorias}
                    onChange={(e) => {
                        const options = Array.from(e.target.selectedOptions).map(opt => opt.value);
                        setSelectedCategorias(options);
                    }}
                >
                    {categorias.map(cat => (
                        <option key={cat.idCategoria} value={cat.idCategoria}>
                            {cat.nombre}
                        </option>
                    ))}
                </select>
                <small className="form-text text-muted">Mantén Ctrl o Cmd presionado para seleccionar varias</small>
            </div>


            <div className="modal-footer d-flex justify-content-end gap-2">
                <button type="button" className="btn btn-cancel" onClick={onClose}>Cancelar</button>
                <button type="submit" className="btn btn-save">
                    {modoEdicion ? 'Actualizar producto' : 'Crear producto'}
                </button>
            </div>
        </motion.form>
    );
};

export default AgregarProductoForm;
