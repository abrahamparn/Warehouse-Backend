const express = require("express");
const jenisBarangController = require("./jenisBarang.controller");
const { validateAddJenisBarang } = require("../../middleware/validation");
const { checkRole } = require("../../middleware/checkRole");

const router = express.Router();

// get
router.get("/", jenisBarangController.getAllJenisBarang);
// update
// post
router.post("/", validateAddJenisBarang, jenisBarangController.addJenisBarang);
// delete

module.exports = router;
