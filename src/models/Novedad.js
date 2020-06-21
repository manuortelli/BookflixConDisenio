const mongoose = require('mongoose');
const { Schema } = mongoose;

const NovedadSchema = new Schema({
    titulo:{  type: String, required: true   },
    descripcion:{  type: String, required: true   },
    publicacion:{ type: String , require:true },
    portada:{ type: String, required:true },

});

module.exports = mongoose.model('Novedad', NovedadSchema);