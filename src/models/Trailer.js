const mongoose = require('mongoose');
const { Schema } = mongoose;

const TrailerSchema = new Schema({
    titulo:{  type: String },
    descripcion:{  type: String },
    libro:{ type: String  },
    archivo:{ type:String },
});

module.exports = mongoose.model('Trailer', TrailerSchema);