const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const cors = require("cors");
const {
  listar,
  spoiler,
  eliminar,
  modificar,
  cargar,
  visualizar,
} = require("../controllers/resenas-controllers");

router.post("/", cors(), auth, listar);

router.post("/me", cors(), auth, visualizar);

router.post("/eliminar", auth, cors(), eliminar);

router.post("/cargar", auth, cors(), cargar);

router.post("/spoiler", cors(), auth, spoiler);

router.post("/modificar", auth, cors(), modificar);

module.exports = router;
