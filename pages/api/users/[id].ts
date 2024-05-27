// pages/api/users/index.ts
import { NextApiRequest, NextApiResponse } from 'next';
import pool from '../../../lib/db';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      const [rows] = await pool.query('SELECT * FROM users');
      res.status(200).json(rows);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching users', error });
    }
  } else if (req.method === 'POST') {
    const { firstName, lastName, middleName, dateOfBirth, email } = req.body;
    try {
      await pool.query(
        'INSERT INTO users (first_name, last_name, middle_name, date_of_birth, email) VALUES (?, ?, ?, ?, ?)',
        [firstName, lastName, middleName, dateOfBirth, email]
      );
      res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Error creating user', error });
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
