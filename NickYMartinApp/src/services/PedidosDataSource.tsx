import axios from "axios";
import type { Method } from "axios";
import type { Carrito } from "../types/carrito";

type ApiCallback<T> = (data: T | null, error?: any) => void;

export class PedidosDataSource {
    private BASE_URL: string;

    constructor(base_url: string) {
        this.BASE_URL = base_url;
    }

    CreateOrAddItemToCarrito(
        userId: string,
        idProducto: string,
        cantidad: number,
        productoMainImageUrl: string,
        callback: ApiCallback<string>
    ) {
        const formData = new FormData();
        formData.append("userId", userId);
        formData.append("idProducto", idProducto);
        formData.append("cantidad", String(cantidad) ?? "0");
        formData.append("productoMainImageUrl", productoMainImageUrl);

        const url = `${this.BASE_URL}`;
        this.SendRequest("post", url, callback, formData, { 'Content-Type': 'multipart/form-data' });
    }

    getUserCarrito(
        userId: string,
        callback: ApiCallback<Carrito>
    ) {
        const url = `${this.BASE_URL}/${userId}`;
        this.SendRequest("get", url, callback);
    }

    private async SendRequest<T>(
        method: Method,
        url: string,
        callback: ApiCallback<T>,
        data: any = null,
        headers: any = undefined
    ) {
        try {
            const response = await axios.request<T>({
                method,
                url,
                data,
                headers: headers,
            });
            callback(response.data);
        } catch (error) {
            console.error(`Error during ${method.toUpperCase()} to ${url}:`, error);
            callback(null, error);
        }
    }
}
