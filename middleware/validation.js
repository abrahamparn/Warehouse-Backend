const { param, query, body, validationResult } = require("express-validator");
const moment = require("moment");

const validateRegistration = [
  body("email").isEmail().withMessage("Please enter a valid email address").normalizeEmail(),
  body("username").isLength({ min: 6 }).withMessage("Username must be at least 6 characters"),
  body("password").isLength({ min: 6 }).withMessage("Password must be at least 6 characters"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

const validateLogin = [
  body("email").isEmail().withMessage("Please enter a valid email address").normalizeEmail(),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

const validateGetBarangById = [
  param("id")
    .notEmpty()
    .withMessage("Barang ID is required")
    .bail()
    .isInt({ gt: 0 })
    .withMessage("Barang ID must be a positive integer"),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

const validateAddBarang = [
  body("kodeBarang").notEmpty().withMessage("Kode barang harus diisi"),
  body("namaBarang").notEmpty().withMessage("Nama barang harus diisi"),
  body("jenisBarang")
    .notEmpty()
    .withMessage("ID Jenis Barang harus diisi")
    .isInt()
    .withMessage("ID Jenis barang hanya bisa angka"),
  body("hargaBarang")
    .if(body("hargaBarang").notEmpty())
    .isNumeric()
    .withMessage("Harga barang hanya bisa diisi menggunakan angka"),
  body("beratBarang")
    .if(body("beratBarang").notEmpty())
    .isNumeric()
    .withMessage("Berat barang hanya bisa diisi menggunakan angka"),
  body("volumeBarang")
    .if(body("volumeBarang").notEmpty())
    .isNumeric()
    .withMessage("Volume barang hanya bisa diisi menggunakan angka"),
  body("satuanBeratBarang").notEmpty().isNumeric().withMessage("Satuan Berat Barang harus diisi"),
  body("satuanVolumeBarang").notEmpty().isNumeric().withMessage("satuan volume barang harus diisi"),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

const validateAddJenisBarang = [
  body("deskripsi")
    .trim() // Optional: trims whitespace
    .notEmpty()
    .withMessage("Deskripsi harus diisi"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

const validateUpdateJenisBarang = [
  param("id")
    .notEmpty()
    .withMessage("Jenis Barang ID is required")
    .bail()
    .isInt({ gt: 0 })
    .withMessage("Jenis Barang ID must be a positive integer"),
  body("deskripsi").trim().notEmpty().withMessage("Deskripsi harus diisi"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

const validateUpdateVolumeBarang = [
  param("id")
    .notEmpty()
    .withMessage("Volume Barang ID is required")
    .bail()
    .isInt({ gt: 0 })
    .withMessage("Volume Barang ID must be a positive integer"),
  body("deskripsi").trim().notEmpty().withMessage("Deskripsi harus diisi"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

const validateAddVolumeBarang = [
  body("deskripsi").notEmpty().trim().withMessage("Deksripsi harus diisi"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

const validateUpdateBeratBarang = [
  param("id")
    .notEmpty()
    .withMessage("Berat Barang ID is required")
    .bail()
    .isInt({ gt: 0 })
    .withMessage("Berat Barang ID must be a positive integer"),
  body("deskripsi").trim().notEmpty().withMessage("Deskripsi harus diisi"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

const validateAddBeratBarang = [
  body("deskripsi").notEmpty().trim().withMessage("Deksripsi harus diisi"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

module.exports = {
  validateRegistration,
  validateLogin,
  validateGetBarangById,
  validateAddBarang,
  validateAddJenisBarang,
  validateUpdateJenisBarang,
  validateUpdateVolumeBarang,
  validateAddVolumeBarang,
  validateAddBeratBarang,
  validateUpdateBeratBarang,
};
