import React, { useState } from 'react';

const Register: React.FC = () => {
    const [form, setForm] = useState({
        name: '',
        email: '',
        phone: '',
        password: '',
        confirmPassword: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (form.password !== form.confirmPassword) {
            alert("Las contraseñas no coinciden");
            return;
        }

        console.log(form); // Aquí irá la llamada a tu API
    };

    return (
        <div className="container mt-5" style={{ maxWidth: '500px' }}>
            <h2 className="mb-4 text-center">Crear cuenta</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label className="form-label">Nombre completo</label>
                    <input type="text" name="name" className="form-control" required value={form.name} onChange={handleChange} />
                </div>
                <div className="mb-3">
                    <label className="form-label">Correo electrónico</label>
                    <input type="email" name="email" className="form-control" required value={form.email} onChange={handleChange} />
                </div>
                <div className="mb-3">
                    <label className="form-label">Teléfono</label>
                    <input type="tel" name="phone" className="form-control" value={form.phone} onChange={handleChange} />
                </div>
                <div className="mb-3">
                    <label className="form-label">Contraseña</label>
                    <input type="password" name="password" className="form-control" required value={form.password} onChange={handleChange} />
                </div>
                <div className="mb-3">
                    <label className="form-label">Confirmar contraseña</label>
                    <input type="password" name="confirmPassword" className="form-control" required value={form.confirmPassword} onChange={handleChange} />
                </div>

                <button type="submit" className="btn btn-success w-100">Registrarse</button>
            </form>
        </div>
    );
};

export default Register;
