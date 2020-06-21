const perfilesCtrl = {};
const Perfil = require("../models/Perfil");
const Libro = require("../models/Libro");

perfilesCtrl.visualizar = async (req, res) => {
  const perfil = await Perfil.findById(req.user.id);
  res.send(perfil);
};
perfilesCtrl.visualizarConId = async (req, res) => {
  const perfil = await Perfil.findById(req.body.id);
  res.send(perfil);
};

perfilesCtrl.visualizarPadre = async (req, res) => {
  const suscriptorPadre = await Perfil.findById(req.body.id).suscriptor;
  res.send(suscriptorPadre);
};

perfilesCtrl.likeLibro = async (req, res) => {
  const perfil = await Perfil.findById(req.body.id);

  if (perfil.likesLibros) {
    const likes = await perfil.likesLibros;
    if (likes.some(req.body.libroId)) {
      await perfil
        .updateOne({
          $pull: { likesLibros: req.body.libroId },
        })
        .then(res.send("Libro eliminado de favoritos"));
    }
  } else {
    await perfil
      .updateOne({
        $push: { likesLibros: req.body.libroId },
      })
      .then(res.send("Libro agregado a la favoritos"));
  }
};

perfilesCtrl.likeCapitulo = async (req, res) => {
  const perfil = await Perfil.findById(req.body.id);

  if (perfil.likesCapitulos) {
    const likes = await perfil.likesCapitulos;
    if (likes.some(req.body.capituloId)) {
      await perfil
        .updateOne({
          $pull: { likesCapitulos: req.body.capituloId },
        })
        .then(res.send("Capitulo eliminado de favoritos"));
    }
  } else {
    await perfil
      .updateOne({
        $push: { likesCapitulos: req.body.capituloId },
      })
      .then(res.send("Capitulo agregado a la favoritos"));
  }
};

perfilesCtrl.termineLibro = async (req, res) => {
  const perfil = await Perfil.findById(req.body.id);
  const libro = await Libro.findById(req.body.libroId);

  if (!libro.capitulos) {
    await perfil.updateOne({
      $pull: { historialLibros: req.body.libroId },
      $push: {
        historialLibros: {
          libro: req.body.libroId,
          terminado: true,
        },
      },
    });
  } else {
    const capitulosLeidos = perfil.historialCapitulos;
    libro.capitulos.forEach((cap) => {
      if (!capitulosLeidos.some(capitulo == cap)) {
        return res.status(401).json({
          msg:
            "No puede marcarlo como terminado al libro ya que algunos capítulos no fueron leidos",
        });
      }
    });
    await perfil.updateOne({
      $pull: { historialLibros: req.body.libroId },
      $push: {
        historialLibros: {
          libro: req.body.libroId,
          terminado: true,
        },
      },
    });
  }
};

perfilesCtrl.termineCapitulo = async (req, res) => {
  perfilesCtrl.termineLibro = async (req, res) => {
    const perfil = await Perfil.findById(req.body.id);
    await perfil.updateOne({
      $pull: { historialCapitulos: req.body.capituloId },
      $push: {
        historialCapitulos: {
          libro: req.body.capituloId,
          terminado: true,
        },
      },
    });
  };
};
perfilesCtrl.historialLibro = async (req, res) => {
  const perfil = await Perfil.findById(req.body.id);
  res.send(await perfil.historialLibros);
};

perfilesCtrl.historialCapitulo = async (req, res) => {
  const perfil = await Perfil.findById(req.body.id);
  res.send(await perfil.historialCapitulos);
};

perfilesCtrl.visitadoLibro = async (req, res) => {
  const perfil = await Perfil.findById(req.body.id);

  if (perfil.historialLibros) {
    const historial = await perfil.historialLibros;
    if (historial.some(req.body.libroId)) {
      await perfil.updateOne({
        $pull: { historialLibros: req.body.libroId },
        $push: { historialLibros: req.body.libroId },
      });
    }
  } else {
    await perfil
      .updateOne({
        $push: {
          historialLibros: {
            libro: req.body.libroId,
            terminado: false,
          },
        },
      })
      .then(res.status(200).json({ msg: "Libro agregado historial" }));
  }
};

perfilesCtrl.visitadoCapitulo = async (req, res) => {
  const perfil = await Perfil.findById(req.body.id);

  if (perfil.historialCapitulos) {
    const historial = await perfil.historialCapitulos;
    if (historial.some(req.body.capituloId)) {
      await perfil.updateOne({
        $pull: { historialCapitulos: req.body.capituloId },
      });
      await perfil.updateOne({
        $push: { historialCapitulos: req.body.capituloId },
      });
    }
  } else {
    await perfil
      .updateOne({
        $push: {
          historialCapitulos: {
            capitulo: req.body.capituloId,
            terminado: false,
          },
        },
      })
      .then(res.status(200).json({ msg: "Capítulo agregado historial" }));
  }
};

perfilesCtrl.likesLibros = async (req, res) => {
  const likes = await Perfil.findById(req.body.id).likesLibros();
  res.send(likes);
};

perfilesCtrl.likesCapitulos = async (req, res) => {
  const likes = await Perfil.findById(req.body.id).likesCapitulos();
  res.send(likes);
};

perfilesCtrl.recomendados = async (req, res) => {
  const perfil = await Perfil.findById(req.body.id);
  //res.send(await perfil.recomendados());
};

module.exports = perfilesCtrl;
