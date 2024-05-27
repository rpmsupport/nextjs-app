// app/page.tsx
'use client';

import React from 'react';
import UserForm from '../components/UserForm';
import UserTable from '../components/UserTable';

const HomePage = () => {
  return (
    <div>
      <h1>User Management</h1>
      <UserForm />
      <UserTable />
    </div>
  );
};

export default HomePage;
