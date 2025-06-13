import Axios from 'axios'

export class ResRestDataSource {
    constructor(base_url) {
        this.BASE_URL = base_url
    }

    //Obtener todos los productos
    GetProducts(callback) {
        this.SendRequest("get", this.BASE_URL, callback)
    }

    //Obtener Solo un producto
    async GetOneProdut(id, callback) {
        this.SendRequest("get", `${this.BASE_URL}/${id}`, callback)
    }

    //Creacion del producto
    async Store(data, callback) {
        const productToSave = { ...data };

        if (!productToSave.id) {
            delete productToSave.id;
        }
        this.SendRequest("post", this.BASE_URL, callback, productToSave)
    }

    //Actualizacion
    async Update(data, callback) {
        this.SendRequest("put", `${this.BASE_URL}/${data.id}`, callback, data)
    }

    //Eliminacion
    async Delete(id, callback) {
        this.SendRequest("delete", `${this.BASE_URL}/${id}`, callback)
    }

    //Manejo del SendRequest
    async SendRequest(method, url, callback, data = null) {
        try {
            const response = await Axios.request({
                method: method,
                url: url,
                data: data
            });
            callback(response.data);
        } catch (error) {
            console.error(`Error during ${method.toUpperCase()} request to ${url}:`, error);
            callback(null, error);
        }
    }
}