import { NextApiRequest, NextApiResponse } from 'next';
import pool from '@/lib/db';

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
      // Insert the new user
      const [result]: any = await pool.query(
        'INSERT INTO users (first_name, last_name, middle_name, date_of_birth, email) VALUES (?, ?, ?, ?, ?)',
        [firstName, lastName, middleName, dateOfBirth, email]
      );

      // Fetch the newly created user by ID
      const [newUser]: any = await pool.query('SELECT * FROM users WHERE id = ?', [result.insertId]);
      res.status(201).json(newUser[0]);
    } catch (error) {
      res.status(500).json({ message: 'Error creating user', error });
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
