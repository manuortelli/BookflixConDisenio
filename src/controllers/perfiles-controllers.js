const perfilesCtrl = {};

const Perfil = require("../models/Perfil");
const Libro = require("../models/Libro");
const Capitulo = require("../models/Capitulo");
const Suscriptor = require("../models/Suscriptor");
const Reseña = require("../models/Reseña");

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
  var likes = perfil.likesLibros;

  if (
    likes.some((lib) => {
      return lib.id == req.body.idLibro;
    })
  ) {
    await perfil.updateOne({
      $pull: {
        likesLibros: {
          id: req.body.idLibro,
        },
      },
    });
    console.log("elimino like");
    res.status(200).json({ msg: "Libro eliminado de favoritos" });
  } else {
    await perfil.updateOne({
      $push: {
        likesLibros: {
          id: req.body.idLibro,
        },
      },
    });
    console.log("nuevo like");
    res.status(200).json({ msg: "Libro agregado a favoritos" });
  }
};

perfilesCtrl.likeCapitulo = async (req, res) => {
  const perfil = await Perfil.findById(req.body.id);
  if (perfil.likesCapitulos.length > 0) {
    await perfil
      .updateOne({
        $pull: {
          likesCapitulos: {
            id: req.body.idCapitulo,
          },
        },
      })
      .then(res.status(200).json({ msg: "Capitulo eliminado de favoritos" }));
  } else {
    await perfil
      .updateOne({
        $push: {
          likesCapitulos: {
            id: req.body.idCapitulo,
          },
        },
      })
      .then(res.status(200).json({ msg: "Capitulo agregado a favoritos" }));
  }
};

perfilesCtrl.termineLibro = async (req, res) => {
  const perfil = await Perfil.findById(req.body.id);
  const libro = await Libro.findById(req.body.libroId);

  if (libro.capitulos.length == 0) {
    var librosLeidos = await perfil.historialLibros;

    //si el libro está en la coleccion de leidos
    if (
      librosLeidos.some((libro) => {
        return libro.libro == req.body.libroId;
      })
    ) {
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
            ultimoAcceso: new Date(),
          },
        },
      });
      res.status(200).json({ msg: "Libro Terminado" });
    } else {
      res.status(401).json({
        msg: "No puede marcar como terminado el libro si aún no lo leyó",
      });
    }
  } else {
    //el libro tiene capítulos
    const capitulosLeidosPorPerfil = await perfil.historialCapitulos;
    const capitulosLibro = await libro.capitulos;

    var capsLeidos = 0;

    capitulosLeidosPorPerfil.forEach((cap) => {
      function existeN(element) {
        return element == cap.capitulo;
      }
      if (capitulosLibro.some(existeN)) {
        capsLeidos = capsLeidos + 1;
      }
    });
    if (capitulosLibro.length == capsLeidos) {
      capitulosLeidosPorPerfil.forEach(async (cap) => {
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
      //a partir de ahora me voy a manejar con el libro completo o no,
      //sea libro atomico o de capitulos
      await perfil.updateOne({
        $push: {
          historialLibros: {
            libro: req.body.libroId,
            terminado: true,
          },
        },
      });
      return res.status(200).json({
        msg: "Felicitaciones!",
      });
    } else {
      return res.status(401).json({
        msg:
          "No puede marcarlo como terminado al libro ya que uno o más capítulos no fueron leidos",
      });
    }
  }
};

perfilesCtrl.historialLibro = async (req, res) => {
  const perfil = await Perfil.findById(req.body.id);
  const historial = perfil.historialLibros;
  var libros = [];

  for (var i = 0; i < historial.length; i++) {
    var libro = await Libro.findById(historial[i].libro);
    if (libro) {
      libros.push(libro);
    }
  }

  res.status(200).send(libros);
};

perfilesCtrl.historialCapitulo = async (req, res) => {
  const perfil = await Perfil.findById(req.body.id);
  const historial = perfil.historialCapitulos;
  const capitulos = [];

  for (var i = 0; i < historial.length; i++) {
    var capitulo = await Capitulo.findById(historial[i].capitulo);
    if (capitulo) {
      capitulos.push(capitulo);
    }
  }
  res.send(capitulos);
};

perfilesCtrl.visitadoLibro = async (req, res) => {
  const existe = await Perfil.findById(req.body.id).select({
    historialLibros: {
      $elemMatch: {
        libro: req.body.libroId,
      },
    },
  });

  if (existe.historialLibros.length > 0) {
    console.log(
      "el libro ya estaba en el historial, se actualizo la fecha del ultimo acceso"
    );
    await Perfil.findById(existe._id).updateOne({
      $pull: {
        historialLibros: {
          libro: req.body.libroId,
        },
      },
    });
    await Perfil.findById(existe._id).updateOne({
      $push: {
        historialLibros: {
          libro: req.body.libroId,
          terminado: false,
          ultimoAcceso: new Date(),
        },
      },
    });

    return res.status(200).json({
      msg:
        "El libro ya se encontraba en su colección de historial, se actualizó la fecha de último acceso",
    });
  } else {
    console.log("el libro no estaba en el historial");
    await Perfil.findById(existe._id)
      .updateOne({
        $push: {
          historialLibros: {
            libro: req.body.libroId,
            terminado: false,
            ultimoAcceso: new Date(),
          },
        },
      })
      .then(res.status(200).json({ msg: "Capitulo agregado al historial" }));
  }
};

perfilesCtrl.visitadoCapitulo = async (req, res) => {
  const capitulo = await Capitulo.findById(req.body.capituloId);
  const existe = await Perfil.findById(req.body.id).select({
    historialCapitulos: {
      $elemMatch: {
        capitulo: req.body.capituloId,
      },
    },
  });

  if (existe.historialCapitulos.length > 0) {
    console.log("el capitulo ya estaba visitado, modifico el ultimo acceso");
    await Perfil.findById(existe._id).updateOne({
      $pull: {
        historialCapitulos: {
          capitulo: req.body.capituloId,
        },
      },
    });
    await Perfil.findById(existe._id).updateOne({
      $push: {
        historialCapitulos: {
          capitulo: req.body.capituloId,
          terminado: false,
          ultimoAcceso: new Date(),
        },
      },
    });
    await Perfil.findById(existe._id).updateOne({
      $pull: {
        historialLibros: {
          libro: capitulo.libro,
        },
      },
    });
    await Perfil.findById(existe._id).updateOne({
      $push: {
        historialLibros: {
          libro: capitulo.libro,
          terminado: false,
          ultimoAcceso: new Date(),
        },
      },
    });

    return res.status(200).json({
      msg:
        "El capítulo ya se encontraba en su colección de historial, se guardó la fecha actual como último acceso",
    });
  } else {
    console.log("el cap no estaba visitado");
    await Perfil.findById(existe._id).updateOne({
      $push: {
        historialCapitulos: {
          capitulo: req.body.capituloId,
          terminado: false,
          ultimoAcceso: new Date(),
        },
      },
    });
    await Perfil.findById(existe._id)
      .updateOne({
        $push: {
          historialLibros: {
            libro: capitulo.libro,
            terminado: false,
            ultimoAcceso: new Date(),
          },
        },
      })
      .then(res.status(200).json({ msg: "Capitulo agregado al historial" }));
  }
};

perfilesCtrl.likesLibros = async (req, res) => {
  const perfil = await Perfil.findById(req.body.id);
  const likes = perfil.likesLibros;
  var libros = [];

  for (var i = 0; i < likes.length; i++) {
    var libro = await Libro.findById(likes[i].id);
    if (libro) {
      libros.push(libro);
    }
  }

  res.send(libros);
};

perfilesCtrl.likesCapitulos = async (req, res) => {
  const perfil = await Perfil.findById(req.body.id);
  const likes = perfil.likesCapitulos;
  var capitulos = [];
  for (var i = 0; i < likes.length; i++) {
    var capitulo = await Capitulo.findById(likes[i].id);
    if (capitulo) {
      capitulos.push(capitulo);
    }
  }

  res.send(capitulos);
};

perfilesCtrl.recomendados = async (req, res) => {
  const perfil = await Perfil.findById(req.body.id);

  const historialLibros = perfil.historialLibros;
  const likes = perfil.likesLibros;

  var librosAutor = new Array();
  var librosGenero = new Array();

  const recomendados = new Array();
  //HISTORIAL
  if (historialLibros.length != 0) {
    for (var i = 0; i < historialLibros.length; i++) {
      var libro = await Libro.findById(historialLibros[i].libro);

      librosAutor = await Libro.find({
        autor: libro.autor,
      });

      librosGenero = await Libro.find({
        genero: libro.genero,
      });

      for (var q = 0; q < librosAutor.length; q++) {
        var libroAutor = librosAutor[q];

        recomendados.push(libroAutor);
        console.log("se agrega por autor en 362");
      }
    }

    for (var k = 0; k < librosGenero.length; k++) {
      var libroGenero = librosGenero[k];

      recomendados.push(libroGenero);
      console.log("se agrega por genero en 370");
    }
  }
  // LIKES
  if (likes.length != 0) {
    for (var a = 0; a < likes.length; a++) {
      var libro = await Libro.findById(likes[a].id);

      librosAutor = await Libro.find({
        autor: libro.autor,
      });

      librosGenero = await Libro.find({
        genero: libro.genero,
      });

      for (var v = 0; v < librosAutor.length; v++) {
        var libroAutor = librosAutor[v];

        recomendados.push(libroAutor);
        console.log("se agrega por autor 410");
      }

      for (var p = 0; p < librosGenero.length; p++) {
        var libroGenero = librosGenero[p];
        //SI SON DISTINTOS, LO GUARDO

        recomendados.push(libroGenero);
        console.log("se agrega por genero 419");
      }
    }
  }

  if (recomendados.length == 0) {
    return res.status(200).json({
      msg:
        "No existen recomendaciones para usted, ya que las mismas se basan en sus colecciones de likes e historial y ambas estan vacías",
    });
  }

  var filtrar = new Array();

  for (var u = 0; u < recomendados.length; u++) {
    console.log("filtrar lenght: ", filtrar.length);
    if (
      filtrar.some((lib) => {
        return lib.id == recomendados[u].id;
      })
    ) {
      console.log("el libro ya esta en la coleccion de filtrado");
    } else {
      filtrar.push(recomendados[u]);
    }
  }

  return res.status(200).send(filtrar);
};

perfilesCtrl.termineLibroParaReseña = async (req, res) => {
  const perfil = await Perfil.findById(req.body.id);
  const libro = await Libro.findById(req.body.libroId);

  if (libro.capitulos.length == 0) {
    const leido = await perfil.updateOne({
      $elemMatch: {
        historialLibros: {
          libro: req.body.libroId,
          terminado: true,
        },
      },
    });
    console.log(leido);
    if (leido) {
      return res.status(200).json({ terminado: true });
    }
  } else {
    const capitulosLeidosPorPerfil = await perfil.historialCapitulos;
    const capitulosLibro = await libro.capitulos;
    var capsLeidos = 0;

    capitulosLeidosPorPerfil.forEach((cap) => {
      function existeN(element) {
        return element == cap.capitulo;
      }
      if (capitulosLibro.some(existeN)) {
        capsLeidos = capsLeidos + 1;
      }
    });
    if (capitulosLibro.length == capsLeidos) {
      return res.status(200).json({ terminado: true });
    }
  }

  res.status(200).json({ terminado: false });
};

perfilesCtrl.eliminar = async (req, res) => {
  const suscriptor = await Suscriptor.findById(req.body.suscriptorId);

  var reseñas = await Reseña.find({
    autor: {
      id: req.body.perfilId,
    },
  });

  for (var j = 0; j < reseñas.length; j++) {
    var reseña = await Reseña.findById(reseñas[j].id);
    await reseña.updateOne({
      autor: {
        id: "", //id:null
      },
    });
  }

  await suscriptor.updateOne({
    $pull: {
      perfiles: {
        id: req.body.perfilId,
      },
    },
  });

  await Perfil.findByIdAndRemove(req.body.perfilId).then(
    console.log(suscriptor),
    res.status(200).json({ msg: "Perfil Eliminado" })
  );
};

module.exports = perfilesCtrl;
