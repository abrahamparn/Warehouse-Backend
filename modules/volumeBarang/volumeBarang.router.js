const express = require("express");
const volumeBarangController = require("./volumeBarang.controller");
const {
  validateUpdateVolumeBarang,
  validateAddVolumeBarang,
} = require("../../middleware/validation");

const { checkRole } = require("../../middleware/checkRole");

const router = express.Router();

// // get
router.get("/", volumeBarangController.getAllVolumeBarang);
// // update
router.put(
  "/:id",
  checkRole("admin"),
  validateUpdateVolumeBarang,
  volumeBarangController.updateVolumeBarang
);
// // post
router.post("/", validateAddVolumeBarang, volumeBarangController.addVolumeBarang);
// delete

module.exports = router;
