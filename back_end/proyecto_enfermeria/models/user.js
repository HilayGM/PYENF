const { pool } = require('../config/database');

const UserModel = {
  findAll: async () => {
    const [rows] = await pool.query('SELECT * FROM users');
    return rows.map(user => ({
      ...user,
      medications: JSON.parse(user.medications)
    }));
  },

  findById: async (id) => {
    const [rows] = await pool.query(
      'SELECT * FROM users WHERE id = ?',
      [id]
    );
    if (rows.length === 0) return null;
    const user = rows[0];
    return {
      ...user,
      medications: JSON.parse(user.medications)
    };
  },

  create: async (userData) => {
    const [result] = await pool.query(
      'INSERT INTO users (name, profile_pic, treatment, medications, log, medication_taken) VALUES (?, ?, ?, ?, ?, ?)',
      [
        userData.name,
        userData.profile_pic || 'https://via.placeholder.com/50',
        userData.treatment,
        JSON.stringify(userData.medications),
        userData.log || '',
        userData.medication_taken || false
      ]
    );
    return { id: result.insertId, ...userData };
  }
};

module.exports = UserModel;