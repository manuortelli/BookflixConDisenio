const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const cors = require("cors");
const path = require("path");
const {
  listar,
  visualizar,
  cargar,
  modificar,
  eliminar,
  cargarArchivoLibro,
  cargarArchivoCapitulo,
  visualizarCapitulos,
  modificarFecha,
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
/*
const imageFilter = function(req, file, cb) {
    if (!file.originalname.match(/\.(pdf|doc|docx|jpg)$/)) {
        return cb(new Error('Solo se permiten formatos de imagen o de video!, no se guardó el archivo'), false);
    }
    cb(null, true);
};

*/
const uploadPortada = multer({
  storage: storage,
}).single("portadaImg");

router.get("/", auth, cors(), listar);

router.post("/me", auth, cors(), visualizar);

router.post("/misCapitulos", auth, cors(), visualizarCapitulos);

router.post("/cargar", auth, uploadPortada, cargar);

router.post("/cargarArchivoLibro", auth, uploadPortada, cargarArchivoLibro);

router.post(
  "/cargarArchivoCapitulo",
  auth,
  uploadPortada,
  cargarArchivoCapitulo
);

router.post("/modificar", auth, uploadPortada, modificar);

router.post("/modificarFechasLibro", auth, cors(), modificarFecha);

router.post("/eliminar", auth, cors(), eliminar);

module.exports = router;
