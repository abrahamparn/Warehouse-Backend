const db = require("../../utils/db");

const getAllBeratBarang = async () => {
  const result = await db.query(`
     SELECT berat_barang_id, deskripsi FROM beratBarang  
     `);
  return result.rows;
};

const getBeratBarangById = async (id) => {
  const result = await db.query(`SELECT deskripsi FROM beratBarang WHERE berat_barang_id = $1`, [
    id,
  ]);
  return result.rows.length > 0;
};

const addBeratBarang = async (deskripsi) => {
  const result = await db.query(`INSERT INTO beratBarang (deskripsi) values ($1) RETURNING *`, [
    deskripsi,
  ]);

  return result.rows;
};

const updateBeratBarangById = async (id, deskripsi) => {
  const result = await db.query(
    `UPDATE beratBarang SET deskripsi = $1 WHERE berat_barang_id = $2 RETURNING *`,
    [deskripsi, id]
  );
  return result.rows[0];
};

module.exports = {
  getAllBeratBarang,
  getBeratBarangById,
  updateBeratBarangById,
  addBeratBarang,
};
