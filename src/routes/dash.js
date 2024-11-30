var express = require("express");
var router = express.Router();
var dashController = require("../controllers/dashController");

router.get("/mediaMaterias", function (req, res) {
    dashController.mediaMaterias(req, res);
});

router.get("/kpiMelhorAproveitamento", function (req, res) {
    dashController.kpiMelhorAproveitamento(req, res);
});

router.get("/kpiMediaAcertos", function (req, res) {
    dashController. kpiMediaAcertos(req, res);
});

router.get("/kpiMateriaComDificuldade", function (req, res) {
    dashController.kpiMateriaComDificuldade(req, res);
});

router.get("/kpiNotasFeminino", function (req, res) {
    dashController.kpiNotasFeminino(req, res);
});
router.get("/kpiNotasMasculino", function (req, res) {
    dashController.kpiNotasMasculino(req, res);
});

router.get("/graficoMediaAcertosMateria", function (req, res) {
    dashController.graficoMediaAcertosMateria(req, res);
});

router.get("/graficoRegioesMetropolitanas", function (req, res) {
    dashController.graficoRegioesMetropolitanas(req, res);
});

router.get("/graficoAproveitamento1Serie", function (req, res) {
    dashController.graficoAproveitamento1Serie(req, res);
});

router.get("/graficoAproveitamento2Serie", function (req, res) {
    dashController.graficoAproveitamento2Serie(req, res);
});

router.get("/graficoAproveitamento3Serie", function (req, res) {
    dashController.graficoAproveitamento3Serie(req, res);
});

router.get("/respostaInsight", function (req, res) {
    dashController.respostaInsight(req, res);
});

  

  
module.exports = router;