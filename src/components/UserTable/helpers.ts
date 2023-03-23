import { User, UserFromServer } from "./interfaces";

const USERS_API_URL = "https://jsonplaceholder.typicode.com/users"

export const columns = [
    {
        title: 'ID',
        dataIndex: 'id',
        key: 'id',
        sorter: (a: User, b: User) => a.id - b.id,
    },
    {
        title: 'Имя',
        dataIndex: 'name',
        key: 'name',
        sorter: (a: User, b: User) => a.name.localeCompare(b.name),
    },
    {
        title: 'Email',
        dataIndex: 'email',
        key: 'email',
        sorter: (a: User, b: User) => a.email.localeCompare(b.email),
    },
    {
        title: 'Город',
        dataIndex: 'city',
        key: 'city',
        sorter: (a: User, b: User) => a.city.localeCompare(b.city),
    },
    {
        title: 'Телефон',
        dataIndex: 'phone',
        key: 'phone',
        sorter: (a: User, b: User) => a.phone.localeCompare(b.phone),
    },
];

export const fetchUsers = async (): Promise<UserFromServer[]> => {
    const response = await fetch(USERS_API_URL);
    const data = await response.json();
    return data;
};
