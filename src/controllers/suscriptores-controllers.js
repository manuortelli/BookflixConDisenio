const suscriptoresCtrl = {};

const JWT = require('jsonwebtoken');
const config = require('../config/keyToken');

const validateRegisterInput = require('../validation/register');

const Suscriptor = require('../models/Suscriptor');
const Perfil = require('../models/Perfil');

suscriptoresCtrl.listar = async (req, res) => {
    const suscriptores = await Suscriptor.find();
    res.json(suscriptores);
};

suscriptoresCtrl.registrar = async (req,res) => {
    
    const { errors, isValid } = validateRegisterInput(req.body);

    if(!isValid){
        return res.status(401).json({msg: errors});
    }
    
    const suscriptorEmail = await Suscriptor.findOne({ email: req.body.email });
    if (suscriptorEmail){
        return res.status(401).json({msg:'Ingrese otro email, el actual ya está en uso' });
    };
     
    const suscriptorDNI = await Suscriptor.findOne({dni: req.body.dni}) ;

    if(suscriptorDNI){
        return res.status(401).json({msg:'Ingrese otro dni, el actual ya está en uso'})
    };

    const perfil = await new Perfil ({ nombre: req.body.nombre }).save() ;

    console.log(perfil,perfil.__id);

    const nuevoSuscriptor = await new Suscriptor({
        nombre: req.body.nombre,
        email:req.body.email,
        password:req.body.password,
        dni: req.body.dni,
        suscripcion: req.body.suscripcion,
        
    }).save();

    await nuevoSuscriptor.updateOne({$push:{ perfiles: perfil._id }});

    await perfil.updateOne({ suscriptor : nuevoSuscriptor.__id })
        .then( user => {
            JWT.sign(
                {   id: user._id },
                config.secret,
                {   expiresIn: '2h'} ,
                (err,token) => {
                    if(err) throw err;    
                    res.json({
                        token,
                        user:{
                            id: user._id,
                            email: user.email,
                        }
                    });
                }
            )
        })
        .catch(err => res.status(401).json({msg:err}));

};

suscriptoresCtrl.login = async (req,res) => {
    const { email , password } = req.body;

    if(!email || !password ){
        return res.status(401).json({msg:'Debe rellenar todos los campos'})
    }

    const suscriptor = await Suscriptor.findOne({ email })
    if (!suscriptor) {
        return res.status(401).json({msg:'El usuario no existe'});
    }

    const match = await suscriptor.matchPassword(password);

    if(!match){
        return res.status(401).json({msg:'La contraseña es incorrecta'});
    }
    //el primer parametro es un payload
    JWT.sign({ id: suscriptor._id },
        config.secret,
        {   expiresIn: 3600} ,
        async (err,token) => {
            if(err) throw err;    
            res.json({
                token,
                user: suscriptor,
               
            });
        }
    )
};

suscriptoresCtrl.loginPerfiles = async (req,res) => {
    const suscriptor = await Suscriptor.findById(req.body.id)
    console.log(suscriptor.perfiles.lenght)
    /*
    
    res.send(perfiles.perfiles());
    */
};

suscriptoresCtrl.loginPerfil = async (req,res) => {
    const perfil = await Perfil.findById(req.body.id);

    JWT.sign({ id: suscriptor._id },
        config.secret,
        {   expiresIn: 3600} ,
        async (err,token) => {
            if(err) throw err;    
            res.json({
                token,
                user: perfil
            });
        })
};

suscriptoresCtrl.visualizar =  async (req,res)=>{

    await Suscriptor.findById(req.user.id)
        .then(user => res.send(user))
};

suscriptoresCtrl.soyAdmin = async (req,res) =>{
    
    const admin = await Suscriptor.findById(req.user.id);

    if (admin.email === 'admin@admin.com'){
        res.send(true)
    } else {
        res.send(false)
    }
}

suscriptoresCtrl.modificar =  async (req,res) => {
    
    const nuevoSuscriptor = await Suscriptor.findOne({email: req.body.email});

    if(nuevoSuscriptor && (nuevoSuscriptor._id != req.body.id )){
            return res.send('El email ya esta en uso');
    }

    const nuevoSuscriptorDNI = await Suscriptor.findOne({dni: req.body.dni});
    console.log(nuevoSuscriptorDNI)
    
    if(nuevoSuscriptorDNI && (nuevoSuscriptorDNI._id != req.body.id)){
            return res.send('El DNI ya esta en uso');
    }
        
    const suscriptor = await Suscriptor.findById(req.body.id);

    const match = await suscriptor.matchPassword(req.body.password);
    if(!match){
        return res.json('La contraseña es incorrecta');
    }
    
    await suscriptor.updateOne({
            nombre: req.body.nombre, 
            email: req.body.email,
            dni: req.body.dni,
            suscripcion: req.body.suscripcion,
            
    })
        .then( susc=> {
            res.send('Suscriptor modificado');
            susc
        
        })        
        .catch(err => res.send(err)); 
        
};

suscriptoresCtrl.eliminar =  async (req,res)=>{
        
    await Suscriptor.findByIdAndRemove(req.body.id)
        .then(res.json({msg:'Suscriptor/a Eliminado/a'}));
};

suscriptoresCtrl.logout = (req,res) => {

    req.logout().then(res.json('Sesion eliminada'))
                .catch(err => res.json(err));
    res.redirect('/');  
} 

suscriptoresCtrl.agregarPerfil= async (req,res) =>{

    const user = await Suscriptor.findById(req.body.id);
    const perfiles = await user.perfiles.length;
    

    if(user.suscripcion === 'REGULAR'){
        if( perfiles === 2){
            return res.send('La cantidad maxima de perfiles para tu suscripcion ha sido alcanzada');
        }
    }else {
        if(perfiles === 4){
            return res.send('La cantidad maxima de perfiles para tu suscripcion ha sido alcanzada');
        }
    }
    const perfil = await new Perfil ({ nombre: req.body.nombre , suscriptor: req.body.id }).save();

    await user.updateOne({ $push:{ perfiles: perfil._id }})
        .then(res.send('Perfil agregado con éxito'));
   

}   


module.exports = suscriptoresCtrl;