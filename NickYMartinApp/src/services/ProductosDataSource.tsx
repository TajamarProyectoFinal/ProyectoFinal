import axios from "axios";
import type { Method } from "axios";
import type { ProductosViewModel, ProductosFilters, Producto } from "../types/product";
import { SearchTypes } from "../types/SearchTypes";
import type { ProductoDTO } from "../types/productoDTO";
import type { ActionTypes } from "../types/ActionTypes";

type ApiCallback<T> = (data: T | null, error?: any) => void;

export class ProductosDataSource {
    private BASE_URL: string;

    constructor(base_url: string) {
        this.BASE_URL = base_url;
    }

    GetData(
        page: number,
        resultsPerPage: number,
        filtros: ProductosFilters,
        searchType: SearchTypes = SearchTypes.List,
        callback: ApiCallback<ProductosViewModel>
    ) {
        const params = new URLSearchParams({
            currentPage: String(page),
            resultsPerPage: String(resultsPerPage),
            searchType: String(searchType),
        });

        Object.entries(filtros).forEach(([key, value]) => {
            if (value !== undefined && value !== null) {
                params.append(`filters.${key}`, String(value));
            }
        });

        const url = `${this.BASE_URL}?${params.toString()}`;
        this.SendRequest("get", url, callback);
    }

    // AGREGAR producto
    async AddProducto(
        producto: Partial<Producto>,
        categoriasIds: string[],
        files: File[] = [],
        callback: ApiCallback<any>
    ) {
        const formData = this.BuildFormData(producto, categoriasIds, files);
        const url = `${this.BASE_URL}`;
        this.SendRequest("post", url, callback, formData);
    }

    // EDITAR producto
    async UpdateProducto(
        id: string,
        producto: Partial<Producto>,
        categoriasIds: string[],
        files: File[] = [],
        callback: ApiCallback<any>
    ) {
        const formData = this.BuildFormData(producto, categoriasIds, files);
        const url = `${this.BASE_URL}/${id}`;
        this.SendRequest("put", url, callback, formData);
    }

    // ELIMINAR producto
    async DeleteProducto(
        id: string,
        callback: ApiCallback<boolean>
    ) {
        const url = `${this.BASE_URL}/${id}`;
        this.SendRequest("delete", url, callback);
    }

    //Detalles de productos
    GetProductoById(id: string, ActionType: ActionTypes.List, callback: ApiCallback<ProductoDTO>) {
        const url = `${this.BASE_URL}/${id}`;
        this.SendRequest("get", url, callback);
    }
    // Utilidades
    private BuildFormData(
        producto: Partial<Producto>,
        categoriasIds: string[],
        files: File[]
    ): FormData {
        const formData = new FormData();
        formData.append("nombre", producto.nombre ?? "");
        formData.append("descripcion", producto.descripcion ?? "");
        formData.append("precio", String(producto.precio ?? 0));
        formData.append("stock", String(producto.stock ?? 0));


        categoriasIds.forEach(id => {
            formData.append("categoriasIds", id); // importante: sin índices
        });

        files.forEach(file => {
            formData.append("Files", file);
        });

        return formData;
    }

    private async SendRequest<T>(
        method: Method,
        url: string,
        callback: ApiCallback<T>,
        data: any = null
    ) {
        try {
            const response = await axios.request<T>({
                method,
                url,
                data,
                headers: data instanceof FormData ? { 'Content-Type': 'multipart/form-data' } : undefined,
            });
            callback(response.data);
        } catch (error) {
            console.error(`Error during ${method.toUpperCase()} to ${url}:`, error);
            callback(null, error);
        }
    }
}
