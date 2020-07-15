const auth = require("../middleware/auth");
const cors = require("cors");
const express = require("express");
const router = express.Router();

const { libros, suscriptores } = require("../controllers/reportes-controllers");

router.get("/libros", auth, cors(), libros);

router.post("/suscriptores", auth, cors(), suscriptores);

module.exports = router;
