const auth = require("../middleware/auth");
const cors = require("cors");
const express = require("express");
const router = express.Router();
const path = require("path");

const {
  libroTerminado,
  listar,
  visualizar,
  cargar,
  modificar,
  eliminar,
  cargarArchivoLibro,
  cargarArchivoCapitulo,
  visualizarCapitulos,
  modificarFecha,
  verCapitulo,
  existeLibro,
  existeCapitulo,
  eliminarArchivoLibro,
  eliminarCapitulo,
  modificarCapitulo,
} = require("../controllers/libros-controllers");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../../uploads/"));
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const uploadPortada = multer({
  storage: storage,
}).single("portadaImg");

router.get("/", cors(), listar);

router.post("/me", auth, cors(), visualizar);

router.post("/misCapitulos", auth, cors(), visualizarCapitulos);

router.post("/verCapitulo", auth, cors(), verCapitulo);

router.post("/cargar", auth, uploadPortada, cargar);

router.post("/cargarArchivoLibro", auth, uploadPortada, cargarArchivoLibro);

router.post(
  "/cargarArchivoCapitulo",
  auth,
  uploadPortada,
  cargarArchivoCapitulo
);

router.post("/modificar", auth, uploadPortada, modificar);

router.post("/terminado", auth, cors(), libroTerminado);

router.post("/existeLibro", auth, cors(), existeLibro);

router.post("/existeCapitulo", auth, cors(), existeCapitulo);

router.post("/modificarFechasLibro", auth, modificarFecha);

router.post("/eliminar", auth, cors(), eliminar);

router.post("/eliminarArchivoLibro", auth, cors(), eliminarArchivoLibro);

router.post("/eliminarCapitulo", auth, cors(), eliminarCapitulo);

router.post(
  "/modificarCapitulo",
  auth,
  cors(),
  uploadPortada,
  modificarCapitulo
);

module.exports = router;
