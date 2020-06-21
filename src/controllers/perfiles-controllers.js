const perfilesCtrl = {};
const Perfil = require("../models/Perfil");
const Libro = require("../models/Libro");
const librosCtrl = require("./libros-controllers");

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

    function existeN(element, index, array) {
      return element == req.body.libroId;
    }

    if (likes.some(existeN)) {
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

    function existeN(element, index, array) {
      return element == req.body.capituloId;
    }

    if (likes.some(existeN)) {
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

  console.log("CAPITULOS EN EL LIBRO: ", !libro.capitulos);

  if (!libro.capitulos) {
    console.log("entro en el if");
    //entra cuando el libro no tiene capitulos ¿?
    //y cuando tiene tambien

    var librosLeidos = await perfil.historialLibros;

    librosLeidos.map(async (lib) => {
      if (lib.libro == req.body.libroId) {
        await perfil.updateOne({
          $pull: {
            historialLibros: {
              libro: req.body.libroId,
            },
          },
        });

        await perfil.updateOne({
          $push: {
            historialLibros: {
              libro: req.body.libroId,
              terminado: true,
            },
          },
        });
      }
    });
    console.log(perfil.historialLibros);
    res.status(200).json({ msg: "Libro Atómico Terminado" });
  } else {
    console.log("entro en el else");
    const capitulosLeidosPorPerfil = perfil.historialCapitulos;
    const capitulosLibro = libro.capitulos;

    capitulosLibro.forEach((cap) => {
      function existeN(element, index, array) {
        return element == cap;
      }

      if (!capitulosLeidosPorPerfil.some(existeN)) {
        return res.status(401).json({
          msg:
            "No puede marcarlo como terminado al libro ya que uno o más capítulos no fueron leidos",
        });
      }
    });
    capitulosLeidos.forEach(async (cap) => {
      await perfil.updateOne({
        $pull: { historialCapitulos: cap },
      });
      await perfil.updateOne({
        $push: {
          historialCapitulos: {
            capitulo: cap.capitulo,
            terminado: true,
          },
        },
      });
    });
  }
};

perfilesCtrl.termineCapitulo = async (req, res) => {
  /*
   */
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
  const historial = await perfil.historialLibros;

  console.log("historial", historial);

  if (historial != []) {
    // TENGA ALGO O NO TENGA ALOG HISTORIAL, ENTRA ACA
    console.log("entro al if");

    var noEsta = true;
    historial.map(async (lib) => {
      if (lib.libro == req.body.libroId) {
        noEsta = false;
      }
    });
    if (noEsta) {
      await perfil
        .updateOne({
          $push: {
            historialLibros: {
              libro: req.body.libroId,
              terminado: false,
            },
          },
        })
        .then(
          console.log(perfil),
          res.status(200).json({ msg: "Libro agregado al historial" })
        );
    } else {
      return res.status(200).json({
        msg: "El libro ya se encontraba en el historial",
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
      .then(res.status(200).json({ msg: "Libro agregado al historial" }));
  }
};

perfilesCtrl.visitadoCapitulo = async (req, res) => {
  const perfil = await Perfil.findById(req.body.id);
  const historial = await perfil.historialCapitulos;
  if (historial != []) {
    var noEsta = true;
    historial.map(async (cap) => {
      if (cap.capitulo == req.body.capituloId) {
        noEsta = false;
      }
    });
    if (noEsta) {
      await perfil
        .updateOne({
          $push: {
            historialCapitulos: {
              capitulo: req.body.capituloId,
              terminado: false,
            },
          },
        })
        .then(
          console.log(perfil),
          res.status(200).json({ msg: "Capitulo agregado al historial" })
        );
    } else {
      return res.status(200).json({
        msg: "El capitulo ya se encontraba en el historial",
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
      .then(res.status(200).json({ msg: "Capitulo agregado al historial" }));
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
