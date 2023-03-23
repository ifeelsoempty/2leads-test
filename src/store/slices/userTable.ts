import {
  createSlice,
  PayloadAction,
  createAsyncThunk,
  createSelector,
} from "@reduxjs/toolkit";

import { fetchUsers } from "../../api/users/users";
import { User } from "../../components/UserTable/interfaces";
import { RootState } from "../store";

interface UserTableState {
  users: User[];
  searchText: string;
  selectedCity: string;
  currentPage: number;
}

const initialState: UserTableState = {
  users: [],
  searchText: "",
  selectedCity: "",
  currentPage: 1,
};

export const getUsers = createAsyncThunk("userTable/getUsers", async () => {
  const response = await fetchUsers();
  const users: User[] = response.map((user) => ({
    id: user.id,
    name: user.name,
    email: user.email,
    city: user.address.city,
    phone: user.phone,
  }));

  return users;
});

export const userTableSlice = createSlice({
  name: "userTable",
  initialState,
  reducers: {
    setUsers: (state, action: PayloadAction<User[]>) => {
      state.users = action.payload;
    },
    setSearchText: (state, action: PayloadAction<string>) => {
      state.searchText = action.payload;
      state.currentPage = 1;
    },
    setSelectedCity: (state, action: PayloadAction<string>) => {
      state.selectedCity = action.payload;
      state.currentPage = 1;
    },
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getUsers.fulfilled, (state, action) => {
      state.users = action.payload;
    });
  },
});

export const selectUserTable = (state: RootState) => state.userTable;

export const selectFilteredUsers = createSelector(
  selectUserTable,
  ({ users, searchText, selectedCity }) => {
    return users.filter(
      (user) =>
        (user.name.toLowerCase().includes(searchText.toLowerCase()) ||
          user.email.toLowerCase().includes(searchText.toLowerCase()) ||
          user.phone.toLowerCase().includes(searchText.toLowerCase()) ||
          user.city.toLowerCase().includes(searchText.toLowerCase())) &&
        (selectedCity === "" || user.city === selectedCity)
    );
  }
);

export const { setUsers, setSearchText, setSelectedCity, setCurrentPage } =
  userTableSlice.actions;
