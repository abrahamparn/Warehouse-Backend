const express = require("express");
const jenisBarangController = require("./jenisBarang.controller");
const {
  validateAddJenisBarang,
  validateUpdateJenisBarang,
} = require("../../middleware/validation");
const { checkRole } = require("../../middleware/checkRole");

const router = express.Router();

// get
router.get("/", jenisBarangController.getAllJenisBarang);
// update
router.put(
  "/:id",
  checkRole("admin"),
  validateUpdateJenisBarang,
  jenisBarangController.updateJenisBarang
);
// post
router.post("/", validateAddJenisBarang, jenisBarangController.addJenisBarang);
// delete

module.exports = router;
