const mongoose = require('mongoose');
const { Schema } = mongoose;
const bcrypt = require('bcryptjs');



const SuscriptorSchema = new Schema({
    nombre:{ type: String, required:true },
    email:{ type: String,  required:true },
    password:{ type: String, required:true} ,
    perfiles:[{nombre: String, id:String}],
    suscripcion:{ type:String, require:true },
    dni:{ type:String, require:true } 
     
});


SuscriptorSchema.pre('save', function(next){
    if (!this.isModified('password'))
        return next();
    bcrypt.hash(this.password,10,(err,passwordHash)=>{
        if(err)
            return next(err);
        this.password = passwordHash;
        next();
    });
});

SuscriptorSchema.methods.matchPassword = async function(password) {
     return await bcrypt.compare(password, this.password); 
    
};



module.exports = mongoose.model('Suscriptor', SuscriptorSchema);

