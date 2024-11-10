var express = require("express");
var router = express.Router();

var usuarioController = require("../controllers/usuarioController");

router.post("/register", function (req, res) {
    usuarioController.register(req, res);
});

router.post("/authenticate", function (req, res) {
    usuarioController.authenticate(req, res);
});

router.get("/getAll", function (req, res) {
    usuarioController.getAllUsers(req, res);
});

router.get("/getByName/:nomeUsuario", function (req, res) {
    usuarioController.getUserByName(req, res);
});

router.put("/update/:idUsuario", function (req, res) {
    usuarioController.updateUser(req, res);
});

router.put("/delete/:idUsuario", function (req, res) {
    usuarioController.deleteUser(req, res);
});

module.exports = router;