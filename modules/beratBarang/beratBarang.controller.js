const { error } = require("../../middleware/logger");
const beratBarangModel = require("./beratBarang.model");

const getAllBeratBarang = async (req, res, next) => {
  try {
    let dataBeratBarang = await beratBarangModel.getAllBeratBarang();
    if (dataBeratBarang.length === 0) {
      return res.status(200).json({
        success: true,
        message: "tidak ada data berat barang",
      });
    }
    return res.status(200).json({
      success: true,
      dataBeratBarang,
    });
  } catch (exception) {
    error(exception);
    next(exception);
  }
};

const updateBeratBarang = async (req, res, next) => {
  try {
    let idBerat = req.params.id;
    let deskripsi = req.body.deskripsi;

    const isBeratExists = await beratBarangModel.getBeratBarangById(idBerat);
    if (!isBeratExists) {
      return res.status(403).json({
        success: false,
        message: "Tidak ada berat barang ini",
      });
    }

    let updatedBeratBarang = await beratBarangModel.updateBeratBarangById(idBerat, deskripsi);
    return res.status(200).json({
      success: true,
      updatedBeratBarang,
    });
  } catch (exception) {
    error(exception);
    next(exception);
  }
};

const addBeratBarang = async (req, res, next) => {
  try {
    let deskripsi = req.body.deskripsi;
    let beratBarang = await beratBarangModel.addBeratBarang(deskripsi);
    if (beratBarang.length === 0) {
      return res.status(403).json({
        success: false,
        message: "Cannot insert into database",
      });
    }
    return res.status(200).json({
      success: true,
      beratBarang: beratBarang[0],
    });
  } catch (exception) {
    error(exception);
    next(exception);
  }
};
module.exports = {
  getAllBeratBarang,
  updateBeratBarang,
  addBeratBarang,
};
