import type {Categoria} from"./category"

export interface Producto {
    idProducto: string;
    nombre: string;
    descripcion: string;
    mainImagenUrl?: string;
    mainTrailerUrl?: string;
    precio: number;
    stock: number;
    fechaCreacion: string;
    fechaActualizacion: string;
}

export interface ProductosViewModel {
    productos: ProductosCategorias[]; // asumiendo que ProductoCategoriasViewModel ? Producto
    filters?: ProductosFilters;
    searchTypes: string;
    currentPage: number;
    resultsPerPage: number;
    totalResults: number;
}

export interface ProductosFilters {
    nombre?: string;
    descripcion?: string;
    precio?: number;
    stock?: number;
    fechaCreacion?: string;
    fechaActualizacion?: string;
}
export interface ProductosCategorias {
    producto: Producto; // asumiendo que ProductoCategoriasViewModel ? Producto
    categorias?: Categoria[];
    imagen: string;
}