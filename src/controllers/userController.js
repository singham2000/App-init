// src/controllers/userController.js
const db = require('../db');

exports.registerUser = async (req, res) => {
  const { name, email, password, phone, state, country } = req.body;

  try {
    const [result] = await db.query('call registerUser (?, ?, ?, ?, ?, ?)', [name, email, password, phone, state, country]);
    // const userId = result.insertId;
    if (!result.length)
      res.json({
        "message": "This email is already registered"
      });
    else
      res.json({
        "message": "Registered Successfully",
        "data": result[0]
      });
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ error });
  }
};

exports.loginUser = async (req, res) => {
  // const userId = req.params.id;

  const { email, password } = req.body;


  try {
    const [rows] = await db.query('call loginUser (?, ?)', [email, password]);

    if (!rows[0].length) {
      res.json({
        "message": "Invalid Credentials"
      });
    } else {
      res.json({
        "message": "Login Successfully",
        "data": rows[0]
      });

    }
  } catch (error) {
    console.error('Error fetching user by ID:', error);
    res.status(500).json({ error });
  }
};


exports.getAllUser = async (req, res) => {
  try {
    const [rows] = await db.query('select * from login');
    // res.json(rows);
    res.json(
      {
        "message": 'success',
        "data": rows
      }
    )

  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ error });
  }
};



exports.updateUser = async (req, res) => {
  const userId = req.params.id;
  const { name, email } = req.body;

  try {
    const [result] = await db.query('UPDATE users SET name = ?, email = ? WHERE id = ?', [name, email, userId]);

    if (result.affectedRows === 0) {
      res.status(404).json({ error: 'User not found' });
    } else {
      res.json({ id: userId, name, email });
    }
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.deleteUser = async (req, res) => {
  const userId = req.params.id;

  try {
    const [result] = await db.query('DELETE FROM users WHERE id = ?', [userId]);

    if (result.affectedRows === 0) {
      res.status(404).json({ error: 'User not found' });
    } else {
      res.json({ message: 'User deleted successfully' });
    }
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


