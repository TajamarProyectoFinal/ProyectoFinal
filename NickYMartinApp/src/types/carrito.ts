import type { Producto } from './product';

export interface Carrito {
    idCarrito: string; 
    idUsuario: string; 
    fechaCreacion: string; 
    fechaActualizacion: string; 
    itemsCarrito?: ItemCarrito[]; 
    total: number;
}

export interface ItemCarrito {
    idItemCarrito: string; 
    idCarrito: string;     
    carrito?: Carrito;    

    idProducto: string;
    producto?: Producto;  

    mainImageUrl?: string;
    cantidad: number;      
    precioUnitario: number; 
    subtotal: number;       

    fechaCreacion: string; 
}