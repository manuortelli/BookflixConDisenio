const novedadesCtrl = {};
const Novedad = require("../models/Novedad");

novedadesCtrl.listar = async (req, res) => {
  const novedades = await Novedad.find();
  res.json(novedades);
};

novedadesCtrl.visualizar = async (req, res) => {
  await Novedad.findById(req.body.id).then((nov) => {
    res.json(nov);
  });
};

novedadesCtrl.cargar = async (req, res) => {
  const novedad = await Novedad.findOne({ titulo: req.body.titulo });

  if (novedad) {
    return res.json("La Novedad ya fue cargada anteriormente");
  }

  if (!req.file) {
    return res.json("Ingrese una imagen de portada");
  }

  if (!req.body.publicacion) {
    return res.json("Ingrese una fecha de publicación");
  }

  await new Novedad({
    titulo: req.body.titulo,
    descripcion: req.body.descripcion,
    publicacion: req.body.publicacion,
    portada: req.file.filename,
  })
    .save()
    .then(res.json("Novedad cargada con éxito"))

    .catch((err) => res.send(err));
};

novedadesCtrl.modificar = async (req, res) => {
  const novedadNueva = await Novedad.findOne({ titulo: req.body.titulo });

  if (!novedadNueva || novedadNueva._id == req.body.id) {
    const novedad = await Novedad.findById(req.body.id);

    if (req.file) {
      await novedad.updateOne({ portada: req.file.filename });
    }

    await novedad
      .updateOne({
        titulo: req.body.titulo,
        descripcion: req.body.descripcion,
        publicacion: req.body.publicacion,
      })
      .then(res.send("Novedad modificada con éxito"));
  } else {
    return res.send("El titulo ya se encuentra en uso por otra novedad");
  }
};

novedadesCtrl.eliminar = async (req, res) => {
  console.log(req.body.id);
  await Novedad.findByIdAndRemove(req.body.id).then(
    res.send("Novedad eliminada")
  );
};

module.exports = novedadesCtrl;
