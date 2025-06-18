// src/pages/PagoResultado.tsx
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { EstadoPago } from "../types/EstadoPago";
import { FiCheckCircle, FiXCircle, FiAlertTriangle, FiHelpCircle } from "react-icons/fi";
import "../App.css"; // Asegúrate de que los estilos estén cargados

const PagoResultado: React.FC = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const estadoPago = new URLSearchParams(location.search).get("estado");

    const renderContenido = () => {
        switch (estadoPago) {
            case EstadoPago.PENDIENTE:
                return {
                    icono: <FiAlertTriangle size={48} color="#f59e0b" />,
                    titulo: "Tu pago está pendiente",
                    mensaje: "Estamos esperando la confirmación. Te notificaremos en cuanto se procese.",
                    clase: "alert-warning"
                };
            case EstadoPago.PAGADO:
                return {
                    icono: <FiCheckCircle size={48} color="#22c55e" />,
                    titulo: "¡Pago realizado con éxito!",
                    mensaje: "Gracias por tu compra. Te enviaremos los detalles por correo.",
                    clase: "alert-success"
                };
            case EstadoPago.RECHAZADO:
                return {
                    icono: <FiXCircle size={48} color="#ef4444" />,
                    titulo: "Tu pago fue rechazado",
                    mensaje: "Intenta con otro método o contacta a soporte.",
                    clase: "alert-danger"
                };
            default:
                return {
                    icono: <FiHelpCircle size={48} color="#6b7280" />,
                    titulo: "Estado de pago desconocido",
                    mensaje: "Hubo un problema al recuperar el estado de tu pago.",
                    clase: "alert-secondary"
                };
        }
    };

    const { icono, titulo, mensaje, clase } = renderContenido();

    return (
        <div className="container mt-5 animated-form">
            <div className={`alert text-center ${clase} p-5`} style={{
                borderRadius: "var(--radius)",
                boxShadow: "var(--shadow)",
                backgroundColor: "white"
            }}>
                <div className="mb-3">{icono}</div>
                <h2 className="form-title mb-3">{titulo}</h2>
                <p className="text-muted">{mensaje}</p>
                <button className="btn btn-primary mt-4" onClick={() => navigate("/")}>
                    Volver al inicio
                </button>
            </div>
        </div>
    );
};

export default PagoResultado;
