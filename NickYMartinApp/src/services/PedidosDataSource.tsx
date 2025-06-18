import axios from "axios";
import type { Method } from "axios";
import type { Pedido } from "../types/pedido";

type ApiCallback<T> = (data: T | null, error?: any) => void;

export class PedidosDataSource {
    private BASE_URL: string;

    constructor(base_url: string) {
        this.BASE_URL = base_url;
    }

    AddPedido(
        userId: string,
        idDireccion: string,
        callback: ApiCallback<Pedido>
    ) {
        const formData = new FormData();
        formData.append("userId", userId);
        formData.append("idDireccion", idDireccion);

        const url = `${this.BASE_URL}`;
        this.SendRequest("post", url, callback, formData, { 'Content-Type': 'multipart/form-data' });
    }

    GetUserPedidos(
        userId: string,
        callback: ApiCallback<Pedido[]>
    ) {
        const params = new URLSearchParams({
            userId: userId,
        });

        const url = `${this.BASE_URL}?/${params.toString()}`;
        this.SendRequest("get", url, callback);
    }

    PedidoDetalles(
        idPedido: string,
        callback: ApiCallback<Pedido>
    ) {
        const url = `${this.BASE_URL}/${idPedido}`;
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
