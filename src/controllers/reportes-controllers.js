const reportesCtrl = {};
const Libro = require("../models/Libro");
const Suscriptor = require("../models/Suscriptor");
const Perfil = require("../models/Perfil");
const Capitulo = require("../models/Capitulo");

reportesCtrl.libros = async (req, res) => {
  const libros = await Libro.find();
  const capitulos = await Capitulo.find();
  var contadorLibros = new Array();

  for (var i = 0; i < libros.length; i++) {
    var perfilesEnCurso = await Perfil.find({
      historialLibros: {
        $elemMatch: {
          libro: libros[i].id,
          terminado: false,
        },
      },
    });
    var perfilesTerminaron = await Perfil.find({
      historialLibros: {
        $elemMatch: {
          libro: libros[i].id,
          terminado: true,
        },
      },
    });
    var perfilesEnCursoCapitulos = await Perfil.find({
      historialCapitulos: {
        $elemMatch: {
          capitulo: libros[i].id,
          terminado: false,
        },
      },
    });
    var perfilesTerminaronCapitulos = await Perfil.find({
      historialCapitulos: {
        $elemMatch: {
          capitulo: libros[i].id,
          terminado: true,
        },
      },
    });

    var contador = {
      libro: libros[i],
      cantTotal: perfilesEnCurso.length + perfilesTerminaron.length,
      cantTerminados:
        perfilesTerminaron.length + perfilesTerminaronCapitulos.length,
      cantEnCurso: perfilesEnCurso.length + perfilesEnCursoCapitulos.length,
    };

    contadorLibros.push(contador);
  }

  contadorLibros.sort(function (a, b) {
    return b.cantTotal - a.cantTotal;
  });

  return res.status(200).json(contadorLibros);
};

reportesCtrl.suscriptores = async (req, res) => {
  const suscriptores = await Suscriptor.find();
  suscriptores.splice(0, 1); //borro al admin

  res.status(200).json({ suscriptores });
};

module.exports = reportesCtrl;
