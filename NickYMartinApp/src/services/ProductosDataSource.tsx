import axios from "axios";
import type { Method } from "axios";
import type { ProductosViewModel } from "../types/product";

type ApiCallback<T> = (data: T | null, error?: any) => void;

export class ProductosDataSource {
    private BASE_URL: string;

    constructor(base_url: string) {
        this.BASE_URL = base_url;
    }

    // Obtener productos paginados
    GetProductos(
        page: number,
        resultsPerPage: number,
        callback: ApiCallback<ProductosViewModel>
    ) {
        const params = new URLSearchParams({
            CurrentPage: String(page),
            ResultsPerPage: String(resultsPerPage),
        });

        const url = `${this.BASE_URL}?${params.toString()}`;
        this.SendRequest("get", url, callback);
    }

    // Otras funciones como GetOne, Store, Update, Delete...
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
            });
            callback(response.data);
        } catch (error) {
            console.error(`Error during ${method.toUpperCase()} to ${url}:`, error);
            callback(null, error);
        }
    }
}
