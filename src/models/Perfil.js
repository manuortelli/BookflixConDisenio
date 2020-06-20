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
  likesLibros: [String], //tiene el id del libro
  likesCapitulos: [String], //tiene el id del capitulo
  historialLibros: [
    //arreglo de objetos
    {
      archivo: String,
      terminado: Boolean,
    },
  ],
  historialCapitulos: [
    {
      archivo: String,
      terminado: Boolean,
    },
  ],
  reportes: [String],
  recomendados: [String],
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
