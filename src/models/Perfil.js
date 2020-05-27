const mongoose = require('mongoose');
const { Schema } = mongoose;

const PerfilSchema = new Schema({
    nombre:{
        type:String,
        required:true,
    },
    coleccionLikes:[{ type: mongoose.Schema.Types.ObjectId, ref:'Libro' }],
    coleccionLeidos:[{ type: mongoose.Schema.Types.ObjectId, ref:'Libro' }],
    reportes:[{ type: mongoose.Schema.Types.ObjectId, ref:'Reporte' }]
    //coleccionRecomendados:[{ type: mongoose.Schema.Types.ObjectId, ref:'Libro' }],
});

module.exports = mongoose.model('Perfil', PerfilSchema);