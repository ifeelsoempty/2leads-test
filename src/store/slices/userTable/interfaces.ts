export interface UserTableState {
  users: User[];
  searchText: string;
  selectedCity: string;
  currentPage: number;
}

export interface User {
  id: number;
  name: string;
  email: string;
  city: string;
  phone: string;
}
