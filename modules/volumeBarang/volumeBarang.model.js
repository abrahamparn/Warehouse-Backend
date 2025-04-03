const db = require("../../utils/db");

const getAllVolumeBarang = async () => {
  const result = await db.query(`
     SELECT volume_barang_id, deskripsi FROM volumeBarang  
     `);
  return result.rows;
};

const getVolumeBarangById = async (id) => {
  const result = await db.query(`SELECT deskripsi FROM volumeBarang WHERE volume_barang_id = $1`, [
    id,
  ]);
  return result.rows.length > 0;
};

const addVolumeBarang = async (deskripsi) => {
  const result = await db.query(`INSERT INTO volumeBarang (deskripsi) values ($1) RETURNING *`, [
    deskripsi,
  ]);

  return result.rows;
};

const updateVolumeBarangById = async (id, deskripsi) => {
  const result = await db.query(
    `UPDATE volumeBarang SET deskripsi = $1 WHERE volume_barang_id = $2 RETURNING *`,
    [deskripsi, id]
  );
  return result.rows[0];
};

module.exports = {
  getAllVolumeBarang,
  getVolumeBarangById,
  updateVolumeBarangById,
  addVolumeBarang,
};
