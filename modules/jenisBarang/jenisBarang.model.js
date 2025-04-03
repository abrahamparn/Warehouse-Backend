const db = require("../../utils/db");

const getJenisBarangById = async (id) => {
  const result = await db.query(`SELECT deskripsi FROM jenisBarang WHERE jenis_id = $1`, [id]);
  return result.rows.length > 0;
};

const getAllJenisBarang = async () => {
  const result = await db.query(`
  SELECT jenis_id, deskripsi FROM jenisbarang  
  `);
  return result.rows;
};

const addJenisBarang = async (deskripsi) => {
  const result = await db.query(`INSERT INTO jenisbarang (deskripsi) values ($1) RETURNING *`, [
    deskripsi,
  ]);

  return result.rows;
};

const updateJenisBarangById = async (id, deskripsi) => {
  const result = await db.query(
    `UPDATE jenisBarang SET deskripsi = $1 WHERE jenis_id = $2 RETURNING *`,
    [deskripsi, id]
  );
  return result.rows[0];
};

module.exports = {
  getJenisBarangById,
  getAllJenisBarang,
  addJenisBarang,
  updateJenisBarangById,
};
