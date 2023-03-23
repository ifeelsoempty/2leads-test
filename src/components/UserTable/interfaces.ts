export interface UserFromServer {
    id: number;
    name: string;
    email: string;
    phone: string;
    address: {
        city: string;
    };
}

export interface User {
    id: number;
    name: string;
    email: string;
    city: string;
    phone: string;
}