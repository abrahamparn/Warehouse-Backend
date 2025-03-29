const db = require("../../utils/db");

const getJenisBarangById = async (id) => {
  const result = await db.query(`SELECT deskripsi FROM jenisBarang WHERE jenis_id = $1`, [id]);
  console.log(result.rows);
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

module.exports = {
  getJenisBarangById,
  getAllJenisBarang,
  addJenisBarang,
};
