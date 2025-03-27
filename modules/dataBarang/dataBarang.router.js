const express = require("express");
const dataBarangController = require("./dataBarang.controller");

//! implement later for roles admin, user, operator
const authorize = require("../../middleware/authorization");
//! implement later
const { validateGetBarangById, validateAddBarang } = require("../../middleware/validation");

const router = express.Router();

// Route: GET /api/dataBarang/
//! implement authentication and authorize
router.get("/", dataBarangController.getAllBarang);

// Route: GET /api/dataBarang/:id
router.get("/:id", validateGetBarangById, dataBarangController.getAllBarangById);

// Route : POST /api/dataBarang/
router.post("/", validateAddBarang, dataBarangController.addBarang);

// Route: PUT /api/dataBarang/
router.put("/:id", validateGetBarangById, dataBarangController.updateBarangById);

// Route: DELETE /api/dataBarang/:id
router.delete("/:id", validateGetBarangById, dataBarangController.deleteBarangById);

module.exports = router;
