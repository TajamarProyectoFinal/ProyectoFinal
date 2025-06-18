import type { Producto } from "./product";

export interface Pedido {
    idPedido: string;
    numero: number;
    idUsuario?: string; 
    idDireccion: string;
    fechaCreacion: string;
    estado?: string;
    total: number;
    detallesPedidos?: DetallesPedidos[];
}

export interface DetallesPedidos {
    idDetalle: string;
    idProducto: string;
    producto?: Producto;
    cantidad: number;
    precioUnitario: number;
    subtotal: number;
}