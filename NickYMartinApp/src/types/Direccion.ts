export interface Direccion {
    idDireccion?: string;
    idUsuario?: string;
    domicilio?: string;
    codigoPostal: number;
    ciudad?: string;
    provincia?: string;
    pais?: string;
    principal: boolean;
}