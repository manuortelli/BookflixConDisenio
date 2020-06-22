const mongoose = require('mongoose');
const { Schema } = mongoose;

const EditorialSchema = new Schema({
    nombre:{
        type:String,
        required:true,
    }
});

module.exports = mongoose.model('Editorial', EditorialSchema);