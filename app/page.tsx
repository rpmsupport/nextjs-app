'use client';

import React, { useState, useEffect } from 'react';
import UserForm from '../components/UserForm';
import UserTable from '../components/UserTable';

interface User {
  id: number;
  firstName: string;
  lastName: string;
  middleName: string;
  dateOfBirth: string;
  email: string;
}

const HomePage = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await fetch('/api/users');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      if (Array.isArray(data)) {
        setUsers(data);
      } else {
        throw new Error('API response is not an array');
      }
    } catch (error) {
      console.error('Error fetching users:', error);
      setError('Error fetching users');
    }
  };

  const addUser = (user: User) => {
    setUsers((prevUsers) => [...prevUsers, user]);
  };

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h1>User Management</h1>
      <UserForm onUserAdded={addUser} />
      <UserTable users={users} />
    </div>
  );
};

export default HomePage;
