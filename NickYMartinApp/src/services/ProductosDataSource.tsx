import axios from "axios";
import type { Method } from "axios";
import type { ProductosViewModel, ProductosFilters } from "../types/product";
import { SearchTypes } from "../types/SearchTypes";

type ApiCallback<T> = (data: T | null, error?: any) => void;

export class ProductosDataSource {
    private BASE_URL: string;
    private filtros!: ProductosFilters;

    constructor(base_url: string) {
        this.BASE_URL = base_url;
    }


    // Obtener productos paginados
    GetData(
        page: number,
        resultsPerPage: number,
        callback: ApiCallback<ProductosViewModel>
    ) {
        

        const params = new URLSearchParams({
            currentPage: String(page),
            resultsPerPage: String(resultsPerPage),
            searchType: String(SearchTypes.List)
        });
        Object.entries(this.filtros).forEach(([key, value]) => {
            if (value !== undefined && value !== null) {
                params.append(`filters.${key}`, String(value));
            }
        });

        const url = `${this.BASE_URL}?${params.toString()}`;
        console.log("Enviando petición a:", url);
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
