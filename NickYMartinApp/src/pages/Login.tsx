import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';

const Login: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useAuth();
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        login({ id: "1", name: "Nick", email: "nick@example.com" }); //esto es solo para hace la prueba, borrar despues 
        console.log({ email, password });
        // Aquí iría la llamada a la API cuando esté lista
    };
   


    return (
        <div className="container mt-5" style={{ maxWidth: '400px' }}>
            <h2 className="mb-4 text-center">Iniciar sesión</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label className="form-label">Correo electrónico</label>
                    <input type="email" className="form-control" required value={email} onChange={e => setEmail(e.target.value)} />
                </div>

                <div className="mb-3">
                    <label className="form-label">Contraseña</label>
                    <input type="password" className="form-control" required value={password} onChange={e => setPassword(e.target.value)} />
                </div>

                <button type="submit" className="btn btn-primary w-100">Entrar</button>
            </form>
        </div>
    );
};

export default Login;
