const barangModel = require("./dataBarang.model");
const jenisBarangModel = require("../jenisBarang/jenisBarang.model");

const { error } = require("../../middleware/logger");
const { tableBarangMapper, updateTableBarangMapper } = require("../../utils/tableMapper");
// get all barang data
const getAllBarang = async (req, res, next) => {
  try {
    const dataBarang = await barangModel.getAllBarang();
    if (dataBarang.length === 0) {
      return res.status(200).json({
        success: true,
        message: "data barang tidak ada",
      });
    }

    return res.status(200).json({
      success: true,
      dataBarang,
    });
  } catch (exception) {
    error(exception);
    next(exception);
  }
};

const getAllBarangById = async (req, res, next) => {
  try {
    const idBarang = req.params.id;
    const barang = await barangModel.getAllBarangById(idBarang);
    if (!barang) {
      return res.status(200).json({
        success: true,
        message: "tidak ada barang yang cocok",
      });
    }

    return res.status(200).json({
      success: true,
      barang,
    });
  } catch (exception) {
    error(exception);
    next(exception);
  }
};

const deleteBarangById = async (req, res, next) => {
  try {
    const idBarang = req.params.id;
    const barang = await barangModel.getAllBarangById(idBarang);
    if (!barang) {
      return res.status(404).json({
        success: false,
        message: "barang sudah di hapus atau tidak ada",
      });
    }

    const deleteBarang = await barangModel.deleteBarangById(idBarang);
    if (!deleteBarang) {
      return res.status(404).json({ error: "Tidak ada barang atau barang sudah di hapus" });
    }

    return res.status(200).json({
      success: true,
      message: "Barang berhasil di hapus",
    });
  } catch (exception) {
    error(exception);
    next(exception);
  }
};

const updateBarangById = async (req, res, next) => {
  try {
    const idBarang = req.params.id;
    const barang = await barangModel.getAllBarangById(idBarang);
    const dataUpdate = req.body;

    if (!barang) {
      return res.status(404).json({
        success: false,
        message: "barang sudah di hapus atau tidak ada",
      });
    }

    if (!dataUpdate || Object.keys(dataUpdate).length === 0) {
      return res.status(400).json({
        success: false,
        message: "tidak ada data yang dikirim",
      });
    }

    let newObjectData = {};
    for (let data in dataUpdate) {
      //special check for foreign key
      if (updateTableBarangMapper[data] && updateTableBarangMapper[data] === "jenis_id") {
        let jenisExists = await jenisBarangModel.getJenisBarangById(dataUpdate[data]);
        if (!jenisExists) {
          return res.status(400).json({
            success: false,
            message: `data yang dikirimkan tidak sesuai`,
          });
        }
      }
      if (!updateTableBarangMapper[data]) {
        return res.status(400).json({
          success: false,
          message: `data yang dikirimkan salah`,
        });
      } else {
        newObjectData[tableBarangMapper[data]] = dataUpdate[data];
      }
    }

    let updatedBarang = await barangModel.updateBarangById(idBarang, newObjectData);

    return res.status(200).json({
      success: true,
      newData: updatedBarang,
    });
  } catch (exception) {
    error(exception);
    next(exception);
  }
};

const addBarang = async (req, res, next) => {
  try {
    const barangRaw = req.body;
    let barangToBeInserted = {};
    for (let key in barangRaw) {
      // check mapper
      if (!tableBarangMapper[key]) {
        return res.status(400).json({
          success: false,
          message: "data yang dikirimkan tidak sesuai standard",
        });
      }

      // check jenis
      if (tableBarangMapper[key] === "jenis_id") {
        let jenisBarangExists = await jenisBarangModel.getJenisBarangById(barangRaw[key]);
        if (!jenisBarangExists) {
          return res.status(400).json({
            success: false,
            message: "Jenis barang salah",
          });
        }
      }

      // check kode barang
      if (tableBarangMapper[key] === "kode_barang") {
        let kodeBarangExists = await barangModel.checkKodeBarang(barangRaw[key]);

        if (kodeBarangExists) {
          return res.status(400).json({
            success: false,
            message: "Kode barang sudah dipakai",
          });
        }
      }

      // continue the empty data
      if (tableBarangMapper[key] && (barangRaw[key] === undefined || barangRaw[key] === "")) {
        continue;
      }
      barangToBeInserted[tableBarangMapper[key]] = barangRaw[key];
    }
    let barang = await barangModel.insertBarang(barangToBeInserted);

    if (barang.length === 0) {
      return res.status(500).json({
        success: false,
        message: "Gagal menambahkan barang",
      });
    }
    return res.status(200).json({
      success: true,
      barang,
    });

    // check jenis_id
  } catch (exception) {
    error(exception);
    next(exception);
  }
};

module.exports = {
  getAllBarang,
  getAllBarangById,
  deleteBarangById,
  updateBarangById,
  addBarang,
};
