import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { UsersDataSource } from '../services/UsersDataSource';
import type { UserLoginDto } from '../types/user';
import { useNavigate } from 'react-router-dom';

const usersApi = new UsersDataSource("https://localhost:7153/api/Users");

const Login: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useAuth();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        const loginPayload: UserLoginDto = { email, password };

        usersApi.UserLogin(loginPayload, (data, err) => {
            setLoading(false);

            if (err) {
                console.error(err);
                setError("Error al iniciar sesión. Verifica tus datos.");
                return;
            }

            if (data) {
                login(data);
                navigate("/usuario");
            }
        });
    };

    return (
        <div className="container mt-5" style={{ maxWidth: '400px' }}>
            <h2 className="mb-4 text-center">Iniciar sesión</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label className="form-label">Correo electrónico</label>
                    <input
                        type="email"
                        className="form-control"
                        required
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">Contraseña</label>
                    <input
                        type="password"
                        className="form-control"
                        required
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                    />
                </div>

                {error && (
                    <div className="alert alert-danger">{error}</div>
                )}

                <button type="submit" className="btn btn-primary w-100" disabled={loading}>
                    {loading ? "Cargando..." : "Entrar"}
                </button>
            </form>
        </div>
    );
};

export default Login;
