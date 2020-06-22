const mongoose = require("mongoose");
const { Schema } = mongoose;

const TrailerSchema = new Schema({
  titulo: { type: String },
  descripcion: { type: String },
  libro: { type: String }, //asociado
  archivo: { type: String },
  video: { Boolean }, //false -> pdf
});

module.exports = mongoose.model("Trailer", TrailerSchema);
