const express = require("express");
const beratBarangController = require("./beratBarang.controller");
const {
  validateUpdateBeratBarang,
  validateAddBeratBarang,
} = require("../../middleware/validation");

const { checkRole } = require("../../middleware/checkRole");

const router = express.Router();

// // get
router.get("/", beratBarangController.getAllBeratBarang);
// // update
router.put(
  "/:id",
  checkRole("admin"),
  validateUpdateBeratBarang,
  beratBarangController.updateBeratBarang
);
// // post
router.post("/", validateAddBeratBarang, beratBarangController.addBeratBarang);
// delete

module.exports = router;
