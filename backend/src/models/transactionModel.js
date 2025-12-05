import { pool } from "../config/db.js";

const Transaction = {
  getByUserId: async (userId) => {
    try {
      const [rows] = await pool.query(
        `SELECT t.*, m.title, m.poster_url, m.price 
         FROM transactions t
         JOIN movies m ON m.id = t.movie_id
         WHERE t.user_id = ?`,
        [userId]
      );

      return rows;
    } catch (err) {
      throw err;
    }
  },
};

export default Transaction;
