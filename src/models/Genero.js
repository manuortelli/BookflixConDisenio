const mongoose = require('mongoose');
const { Schema } = mongoose;

const GeneroSchema = new Schema({
    nombre:{
        type:String,
        required:true,
    }
});

module.exports = mongoose.model('Genero', GeneroSchema);