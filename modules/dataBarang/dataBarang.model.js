const db = require("../../utils/db");

const getAllBarang = async () => {
  const result = await db.query(
    `SELECT BARANG.barang_id, BARANG.kode_barang, BARANG.nama_barang, 
    jenisbarang.deskripsi as jenis_barang, BARANG.harga_terkini, beratBarang.deskripsi as berat_barang,
    BARANG.berat, volumeBarang.deskripsi as volume_barang, BARANG.volume 
    FROM BARANG JOIN jenisbarang ON BARANG.jenis_id = jenisbarang.jenis_id
    JOIN beratBarang ON BARANG.berat_barang_id = beratBarang.berat_barang_id
    JOIN volumeBarang ON BARANG.volume_barang_id = volumeBarang.volume_barang_id`
  );
  return result["rows"];
};

const getAllBarangById = async (id) => {
  const result = await db.query(
    `SELECT BARANG.barang_id, BARANG.kode_barang, BARANG.nama_barang, 
      jenisbarang.deskripsi as jenis_barang, BARANG.harga_terkini,  beratBarang.deskripsi as berat_barang,
      BARANG.berat, volumeBarang.deskripsi as volume_barang, BARANG.volume 
      FROM BARANG JOIN jenisbarang ON BARANG.jenis_id = jenisbarang.jenis_id
      JOIN beratBarang ON BARANG.berat_barang_id = beratBarang.berat_barang_id
      JOIN volumeBarang ON BARANG.volume_barang_id = volumeBarang.volume_barang_id
      WHERE BARANG.barang_id = $1`,
    [id]
  );
  return result["rows"][0];
};

const deleteBarangById = async (id) => {
  const result = await db.query(`DELETE FROM BARANG WHERE barang_id = $1`, [id]);
  return result.rowCount > 0;
};

const updateBarangById = async (id, fields) => {
  const keys = Object.keys(fields);
  if (keys.length === 0) {
    throw new Error("No fields to update");
  }

  const setClause = keys.map((key, index) => `${key} = $${index + 1}`).join(", ");
  const values = Object.values(fields);
  values.push(id);
  console.log(`UPDATE BARANG SET ${setClause} WHERE barang_id = $${values.length} RETURNING *`);

  const result = await db.query(
    `UPDATE BARANG SET ${setClause} WHERE barang_id = $${values.length} RETURNING *`,
    values
  );

  return result.rows[0];
};

const insertBarang = async (fields) => {
  const keys = Object.keys(fields);
  const value = Object.values(fields);
  if (keys.length === 0) {
    throw new Error("Tidak ada data untuk ditambahkan");
  }

  const setClause = keys.join(", ");
  const values = Object.values(fields);
  let variable = "";
  for (let i = 1; i <= values.length; i++) {
    if (i == values.length) {
      variable += "$" + i;
      continue;
    }
    variable += "$" + i + ", ";
  }

  const result = await db.query(
    `INSERT INTO barang (${setClause}) VALUES (${variable}) RETURNING *;`,
    values
  );
  return result.rows[0];
};

const checkKodeBarang = async (kodeBarang) => {
  const result = await db.query(
    `SELECT EXISTS (SELECT 1 FROM barang WHERE kode_barang = $1) AS "exists"`,
    [kodeBarang]
  );

  return result.rows[0].exists;
};

module.exports = {
  getAllBarang,
  getAllBarangById,
  deleteBarangById,
  updateBarangById,
  checkKodeBarang,
  insertBarang,
};
