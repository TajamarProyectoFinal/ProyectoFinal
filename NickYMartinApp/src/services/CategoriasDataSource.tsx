import axios from "axios";
import type { Categoria } from "../types/category";

type ApiCallback<T> = (data: T | null, error?: any) => void;

export class CategoriasDataSource {
    private BASE_URL: string;

    constructor(base_url: string) {
        this.BASE_URL = base_url;
    }

    GetCategorias(callback: ApiCallback<Categoria[]>) {
        axios.get<Categoria[]>(this.BASE_URL)
            .then(response => callback(response.data))
            .catch(error => {
                console.error("Error cargando categorías:", error);
                callback(null, error);
            });
    }
}
