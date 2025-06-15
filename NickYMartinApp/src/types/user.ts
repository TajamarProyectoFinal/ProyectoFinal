export interface UserRegisterDto {
    name: string;
    email: string;
    phone?: string;
    password: string;
    confirmPassword: string;
}

export interface UserLoginDto {
    email: string;
    password: string;
}
