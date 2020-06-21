const trailersCtrl = {};
const Trailer = require("../models/Trailer");
const Libro = require("../models/Libro");

trailersCtrl.listar = async (req, res) => {
  const trailers = await Trailer.find();
  res.json(trailers);
};

trailersCtrl.visualizar = async (req, res) => {
  await Trailer.findById(req.body.id).then((tr) => {
    res.json(tr);
  });
};

trailersCtrl.cargar = async (req, res) => {
  const trailer = await Trailer.findOne({ titulo: req.body.titulo });
  if (trailer) {
    return res.status(401).json({
      msg: "Ya se encuentra un trailer con el mismo título, intente con otro",
    });
  } else {
    const trailerD = await Trailer.findOne({ titulo: req.body.descripcion });
    if (trailerD) {
      return res.status(401).json({
        msg:
          "La descripción se encuentra en otro trailer, recuerde que debe ser única",
      });
    }
  }

  const nuevoTrailer = await new Trailer({
    titulo: req.body.titulo,
    descripcion: req.body.descripcion,
  }).save();

  if (req.file) {
    await nuevoTrailer.updateOne({
      archivo: req.file.filename,
    });
  }
  if (req.body.libro) {
    await nuevoTrailer.updateOne({
      libro: req.body.libro,
    });
    const libro = await Libro.findById(req.body.libro).updateOne({
      trailer: nuevoTrailer.__id,
    });
  }
  if (req.body.video) {
    await nuevoTrailer.updateOne({
      video: true,
    });
  } else {
    await nuevoTrailer.updateOne({
      video: false,
    });
  }

  return res.status(200).json({ msg: "Trailer cargado con éxito" });
};

trailersCtrl.eliminar = async (req, res) => {
  const trailer = Trailer.findById(req.body.id);
  if (trailer.libro) {
    const libro = Libro.findById(trailer.libro);
    await libro.updateOne({
      trailer: "",
    });
  }

  await Trailer.findByIdAndRemove(req.body.id).then(
    res.send("Trailer eliminado")
  );
};

module.exports = trailersCtrl;
