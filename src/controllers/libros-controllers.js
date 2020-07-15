const librosCtrl = {};

const Libro = require("../models/Libro");
const Capitulo = require("../models/Capitulo");
const Perfil = require("./../models/Perfil");

librosCtrl.listar = async (req, res) => {
  const libros = await Libro.find();
  res.json(libros);
};

librosCtrl.visualizar = async (req, res) => {
  await Libro.findById(req.body.id)
    .then((lib) => {
      res.json(lib);
    })
    .catch((err) => res.json(err));
};

librosCtrl.visualizarCapitulos = async (req, res) => {
  const libro = await Libro.findById(req.body.id);
  const capitulosId = await libro.capitulos;
  const capitulos = new Array();
  for (var i = 0; i < capitulosId.length; i++) {
    var capitulo = await Capitulo.findById(capitulosId[i]);
    capitulos.push(capitulo);
  }
  capitulos.sort(function (a, b) {
    return a.n - b.n;
  });

  res.status(200).json(capitulos);
};

librosCtrl.verCapitulo = async (req, res) => {
  const capitulo = await Capitulo.findById(req.body.id);

  res.status(200).send(capitulo);
};

librosCtrl.cargar = async (req, res) => {
  const libroI = await Libro.findOne({ isbn: req.body.isbn });

  if (libroI) {
    return res
      .status(401)
      .json({ msg: "El número de ISBN ya se encuentra en uso" });
  } else {
    const libroT = await Libro.findOne({ titulo: req.body.titulo });
    if (libroT) {
      return res
        .status(401)
        .json({ msg: "El título ya se encuentra en uso por otro libro." });
    }
  }
  if (req.body.isbn.length < 13 || req.body.isbn.length > 16) {
    return res
      .status(401)
      .json({ msg: "El numero de ISBN debe contener entre 13 y 16 dígitos" });
  }

  if (!req.body.genero) {
    return res.status(401).json({ msg: "La carga de género es obligatoria" });
  }

  if (!req.body.autor) {
    return res.status(401).json({ msg: "La carga de Autor/a es obligatoria" });
  }

  if (!req.body.editorial) {
    return res
      .status(401)
      .json({ msg: "La carga de editorial es obligatoria" });
  }
  if (!req.file) {
    return res
      .status(401)
      .json({ msg: "La carga de imagen de portada es obligatoria" });
  }

  const libroNuevo = await new Libro({
    titulo: req.body.titulo,
    portada: req.file.filename,
    isbn: req.body.isbn,
    autor: req.body.autor,
    editorial: req.body.editorial,
    genero: req.body.genero,
    finalizado: false,
  });
  libroNuevo
    .save()
    .then((lib) => {
      res.send("Libro cargado con éxito");
    })
    .catch((err) => {
      res.json(err);
    });
};

librosCtrl.modificar = async (req, res) => {
  const libroNuevo = await Libro.findOne({ isbn: req.body.isbn });
  if (libroNuevo && libroNuevo.id != req.body.id) {
    return res.send("El número de isbn ya se encuentra en uso por otro libro");
  }

  const libroT = await Libro.findOne({ titulo: req.body.titulo });

  console.log(libroT);

  if (libroT && libroT.id != req.body.id) {
    return res.send("El título ya se encuentra en uso por otro libro.");
  }

  if (req.body.isbn.length < 13 || req.body.isbn.length > 16) {
    return res.send("El numero de ISBN debe contener entre 13 y 16 dígitos");
  } else {
    const libroViejo = await Libro.findById(req.body.id);
    //MODIFICAR LAS FECHAS FALTA
    // TANTO PARA ELLOS COMO PARA LOS CAPITULOS
    if (req.file) {
      await libroViejo.updateOne({ portada: req.file.filename });
    }
    await libroViejo
      .updateOne({
        titulo: req.body.titulo,
        isbn: req.body.isbn,
        autor: req.body.autor,
        editorial: req.body.editorial,
        genero: req.body.genero,
      })
      .then(res.send("Libro modificado con éxito"))
      .catch((err) => res.json(err));
  }
};

librosCtrl.modificarFecha = async (req, res) => {
  const libro = await Libro.findById(req.body.id);

  if (libro.capitulos != null) {
    const capitulos = await libro.capitulos;
    await capitulos.forEach(async (capituloId) => {
      const capituloActual = await Capitulo.findById(capituloId);

      if (req.body.lanzamiento != "") {
        await capituloActual.updateOne({ lanzamiento: req.body.lanzamiento });
      }
      if (req.body.vencimiento != "") {
        await capituloActual.updateOne({ vencimiento: req.body.vencimiento });
      }
    });
    if (req.body.lanzamiento != "") {
      await libro.updateOne({
        lanzamiento: req.body.lanzamiento,
      });
    }

    if (req.body.vencimiento) {
      await libro.updateOne({
        expiracion: req.body.vencimiento,
      });
    }
    return res
      .status(200)
      .json({ msg: "Fecha/s de capitulo/s de libro modificada/s con éxito" });
  } else {
    if (req.body.lanzamiento != "") {
      await libro.updateOne({
        lanzamiento: req.body.lanzamiento,
      });
    }
    if (req.body.vencimiento != "") {
      await libro.updateOne({
        expiracion: req.body.vencimiento,
      });
    }
    return res.status(200).json({ msg: "Fecha/s modificada/s con éxito" });
  }
};

librosCtrl.cargarArchivoLibro = async (req, res) => {
  const libro = await Libro.findById(req.body.id);

  if (req.file) {
    await libro.updateOne({
      archivo: req.file.filename,
      finalizado: true,
    });
  } else {
    return res.status(401).json({ msg: "Debe ingresar un archivo" });
  }
  if (req.body.lanzamiento) {
    await libro.updateOne({ lanzamiento: req.body.lanzamiento });
  } else {
    return res
      .status(401)
      .json({ msg: "Debe indicar una fecha de lanzamiento" });
  }
  if (req.body.expiracion) {
    await libro.updateOne({ expiracion: req.body.expiracion });
  }
  if (libro.capitulos) {
    await libro.updateOne({ capitulos: [], nCapitulos: [] });
  }

  console.log(libro);
  return res.status(401).json({ msg: "Archivo de Libro cargado con éxito" });
};

librosCtrl.cargarArchivoCapitulo = async (req, res) => {
  const libro = await Libro.findById(req.body.id);

  if (req.file) {
    var nCapitulos = libro.nCapitulos;

    if (nCapitulos.length != 0) {
      //me fijo que n no este cargada
      function existeN(element) {
        return element == req.body.n;
      }

      if (nCapitulos.some(existeN)) {
        console.log("ya existe ese num de cap");
        return res
          .status(401)
          .json({ msg: "El número de capítulo ya fue cargado" });
      } else {
        const capitulo = await new Capitulo({
          libro: req.body.id,
          titulo: req.body.titulo,
          archivo: req.file.filename,
          lanzamiento: req.body.lanzamiento,
          n: req.body.n,
          portada: libro.portada,
          tituloLibro: libro.titulo,
          vencimiento: req.body.vencimiento,
        }).save();

        await libro.updateOne({
          $push: {
            capitulos: capitulo.id,
            nCapitulos: req.body.n,
          },
        });
        await libro.updateOne({
          archivo: "",
          lanzamiento: req.body.lanzamiento,
        });

        if (req.body.ultimo) {
          const capitulos = await libro.capitulos;

          for (var i = 0; i < capitulos.length; i++) {
            const capituloActual = await Capitulo.findById(capitulos[i]);
            await capituloActual.updateOne({
              ultimo: false,
              lanzamiento: req.body.lanzamiento,
            });

            if (req.body.vencimiento != "") {
              await capituloActual.updateOne({
                vencimiento: req.body.vencimiento,
              });
            }
          }
          if (req.body.lanzamiento != "") {
            await libro.updateOne({
              lanzamiento: req.body.lanzamiento,
            });
          }

          await capitulo.updateOne({
            ultimo: true,
          });

          if (req.body.vencimiento) {
            await libro.updateOne({
              expiracion: req.body.vencimiento,
            });
          }
          await libro.updateOne({
            finalizado: true,
          });
        }
      }
    } else {
      console.log("el libro no tiene capitulos");

      const capitulo = await new Capitulo({
        libro: req.body.id,
        titulo: req.body.titulo,
        archivo: req.file.filename,
        lanzamiento: req.body.lanzamiento,
        n: req.body.n,
        portada: libro.portada,
        tituloLibro: libro.titulo,
        vencimiento: req.body.vencimiento,
      }).save();

      await libro.updateOne({
        $push: {
          capitulos: capitulo.id,
          nCapitulos: req.body.n,
        },
      });
      await libro.updateOne({
        archivo: "",
        lanzamiento: req.body.lanzamiento,
        finalizado: false,
      });

      if (req.body.ultimo) {
        const capitulos = await libro.capitulos;

        for (var i = 0; i < capitulos.length; i++) {
          const capituloActual = await Capitulo.findById(capitulos[i]);
          if (capituloActual.id != capitulo.id) {
            await capituloActual.updateOne({
              ultimo: false,
              lanzamiento: req.body.lanzamiento,
            });
            if (req.body.vencimiento != "") {
              await capituloActual.updateOne({
                vencimiento: req.body.vencimiento,
              });
            }
          }
        }
        if (req.body.lanzamiento != "") {
          await libro.updateOne({
            lanzamiento: req.body.lanzamiento,
          });
        }

        await capitulo.updateOne({
          ultimo: true,
        });

        if (req.body.vencimiento != "") {
          await libro.updateOne({
            expiracion: req.body.vencimiento,
          });
        }
        await libro.updateOne({
          finalizado: true,
        });
      }
    }
  } else {
    return res.status(401).json({ msg: "Debe ingresar un archivo" });
  }

  return res.status(401).json({ msg: "Archivo de capítulo cargado con éxito" });
};

librosCtrl.eliminar = async (req, res) => {
  const libro = await Libro.findById(req.body.id);

  //borro el libro de los perfiles q lo leyeron
  const perfilesLeyeronElLibroCompleto = await Perfil.find({
    historialLibros: {
      $elemMatch: {
        libro: req.body.id,
      },
    },
  });

  for (var i = 0; i < perfilesLeyeronElLibroCompleto.length; i++) {
    var perfil0 = await Perfil.findById(perfilesLeyeronElLibroCompleto[i].id);
    //console.log(perfil0, "perfil q leyo el libro");
    await perfil0.updateOne({
      $pull: {
        historialLibros: {
          libro: req.body.id,
        },
      },
    });
  }

  //borro el libro de los perfiles q lo likearon
  const perfilesLikearonElLibro = await Perfil.find({
    likesLibros: {
      $elemMatch: {
        id: req.body.id,
      },
    },
  });

  for (var k = 0; k < perfilesLikearonElLibro.length; k++) {
    var perfil1 = await Perfil.findById(perfilesLikearonElLibro[k].id);
    await perfil1.updateOne({
      $pull: {
        likesLibros: {
          id: req.body.id,
        },
      },
    });
  }

  //borro los capitulos del libro de todos los perfiles
  if (libro.capitulos) {
    const capitulos = libro.capitulos;

    for (var j = 0; j < capitulos.length; j++) {
      //por cada capitulo
      var cap = await Capitulo.findById(capitulos[j]);

      cap = cap._id;

      //borro del historial de los perfiles
      const perfilesLeyeronElCapitulo = await Perfil.find({
        historialCapitulos: {
          $elemMatch: {
            capitulo: cap,
          },
        },
      });
      for (var k = 0; k < perfilesLeyeronElCapitulo.length; k++) {
        var perfil2 = await Perfil.findById(perfilesLeyeronElCapitulo[k].id);
        await perfil2.updateOne({
          $pull: {
            historialCapitulos: {
              capitulo: cap,
            },
          },
        });
      }

      //borro de la coleccion de likes de los eprfiles
      const perfilesLikearonElCapitulo = await Perfil.find({
        likesCapitulos: {
          $elemMatch: {
            id: cap,
          },
        },
      });
      for (var l = 0; l < perfilesLikearonElCapitulo.length; l++) {
        var perfil3 = await Perfil.findById(perfilesLikearonElCapitulo[k]);
        await perfil3.updateOne({
          $pull: {
            likesCapitulos: {
              id: cap,
            },
          },
        });
      }
    }
  }

  await Libro.findByIdAndRemove(req.body.id)
    .then(res.status(200).json({ msg: "Libro eliminado" }))
    .catch((err) => res.json({ msg: err }));
};

librosCtrl.existeLibro = async (req, res) => {
  const libro = Libro.findById(req.body.id);

  if (libro) {
    return res.status(200).json({ existe: true });
  } else {
    return res.status(200).json({ existe: false });
  }
};

librosCtrl.existeCapitulo = async (req, res) => {
  const capitulo = Capitulo.findById(req.body.id);

  if (capitulo) {
    return res.status(200).json({ existe: true });
  } else {
    return res.status(200).json({ existe: false });
  }
};

librosCtrl.libroTerminado = async (req, res) => {
  const libro = await Libro.findById(req.body.id);
  if (libro.finalizado) {
    return res.status(200).json({ finalizado: true });
  } else {
    return res.status(200).json({ finalizado: false });
  }
};

librosCtrl.eliminarArchivoLibro = async (req, res) => {
  const libro = await Libro.findById(req.body.idLibro);

  await libro.updateOne({
    archivo: "",
  });
  await libro.updateOne({
    finalizado: false,
  });

  const perfilesLeyeronElLibroCompleto = await Perfil.find({
    historialLibros: {
      $elemMatch: {
        libro: req.body.id,
      },
    },
  });
  for (var i = 0; i < perfilesLeyeronElLibroCompleto.length; i++) {
    var perfil0 = await Perfil.findById(perfilesLeyeronElLibroCompleto[i].id);

    await perfil0.updateOne({
      $pull: {
        historialLibros: {
          libro: req.body.id,
        },
      },
    });
  }

  //borro el libro de los perfiles q lo likearon
  const perfilesLikearonElLibro = await Perfil.find({
    likesLibros: {
      $elemMatch: {
        id: req.body.id,
      },
    },
  });
  for (var i = 0; i < perfilesLikearonElLibro.length; i++) {
    var perfil1 = await Perfil.findById(perfilesLeyeronElLibroCompleto[i].id);
    await perfil1.updateOne({
      $pull: {
        likesLibros: {
          id: req.body.id,
        },
      },
    });
  }
  res.status(200).json({ msg: "Archivo de libro eliminado con éxito" });
};

librosCtrl.eliminarCapitulo = async (req, res) => {
  const libro = await Libro.findById(req.body.idLibro);
  const capitulo = await Capitulo.findById(req.body.idCapitulo);

  const nMax = libro.nCapitulos.sort(function (a, b) {
    return b - a;
  });

  if (capitulo.n == nMax[0] && libro.finalizado) {
    console.log("es el ultimo capitulo y el libro esta terminado");

    //poner el capitulo como incompleto
    await libro.updateOne({
      finalizado: false,
    });
  }
  //me quedo con los perfiles, les borro el cap del historial
  // y al libro lo marco como incompleto
  const perfilesLeyeronElLibroCompleto = await Perfil.find({
    historialLibros: {
      $elemMatch: {
        libro: req.body.idLibro,
        terminado: true,
      },
    },
  });
  for (var i = 0; i < perfilesLeyeronElLibroCompleto.length; i++) {
    var perfil = await Perfil.findById(perfilesLeyeronElLibroCompleto[i].id);

    await perfil.updateOne({
      $pull: {
        historialLibros: {
          libro: req.body.idLibro,
        },
      },
    });

    await perfil.updateOne({
      $push: {
        historialLibros: {
          libro: req.body.idLibro,
          terminado: false,
        },
      },
    });
  }

  const perfilesLeyeronElCapitulo = await Perfil.find({
    historialCapitulos: {
      $elemMatch: {
        capitulo: req.body.idCapitulo,
      },
    },
  });

  for (var i = 0; i < perfilesLeyeronElCapitulo; i++) {
    var perfil = await Perfil.findById(perfilesLeyeronElCapitulo[i].id);
    await perfil.updateOne({
      $pull: {
        historialCapitulos: {
          capitulo: req.body.idCapitulo,
        },
      },
    });
  }

  const perfilesLikearonElCapitulo = await Perfil.find({
    likesCapitulos: {
      $elemMatch: {
        id: req.body.idCapitulo,
      },
    },
  });

  for (var i = 0; i < perfilesLikearonElCapitulo.length; i++) {
    var perfil = await Perfil.findById(perfilesLikearonElCapitulo[i].id);
    await perfil.updateOne({
      $pull: {
        likesCapitulos: {
          id: req.body.idCapitulo,
        },
      },
    });
  }
  //borro el cap del libro y su n
  await libro.updateOne({
    $pull: {
      nCapitulos: capitulo.n,
    },
  });

  await libro.updateOne({
    $pull: {
      capitulos: req.body.idCapitulo,
    },
  });

  await Capitulo.findByIdAndDelete(req.body.idCapitulo);

  res.status(200).json({ msg: "Capitulo eliminado con éxito" });
};

librosCtrl.modificarCapitulo = async (req, res) => {
  const libro = await Libro.findById(req.body.idLibro);
  const capitulo = await Capitulo.findById(req.body.idCapitulo);

  // console.log(
  //   "lanzamiento",
  //   req.body.lanzamiento,
  //   "vencimiento: ",
  //   req.body.vencimiento
  // );

  if (req.body.lanzamiento != "") {
    console.log("hay fecha de lanzamiento", req.body.lanzamiento);
    console.log("libro finalizado: ", libro.finalizado);
    if (libro.finalizado) {
      console.log("hay fecha de lanzamiento Y el libro esta finalizado");
      return res.status(401).json({
        msg:
          "El libro se encuentra completo, no podrá cambiar la fecha de lanzamiento capítulo seleccionado. Pruebe con cambiar la fecha del libro total",
      });
    } else {
      await capitulo.updateOne({
        lanzamiento: req.body.lanzamiento,
      });
    }
  } else if (req.body.vencimiento != "") {
    console.log("hay fecha de vencimiento", req.body.vencimiento);
    console.log("libro finalizado: ", libro.finalizado);
    if (libro.finalizado) {
      console.log("hay fecha de vencimiento Y el libro esta finalizado");

      return res.status(401).json({
        msg:
          "El libro se encuentra completo, no podrá cambiar la fecha de vencimiento del capítulo seleccionado. Pruebe con cambiar la fecha del libro total",
      });
    } else {
      await capitulo.updateOne({
        vencimiento: req.body.vencimiento,
      });
    }
  }

  //si n no es el mismo n q el cap a modificar
  console.log(
    "n que entra: ",
    req.body.n,
    "n del capitulo: ",
    capitulo.n,
    "son distintos: ",
    req.body.n != capitulo.n
  );

  if (req.body.n != capitulo.n) {
    //me fijo que n no este cargada
    var nCapitulos = libro.nCapitulos;
    console.log("n caps", nCapitulos);
    if (
      nCapitulos.some((cap) => {
        console.log("cap de ncapitulos", cap);
        return cap == req.body.n;
      })
    ) {
      return res
        .status(401)
        .json({ msg: "El número de capítulo ya fue cargado" });
    } else {
      //guardo el n capitulo nuevo
      await libro.updateOne({
        $pull: {
          nCapitulos: capitulo.n,
        },
      });
      await libro.updateOne({
        $push: {
          nCapitulos: req.body.n,
        },
      });
      await capitulo.updateOne({
        n: req.body.n,
      });
    }
  }

  if (req.body.ultimo == "SI") {
    const nMax = libro.nCapitulos.sort(function (a, b) {
      return b - a;
    });

    //si el cap no es de n menor al maximo NI ES él mismo el máximo
    if (req.body.n <= nMax[0] && capitulo.n != nMax[0]) {
      return res.status(401).json({
        msg:
          "No puede indicar este capítulo como último, ya que existe otro en el libro con número mayor o igual",
      });
    } else {
      //si está marcado como ultimo capitulo Y no hay capitulos con N MAYOR
      const capitulos = await libro.capitulos;

      for (var i = 0; i < capitulos.length; i++) {
        const capituloActual = await Capitulo.findById(capitulos[i]);
        if (req.body.lanzamiento) {
          await capituloActual.updateOne({
            lanzamiento: req.body.lanzamiento,
          });
        }
        await capituloActual.updateOne({
          ultimo: false,
        });

        if (req.body.vencimiento != "") {
          await capituloActual.updateOne({ vencimiento: req.body.vencimiento });
        }
      }
      if (req.body.lanzamiento) {
        await libro.updateOne({
          lanzamiento: req.body.lanzamiento,
        });
      }
      await libro.updateOne({
        finalizado: true,
      });

      await capitulo.updateOne({ ultimo: true });

      if (req.body.vencimiento) {
        await libro.updateOne({
          expiracion: req.body.vencimiento,
        });
      }
    }
  }

  if (req.file) {
    await capitulo.updateOne({
      archivo: req.file.filename,
    });
  }

  if (req.body.titulo) {
    await capitulo.updateOne({
      titulo: req.body.titulo,
    });
  }

  return res
    .status(200)
    .json({ capitulo, libro, msg: "Capítulo modificado con éxito" });
};

module.exports = librosCtrl;
