import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { UsersDataSource } from '../services/UsersDataSource';
import type { UserLoginDto } from '../types/user';

const usersApi = new UsersDataSource("https://localhost:7153/api/Users");

const Login: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useAuth();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<any>(null);

    const handleSubmit = (e: React.FormEvent) => {
        setLoading(true);
        setError(null);
        e.preventDefault();

        const loginPayload: UserLoginDto = {
            email: email,
            password: password
        };

        usersApi.UserLogin(loginPayload, (data, err) => {
            if (err) {
                setError(err);
                //Mostrar un mensaje de error
            } else if (data) {
                //TODO
                //Actualizar pagina con perfil de usuario
                console.log("sesion iniciada")
                console.log("data", data)
            }
            setLoading(false);
        })
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
