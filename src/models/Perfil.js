const mongoose = require("mongoose");
const { Schema } = mongoose;

const PerfilSchema = new Schema({
  suscriptor: {
    type: String,
  },
  nombre: {
    type: String,
    required: true,
  },
  likesLibros: [{ id: String }], //tiene el id del libro
  likesCapitulos: [{ id: String }], //tiene el id del capitulo
  historialLibros: [
    {
      libro: String,
      terminado: String,
      ultimoAcceso: Date,
    },
  ],

  historialCapitulos: [
    {
      capitulo: String,
      terminado: String,
      ultimoAcceso: Date,
    },
  ],
  reportes: [String],
  recomendados: [String],
  reseñas: [
    {
      libroId: String,
    },
  ],
});

PerfilSchema.likesLibros = async function () {
  return await this.likesLibros;
};

PerfilSchema.likesCapitulos = async function () {
  return await this.likesCapitulos;
};

PerfilSchema.historialLibros = async function () {
  return await this.historialLibros;
};

PerfilSchema.historialCapitulos = async function () {
  return await this.historialCapitulos;
};

PerfilSchema.recomendados = async function () {
  return await this.recomendados;
};

module.exports = mongoose.model("Perfil", PerfilSchema);
