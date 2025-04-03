const jenisBarangModel = require("../jenisBarang/jenisBarang.model");

const { error } = require("../../middleware/logger");

const getAllJenisBarang = async (req, res, next) => {
  try {
    let dataJenisBarang = await jenisBarangModel.getAllJenisBarang();

    if (dataJenisBarang.length === 0) {
      return res.status(200).json({
        success: true,
        message: "tidak ada jenis barang",
      });
    }
    return res.status(200).json({
      success: true,
      dataJenisBarang,
    });
  } catch (exception) {
    error(exception);
    next(exception);
  }
};

const addJenisBarang = async (req, res, next) => {
  try {
    let deskripsi = req.body.deskripsi;

    let jenisBarang = await jenisBarangModel.addJenisBarang(deskripsi);
    if (jenisBarang.length === 0) {
      return res.status(403).json({
        success: false,
        message: "Cannot insert into database",
      });
    }
    return res.status(200).json({
      success: true,
      jenisBarang: jenisBarang[0],
    });
  } catch (exception) {
    error(exception);
    next(exception);
  }
};

const updateJenisBarang = async (req, res, next) => {
  try {
    let deskripsi = req.body.deskripsi;
    const idJenis = req.params.id;

    let jenisBarang = await jenisBarangModel.getJenisBarangById(idJenis);
    if (jenisBarang.length === 0) {
      return res.status(403).json({
        success: false,
        message: "Tidak ada jenis barang ini",
      });
    }

    let updatedjenisBarang = await jenisBarangModel.updateJenisBarangById(idJenis, deskripsi);
    return res.status(200).json({
      success: true,
      updatedjenisBarang,
    });
  } catch (exception) {
    error(exception);
    next(exception);
  }
};

module.exports = {
  getAllJenisBarang,
  addJenisBarang,
  updateJenisBarang,
};
