const reseñasCtrl = {};
const Libro = require("../models/Libro");
const Perfil = require("../models/Perfil");
const Reseña = require("../models/Reseña");
const Suscriptor = require("../models/Suscriptor");

reseñasCtrl.listar = async (req, res) => {
  const libro = await Libro.findById(req.body.id);

  const reseñasDeLibro = libro.reseñas;
  const reseñas = [];

  for (var i = 0; i < reseñasDeLibro.length; i++) {
    var resExiste = await Reseña.findById(reseñasDeLibro[i]);
    if (resExiste) {
      reseñas.push(resExiste);
    }
  }

  reseñas.sort(function (a, b) {
    return b.puntaje - a.puntaje;
  });

  res.json(reseñas);
};

reseñasCtrl.visualizar = async (req, res) => {
  const reseña = await Reseña.findById(req.body.id);
  res.json(reseña);
};

reseñasCtrl.cargar = async (req, res) => {
  if (req.body.comentario) {
    var reseñasC = await Reseña.find({ comentario: req.body.comentario });

    if (
      reseñasC.some((rese) => {
        return rese.libro == req.body.libroId;
      })
    ) {
      return res
        .status(401)
        .json({ msg: "Ya se ha cargado una reseña con el mismo comentario" });
    }
  }

  var reseñas = await Reseña.find({
    libro: req.body.libroId,
  });

  if (
    reseñas.some((rese) => {
      return rese.autor.id == req.body.autorId;
    })
  ) {
    return res.status(401).json({
      msg:
        "Ya realizó una reseña con este perfil. Pruebe con modificar la existente",
    });
  }

  const reseñaNueva = await new Reseña({
    autor: {
      id: req.body.autorId,
      nombre: req.body.autorNombre,
    },
    puntaje: req.body.puntaje,
    publicacion: new Date(),
    spoiler: req.body.spoiler,
    libro: req.body.libroId,
    comentario: req.body.comentario,
    adminMarcoComoSpoiler: false,
  });

  reseñaNueva.save();

  const perfil = await Perfil.findById(req.body.autorId);
  await perfil.updateOne({
    $push: {
      reseñas: {
        libroId: req.body.libroId,
      },
    },
  });

  const libro = await Libro.findById(req.body.libroId);
  await libro.updateOne({
    $push: {
      reseñas: reseñaNueva.id,
    },
  });
  console.log("reseña: ", reseñaNueva);
  res.status(401).json({ msg: "Reseña cargada!" });
};

reseñasCtrl.modificar = async (req, res) => {
  const reseña = await Reseña.findById(req.body.id);

  if (req.body.puntaje) {
    await reseña.updateOne({
      puntaje: req.body.puntaje,
    });
  }
  if (req.body.comentario) {
    await reseña.updateOne({
      comentario: req.body.comentario,
    });
  }

  if (reseña.adminMarcoComoSpoiler) {
    return res.status(401).json({
      msg:
        "El sistema registró que la reseña es spoiler, aunque haya cambiado el contenido de la misma, deberá pasar por revisión y ahí se decidirá si la reseña aún sigue siendo spoiler o no. Gracias",
    });
  } else {
    await reseña.updateOne({
      spoiler: req.body.spoiler,
    });
  }

  await reseña.updateOne({
    publicacion: new Date(),
  });
  return res.status(200).json({ msg: "Reseña modificada con éxito" });
};

reseñasCtrl.eliminar = async (req, res) => {
  const reseña = await Reseña.findById(req.body.id);
  const libro = await Libro.findById(req.body.libroId);
  const perfil = await Perfil.findById(reseña.autor.id);
  //esto me permite borrarlo aunq sea el admin

  await perfil.updateOne({
    $pull: {
      reseñas: {
        libro: req.body.libroId,
      },
    },
  });

  await libro.updateOne({
    $pull: {
      reseñas: req.body.id,
    },
  });

  await Reseña.findByIdAndRemove(req.body.id)
    .then(res.status(200).json({ msg: "Reseña eliminada" }))
    .catch((err) => res.json({ msg: err }));
};

reseñasCtrl.spoiler = async (req, res) => {
  const reseña = await Reseña.findById(req.body.id);
  // const admin = await Suscriptor.findOne({ email: "admin@admin.com" });

  // return console.log("admin: ", admin, req.user.id == admin.id);

  if (reseña.spoiler) {
    await reseña.updateOne({
      spoiler: false,
    });
    return res.status(200).json({ msg: "Reseña desmarcada como spoiler" });
  } else {
    await reseña
      .updateOne({
        spoiler: true,
        adminMarcoComoSpoiler: true,
      })
      .then(
        res.status(200).json({
          msg:
            "Reseña marcada como spoiler, el perfil creador no podrá deshacer este atributo",
        })
      );
  }
};

module.exports = reseñasCtrl;
