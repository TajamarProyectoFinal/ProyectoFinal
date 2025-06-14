import axios from "axios";
import type { AxiosRequestConfig, Method } from "axios";


// Callback tipado: recibe datos de tipo T o error
type ApiCallback<T> = (data: T | null, error?: any) => void;

export class ResRestDataSource<T> {
    private BASE_URL: string;

    constructor(base_url: string) {
        this.BASE_URL = base_url;
    }

    // Obtener todos los productos
    GetProducts(callback: ApiCallback<T[]>) {
        this.SendRequest("get", this.BASE_URL, callback);
    }

    // Obtener uno por ID
    GetOneProduct(id: number | string, callback: ApiCallback<T>) {
        this.SendRequest("get", `${this.BASE_URL}/${id}`, callback);
    }

    // Crear un nuevo producto
    Store(data: T, callback: ApiCallback<T>) {
        const productToSave = { ...data } as any;

        if (!productToSave.id) {
            delete productToSave.id;
        }

        this.SendRequest("post", this.BASE_URL, callback, productToSave);
    }

    // Actualizar producto
    Update(data: T & { id: number | string }, callback: ApiCallback<T>) {
        this.SendRequest("put", `${this.BASE_URL}/${data.id}`, callback, data);
    }

    // Eliminar producto
    Delete(id: number | string, callback: ApiCallback<null>) {
        this.SendRequest("delete", `${this.BASE_URL}/${id}`, callback);
    }

    // Lógica común de request
    private async SendRequest(
        method: Method,
        url: string,
        callback: ApiCallback<any>,
        data: any = null
    ) {
        try {
            const config: AxiosRequestConfig = {
                method,
                url,
                data,
            };

            const response = await axios.request(config);
            callback(response.data);
        } catch (error) {
            console.error(`Error during ${method.toUpperCase()} request to ${url}:`, error);
            callback(null, error);
        }
    }
}
