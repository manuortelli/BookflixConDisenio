const autoresCtrl = {};
const Autor = require("../models/Autor");
const Libro = require("../models/Libro");

autoresCtrl.listar = async (req, res) => {
  const autores = await Autor.find().sort({ nombre: "asc" });
  res.json(autores);
};

autoresCtrl.visualizar = async (req, res) => {
  const autor = await Autor.findById(req.body.id);
  res.json(autor);
};

autoresCtrl.cargar = async (req, res) => {
  const autor = await Autor.findOne({
    nombre: req.body.nombre,
    apellido: req.body.apellido,
  });
  console.log(autor);

  if (autor) {
    return res.json("Autor/a ya fue cargado anteriormente");
  }

  await Autor({
    nombre: req.body.nombre,
    apellido: req.body.apellido,
  })
    .save()
    .then((aut) => {
      res.send("Autor/a cargado");
      res.json(aut);
    })
    .catch((err) => res.json(err));
};

autoresCtrl.modificar = async (req, res) => {
  const autorViejo = await Autor.findById(req.body.id);
  const autorNuevo = await Autor.findOne({
    nombre: req.body.nombre,
    apellido: req.body.apellido,
  });

  if (autorNuevo && autorNuevo != autorViejo) {
    return res.json("Autor/a cargado anteriormente");
  }
  await autorViejo
    .update({
      nombre: req.body.nombre,
      apellido: req.body.apellido,
    })
    .then(res.send("Autor/a modificado/a correctamente"));
};

autoresCtrl.eliminar = async (req, res) => {
  const cantRemove = await Libro.findOne({ autor: req.body.id });
  if (cantRemove) {
    res.status(401).json({
      msg:
        "No podrá eliminarse. El autor/a está siendo utilizado por la publicación de al menos 1 libro",
    });
  } else {
    await Autor.findByIdAndRemove(req.body.id).then(
      res.send("Autor/a eliminado correctamente")
    );
  }
};

module.exports = autoresCtrl;
