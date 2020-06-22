const mongoose = require('mongoose');
const { Schema } = mongoose;
 
const AutorSchema = new Schema({
    nombre:{  type:String, required:true },
    apellido:{ type:String, required:true }
});

module.exports = mongoose.model('Autor', AutorSchema);