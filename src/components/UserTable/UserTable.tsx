import React, { useEffect } from "react";
import { Table, Input, Select } from "antd";
import { useDispatch, useSelector } from "react-redux";

import { columns } from "./columns";
import { AppDispatch } from "../../store/store";
import {
  getUsers,
  selectFilteredUsers,
  selectUserTable,
  setCurrentPage,
  setSearchText,
  setSelectedCity,
} from "../../store/slices/userTable/userTable";

import styles from "./UserTable.module.css";

const { Option } = Select;

const DEFAULT_SELECT_VALUE = "all";
const PAGE_SIZE = 3;

export const UserTable: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  const { users, searchText, selectedCity, currentPage } =
    useSelector(selectUserTable);

  const filteredUsers = useSelector(selectFilteredUsers);

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearchText(e.target.value));
    dispatch(setCurrentPage(1));
  };

  const handleCityChange = (value: string) => {
    dispatch(setSelectedCity(value !== DEFAULT_SELECT_VALUE ? value : ""));
    dispatch(setCurrentPage(1));
  };

  const handlePaginationChange = (page: number) => {
    dispatch(setCurrentPage(page));
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <Input
          placeholder="Ищите по имени, городу, почте или телефону"
          value={searchText}
          onChange={handleSearch}
        />
        <Select
          className={styles.select}
          value={selectedCity || "all"}
          onChange={handleCityChange}
        >
          <Option value={DEFAULT_SELECT_VALUE}>Все</Option>
          {Array.from(new Set(users.map((user) => user.city))).map((city) => (
            <Option key={city} value={city}>
              {city}
            </Option>
          ))}
        </Select>
      </div>
      <Table
        columns={columns}
        dataSource={filteredUsers.slice(
          (currentPage - 1) * PAGE_SIZE,
          currentPage * PAGE_SIZE
        )}
        pagination={{
          current: currentPage,
          pageSize: PAGE_SIZE,
          total: filteredUsers.length,
          onChange: handlePaginationChange,
        }}
      />
    </div>
  );
};
