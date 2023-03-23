import { ColumnsType } from "antd/es/table";
import { User } from "./interfaces";

export const columns: ColumnsType<User> = [
  {
    title: "ID",
    dataIndex: "id",
    key: "id",
    sorter: (a: User, b: User) => a.id - b.id,
    width: "4%",
  },
  {
    title: "Имя",
    dataIndex: "name",
    key: "name",
    sorter: (a: User, b: User) => a.name.localeCompare(b.name),
    width: "24%",
  },
  {
    title: "Email",
    dataIndex: "email",
    key: "email",
    sorter: (a: User, b: User) => a.email.localeCompare(b.email),
    width: "24%",
  },
  {
    title: "Город",
    dataIndex: "city",
    key: "city",
    sorter: (a: User, b: User) => a.city.localeCompare(b.city),
    width: "24%",
  },
  {
    title: "Телефон",
    dataIndex: "phone",
    key: "phone",
    sorter: (a: User, b: User) => a.phone.localeCompare(b.phone),
    width: "24%",
  },
];
