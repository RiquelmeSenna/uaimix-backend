

export type UserCreate = {
    email: string;
    password: string;
    name: string;
    CPF?: string;
    CNPJ?: string;
    document: string;
}