import React, { useState, useEffect } from 'react';
import type { Producto } from '../types/product';
import type { Categoria } from '../types/category';
import { CategoriasDataSource } from '../services/CategoriasDataSource';
import { ProductosDataSource } from '../services/ProductosDataSource';
import { Modal } from 'bootstrap';


interface Props {
    onClose: () => void;
    onProductoCreado?: () => void;
}

const AgregarProductoForm: React.FC<Props> = ({ onClose, onProductoCreado }) => {
    const [form, setForm] = useState<Partial<Producto>>({
        nombre: '',
        descripcion: '',
        precio: 0,
        stock: 0,
    });

    const [categorias, setCategorias] = useState<Categoria[]>([]);
    const [selectedCategorias, setSelectedCategorias] = useState<string[]>([]);
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

        try {
            const productosApi = new ProductosDataSource('https://localhost:7153/api/Productos');
            await productosApi.AddProducto(form, selectedCategorias, imagenes, (data, err) => {
                if (err) throw err;
            });

            alert("Producto creado correctamente");
            setForm({ nombre: '', descripcion: '', precio: 0, stock: 0 });
            setSelectedCategorias([]);
            setImagenes([]);

            if (onProductoCreado) onProductoCreado();

            // Cierra el modal manualmente usando Bootstrap API
            const modalEl = document.getElementById('modalAgregarProducto');
            if (modalEl) {
                const modal = Modal.getInstance(modalEl);

                modal?.hide();
                document.body.classList.remove('modal-open');
                document.querySelector('.modal-backdrop')?.remove();

            }
        } catch (error) {
            console.error("Error al agregar producto:", error);
            alert("Error al crear producto");
        }
    };

    return (
        <form onSubmit={handleSubmit} encType="multipart/form-data">
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
                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                <button type="submit" className="btn btn-success">Guardar producto</button>
            </div>
        </form>
    );
};

export default AgregarProductoForm;
