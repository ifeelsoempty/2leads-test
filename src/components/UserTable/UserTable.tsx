import React, { useState, useEffect } from 'react';
import { Table, Input, Select } from 'antd';

import { User } from './interfaces';
import { columns, fetchUsers } from './helpers';

import styles from './UserTable.module.css';

const { Search } = Input;
const { Option } = Select;

const DEFAULT_SELECT_VALUE = "all"
const PAGE_SIZE = 5;

export const UserTable: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [searchText, setSearchText] = useState<string>('');
  const [selectedCity, setSelectedCity] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(1);

  useEffect(() => {
    const getUsers = async () => {
      const data = await fetchUsers();
      const users = data.map((user) => ({ ...user, ...user.address }))
      setUsers(users);
      setFilteredUsers(users);
    };
    getUsers();
  }, []);

  useEffect(() => {
    const filtered = users.filter(
      (user) =>
        (user.name.toLowerCase().includes(searchText.toLowerCase()) ||
          user.email.toLowerCase().includes(searchText.toLowerCase()) ||
          user.phone.toLowerCase().includes(searchText.toLowerCase()) ||
          user.city.toLowerCase().includes(searchText.toLowerCase())) &&
        (selectedCity === '' || user.city === selectedCity)
    );
    setFilteredUsers(filtered);
  }, [users, searchText, selectedCity]);

  const handleSearch = (value: string) => {
    setSearchText(value);
    setCurrentPage(1);
  };

  const handleCityChange = (value: string) => {
    setSelectedCity(value !== DEFAULT_SELECT_VALUE ? value : '');
    setCurrentPage(1)
  };

  const handlePaginationChange = (page: number) => {
    setCurrentPage(page);
  };

  // Добавить Redux
  // Добавить селект количества айтемов на странице
  // Поправить верстку чтобы все было ровно

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <Search placeholder="Ищите по имени, городу, почте или телефону" onSearch={handleSearch} />
        <Select className={styles.select} value={selectedCity || 'all'} onChange={handleCityChange}>
          <Option value={DEFAULT_SELECT_VALUE}>
            Все
          </Option>
          {Array.from(new Set(users.map((user) => user.city))).map((city) => (
            <Option key={city} value={city}>
              {city}
            </Option>
          ))}
        </Select>
      </div>
      <Table
        columns={columns}
        dataSource={filteredUsers.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE)}
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