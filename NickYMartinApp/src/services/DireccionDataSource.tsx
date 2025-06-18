import axios from "axios";
import type { Direccion } from "../types/Direccion";

const BASE_URL = "https://localhost:7153/api/users"; // tus endpoints están en UsersController

export class DireccionDataSource {
    constructor(private token: string) { }

    private headers = () => ({
        Authorization: `Bearer ${this.token}`,
        "Content-Type": "application/json",
    });

    async obtenerDirecciones(userId: string): Promise<Direccion[]> {
        const res = await axios.get(`${BASE_URL}/direcciones?userId=${userId}`, {
            headers: this.headers(),
        });
        return res.data;
    }

    async agregarDireccion(direccion: Direccion): Promise<Direccion> {
        const res = await axios.post(`${BASE_URL}/direccion`, direccion, {
            headers: this.headers(),
        });
        return res.data;
    }

    async eliminarDireccion(idDireccion: string): Promise<void> {
        await axios.delete(`${BASE_URL}/direccion/${idDireccion}`, {
            headers: this.headers(),
        });
    }


    async actualizarDireccion(direccion: Direccion): Promise<Direccion> {
        const res = await axios.put(`${BASE_URL}/direccion`, direccion, {
            headers: this.headers(),
        });
        return res.data;
    }
}
