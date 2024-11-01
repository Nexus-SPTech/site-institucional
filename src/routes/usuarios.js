var express = require("express");
var router = express.Router();

var usuarioController = require("../controllers/usuarioController");

router.post("/register", function (req, res) {
    usuarioController.register(req, res);
});

router.post("/authenticate", function (req, res) {
    usuarioController.authenticate(req, res);
});

router.get("/get", function (req, res) {
    usuarioController.getAllUsers(req, res);
});

router.get("/getById/:id", function (req, res) {
    usuarioController.getUserById(req, res);
});

router.put("/update/:id", function (req, res) {
    usuarioController.updateUser(req, res);
});

router.delete("/delete/:id", function (req, res) {
    usuarioController.deleteUser(req, res);
});

module.exports = router;