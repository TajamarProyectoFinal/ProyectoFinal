import React, { createContext, useContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import type { User } from "../types/user";

// Creamos el contexto
interface AuthContextType {
    user: User | null;
    token: string | null;
    login: (token: string) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Proveedor del contexto
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [token, setToken] = useState<string | null>(null);

    // Función para loguear y guardar token
    const login = (jwtToken: string) => {
        try {
            const decoded: any = jwtDecode(jwtToken);
            console.log(decoded)
            const newUser: User = {
                id: decoded.sub,
                name: decoded.name,
                email: decoded.email,
                phone: decoded.phone,
                role: decoded.role,
            };

            setUser(newUser);
            setToken(jwtToken);
            localStorage.setItem("token", jwtToken);
        } catch (error) {
            console.error("Token inválido:", error);
        }
    };

    // Cerrar sesión
    const logout = () => {
        setUser(null);
        setToken(null);
        localStorage.removeItem("token");
    };

    // Rehidratar usuario desde localStorage al cargar la app
    useEffect(() => {
        const storedToken = localStorage.getItem("token");
        if (storedToken) {
            login(storedToken);
        }
    }, []);

    return (
        <AuthContext.Provider value={{ user, token, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

// Hook para usar el contexto
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) throw new Error("useAuth debe usarse dentro de un AuthProvider");
    return context;
};
