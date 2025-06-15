import React, { useState /* , useEffect */ } from 'react';
import axios from 'axios';
import type { Producto } from '../types/product';
// import type { Categoria } from '../types/category';

interface Props {
    onProductoCreado?: () => void;
}

const AgregarProductoForm: React.FC<Props> = ({ onProductoCreado }) => {
    const [form, setForm] = useState<Partial<Producto>>({
        nombre: '',
        descripcion: '',
        precio: 0,
        stock: 0,
    });

    // const [categorias, setCategorias] = useState<Categoria[]>([]);
    // const [selectedCategorias, setSelectedCategorias] = useState<string[]>([]);
    const [imagenes, setImagenes] = useState<File[]>([]);

    // 🔧 Cuando la API esté lista, descomenta este useEffect para cargar categorías
    /*
    useEffect(() => {
        axios.get(`${import.meta.env.VITE_API_URL}/Categorias`)
            .then(res => {
                if (Array.isArray(res.data)) {
                    setCategorias(res.data);
                } else {
                    console.error("Respuesta inesperada al cargar categorías", res.data);
                    setCategorias([]);
                }
            })
            .catch(err => {
                console.error("Error cargando categorías", err);
                setCategorias([]);
            });
    }, []);
    */

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: name === "precio" || name === "stock" ? Number(value) : value }));
    };

    // const handleCategoriaToggle = (id: string) => {
    //     setSelectedCategorias(prev =>
    //         prev.includes(id)
    //             ? prev.filter(cid => cid !== id)
    //             : [...prev, id]
    //     );
    // };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setImagenes(Array.from(e.target.files));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const formData = new FormData();
            formData.append("Producto.Nombre", form.nombre ?? "");
            formData.append("Producto.Descripcion", form.descripcion ?? "");
            formData.append("Producto.Precio", String(form.precio ?? 0));
            formData.append("Producto.Stock", String(form.stock ?? 0));

            // selectedCategorias.forEach((id, index) => {
            //     formData.append(`CategoriasIds[${index}]`, id);
            // });

            imagenes.forEach(file => {
                formData.append("Files", file);
            });

            await axios.post(`${import.meta.env.VITE_API_URL}/Productos`, formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });

            alert("Producto creado correctamente");
            setForm({ nombre: '', descripcion: '', precio: 0, stock: 0 });
            // setSelectedCategorias([]);
            setImagenes([]);
            if (onProductoCreado) onProductoCreado();
        } catch (error) {
            console.error("Error al agregar producto:", error);
            alert("Error al crear producto");
        }
    };

    return (
        <form onSubmit={handleSubmit} className="mb-5" encType="multipart/form-data">
            <h4 className="mb-3">Agregar nuevo producto</h4>
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

            {/* 
            <div className="mb-3">
                <label className="form-label">Categorías</label>
                <div className="d-flex flex-wrap">
                    {categorias.map(cat => (
                        <div key={cat.id} className="form-check me-3">
                            <input className="form-check-input" type="checkbox" id={cat.id} checked={selectedCategorias.includes(cat.id)} onChange={() => handleCategoriaToggle(cat.id)} />
                            <label className="form-check-label" htmlFor={cat.id}>{cat.nombre}</label>
                        </div>
                    ))}
                </div>
            </div>
            */}

            <button type="submit" className="btn btn-success">Guardar producto</button>
        </form>
    );
};

export default AgregarProductoForm;
