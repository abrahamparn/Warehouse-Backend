const db = require("../../utils/db");

const checkUsername = async (username) => {
  const result = await db.query(
    `SELECT EXISTS (SELECT 1 FROM users WHERE username = $1) AS "exists"`,
    [username]
  );
  return result.rows[0].exists;
};

const checkEmail = async (email) => {
  const result = await db.query(
    `SELECT EXISTS (SELECT 1 FROM users WHERE email = $1) AS "exists"`,
    [email]
  );
  console.log(result);
  return result.rows[0].exists;
};

// is verified will always be okay for now, because we do not use email verification
const createUser = async (email, username, hashedPassword) => {
  const result = await db.query(
    `INSERT INTO users (email, username, password, is_verified) VALUES ($1, $2, $3, $4)
       RETURNING username, role`,
    [email, username, hashedPassword, true]
  );
  return result.rows[0];
};

const deleteOneUser = async (username) => {
  const result = await db.query(`DELETE FROM users WHERE username = $1`, [username]);
  return result.rowCount > 0; // Returns true if at least one row was deleted
};

const selectOneUser = async (username) => {
  const result = await db.query(
    `SELECT user_id, email, username, password, role, is_verified, last_login, created_at, updated_at 
       FROM users WHERE username = $1`,
    [username]
  );
  return result.rows[0];
};

const updatePassword = async (username, hashedPassword) => {
  const result = await db.query(
    `UPDATE users SET password = $1 WHERE username = $2 
       RETURNING username, role`,
    [hashedPassword, username]
  );
  return result.rows[0];
};

const updateLastLogin = async (username) => {
  await db.query(`UPDATE users SET last_login = NOW() WHERE username = $1`, [username]);
};

module.exports = {
  checkUsername,
  createUser,
  checkEmail,
  deleteOneUser,
  selectOneUser,
  updatePassword,
  updateLastLogin,
};
