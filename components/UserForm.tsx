'use client';

import React, { useState } from 'react';

interface User {
  id: number;
  firstName: string;
  lastName: string;
  middleName: string;
  dateOfBirth: string;
  email: string;
}

interface UserFormProps {
  onUserAdded: (user: User) => void;
}

const UserForm: React.FC<UserFormProps> = ({ onUserAdded }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [middleName, setMiddleName] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const response = await fetch('/api/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ firstName, lastName, middleName, dateOfBirth, email }),
    });
    if (response.ok) {
      const newUser = await response.json();
      onUserAdded(newUser);
      // Clear form
      setFirstName('');
      setLastName('');
      setMiddleName('');
      setDateOfBirth('');
      setEmail('');
    } else {
      console.error('Error creating user');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>First Name:</label>
        <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
      </div>
      <div>
        <label>Last Name:</label>
        <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} />
      </div>
      <div>
        <label>Middle Name:</label>
        <input type="text" value={middleName} onChange={(e) => setMiddleName(e.target.value)} />
      </div>
      <div>
        <label>Date of Birth:</label>
        <input type="date" value={dateOfBirth} onChange={(e) => setDateOfBirth(e.target.value)} />
      </div>
      <div>
        <label>Email:</label>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

export default UserForm;
