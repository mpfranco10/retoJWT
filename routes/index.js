var express = require('express');
var router = express.Router();

var HandlerGenerator = require("../handlegenerator.js");
var middleware = require("../middleware.js");

HandlerGenerator = new HandlerGenerator();

/* GET home page. */
router.get('/', middleware.checkToken, HandlerGenerator.index);

router.post( '/login', HandlerGenerator.login);

router.get( '/users', middleware.checkToken, HandlerGenerator.listUsers);

router.post( '/newuser', middleware.checkTokenMedium, HandlerGenerator.prueba);

router.post( '/delete', middleware.checkTokenHigh, HandlerGenerator.delete);

module.exports = router;