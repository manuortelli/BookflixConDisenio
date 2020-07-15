const generosCtrl = {};
const Genero = require("../models/Genero");
const Libro = require("../models/Libro");

generosCtrl.listar = async (req, res) => {
  const generos = await Genero.find().sort({ nombre: "asc" });
  res.json(generos);
};

generosCtrl.visualizar = async (req, res) => {
  const genero = await Genero.findById(req.body.id);
  res.json(genero);
};

generosCtrl.cargar = async (req, res) => {
  const genero = await Genero.findOne({ nombre: req.body.nombre });

  if (genero) {
    return res.json("El género ya fue cargado anteriormente");
  }
  await new Genero({
    nombre: req.body.nombre,
  })
    .save()
    .then(res.json("Género cargado"))
    .catch((err) => res.json(err));
};

generosCtrl.modificar = async (req, res) => {
  const generoViejo = await Genero.findById(req.body.id);
  const generoNuevo = await Genero.findOne({ nombre: req.body.nombre });

  if (generoNuevo && generoNuevo != generoViejo) {
    res.json("El género ya fue cargado anteriormente");
  }
  await generoViejo
    .update({ nombre: req.body.nombre })
    .then(res.status(200).send("Género modificado correctamente"))
    .catch((err) => res.json(err));
};

generosCtrl.eliminar = async (req, res) => {
  const cantRemove = await Libro.findOne({ genero: req.body.id });
  if (cantRemove) {
    res.status(401).json({
      msg:
        "No podrá eliminarse. El género está siendo utilizado por la publicación de al menos 1 libro",
    });
  } else {
    await Genero.findByIdAndRemove(req.body.id).then(
      res.send("Género eliminado")
    );
  }
};

module.exports = generosCtrl;
