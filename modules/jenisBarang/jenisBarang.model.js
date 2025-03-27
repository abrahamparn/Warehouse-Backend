const db = require("../../utils/db");

const getJenisBarangById = async (id) => {
  const result = await db.query(`SELECT deskripsi FROM jenisBarang WHERE jenis_id = $1`, [id]);
  console.log(result.rows);
  return result.rows.length > 0;
};

module.exports = {
  getJenisBarangById,
};
