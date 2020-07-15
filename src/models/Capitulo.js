const mongoose = require("mongoose");
const { Schema } = mongoose;

const CapituloSchema = new Schema({
  libro: {
    type: String,
  },
  portada: {
    type: String,
  },
  titulo: {
    type: String,
  },
  descripcion: {
    type: String,
  },
  archivo: {
    type: String,
  },
  lanzamiento: {
    type: Date,
  },
  vencimiento: {
    type: Date,
  },
  n: {
    type: String,
  },
  tituloLibro: {
    type: String,
  },
  reseñas: [String],
  ultimo: {
    type: Boolean,
  },
});

module.exports = mongoose.model("Capitulo", CapituloSchema);
