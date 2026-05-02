export type TUser = {
    name: string;
    _id: string
    email: string;
    role: 'user' | 'admin' | 'driver';
    password: string;
    phone: string;
    address?: string;
    status: string;
    isDriverRequested?: boolean;
    createdAt: string;
    updatedAt: string;
    __v: number;
}