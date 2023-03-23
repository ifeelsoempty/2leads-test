import { UserFromServer } from "./interfaces";

const USERS_API_URL = "https://jsonplaceholder.typicode.com/users";

export const fetchUsers = async (): Promise<UserFromServer[]> => {
  const response = await fetch(USERS_API_URL);
  const data = await response.json();
  return data;
};
