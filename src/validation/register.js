const Validator = require('validator');
const isEmpty = require('is-empty');

module.exports = function validateRegisterInput(data){
  
    let errors = {};

    data.nombre = ! isEmpty(data.nombre) ? data.nombre : '';
    data.email = ! isEmpty(data.email) ? data.email : '';
    data.suscripcion = ! isEmpty(data.suscripcion) ? data.suscripcion : '';
    data.dni = ! isEmpty(data.dni) ? data.dni : '';
    data.password = ! isEmpty(data.password) ? data.password : '';
    data.password2 = ! isEmpty(data.password2) ? data.password2 : '';
    // data.suscripcion = !isEmpty(data.suscripcion) ? data.suscripcion:'';
    
    
    if(Validator.isEmpty(data.nombre)){
        errors.nombre = 'Nombre de Usuario es obligatorio';
    }
    if(Validator.isEmpty(data.email)){
        errors.email = 'El email es obligatorio';
    }
    else if(!Validator.isEmail(data.email)){
        errors.email = 'Email inválido';
    }
    if(Validator.isEmpty(data.suscripcion)){
        errors.suscripcion = 'Es obligatorio elegir un tipo de suscripcion';
    }
    if(Validator.isEmpty(data.dni)){
        errors.password = 'DNI es obligatorio';
    }
    if(Validator.isEmpty(data.password)){
        errors.password = 'La contraseña es obligatoria';
    }

    if(Validator.isEmpty(data.password2)){
        errors.password2 = 'La contraseña de confirmación es obligatoria';
    }

    if (!Validator.isLength(data.password,{min:5,max:8})){
        errors.password = 'La contraseña debe tener entre 6 y 8 caracteres';
    }

    if(!Validator.equals(data.password,data.password2)){
        errors.password2 = 'Las contraseñas deben ser idénticas';
    }

        return {
            errors,
            isValid : isEmpty(errors),
            //req
        };

};