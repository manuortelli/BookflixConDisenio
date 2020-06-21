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
    type: String,
  },
  vencimiento: {
    type: String,
  },
  n: {
    type: String,
  },
});

module.exports = mongoose.model("Capitulo", CapituloSchema);
