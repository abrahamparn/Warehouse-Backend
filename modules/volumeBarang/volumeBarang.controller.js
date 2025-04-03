const { error } = require("../../middleware/logger");
const volumeBarangModel = require("./volumeBarang.model");

const getAllVolumeBarang = async (req, res, next) => {
  try {
    let dataVolumeBarang = await volumeBarangModel.getAllVolumeBarang();
    if (dataVolumeBarang.length === 0) {
      return res.status(200).json({
        success: true,
        message: "tidak ada data volume barang",
      });
    }
    return res.status(200).json({
      success: true,
      dataVolumeBarang,
    });
  } catch (exception) {
    error(exception);
    next(exception);
  }
};

const updateVolumeBarang = async (req, res, next) => {
  try {
    let idVolume = req.params.id;
    let deskripsi = req.body.deskripsi;

    const isVolumeExists = await volumeBarangModel.getVolumeBarangById(idVolume);
    if (!isVolumeExists) {
      return res.status(403).json({
        success: false,
        message: "Tidak ada volume barang ini",
      });
    }

    let updatedVolumeBarang = await volumeBarangModel.updateVolumeBarangById(idVolume, deskripsi);
    return res.status(200).json({
      success: true,
      updatedVolumeBarang,
    });
  } catch (exception) {
    error(exception);
    next(exception);
  }
};

const addVolumeBarang = async (req, res, next) => {
  try {
    let deskripsi = req.body.deskripsi;
    let volumeBarang = await volumeBarangModel.addVolumeBarang(deskripsi);
    if (volumeBarang.length === 0) {
      return res.status(403).json({
        success: false,
        message: "Cannot insert into database",
      });
    }
    return res.status(200).json({
      success: true,
      volumeBarang: volumeBarang[0],
    });
  } catch (exception) {
    error(exception);
    next(exception);
  }
};
module.exports = {
  getAllVolumeBarang,
  updateVolumeBarang,
  addVolumeBarang,
};
