var express = require("express");
var router = express.Router();

var cargosController = require("../controllers/cargoController");

router.post("/add", function (req, res) {
    cargosController.add(req, res);
});

router.get("/getAll", function (req, res) {
    cargosController.getAllRoles(req, res);
});

router.get("/getByName/:nomeCargo", function (req, res) {
    cargosController.getRoleByName(req, res);
});

router.put("/update/:idCargo", function (req, res) {
    cargosController.updateRole(req, res);
});

router.put("/delete/:idCargo", function (req, res) {
    cargosController.deleteRole(req, res);
});

module.exports = router;