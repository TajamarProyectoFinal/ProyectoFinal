import axios from "axios";
import type { Method } from "axios";
import type { ProductosViewModel, ProductosFilters, Producto } from "../types/product";
import { SearchTypes } from "../types/SearchTypes";

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
        const formData = new FormData();
        formData.append("Producto.Nombre", producto.nombre ?? "");
        formData.append("Producto.Descripcion", producto.descripcion ?? "");
        formData.append("Producto.Precio", String(producto.precio ?? 0));
        formData.append("Producto.Stock", String(producto.stock ?? 0));

        categoriasIds.forEach((id, index) => {
            formData.append(`CategoriasIds[${index}]`, id);
        });

        files.forEach(file => {
            formData.append("Files", file);
        });

        const url = `${this.BASE_URL}`;
        this.SendRequest("post", url, callback, formData);
    }

    // ELIMINAR producto
    async DeleteProducto(
        id: string,
        callback: ApiCallback<boolean>
    ) {
        const url = `${this.BASE_URL}/${id}`;
        this.SendRequest("delete", url, callback);
    }

    // Método reutilizado
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
