import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { DireccionDataSource } from "../services/DireccionDataSource";
import type { Direccion } from "../types/Direccion";

// Define las props que el componente Direcciones puede recibir
interface DireccionesProps {
    // Callback que se ejecutará cuando se añada una nueva dirección.
    // Recibe la dirección completa que acaba de ser añadida.
    onAddressAdded?: (newAddress: Direccion) => void;
}

const Direcciones: React.FC<DireccionesProps> = ({ onAddressAdded }) => {
    const { user, token } = useAuth();
    const [direcciones, setDirecciones] = useState<Direccion[]>([]);
    const [form, setForm] = useState<Omit<Direccion, "idDireccion">>({
        idUsuario: user?.id,
        domicilio: "",
        codigoPostal: 0,
        ciudad: "",
        provincia: "",
        pais: "",
        principal: false,
    });

    const api = new DireccionDataSource(token!);

    const cargarDirecciones = async () => {
        if (!user) return;
        const data = await api.obtenerDirecciones(user.id);
        setDirecciones(data);
    };

    useEffect(() => {
        cargarDirecciones();
    }, [user, token]); // Añadimos 'user' y 'token' a las dependencias del useEffect

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = e.target;
        setForm(prev => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }));
    };

    const agregarDireccion = async () => {
        if (!user) return;
        // La API de agregarDireccion debería devolver la dirección completa,
        // incluyendo el idDireccion generado por el backend.
        const newAddress = await api.agregarDireccion({ ...form, idUsuario: user.id });

        // Recargamos todas las direcciones para actualizar la lista en la UI
        await cargarDirecciones();

        // Limpiamos el formulario después de agregar la dirección
        setForm({
            idUsuario: user.id,
            domicilio: "",
            codigoPostal: 0,
            ciudad: "",
            provincia: "",
            pais: "",
            principal: false,
        });

        // Si se proporcionó un callback, lo llamamos con la nueva dirección
        if (onAddressAdded) {
            onAddressAdded(newAddress);
        }
    };

    const eliminarDireccion = async (idDireccion: string) => {
        await api.eliminarDireccion(idDireccion);
        await cargarDirecciones();
    };

    return (
        <div className="mt-4">
            <h4>Direcciones</h4>
            <ul className="list-group mb-3">
                {direcciones.map(dir => (
                    <li className="list-group-item d-flex justify-content-between align-items-center" key={dir.idDireccion}>
                        <div>
                            {dir.domicilio}, {dir.ciudad}, {dir.provincia}, {dir.pais} - CP {dir.codigoPostal}
                            {dir.principal && <span className="badge bg-primary ms-2">Principal</span>}
                        </div>
                        <button
                            className="btn btn-danger btn-sm"
                            onClick={() => {
                                if (window.confirm("¿Estás seguro de que deseas eliminar esta dirección?")) {
                                    eliminarDireccion(dir.idDireccion!);
                                }
                            }}
                        >
                            Eliminar
                        </button>
                    </li>
                ))}
            </ul>

            <h5>Agregar nueva dirección</h5>
            <div className="row g-2">
                <div className="col-md-6">
                    <input className="form-control" placeholder="Domicilio" name="domicilio" value={form.domicilio} onChange={handleChange} />
                </div>
                <div className="col-md-6">
                    <input className="form-control" placeholder="Ciudad" name="ciudad" value={form.ciudad} onChange={handleChange} />
                </div>
                <div className="col-md-6">
                    <input className="form-control" placeholder="Provincia" name="provincia" value={form.provincia} onChange={handleChange} />
                </div>
                <div className="col-md-6">
                    <input className="form-control" placeholder="País" name="pais" value={form.pais} onChange={handleChange} />
                </div>
                <div className="col-md-6">
                    {/* Asegúrate de manejar el valor de codigoPostal para evitar "0" inicial */}
                    <input type="number" className="form-control" placeholder="Código Postal" name="codigoPostal" value={form.codigoPostal === 0 ? "" : form.codigoPostal} onChange={handleChange} />
                </div>
                <div className="col-md-6 d-flex align-items-center">
                    <label className="form-check-label me-2">¿Principal?</label>
                    <input type="checkbox" name="principal" checked={form.principal} onChange={handleChange} />
                </div>
                <div className="col-12">
                    <button className="btn btn-success w-100" onClick={agregarDireccion}>Agregar dirección</button>
                </div>
            </div>
        </div>
    );
};

export default Direcciones;