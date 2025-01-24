const { pool } = require('../config/Database');

const AdminModel = {
  findAll: async () => {
    const [rows] = await pool.query('SELECT id, name, email FROM admins');
    return rows;
  },

  create: async (adminData) => {
    const [result] = await pool.query(
      'INSERT INTO admins (name, email, password) VALUES (?, ?, ?)',
      [adminData.name, adminData.email, adminData.password]
    );
    return { id: result.insertId, ...adminData };
  },

  delete: async (id) => {
    const [result] = await pool.query(
      'DELETE FROM admins WHERE id = ?',
      [id]
    );
    return result.affectedRows > 0;
  }
};

module.exports = AdminModel;