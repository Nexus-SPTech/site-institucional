var express = require("express");
var router = express.Router();

var empresasController = require("../controllers/empresaController");

router.post("/register", function (req, res) {
    empresasController.register(req, res);
});

router.get("/getAll", function (req, res) {
    empresasController.getAllCompanies(req, res);
});

router.get("/getByName/:nomeEmpresa", function (req, res) {
    empresasController.getCompanyByName(req, res);
});

router.put("/update/:idEmpresa", function (req, res) {
    empresasController.updateCompany(req, res);
});

router.put("/delete/:idEmpresa", function (req, res) {
    empresasController.deleteCompany(req, res);
});

module.exports = router;