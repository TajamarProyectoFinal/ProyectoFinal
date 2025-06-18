// services/PaymentDataSource.ts
import axios from 'axios';
import type { RedsysPaymentDataDto } from '../types/RedsysPaymentDataDto'; // Adjust path as needed
type ApiCallback<T> = (data: T | null, error?: any) => void;
export class PaymentDataSource {
    private BASE_URL: string;

    constructor(baseUrl: string) {
        this.BASE_URL = baseUrl;
    }

    private async SendRequest<T>(method: 'get' | 'post' | 'put' | 'delete', url: string, callback: ApiCallback<T>, data?: any) {
        try {
            const response = await axios({ method, url, data });
            callback(response.data as T, undefined);
        } catch (error: any) {
            console.error(`Error in SendRequest (${method} ${url}):`, error);
            callback(error);
        }
    }

    /**
     * Llama al endpoint del backend para generar los datos de pago de Redsys.
     * @param userId El ID del usuario.
     * @param idDireccion El ID de la dirección de envío seleccionada.
     * @param callback Una función de callback para manejar la respuesta o el error.
     */
    generateRedsysData(
        idPedido: string,
        callback: ApiCallback<RedsysPaymentDataDto>
    ): void {
        const url = `${this.BASE_URL}/GenerateRedsysData`;

        const formData = new FormData();
        formData.append('idPedido', idPedido);

        this.SendRequest<RedsysPaymentDataDto>("post", url, callback, formData);
    }
}