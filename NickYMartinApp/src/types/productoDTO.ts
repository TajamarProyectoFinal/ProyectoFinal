import type { ActionTypes } from './ActionTypes';
import type { Categoria } from './category';
import type { MultimediaProducto, Producto } from './product';

export interface ProductoDTO {
    producto: Producto;
    categoriasIds: string[];
    categorias?: Categoria[];
    multimediasProducto?: MultimediaProducto[];
    files?: File[];
    action?: ActionTypes;
}
