// src/context/CarritoContext.tsx
import React, { createContext, useContext, useEffect, useState } from 'react';
import { CarritoDataSource } from '../services/CarritoDataSource';
import { useAuth } from './AuthContext';

interface CarritoContextType {
    totalItems: number;
    refreshCarrito: () => void;
}

const CarritoContext = createContext<CarritoContextType>({
    totalItems: 0,
    refreshCarrito: () => { },
});

export const useCarritoContext = () => useContext(CarritoContext);

export const CarritoProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [totalItems, setTotalItems] = useState(0);
    const { user } = useAuth();

    const carritoDataSource = new CarritoDataSource("https://localhost:7153/api/Carrito");

    const refreshCarrito = () => {
        if (!user) {
            setTotalItems(0);
            return;
        }

        carritoDataSource.getUserCarrito(user.id, (data) => {
            if (data?.itemsCarrito) {
                const total = data.itemsCarrito.reduce((sum, item) => sum + item.cantidad, 0);
                setTotalItems(total);
            } else {
                setTotalItems(0);
            }
        });
    };

    useEffect(() => {
        refreshCarrito();
    }, [user]);

    return (
        <CarritoContext.Provider value={{ totalItems, refreshCarrito }}>
            {children}
        </CarritoContext.Provider>
    );
};
