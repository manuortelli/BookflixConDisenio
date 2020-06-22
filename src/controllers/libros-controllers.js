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
  var capitulos = await Capitulo.find({
    _id: {
      $in: capitulosId,
    },
  }).sort({ n: "asc" });

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
  if (libroNuevo && libroNuevo._id != req.body.id) {
    return res.send("El número de isbn ya se encuentra en uso por otro libro");
  }

  const libroT = await Libro.findOne({ titulo: req.body.titulo });

  console.log(libroT);

  if (libroT && libroT._id != req.body.id) {
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
    await libro.updateOne({ archivo: req.file.filename });
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
    console.log("entro al if de q tiene capitulos");
    const capitulosId = await libro.capitulos;
    const perfilesQueTienenEsosCapitulosEnHistorial = await Perfil.find({
      historialCapitulos: {
        $in: {
          capitulosId,
        },
      },
    });
    await perfilesQueTienenEsosCapitulosEnHistorial.map(async (perfil) => {
      console.log(perfil);
    });
    await libro.updateOne({ capitulos: [], nCapitulos: [] });
  }

  console.log(libro);
  return res.status(401).json({ msg: "Archivo de Libro cargado con éxito" });
};

librosCtrl.cargarArchivoCapitulo = async (req, res) => {
  const libro = await Libro.findById(req.body.id);

  if (req.file) {
    var nCapitulos = libro.nCapitulos;

    if (nCapitulos) {
      function existeN(element, index, array) {
        return element == req.body.n;
      }
      if (nCapitulos.some(existeN)) {
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
        }).save();
        if (req.body.vencimiento) {
          capitulo.updateOne({
            vencimiento: req.body.vencimiento,
          });
        }
      }
    }
    const capitulo = await new Capitulo({
      libro: req.body.id,
      titulo: req.body.titulo,
      archivo: req.file.filename,
      lanzamiento: req.body.lanzamiento,
      n: req.body.n,
      portada: libro.portada,
    }).save();
    if (req.body.vencimiento) {
      capitulo.updateOne({
        vencimiento: req.body.vencimiento,
      });
    }

    await libro.updateOne({
      $push: {
        capitulos: capitulo._id,
        nCapitulos: req.body.n,
      },
    });
  } else {
    return res.status(401).json({ msg: "Debe ingresar un archivo" });
  }

  if (req.body.ultimo) {
    this.modificarFecha(req);
  }

  console.log(libro);
  return res.status(401).json({ msg: "Archivo de capítulo cargado con éxito" });
};

librosCtrl.eliminar = async (req, res) => {
  await Libro.findByIdAndRemove(req.body.id)
    .then(res.send("Libro eliminado"))
    .catch((err) => res.json(err));
};

module.exports = librosCtrl;
