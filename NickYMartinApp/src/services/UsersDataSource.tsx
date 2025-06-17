import axios from "axios";
import type { Method } from "axios";
import type {  UserLoginDto, UserRegisterDto } from "../types/user";


type ApiCallback<T> = (data: T | null, error?: any) => void;

export class UsersDataSource {
    private BASE_URL: string;

    constructor(base_url: string) {
        this.BASE_URL = base_url;
    }

    UserLogin(
        userLogin: UserLoginDto,
        callback: ApiCallback<string>
    ) {         
        const url = `${this.BASE_URL}/login`;
        this.SendRequest("post", url, callback, JSON.stringify(userLogin), { 'Content-Type': 'application/json' });
    }

    UserRegister(
        user: UserRegisterDto,
        callback: ApiCallback<string>
    ) {
        const url = `${this.BASE_URL}/register`;
        this.SendRequest("post", url, callback, JSON.stringify(user), { 'Content-Type': 'application/json' });
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
