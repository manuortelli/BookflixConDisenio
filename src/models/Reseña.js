const mongoose = require("mongoose");
const { Schema } = mongoose;

const ReseñaSchema = new Schema({
  comentario: {
    type: String,
  },
  autor: {
    id: String, //id de perfi
    nombre: String,
  },
  libro: {
    type: String,
  },
  spoiler: {
    type: Boolean,
  },
  adminMarcoComoSpoiler: { type: Boolean },
  publicacion: {
    type: Date,
  },
  puntaje: {
    type: Number,
  },
});

module.exports = mongoose.model("Reseña", ReseñaSchema);
