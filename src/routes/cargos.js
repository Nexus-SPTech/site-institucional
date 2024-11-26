var express = require("express");
var router = express.Router();

var cargosController = require("../controllers/cargoController");

router.get("/getAll", function (req, res) {
    cargosController.getAllRoles(req, res);
});

module.exports = router;